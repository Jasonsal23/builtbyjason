export interface Service {
  id: string
  title: string
  description: string
  bullets: string[]
  icon: string
}

export const services: Service[] = [
  {
    id: 'websites',
    title: 'Custom Websites',
    description: 'Built from scratch to fit your brand.',
    bullets: [
      'Built from scratch, not templates',
      'Mobile-optimized, fast, SEO-friendly',
      'Designed specifically for your business',
    ],
    icon: 'code',
  },
  {
    id: 'chatbots',
    title: 'AI Chatbots',
    description: 'Smart assistants that work 24/7 for your business.',
    bullets: [
      'Smart assistants that live on your website',
      'Answer customer questions 24/7',
      'Handle FAQs, pricing, booking links',
    ],
    icon: 'chat',
  },
  {
    id: 'agents',
    title: 'AI Agent Development',
    description: 'Custom automations that save time and money.',
    bullets: [
      'Custom AI agents that automate workflows',
      'Built with the latest AI APIs and tools',
      'Tailored to your specific business needs',
    ],
    icon: 'cpu',
  },
  {
    id: 'redesigns',
    title: 'Website Redesigns',
    description: 'Modernize your site for today\'s standards.',
    bullets: [
      'Modernize your outdated site',
      'Improve speed, SEO, and mobile experience',
      'Keep what works, fix what doesn\'t',
    ],
    icon: 'refresh',
  },
]
