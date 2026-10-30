'use client'

import SiteGenerator from './SiteGenerator'

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
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 pt-28 pb-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface pointer-events-none" />
      {/* Subtle gold radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto">
        {/* Main heading */}
        <h1
          className="hero-rise font-heading text-[clamp(2rem,10vw,3.75rem)] sm:text-6xl md:text-7xl font-bold text-cream leading-[0.95] tracking-tight mb-6"
        >
          <span className="whitespace-nowrap">You Describe It.</span>
          <br />
          <span className="whitespace-nowrap">Mason Designs It.</span>
          <br />
          <span className="relative inline-block text-gold">
            I Build It.
            <span className="hero-underline absolute -bottom-1 left-0 right-0 h-1 bg-gold origin-left" />
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{ animationDelay: '80ms' }}
          className="hero-rise font-body text-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
        >
          Tell <span className="text-gold font-medium">Mason</span>, my AI web designer, about any idea (a business,
          a portfolio, a wedding, a side project) and watch it come to life in a couple of minutes. Love it?
          I&apos;ll make it real.
        </p>

        {/* Generator */}
        <div style={{ animationDelay: '140ms' }} className="hero-rise mb-10">
          <SiteGenerator />
        </div>

        {/* Secondary links + socials */}
        <div
          style={{ animationDelay: '260ms' }}
          className="hero-rise flex flex-wrap items-center gap-x-6 gap-y-4"
        >
          <button
            onClick={() => handleScrollTo('#projects')}
            className="font-body text-sm text-cream hover:text-gold transition-colors duration-200 tracking-wide"
          >
            See the Work →
          </button>
          <button
            onClick={() => handleScrollTo('#contact')}
            className="font-body text-sm text-cream hover:text-gold transition-colors duration-200 tracking-wide"
          >
            Get In Touch →
          </button>
          <span className="hidden sm:block w-px h-4 bg-border" />
          <div className="flex items-center gap-5">
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
          </div>
        </div>
      </div>
    </section>
  )
}
