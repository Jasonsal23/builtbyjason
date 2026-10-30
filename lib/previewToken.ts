import { createHmac, timingSafeEqual } from 'crypto'

// Server-only: signs a generated page so /api/preview-lead only emails HTML we produced.
const TOKEN_TTL_MS = 2 * 60 * 60 * 1000

function secret() {
  const s = process.env.LEAD_SIGNING_SECRET || process.env.ANTHROPIC_API_KEY
  if (!s) throw new Error('No signing secret configured')
  return s
}

function sign(issuedAt: number, prompt: string, html: string) {
  return createHmac('sha256', secret())
    .update(`${issuedAt}\n${prompt}\n${html}`)
    .digest('base64url')
}

export function createPreviewToken(prompt: string, html: string) {
  const issuedAt = Date.now()
  return `${issuedAt}.${sign(issuedAt, prompt, html)}`
}

export function verifyPreviewToken(token: string, prompt: string, html: string) {
  const [ts, sig] = token.split('.')
  const issuedAt = Number(ts)
  if (!issuedAt || !sig || Date.now() - issuedAt > TOKEN_TTL_MS) return false

  const expected = Buffer.from(sign(issuedAt, prompt, html))
  const given = Buffer.from(sig)
  return expected.length === given.length && timingSafeEqual(expected, given)
}
