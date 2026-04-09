import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
})

const baseUrl = 'https://builtbyjason.dev'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Jason Salazar — Web Developer & AI Solutions | Las Vegas, NV',
  description:
    "Custom websites, AI chatbots, and AI agents for local businesses. Based in Las Vegas. Let's build something.",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'Jason Salazar — Web Developer & AI Solutions | Las Vegas, NV',
    description:
      "Custom websites, AI chatbots, and AI agents for local businesses. Based in Las Vegas.",
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Built By Jason',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jason Salazar — Web Developer & AI Solutions',
    description:
      "Custom websites, AI chatbots, and AI agents for local businesses. Based in Las Vegas.",
    creator: '@zerotoagent',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Built By Jason',
  description:
    'Custom websites, AI chatbots, and AI agents for local businesses. Based in Las Vegas, NV.',
  url: baseUrl,
  telephone: '+17029829560',
  email: 'jaysal2789@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    addressCountry: 'US',
  },
  founder: {
    '@type': 'Person',
    name: 'Jason Salazar',
    url: baseUrl,
    sameAs: [
      'https://github.com/Jasonsal23',
      'https://youtube.com/@zerotoagent',
      'https://x.com/zerotoagent',
    ],
  },
  serviceType: [
    'Custom Website Development',
    'AI Chatbot Development',
    'AI Agent Development',
    'Website Redesign',
  ],
  areaServed: {
    '@type': 'Place',
    name: 'Las Vegas, NV and Remote',
  },
  priceRange: '$500 – $2,000+',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script
          src="https://ai-chat-service-production-9741.up.railway.app/widget.js"
          data-client-id="built-by-jason"
          data-server="https://ai-chat-service-production-9741.up.railway.app"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
