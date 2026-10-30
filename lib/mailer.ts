import nodemailer from 'nodemailer'

// Server-only helpers shared by the Mason email routes

export function createTransport() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export const mailFrom = () => `"Built By Jason" <${process.env.GMAIL_USER}>`
export const leadInbox = () => process.env.LEAD_NOTIFY_EMAIL || process.env.GMAIL_USER

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

export const isEmail = (s: unknown): s is string =>
  typeof s === 'string' && s.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

// Dark/gold wrapper matching the site
export function emailShell(inner: string) {
  return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f0ece4; padding: 32px; border-radius: 4px; border: 1px solid #2a2a2a;">${inner}</div>`
}

export function emailRows(rows: [string, string][]) {
  return `<table style="width: 100%; border-collapse: collapse; font-size: 15px;">${rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding: 8px 0; color: #9a9a9a; width: 140px; vertical-align: top;">${label}</td>
        <td style="padding: 8px 0; color: #f0ece4; font-weight: 600;">${value}</td>
      </tr>`
    )
    .join('')}</table>`
}

export const emailDivider = '<hr style="border: none; border-top: 1px solid #2a2a2a; margin: 24px 0;" />'

export function emailQuote(label: string, text: string) {
  return `
    <p style="color: #9a9a9a; font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.1em;">${label}</p>
    <p style="color: #f0ece4; font-size: 15px; line-height: 1.6; white-space: pre-wrap; background: #151515; padding: 16px; border-radius: 4px; border: 1px solid #2a2a2a;">${text}</p>`
}

// Simple per-key rate limiter (in-memory, resets when the server instance recycles)
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>()
  return (key: string) => {
    const now = Date.now()
    const entry = hits.get(key)
    if (!entry || now > entry.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs })
      return false
    }
    if (entry.count >= max) return true
    entry.count++
    return false
  }
}
