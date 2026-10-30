import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { MAX_PROMPT_LENGTH, ERROR_SENTINEL, tokenComment, quickPromptCheck } from '@/lib/sitePreview'
import { screenPrompt, GUARD_MESSAGES } from '@/lib/promptGuard'
import { createPreviewToken } from '@/lib/previewToken'
import { MASON_SYSTEM_PROMPT, masonUserMessage } from '@/lib/masonBrief'

// Streaming responses can take a while — give Vercel room before it kills the function
export const maxDuration = 300
export const dynamic = 'force-dynamic'

const client = new Anthropic()

const MODEL = process.env.GENERATOR_MODEL || 'claude-opus-5-5'
const PER_IP_LIMIT = Number(process.env.GENERATOR_PER_IP_LIMIT || 3)
const GLOBAL_DAILY_LIMIT = Number(process.env.GENERATOR_DAILY_LIMIT || 100)
const DAY_MS = 24 * 60 * 60 * 1000

// In-memory limits: per IP per day, plus a global daily cap so token spend stays bounded.
// These reset when the serverless instance recycles — good enough as a first line of defense.
const ipMap = new Map<string, { count: number; resetAt: number }>()
let globalCount = { count: 0, resetAt: Date.now() + DAY_MS }

// Rejected prompts don't use up a free design, but too many in a day gets you cut off
const REJECTION_LIMIT = 10
const rejectionMap = new Map<string, { count: number; resetAt: number }>()

function tooManyRejections(ip: string) {
  const entry = rejectionMap.get(ip)
  return !!entry && Date.now() <= entry.resetAt && entry.count >= REJECTION_LIMIT
}

function recordRejection(ip: string) {
  const now = Date.now()
  const entry = rejectionMap.get(ip)
  if (!entry || now > entry.resetAt) rejectionMap.set(ip, { count: 1, resetAt: now + DAY_MS })
  else entry.count++
}

function checkLimits(ip: string): string | null {
  const now = Date.now()

  if (now > globalCount.resetAt) globalCount = { count: 0, resetAt: now + DAY_MS }
  if (globalCount.count >= GLOBAL_DAILY_LIMIT) {
    return "The free generator is maxed out for today. Reach out directly and I'll put something together for you."
  }

  const entry = ipMap.get(ip)
  if (entry && now <= entry.resetAt && entry.count >= PER_IP_LIMIT) {
    return `You've used your ${PER_IP_LIMIT} free previews for today. Like what you see? Let's build the real thing.`
  }

  if (!entry || now > entry.resetAt) ipMap.set(ip, { count: 1, resetAt: now + DAY_MS })
  else entry.count++
  globalCount.count++
  return null
}

export async function POST(req: NextRequest) {
  let body: { prompt?: unknown; company?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot
  if (body.company) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : ''
  if (prompt.length < 10) {
    return NextResponse.json({ error: 'Tell me a little more about the website you want.' }, { status: 400 })
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json({ error: `Keep it under ${MAX_PROMPT_LENGTH} characters.` }, { status: 400 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (tooManyRejections(ip)) {
    return NextResponse.json(
      { error: "Mason needs a break from you for today. If you've got a real project in mind, reach out directly!" },
      { status: 429 }
    )
  }

  // Safety nets: a free gibberish check, then a quick AI screen before the expensive design call
  const quickError = quickPromptCheck(prompt)
  if (quickError) {
    recordRejection(ip)
    return NextResponse.json({ error: quickError }, { status: 400 })
  }

  const verdict = await screenPrompt(prompt)
  if (verdict !== 'website') {
    recordRejection(ip)
    return NextResponse.json({ error: GUARD_MESSAGES[verdict] }, { status: 400 })
  }

  const limitError = checkLimits(ip)
  if (limitError) {
    return NextResponse.json({ error: limitError }, { status: 429 })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = client.beta.messages.stream(
          {
            model: MODEL,
            max_tokens: 32000,
            betas: ['server-side-fallback-2026-07-01'],
            fallbacks: 'default',
            output_config: { effort: 'medium' },
            system: MASON_SYSTEM_PROMPT,
            messages: [{ role: 'user', content: masonUserMessage(prompt) }],
          },
          { signal: req.signal }
        )

        let full = ''
        for await (const event of messageStream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            full += event.delta.text
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }

        const final = await messageStream.finalMessage()
        if (final.stop_reason === 'refusal') {
          controller.enqueue(encoder.encode(ERROR_SENTINEL))
        } else {
          // Signed receipt so the lead form can email exactly this page
          controller.enqueue(encoder.encode(tokenComment(createPreviewToken(prompt, full))))
        }
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) {
          console.error('Generator rate limited by API')
        } else if (err instanceof Anthropic.APIError) {
          console.error(`Generator API error ${err.status}:`, err.message)
        } else if (!req.signal.aborted) {
          console.error('Generator error:', err)
        }
        try {
          controller.enqueue(encoder.encode(ERROR_SENTINEL))
        } catch {}
      } finally {
        try {
          controller.close()
        } catch {}
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
