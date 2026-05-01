'use client'

import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'

const EMAIL = 'jaysal2789@gmail.com'

const buildMailto = (subject: string, body: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

const tiers = [
  {
    name: 'Starter',
    price: '$1,200',
    billing: 'one-time',
    tagline: 'A professional web presence built from scratch.',
    features: [
      'Multi-page custom website',
      'Mobile-first, responsive design',
      'SEO-optimized and fast-loading',
      'Contact form integration',
      'Up to 5 pages',
    ],
    cta: 'Get Started',
    highlight: false,
    mailto: buildMailto(
      'Starter Package Inquiry — Multi-Page Website',
      `Hi Jason,\n\nI'm interested in the Starter package ($1,200 one-time) for a custom multi-page website.\n\nHere's a little about my project:\n\n[Tell Jason about your business and what you need]\n\nBest,\n[Your name]`
    ),
  },
  {
    name: 'Pro',
    price: '$2,200',
    billing: 'one-time',
    tagline: 'Everything in Starter, plus an AI assistant that works for you 24/7.',
    features: [
      'Everything in Starter',
      'AI chatbot integrated into your site',
      'Handles FAQs, pricing & booking 24/7',
      'Custom-trained on your business info',
      'Zero staff involvement required',
    ],
    cta: 'Get Started',
    highlight: true,
    mailto: buildMailto(
      'Pro Package Inquiry — Website + AI Chatbot',
      `Hi Jason,\n\nI'm interested in the Pro package ($2,200 one-time) — the custom website with the AI chatbot included.\n\nHere's a little about my project:\n\n[Tell Jason about your business and what you need]\n\nBest,\n[Your name]`
    ),
  },
  {
    name: 'Commerce',
    price: '$3,000',
    billing: 'one-time',
    tagline: 'A full e-commerce store ready to sell — built to convert.',
    features: [
      'Full e-commerce store',
      'Product catalog & inventory management',
      'Secure checkout & payment processing',
      'Mobile-optimized shopping experience',
      'Add AI chatbot for +$1,000',
    ],
    cta: 'Get Started',
    highlight: false,
    mailto: buildMailto(
      'Commerce Package Inquiry — E-Commerce Store',
      `Hi Jason,\n\nI'm interested in the Commerce package ($3,000 one-time) for a full e-commerce store.\n\nHere's a little about my project:\n\n[Tell Jason about your business and what you need]\n\nI'd also like to know more about adding the AI chatbot (+$1,000): Yes / No\n\nBest,\n[Your name]`
    ),
  },
]

const maintenance = [
  {
    name: 'Monthly',
    price: '$99',
    period: '/ month',
    description: '24/7 maintenance coverage. Updates, fixes, and changes handled whenever you need them — no hourly surprises. Includes annual domain renewal and domain security so your site stays live and protected.',
  },
  {
    name: 'Annual',
    price: '$999',
    period: '/ year',
    description: 'Same full coverage as monthly, billed once a year. Save $189 compared to paying month to month.',
  },
  {
    name: 'As-Needed',
    price: '$100',
    period: '/ hour',
    description: 'No ongoing commitment. Pay only when something needs fixing or updating — billed at $100/hr.',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-10 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <SectionHeading
            label="Pricing"
            title="Straightforward Pricing"
            subtitle="No hidden fees. No vague quotes. Pick the package that fits your business and we'll get to work."
          />
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                tier.highlight
                  ? 'border-gold bg-background shadow-[0_0_40px_rgba(201,168,76,0.12)]'
                  : 'border-border bg-background hover:border-gold/40'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-background text-xs font-body font-semibold tracking-widest uppercase px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-2">
                  {tier.name}
                </p>
                <div className="flex items-end gap-2 mb-3">
                  <span className="font-heading text-5xl font-bold text-cream">{tier.price}</span>
                  <span className="font-body text-sm text-muted mb-2">{tier.billing}</span>
                </div>
                <p className="font-body text-sm text-muted leading-relaxed">{tier.tagline}</p>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-body text-sm text-cream/80">
                    <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={tier.mailto}
                className={`block text-center font-body font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-200 ${
                  tier.highlight
                    ? 'bg-gold text-background hover:bg-gold-light'
                    : 'border border-border text-cream hover:border-gold hover:text-gold'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Custom scope note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center font-body text-sm text-muted mb-20"
        >
          Have something custom in mind? Bring it. Pricing varies based on scope and complexity —
          reach out and we'll figure out what makes sense.
        </motion.p>

        {/* Maintenance */}
        <div className="mb-12">
          <SectionHeading
            label="Maintenance"
            title="Keep It Running"
            subtitle="Every site I build is yours to own. Maintenance is completely optional — choose the level of support that makes sense for you."
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {maintenance.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-background p-7 hover:border-gold/40 transition-all duration-300"
            >
              <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
                {plan.name}
              </p>
              <div className="flex items-end gap-1 mb-4">
                <span className="font-heading text-4xl font-bold text-cream">{plan.price}</span>
                <span className="font-body text-sm text-muted mb-1.5">{plan.period}</span>
              </div>
              <p className="font-body text-sm text-muted leading-relaxed">{plan.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Domain fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 font-body text-xs text-muted/60 leading-relaxed max-w-2xl"
        >
          * If no maintenance plan is selected, an annual domain renewal fee will be billed separately each year to keep your site live. Domain pricing varies depending on the custom domain chosen and will be discussed upfront — no surprises.
        </motion.p>
      </div>
    </section>
  )
}
