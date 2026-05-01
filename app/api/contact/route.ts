import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Simple in-memory rate limiter: max 5 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return false
  }

  if (entry.count >= 5) return true

  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, message, website } = body

    // Honeypot check — bots fill this, humans don't
    if (website) {
      return NextResponse.json({ success: true })
    }

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const subject = `New Inquiry from ${name} — ${service}`

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f0ece4; padding: 32px; border-radius: 4px; border: 1px solid #2a2a2a;">
        <h2 style="color: #c9a84c; margin-top: 0; font-size: 20px; letter-spacing: 0.05em;">New Project Inquiry</h2>
        <p style="color: #9a9a9a; font-size: 14px; margin-top: 0;">Submitted via builtbyjason.dev</p>
        <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 24px 0;" />
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 8px 0; color: #9a9a9a; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 8px 0; color: #f0ece4; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9a9a9a; vertical-align: top;">Email</td>
            <td style="padding: 8px 0; color: #f0ece4;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9a9a9a; vertical-align: top;">Phone</td>
            <td style="padding: 8px 0; color: #f0ece4;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9a9a9a; vertical-align: top;">Service</td>
            <td style="padding: 8px 0; color: #c9a84c; font-weight: 600;">${service}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 24px 0;" />
        <p style="color: #9a9a9a; font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
        <p style="color: #f0ece4; font-size: 15px; line-height: 1.6; white-space: pre-wrap; background: #151515; padding: 16px; border-radius: 4px; border: 1px solid #2a2a2a;">${message}</p>
        <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 24px 0;" />
        <p style="color: #9a9a9a; font-size: 12px; margin: 0;">Reply directly to this email to respond to ${name}.</p>
      </div>
    `

    await transporter.sendMail({
      from: `"Built By Jason" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
