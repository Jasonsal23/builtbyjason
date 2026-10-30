'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import MasonAvatar from './ui/MasonAvatar'
import Modal from './ui/Modal'
import { MAX_PROMPT_LENGTH, ERROR_SENTINEL, TOKEN_PATTERN, prepareHtml, quickPromptCheck, designFileName } from '@/lib/sitePreview'

// Ideas that type themselves out in the empty prompt box
const ideas = [
  'A modern barbershop with a black and gold vibe and a price list',
  'A portfolio for a wedding photographer — soft, elegant, lots of whitespace',
  'A landing page for an indie video game with a retro neon look',
  'A wedding website with our story, schedule, and RSVP section',
  'A cozy family taco truck that does catering — bright, fun, and colorful',
  'A personal site for a software engineer with projects and a blog',
]

const LEAD_STORAGE_KEY = 'bbj-preview-lead'

const inputClass =
  'w-full bg-background border border-border rounded-sm px-4 py-3 font-body text-sm text-cream placeholder-muted/50 focus:outline-none focus:border-gold/50 transition-colors duration-200'

// Types each phrase out, holds it, deletes it, and moves to the next
function useTypewriter(phrases: string[], active: boolean) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!active) return
    if (reduceMotion) {
      setText(phrases[index])
      return
    }

    const full = phrases[index]
    let delay = deleting ? 22 : 45 + Math.random() * 40

    if (!deleting && text === full) delay = 2200
    else if (deleting && text === '') delay = 350

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
      } else {
        setText(full.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, active, phrases, reduceMotion])

  return { text, current: phrases[index] }
}

type Status = 'idle' | 'generating' | 'locked' | 'unlocked' | 'error'
type Device = 'desktop' | 'mobile'
type Lead = { name: string; email: string }

export default function SiteGenerator() {
  const [prompt, setPrompt] = useState('')
  const [company, setCompany] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [rawHtml, setRawHtml] = useState('')
  const [token, setToken] = useState('')
  const [submittedPrompt, setSubmittedPrompt] = useState('')
  const [previewHtml, setPreviewHtml] = useState('')
  const [device, setDevice] = useState<Device>('desktop')

  // Lead gate
  const [showModal, setShowModal] = useState(false)
  const [lead, setLead] = useState<Lead>({ name: '', email: '' })
  const [leadHoneypot, setLeadHoneypot] = useState('')
  const [leadError, setLeadError] = useState('')
  const [leadSending, setLeadSending] = useState(false)
  const [emailedTo, setEmailedTo] = useState<string | null>(null)

  // Make It Real: one click tells Jason this visitor wants the site built
  const [buildStatus, setBuildStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const abortRef = useRef<AbortController | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const showIdeas = prompt.length === 0
  const typed = useTypewriter(ideas, showIdeas)

  useEffect(() => () => abortRef.current?.abort(), [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LEAD_STORAGE_KEY)
      if (saved) setLead(JSON.parse(saved))
    } catch {}
  }, [])

  const unlock = async (info: Lead, html: string, tok: string, forPrompt: string) => {
    setLeadSending(true)
    setLeadError('')
    try {
      const res = await fetch('/api/preview-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...info, prompt: forPrompt, html, token: tok, website: leadHoneypot }),
      })
      const data = await res.json().catch(() => ({}))

      if (res.status === 400 || res.status === 429) {
        setLeadError(data.error || 'Please check your name and email.')
        setShowModal(true)
        return
      }

      // On a server hiccup, still hand over the design; they can download it below
      try {
        localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(info))
      } catch {}
      setEmailedTo(res.ok && data.emailed ? info.email : null)
      setShowModal(false)
      setStatus('unlocked')
      setPreviewHtml(prepareHtml(html))
    } catch {
      setLeadError('Connection dropped. Try again.')
    } finally {
      setLeadSending(false)
    }
  }

  const generate = async () => {
    const trimmed = prompt.trim()
    const quickError = quickPromptCheck(trimmed)
    if (quickError) {
      setError(quickError)
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setStatus('generating')
    setError('')
    setRawHtml('')
    setToken('')
    setPreviewHtml('')
    setEmailedTo(null)
    setBuildStatus('idle')
    setSubmittedPrompt(trimmed)
    setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed, company }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Something went wrong. Try again in a moment.')
        setStatus('error')
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ''
      let lastPaint = 0

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        setRawHtml(full)

        // Repaint the live preview a couple of times a second so it "builds" in front of them
        const now = Date.now()
        if (now - lastPaint > 700) {
          lastPaint = now
          setPreviewHtml(prepareHtml(full, false))
        }
      }

      const match = full.match(TOKEN_PATTERN)
      if (full.includes(ERROR_SENTINEL) || !match || full.trim().length < 200) {
        setError("Mason hit a snag on that one. Try rephrasing, or just reach out and I'll design it myself.")
        setStatus('error')
        setPreviewHtml('')
        return
      }

      const html = full.slice(0, match.index)
      setRawHtml(html)
      setToken(match[1])
      setPreviewHtml(prepareHtml(html, false))
      setStatus('locked')

      // Returning visitors who already gave their info skip the form
      if (lead.name && lead.email) unlock(lead, html, match[1], trimmed)
      else setShowModal(true)
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError('Connection dropped. Try again in a moment.')
      setStatus('error')
    }
  }

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault()
    const info = { name: lead.name.trim(), email: lead.email.trim() }
    if (!info.name) return setLeadError('Please enter your name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) return setLeadError('Please enter a valid email.')
    unlock(info, rawHtml, token, submittedPrompt)
  }

  const requestBuild = async () => {
    setBuildStatus('sending')
    try {
      const res = await fetch('/api/build-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: lead.name.trim(), email: lead.email.trim(), prompt: submittedPrompt, html: rawHtml, token }),
      })
      setBuildStatus(res.ok ? 'sent' : 'error')
    } catch {
      setBuildStatus('error')
    }
  }

  const download = () => {
    const blob = new Blob([prepareHtml(rawHtml)], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = designFileName(lead.name)
    a.click()
    URL.revokeObjectURL(url)
  }

  const openFull = () => {
    const blob = new Blob([prepareHtml(rawHtml)], { type: 'text/html' })
    window.open(URL.createObjectURL(blob), '_blank', 'noopener')
  }


  const isGenerating = status === 'generating'
  const isLocked = status === 'locked'
  const isUnlocked = status === 'unlocked'
  const hasPreview = previewHtml.length > 0

  return (
    <div className="w-full">
      {/* Prompt input */}
      <div className="bg-surface/80 backdrop-blur-sm border border-border rounded-md p-3 md:p-4 shadow-2xl shadow-black/40 focus-within:border-gold/40 transition-colors duration-300">
        {/* Mason identity */}
        <div className="flex items-center gap-3 px-2 pt-1 pb-2">
          <MasonAvatar size={40} mood={isGenerating ? 'thinking' : isUnlocked ? 'happy' : 'idle'} />
          <p className="font-body text-sm">
            <span className="text-gold font-semibold">Mason</span>
            <span className="text-muted">
              {' · '}
              {isGenerating ? 'Designing your site…' : isUnlocked ? 'Here you go!' : 'AI Web Designer'}
            </span>
          </p>
        </div>

        <div className="relative">
          <label htmlFor="site-prompt" className="sr-only">
            Describe the website you want Mason to design
          </label>
          <textarea
            id="site-prompt"
            rows={3}
            maxLength={MAX_PROMPT_LENGTH}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value)
              if (error) setError('')
            }}
            onKeyDown={(e) => {
              // Tab on an empty box grabs the idea currently on screen
              if (e.key === 'Tab' && showIdeas) {
                e.preventDefault()
                setPrompt(typed.current)
              }
              if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
                e.preventDefault()
                generate()
              }
            }}
            className="w-full bg-transparent px-3 py-2 font-body text-base md:text-lg text-cream focus:outline-none resize-none leading-relaxed"
          />

          {/* Typing ideas overlay — sits exactly where the text would go */}
          {showIdeas && (
            <div
              aria-hidden
              className="absolute inset-0 px-3 py-2 font-body text-base md:text-lg leading-relaxed text-muted/60 pointer-events-none"
            >
              {typed.text}
              <span className="inline-block w-[2px] h-[1.1em] -mb-[0.2em] ml-0.5 bg-gold animate-pulse" />
            </div>
          )}
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="flex items-center justify-between gap-3 pt-2 pl-3">
          <p className="font-body text-[11px] md:text-xs text-muted">
            {showIdeas ? (
              <>
                <span className="hidden md:inline">Press Tab to use this idea · </span>Free
              </>
            ) : (
              `${prompt.length}/${MAX_PROMPT_LENGTH}`
            )}
          </p>
          <button
            type="button"
            onClick={generate}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 px-5 md:px-6 py-3 bg-gold text-background rounded-sm font-body font-semibold text-sm hover:bg-gold-light transition-colors duration-200 tracking-wide disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
          >
            {isGenerating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Mason is designing…
              </>
            ) : isUnlocked ? (
              'Generate Another'
            ) : (
              <>
                Build My Website
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {error && <p className="mt-4 font-body text-sm text-red-400">{error}</p>}

      {/* Preview */}
      <div ref={previewRef} className="scroll-mt-24">
        <AnimatePresence>
          {(isGenerating || hasPreview) && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10"
            >
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <p className="font-body text-xs text-muted tracking-wide">
                  {isGenerating
                    ? `Mason is building your page… ${Math.round(rawHtml.length / 1000)}k characters written`
                    : isLocked
                      ? 'Mason finished your website'
                      : emailedTo
                        ? `Unlocked · A copy is on its way to ${emailedTo}`
                        : 'Unlocked · Download your copy anytime'}
                </p>
                <div className="flex items-center gap-2">
                {isUnlocked && (
                  <>
                    <button
                      type="button"
                      onClick={openFull}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-sm font-body text-xs text-cream hover:border-gold/40 hover:text-gold transition-colors duration-200"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      <span className="hidden sm:inline">Open in new tab</span>
                      <span className="sm:hidden">Open</span>
                    </button>
                    <button
                      type="button"
                      onClick={download}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-sm font-body text-xs text-cream hover:border-gold/40 hover:text-gold transition-colors duration-200"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      <span className="hidden sm:inline">Download HTML</span>
                      <span className="sm:hidden">Save</span>
                    </button>
                  </>
                )}
                <div className="hidden md:flex items-center gap-1 bg-surface border border-border rounded-sm p-1">
                  {(['desktop', 'mobile'] as Device[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDevice(d)}
                      className={`px-3 py-1 rounded-sm font-body text-xs capitalize transition-colors duration-200 ${
                        device === d ? 'bg-gold text-background' : 'text-muted hover:text-cream'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                </div>
              </div>

              {/* Browser frame */}
              <div
                className={`mx-auto bg-surface border border-border rounded-md overflow-hidden shadow-2xl shadow-black/40 transition-all duration-500 ${
                  device === 'mobile' ? 'md:max-w-[400px]' : 'max-w-full'
                }`}
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-light">
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="ml-3 flex-1 bg-background border border-border rounded-sm px-3 py-1 font-body text-[11px] text-muted truncate">
                    yourwebsite.com
                  </div>
                </div>
                <div className="relative h-[560px] md:h-[680px] bg-white overflow-hidden">
                  {hasPreview ? (
                    <iframe
                      title="Generated website preview"
                      sandbox=""
                      srcDoc={previewHtml}
                      className={`w-full h-full border-0 transition-[filter] duration-700 ${
                        isUnlocked ? '' : 'blur-[6px] scale-[1.02] pointer-events-none'
                      }`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-background flex flex-col items-center justify-center gap-4">
                      <MasonAvatar size={88} mood="thinking" />
                      <p className="font-body text-sm text-muted">Mason is picking colors, fonts, and layout…</p>
                    </div>
                  )}

                  {/* Locked overlay */}
                  {isLocked && !showModal && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                      <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        disabled={leadSending}
                        className="px-6 py-3.5 bg-gold text-background rounded-sm font-body font-semibold text-sm hover:bg-gold-light transition-colors duration-200 tracking-wide shadow-xl disabled:opacity-60"
                      >
                        {leadSending ? 'Unlocking…' : 'Unlock My Website'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions + CTA */}
              {isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 grid lg:grid-cols-[1fr_auto] gap-6 items-center bg-surface border border-gold/30 rounded-sm p-6 md:p-8"
                >
                  <div>
                    <p className="font-body text-xs text-gold tracking-widest uppercase mb-2">Like what you see?</p>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-cream mb-2">
                      This is just the look. Let&apos;s make it real.
                    </h3>
                    <p className="font-body text-sm text-muted max-w-2xl leading-relaxed">
                      I&apos;ll turn this into a fully working site: forms, booking, payments, an AI chatbot,
                      your own domain, and SEO so people actually find you.
                    </p>
                  </div>
                  {buildStatus === 'sent' ? (
                    <div className="flex items-center gap-3 px-5 py-3.5 border border-gold/40 rounded-sm">
                      <svg className="w-5 h-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <p className="font-body text-sm text-cream">Got it! Jason will reach out to {lead.email} soon.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-stretch lg:items-end gap-2">
                      <button
                        type="button"
                        onClick={requestBuild}
                        disabled={buildStatus === 'sending'}
                        className="px-8 py-4 bg-gold text-background rounded-sm font-body font-semibold text-sm hover:bg-gold-light transition-colors duration-200 tracking-wide whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {buildStatus === 'sending' ? 'Sending…' : 'Make It Real'}
                      </button>
                      {buildStatus === 'error' && (
                        <p className="font-body text-xs text-red-400">Couldn&apos;t send that. Please try again.</p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lead form popup */}
      <Modal open={showModal} onClose={() => setShowModal(false)} labelledBy="lead-title" locked={leadSending}>
        <form onSubmit={submitLead} noValidate className="flex flex-col gap-5">
          <MasonAvatar size={56} mood="happy" />

          <div>
            <p className="font-body text-xs text-gold tracking-widest uppercase mb-2">Mason finished your website</p>
            <h3 id="lead-title" className="font-heading text-2xl md:text-3xl font-bold text-cream mb-2">
              Unlock Your Design
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              You&apos;ll see it right here instantly, and I&apos;ll email you a copy of the file so you never lose it.
            </p>
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={leadHoneypot}
            onChange={(e) => setLeadHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="flex flex-col gap-3">
            <input
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={lead.name}
              onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
              className={inputClass}
              autoFocus
            />
            <input
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={lead.email}
              onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))}
              className={inputClass}
            />
          </div>

          {leadError && <p className="font-body text-sm text-red-400 -mt-2">{leadError}</p>}

          <button
            type="submit"
            disabled={leadSending}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-background rounded-sm font-body font-semibold text-sm hover:bg-gold-light transition-colors duration-200 tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {leadSending ? 'Unlocking…' : 'Show Me My Website'}
          </button>
          <p className="font-body text-[11px] text-muted text-center -mt-2">No spam. Just your design.</p>
        </form>
      </Modal>
    </div>
  )
}
