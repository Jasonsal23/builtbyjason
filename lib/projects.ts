export interface Project {
  id: string
  title: string
  description: string
  highlights?: string[]
  tags: string[]
  imagePlaceholder: string
  image?: string
  liveUrl?: string
  align: 'left' | 'right'
}

export const projects: Project[] = [
  {
    id: 'gera',
    title: 'G.Era — Street Luxury Brand',
    description:
      'Full e-commerce website built for a street luxury fashion brand. Custom design, product catalog, and brand identity brought to life online — with an AI agent layer that handles customer inquiries and order-related questions automatically.',
    highlights: [
      'Custom storefront design built from scratch',
      'AI agent integrated directly into the site',
      'Handles customer FAQs, order questions & more',
    ],
    tags: ['E-Commerce', 'Custom Design', 'Brand Identity', 'AI Integration'],
    imagePlaceholder: '[PROJECT_SCREENSHOT_GERA]',
    image: '/images/g-era.png',
    liveUrl: 'https://g-era.com',
    align: 'left',
  },
  {
    id: 'bighit',
    title: 'Big Hit Barbershop — Website + AI',
    description:
      'Full website built for a multi-location barbershop operating in Las Vegas and Kenosha. The site is designed for walk-ins and bookings, with an AI assistant embedded directly into the page — answering customer questions about services, pricing, and hours around the clock without any staff involvement.',
    highlights: [
      'Custom website built for two locations',
      'Embedded AI chatbot lives inside the site',
      'Handles FAQs, pricing, hours & booking links 24/7',
    ],
    tags: ['Website', 'AI Chatbot', 'Multi-Location', 'Service Automation'],
    imagePlaceholder: '[PROJECT_SCREENSHOT_BIGHIT]',
    image: '/images/bighitbarbershop.png',
    liveUrl: 'https://bighitbarbershop.com',
    align: 'right',
  },
  {
    id: 'offroadparacord',
    title: 'Offroad Paracord — E-Commerce Store',
    description:
      'E-commerce website built for an outdoor gear brand specializing in paracord products. Clean, rugged aesthetic with a full product catalog, optimized for mobile shoppers and built to convert.',
    highlights: [
      'Full product catalog and storefront',
      'Mobile-first design built for conversions',
      'SEO-optimized and fast-loading',
    ],
    tags: ['E-Commerce', 'Outdoor / Gear', 'Mobile-First', 'SEO'],
    imagePlaceholder: '[PROJECT_SCREENSHOT_OFFROADPARACORD]',
    image: '/images/offroadparacord.png',
    liveUrl: 'https://offroadparacord.com',
    align: 'left',
  },
  {
    id: 'jasonsalazarlinks',
    title: 'Jason Salazar Links — Personal Link Hub',
    description:
      'A custom-built Linktree-style site that consolidates all social profiles, projects, and content into one clean, branded page. Built as a standalone product concept — anyone can create their own link hub with a custom URL and personalized layout.',
    highlights: [
      'Custom-built alternative to Linktree',
      'All links, socials, and projects in one place',
      'Fully branded and hosted at a custom domain',
    ],
    tags: ['Link Hub', 'Personal Brand', 'Custom Build', 'SaaS Concept'],
    imagePlaceholder: '[PROJECT_SCREENSHOT_JASONSALAZARLINKS]',
    image: '/images/jasonsalazarlinks.png',
    liveUrl: 'https://jasonsalazar.com',
    align: 'right',
  },
]
