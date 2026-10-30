import { NextRequest, NextResponse } from 'next/server'
import { MAX_PROMPT_LENGTH, prepareHtml, designFileName } from '@/lib/sitePreview'
import { verifyPreviewToken } from '@/lib/previewToken'
import {
  createTransport, mailFrom, leadInbox, escapeHtml, isEmail, emailShell, emailRows, emailDivider, emailQuote,
  createRateLimiter,
} from '@/lib/mailer'

// "Make It Real": one click from a visitor who liked their Mason design.
// Emails Jason the hot lead with the design attached; Jason follows up from there.

const MAX_HTML_BYTES = 400_000
const isRateLimited = createRateLimiter(5, 60 * 60 * 1000)
const usedTokens = new Set<string>()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, prompt, html, token } = body ?? {}

    if (
      typeof name !== 'string' || !name.trim() || name.length > 100 ||
      !isEmail(email) ||
      typeof prompt !== 'string' || prompt.length > MAX_PROMPT_LENGTH
    ) {
      return NextResponse.json({ error: 'Something looks off. Please try again.' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    // Only attach the design if it's verifiably one Mason made; the lead still goes through either way
    const designVerified =
      typeof html === 'string' && html.length <= MAX_HTML_BYTES &&
      typeof token === 'string' && verifyPreviewToken(token, prompt, html)

    // Already sent for this design (double click, refresh) — don't email twice
    if (designVerified) {
      if (usedTokens.has(token)) return NextResponse.json({ success: true })
      usedTokens.add(token)
    }

    const cleanName = name.trim()
    const safeName = escapeHtml(cleanName)

    const jasonHtml = emailShell(`
      <h2 style="color: #c9a84c; margin-top: 0; font-size: 22px; letter-spacing: 0.05em;">Ready to Build</h2>
      <p style="color: #9a9a9a; font-size: 14px; margin-top: 0;">${safeName} liked their Mason design and wants you to make it real.</p>
      ${emailDivider}
      ${emailRows([['Name', safeName], ['Email', escapeHtml(email)]])}
      ${emailDivider}
      ${emailQuote('What they typed', escapeHtml(prompt))}
      <p style="color: #9a9a9a; font-size: 12px; margin: 24px 0 0;">${
        designVerified ? 'Their design is attached.' : 'Their design could not be verified, so it isn’t attached.'
      } Reply directly to this email to reach ${safeName}.</p>
    `)

    await createTransport().sendMail({
      from: mailFrom(),
      to: leadInbox(),
      replyTo: email,
      subject: `Ready to Build: ${cleanName} — Mason`,
      html: jasonHtml,
      attachments: designVerified
        ? [{ filename: designFileName(cleanName), content: prepareHtml(html), contentType: 'text/html' }]
        : [],
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Build request error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
