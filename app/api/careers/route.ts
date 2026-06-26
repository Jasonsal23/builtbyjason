import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const formData = await req.formData()

    const honeypot = formData.get('website') as string
    if (honeypot) return NextResponse.json({ success: true })

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    const resumeFile = formData.get('resume') as File | null

    if (!name || !email) {
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

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f0ece4; padding: 32px; border-radius: 4px; border: 1px solid #2a2a2a;">
        <h2 style="color: #c9a84c; margin-top: 0; font-size: 20px; letter-spacing: 0.05em;">New Career Application</h2>
        <p style="color: #9a9a9a; font-size: 14px; margin-top: 0;">Submitted via builtbyjason.dev/careers</p>
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
        </table>
        ${message ? `
        <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 24px 0;" />
        <p style="color: #9a9a9a; font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
        <p style="color: #f0ece4; font-size: 15px; line-height: 1.6; white-space: pre-wrap; background: #151515; padding: 16px; border-radius: 4px; border: 1px solid #2a2a2a;">${message}</p>
        ` : ''}
        <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 24px 0;" />
        <p style="color: #9a9a9a; font-size: 12px; margin: 0;">${resumeFile ? 'Resume attached.' : 'No resume uploaded.'} Reply directly to respond to ${name}.</p>
      </div>
    `

    const mailOptions: Parameters<typeof transporter.sendMail>[0] = {
      from: `"Built By Jason" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Career Application — ${name}`,
      html,
    }

    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer())
      mailOptions.attachments = [
        {
          filename: resumeFile.name,
          content: buffer,
        },
      ]
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Career form error:', err)
    return NextResponse.json({ error: 'Failed to send application.' }, { status: 500 })
  }
}
