import { NextRequest, NextResponse } from 'next/server'
import { MAX_PROMPT_LENGTH, prepareHtml, designFileName } from '@/lib/sitePreview'
import { verifyPreviewToken } from '@/lib/previewToken'
import {
  createTransport, mailFrom, leadInbox, escapeHtml, isEmail, emailShell, emailRows, emailDivider, emailQuote,
  createRateLimiter,
} from '@/lib/mailer'

const MAX_HTML_BYTES = 400_000

// 10 submissions per IP per hour, and each preview emails once
const isRateLimited = createRateLimiter(10, 60 * 60 * 1000)
const usedTokens = new Set<string>()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, prompt, html, token, website } = body ?? {}

    // Honeypot
    if (website) return NextResponse.json({ success: true })

    if (
      typeof name !== 'string' || !name.trim() || name.length > 100 ||
      !isEmail(email) ||
      typeof prompt !== 'string' || prompt.length > MAX_PROMPT_LENGTH ||
      typeof html !== 'string' || html.length > MAX_HTML_BYTES ||
      typeof token !== 'string'
    ) {
      return NextResponse.json({ error: 'Please enter your name and a valid email.' }, { status: 400 })
    }

    if (!verifyPreviewToken(token, prompt, html)) {
      return NextResponse.json({ error: 'This preview expired. Generate a new one and try again.' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    // Already sent this exact preview — don't email it twice
    if (usedTokens.has(token)) return NextResponse.json({ success: true })
    usedTokens.add(token)

    const cleanName = name.trim()
    const safeName = escapeHtml(cleanName)
    const safePrompt = escapeHtml(prompt)
    const firstName = escapeHtml(cleanName.split(/\s+/)[0])

    const attachment = {
      filename: designFileName(cleanName),
      content: prepareHtml(html),
      contentType: 'text/html',
    }

    const visitorHtml = emailShell(`
      <h2 style="color: #c9a84c; margin-top: 0; font-size: 22px;">Your website design is attached</h2>
      <p style="font-size: 15px; line-height: 1.6;">Hey ${firstName},</p>
      <p style="font-size: 15px; line-height: 1.6;">Thanks for trying Mason, my AI web designer! Your design is attached to this email. Download it and open it in any browser to see it full screen.</p>
      ${emailQuote('What you asked for', safePrompt)}
      <p style="font-size: 15px; line-height: 1.6;">Right now it's just the look. If you want it to be a real, working site (forms, booking, payments, an AI chatbot, your own domain) just reply to this email and we'll talk about it.</p>
      <p style="font-size: 15px; line-height: 1.6; margin-bottom: 0;">Jason<br /><a href="https://builtbyjason.dev" style="color: #c9a84c;">builtbyjason.dev</a></p>
    `)

    const leadHtml = emailShell(`
      <h2 style="color: #c9a84c; margin-top: 0; font-size: 20px; letter-spacing: 0.05em;">New Lead from Mason</h2>
      <p style="color: #9a9a9a; font-size: 14px; margin-top: 0;">Someone had Mason design a site on builtbyjason.dev</p>
      ${emailDivider}
      ${emailRows([['Name', safeName], ['Email', escapeHtml(email)]])}
      ${emailDivider}
      ${emailQuote('What they asked for', safePrompt)}
      <p style="color: #9a9a9a; font-size: 12px; margin: 24px 0 0;">The generated design is attached. Reply directly to this email to reach ${safeName}.</p>
    `)

    const transporter = createTransport()
    const results = await Promise.allSettled([
      transporter.sendMail({
        from: mailFrom(),
        to: email,
        replyTo: process.env.GMAIL_USER,
        subject: 'Your website design from Mason at Built By Jason',
        html: visitorHtml,
        attachments: [attachment],
      }),
      transporter.sendMail({
        from: mailFrom(),
        to: leadInbox(),
        replyTo: email,
        subject: `New Lead: ${cleanName} — Mason`,
        html: leadHtml,
        attachments: [attachment],
      }),
    ])

    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error(`Preview lead email ${i === 0 ? 'to visitor' : 'to Jason'} failed:`, r.reason)
    })

    return NextResponse.json({ success: true, emailed: results[0].status === 'fulfilled' })
  } catch (err) {
    console.error('Preview lead error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
