'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import SectionHeading from './ui/SectionHeading'
import AnimatedSection from './ui/AnimatedSection'

const stats = [
  { value: '5+', label: 'Years in E-Commerce' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '24/7', label: 'AI Tools That Never Sleep' },
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
              title="Not Your Average Dev"
            />
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col gap-4 text-muted font-body text-base leading-relaxed">
                <p>
                  I'm a web developer and AI solutions builder based in Las Vegas. I build custom
                  websites, AI chatbots, and AI agents for local businesses that want to compete and
                  look the part online.
                </p>
                <p>
                  With 5+ years of real-world e-commerce experience on Etsy, I'm not a template
                  installer — I'm a hands-on builder who ships real products that work.
                </p>
                <p className="text-cream/80">
                  I don't just build websites — I build tools that work for you while you work on
                  your business.
                </p>
              </div>
            </AnimatedSection>

            {/* Headshot */}
            <AnimatedSection delay={0.3}>
              <div className="relative w-full max-w-xs aspect-square rounded-sm overflow-hidden group border border-border hover:border-gold/30 transition-colors duration-300">
                <Image
                  src="/images/Salazar, Jason.jpg"
                  alt="Jason Salazar"
                  fill
                  className="object-cover object-center"
                  sizes="320px"
                />
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold/20 group-hover:border-gold/40 transition-colors duration-300 pointer-events-none z-10" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold/20 group-hover:border-gold/40 transition-colors duration-300 pointer-events-none z-10" />
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
