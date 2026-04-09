import SectionHeading from './ui/SectionHeading'
import AnimatedSection from './ui/AnimatedSection'

const links = [
  {
    label: 'YouTube',
    description: '@zerotoagent',
    href: 'https://youtube.com/@zerotoagent',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: 'hover:border-red-500/40 hover:text-red-400',
  },
  {
    label: 'X / Twitter',
    description: '@zerotoagent',
    href: 'https://x.com/zerotoagent',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: 'hover:border-cream/20 hover:text-cream',
  },
  {
    label: 'Course Site',
    description: 'zerotoagents.vercel.app',
    href: 'https://zerotoagents.vercel.app',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    color: 'hover:border-gold/40 hover:text-gold',
  },
]

export default function ZeroToAgents() {
  return (
    <section id="zerotoagents" className="py-24 md:py-32 px-6 md:px-10 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              label="Content & Teaching"
              title="I Also Teach This Stuff"
            />
            <AnimatedSection delay={0.2}>
              <p className="font-body text-muted text-base leading-relaxed max-w-lg">
                Zero to Agents is a free 10-week course I created that teaches anyone how to build
                AI agents from scratch using Python and the Claude API. No fluff, no gatekeeping —
                just real skills.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="font-body text-cream/70 text-sm leading-relaxed max-w-lg">
                Not just a builder — I'm in the trenches learning, shipping, and sharing everything
                I figure out. Follow along on YouTube and X.
              </p>
            </AnimatedSection>
          </div>

          {/* Right: links */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-5 bg-surface border border-border rounded-sm transition-all duration-200 text-muted ${link.color}`}
                >
                  <div className="shrink-0">{link.icon}</div>
                  <div className="flex flex-col">
                    <span className="font-body text-sm font-semibold text-cream group-hover:text-inherit transition-colors duration-200">
                      {link.label}
                    </span>
                    <span className="font-body text-xs text-muted">{link.description}</span>
                  </div>
                  <svg
                    className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
