// Shared between the generator UI and the API routes

export const MAX_PROMPT_LENGTH = 600
export const ERROR_SENTINEL = '<!--GENERATION_FAILED-->'

// The generate route appends a signed token after the HTML so the lead route can
// verify the page really came from us before emailing it anywhere.
export const TOKEN_PATTERN = /<!--BBJ_TOKEN:([A-Za-z0-9._-]+)-->$/
export const tokenComment = (token: string) => `<!--BBJ_TOKEN:${token}-->`

export function designFileName(name?: string) {
  const slug = (name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
  return `${slug ? `${slug}-` : ''}website-by-mason.html`
}

// Free first-pass filter (runs in the browser and on the server) for gibberish and
// throwaway input, so obviously bad prompts never reach the AI at all.
export function quickPromptCheck(prompt: string): string | null {
  const text = prompt.trim()
  const letters = (text.match(new RegExp('\\p{L}', 'gu')) || []).length
  const hasWord = new RegExp('\\p{L}{2,}', 'u')
  const words = text.split(/\s+/).filter((w) => hasWord.test(w))

  const latin = /^[\x00-\x7F\u00C0-\u024F\u2018-\u201D\u2014]*$/.test(text)

  if (letters < 10 || (latin && words.length < 3)) {
    return 'Tell Mason a little more, like who the site is for and the vibe you want.'
  }

  const looksLikeMashing =
    /(.)\1{5,}/.test(text) || // aaaaaa
    letters / text.length < 0.5 || // mostly symbols or numbers
    (latin && words.filter((w) => !/[aeiouyà-ÿ]/i.test(w)).length / words.length > 0.5) // keyboard mashing
  if (looksLikeMashing) {
    return 'That doesn’t look like a website idea yet. Try something like “a portfolio for a tattoo artist with a dark, edgy look.”'
  }

  return null
}

const PREVIEW_BADGE = `
<a href="https://builtbyjason.dev" style="position:fixed;bottom:14px;right:14px;z-index:2147483647;display:flex;align-items:center;gap:8px;padding:8px 14px;background:#0a0a0a;color:#f0ece4;border:1px solid #c9a84c;border-radius:999px;font:500 12px/1 system-ui,-apple-system,sans-serif;letter-spacing:.03em;text-decoration:none;box-shadow:0 8px 24px rgba(0,0,0,.35)">
  <span style="width:6px;height:6px;border-radius:50%;background:#c9a84c"></span>
  Designed by Mason · Built By Jason
</a>`

// Normalize the model output: drop stray code fences, scripts, and inline handlers,
// then tag the page with a small preview badge.
export function prepareHtml(raw: string, withBadge = true) {
  let html = raw.replace(ERROR_SENTINEL, '').replace(TOKEN_PATTERN, '')
  html = html.replace(/^[\s\S]*?(?=<!DOCTYPE|<html)/i, '').replace(/```\s*$/, '')
  html = html.replace(/<script[\s\S]*?(<\/script>|$)/gi, '')
  html = html.replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, '')
  html = html.replace(/javascript:/gi, '').replace(/<meta[^>]+http-equiv[^>]*>/gi, '')
  if (!withBadge) return html
  return /<\/body>/i.test(html)
    ? html.replace(/<\/body>/i, `${PREVIEW_BADGE}</body>`)
    : html + PREVIEW_BADGE
}
