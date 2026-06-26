'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import AnimatedSection from './ui/AnimatedSection'

const stats = [
  { value: '10+', label: 'Businesses Launched Online' },
  { value: '100%', label: 'Built From Scratch — No Templates' },
  { value: '24/7', label: 'AI Tools Running While You Sleep' },
]

function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col gap-1"
    >
      <span className="font-heading text-4xl md:text-5xl font-bold text-gold">{value}</span>
      <span className="font-body text-sm text-muted tracking-wide">{label}</span>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-10 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: heading + copy */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              label="About"
              title="Built for Results"
            />
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col gap-4 text-muted font-body text-base leading-relaxed">
                <p>
                  Most businesses don't have a bad product — they have a bad web presence. A slow
                  site, an outdated design, or no online presence at all is costing you customers
                  every single day.
                </p>
                <p className="text-cream/80">
                  Every project is built from scratch, designed around your business, and delivered
                  ready to work — not ready to hand off to someone else to finish.
                </p>
              </div>
            </AnimatedSection>

          </div>

          {/* Right: stats */}
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8 lg:gap-12">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col gap-1 border-l-2 border-gold/40 pl-6">
                  <StatItem value={stat.value} label={stat.label} index={i} />
                </div>
              ))}
            </div>

            <AnimatedSection delay={0.4}>
              <div className="bg-background border border-border rounded-sm p-6 flex flex-col gap-3">
                <p className="font-body text-xs text-gold tracking-widest uppercase">Currently available for</p>
                <div className="flex flex-wrap gap-2">
                  {['Website Builds', 'AI Chatbots', 'Redesigns', 'Consulting'].map((item) => (
                    <span
                      key={item}
                      className="font-body text-xs px-3 py-1.5 bg-surface-light border border-border text-cream/70 rounded-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="font-body text-sm text-muted">
                  Based in Las Vegas, NV — working with clients locally and remotely.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
