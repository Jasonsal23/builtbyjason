'use client'

import { motion } from 'framer-motion'

const socialLinks = [
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

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface pointer-events-none" />
      {/* Subtle gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block font-body text-xs tracking-[0.25em] uppercase text-gold border border-gold/30 px-4 py-1.5 rounded-sm bg-gold/5">
            Web Developer & AI Builder
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream leading-[0.95] tracking-tight mb-6"
        >
          I Build Websites
          <br />
          <span className="text-gold">& AI Tools</span>
          <br />
          for Businesses
          <br />
          That Want to{' '}
          <span className="relative inline-block">
            Stand Out
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute -bottom-1 left-0 right-0 h-1 bg-gold origin-left"
            />
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-muted text-lg md:text-xl max-w-xl leading-relaxed mb-10"
        >
          Developer & AI specialist based in Las Vegas, NV — helping local businesses look sharp
          online and work smarter with AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap gap-4 items-center mb-12"
        >
          <button
            onClick={() => handleScrollTo('#projects')}
            className="font-body font-medium text-sm px-7 py-3.5 bg-gold text-background rounded-sm hover:bg-gold-light transition-all duration-200 active:scale-95 tracking-wide"
          >
            See My Work
          </button>
          <button
            onClick={() => handleScrollTo('#contact')}
            className="font-body font-medium text-sm px-7 py-3.5 border border-cream/30 text-cream rounded-sm hover:border-cream hover:bg-cream/5 transition-all duration-200 active:scale-95 tracking-wide"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center gap-5"
        >
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-muted hover:text-gold transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs text-muted tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}
