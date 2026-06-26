'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const inputClass =
  'w-full bg-surface border border-border rounded-sm px-4 py-3 font-body text-sm text-cream placeholder-muted/50 focus:outline-none focus:border-gold/50 transition-colors duration-200'

const labelClass = 'block font-body text-xs text-muted tracking-wide mb-1.5'

export default function CareersPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', website: '' })
  const [resume, setResume] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!resume) e.resume = 'Please attach your resume'
    return e
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setResume(file)
    if (file && errors.resume) setErrors((prev) => ({ ...prev, resume: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    try {
      const data = new FormData()
      data.append('name', form.name)
      data.append('email', form.email)
      data.append('phone', form.phone)
      data.append('message', form.message)
      data.append('website', form.website)
      if (resume) data.append('resume', resume)

      const res = await fetch('/api/careers', { method: 'POST', body: data })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '', website: '' })
        setResume(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-background text-cream">
      {/* Back link */}
      <div className="px-6 md:px-10 pt-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-gold transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      <div className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left: info */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <span className="font-body text-xs tracking-[0.2em] uppercase text-gold">Careers</span>
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight">
                  Work With
                  <br />
                  <span className="text-gold">Jason</span>
                </h1>
                <p className="font-body text-muted text-base leading-relaxed max-w-md">
                  No open positions at the moment — but that changes. If you're a builder who ships
                  real work and wants to be part of something growing, drop your info and we'll keep
                  you in mind.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-surface border border-border rounded-sm p-6 flex flex-col gap-4"
              >
                <p className="font-body text-xs text-gold tracking-widest uppercase">Current Openings</p>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-muted/40" />
                  <p className="font-body text-sm text-muted">No listings at this time — check back soon.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-col gap-3"
              >
                <p className="font-body text-xs text-gold tracking-widest uppercase">What we look for</p>
                {[
                  'Builders who ship, not just plan',
                  'People who take ownership of their work',
                  'Self-starters who figure things out',
                ].map((trait) => (
                  <div key={trait} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="font-body text-sm text-muted">{trait}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-surface border border-gold/30 rounded-sm p-10 flex flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-cream">Application Sent!</h3>
                  <p className="font-body text-muted text-sm max-w-xs">
                    Got it. If something opens up that's a good fit, you'll hear from Jason directly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 font-body text-xs text-gold hover:text-gold-light transition-colors duration-200 tracking-wide"
                  >
                    Submit another
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="w-full bg-surface border border-border rounded-sm p-8 flex flex-col gap-5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/20 pointer-events-none" />

                  <div>
                    <p className="font-body text-xs text-gold tracking-widest uppercase mb-1">Express Interest</p>
                    <h3 className="font-heading text-2xl font-bold text-cream">Submit Your Info</h3>
                  </div>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Name *</label>
                      <input name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} className={inputClass} />
                      {errors.name && <p className="mt-1 text-xs text-red-400 font-body">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} className={inputClass} />
                      {errors.email && <p className="mt-1 text-xs text-red-400 font-body">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelClass}>Phone <span className="text-muted/50">(optional)</span></label>
                    <input name="phone" type="tel" placeholder="(702) 000-0000" value={form.phone} onChange={handleChange} className={inputClass} />
                  </div>

                  {/* Resume upload */}
                  <div>
                    <label className={labelClass}>Resume *</label>
                    <label className={`flex items-center gap-3 cursor-pointer w-full bg-surface border rounded-sm px-4 py-3 transition-colors duration-200 ${errors.resume ? 'border-red-400/50' : 'border-border hover:border-gold/40'}`}>
                      <svg className="w-4 h-4 text-muted shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                      </svg>
                      <span className="font-body text-sm text-muted truncate">
                        {resume ? resume.name : 'Attach resume (PDF, DOC, DOCX)'}
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFile}
                        className="hidden"
                      />
                    </label>
                    {errors.resume && <p className="mt-1 text-xs text-red-400 font-body">{errors.resume}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelClass}>Anything else? <span className="text-muted/50">(optional)</span></label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Tell us what you're good at, what you're looking for, or anything else worth knowing."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="font-body text-sm text-red-400">
                      Something went wrong. Email directly at{' '}
                      <a href="mailto:jaysal2789@gmail.com" className="underline hover:text-red-300">
                        jaysal2789@gmail.com
                      </a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-background rounded-sm font-body font-semibold text-sm hover:bg-gold-light transition-colors duration-200 tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
