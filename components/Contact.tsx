'use client'

import { useState } from 'react'
import AnimatedSection from './ui/AnimatedSection'
import { motion } from 'framer-motion'

const inputClass =
  'w-full bg-background border border-border rounded-sm px-4 py-3 font-body text-sm text-cream placeholder-muted/50 focus:outline-none focus:border-gold/50 transition-colors duration-200'

const labelClass = 'block font-body text-xs text-muted tracking-wide mb-1.5'

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '', // honeypot
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.service) e.service = 'Please select a service'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', service: '', message: '', website: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-background border border-gold/30 rounded-sm p-10 flex flex-col items-center justify-center gap-4 text-center"
      >
        <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center">
          <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-cream">Message Sent!</h3>
        <p className="font-body text-muted text-sm max-w-xs">
          Thanks! I'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 font-body text-xs text-gold hover:text-gold-light transition-colors duration-200 tracking-wide"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full bg-background border border-border rounded-sm p-8 flex flex-col gap-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/20 pointer-events-none" />

      <div>
        <p className="font-body text-xs text-gold tracking-widest uppercase mb-1">Ready to start?</p>
        <h3 className="font-heading text-2xl font-bold text-cream">Send Me a Message</h3>
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

      {/* Service */}
      <div>
        <label className={labelClass}>Service *</label>
        <select name="service" value={form.service} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
          <option value="" disabled>Select a package...</option>
          <option>Starter — Multi-Page Website ($1,200)</option>
          <option>Pro — Website + AI Chatbot ($2,200)</option>
          <option>Commerce — E-Commerce Store ($3,000)</option>
          <option>Custom Project</option>
        </select>
        {errors.service && <p className="mt-1 text-xs text-red-400 font-body">{errors.service}</p>}
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400 font-body">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-red-400">
          Something went wrong. You can reach me directly at{' '}
          <a href="mailto:builtbyjasondev@gmail.com" className="underline hover:text-red-300">
            builtbyjasondev@gmail.com
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
          'Send Message'
        )}
      </button>

      <p className="font-body text-xs text-muted text-center">Usually respond within 24 hours.</p>
    </form>
  )
}

const contactItems = [
  {
    label: 'Phone',
    value: '(702) 982-9560',
    href: 'tel:7029829560',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'builtbyjasondev@gmail.com',
    href: 'mailto:builtbyjasondev@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Las Vegas, NV',
    href: null,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
]

const socials = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@zerotoagent',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/zerotoagent',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-10 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: heading + info */}
          <div className="flex flex-col gap-8">
            <AnimatedSection>
              <span className="font-body text-xs tracking-[0.2em] uppercase text-gold">
                Contact
              </span>
            </AnimatedSection>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight"
            >
              Let's Build
              <br />
              <span className="text-gold">Something</span>
            </motion.h2>
            <AnimatedSection delay={0.2}>
              <p className="font-body text-muted text-base leading-relaxed max-w-md">
                Have a project in mind? Need a website or AI tool for your business? Let's talk.
              </p>
            </AnimatedSection>

            {/* Contact details */}
            <AnimatedSection delay={0.3}>
              <div className="flex flex-col gap-4">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-sm bg-surface-light border border-border flex items-center justify-center text-gold shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted tracking-wide">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-body text-sm text-cream hover:text-gold transition-colors duration-200"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-body text-sm text-cream">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Socials */}
            <AnimatedSection delay={0.4}>
              <div className="flex items-center gap-4 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-sm bg-surface-light border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold/30 transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Contact form */}
          <AnimatedSection delay={0.2} direction="right" className="flex items-start w-full">
            <ContactForm />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
