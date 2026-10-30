import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

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

const title = 'Built By Jason | Free AI Website Designer & Web Developer, Las Vegas'
const description =
  'Describe any website and Mason, my AI web designer, designs it free in minutes. Love it? I build it for real: custom websites, AI chatbots, and AI agents. Las Vegas based, working everywhere.'
const shareDescription =
  'Describe any website and Mason, my AI web designer, designs it free in minutes. Love it? I build it for real.'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  applicationName: 'Built By Jason',
  authors: [{ name: 'Jason Salazar', url: baseUrl }],
  creator: 'Jason Salazar',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'You Describe It. Mason Designs It. I Build It.',
    description: shareDescription,
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Built By Jason',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'You Describe It. Mason Designs It. I Build It.',
    description: shareDescription,
    creator: '@zerotoagent',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

const business = {
  '@type': 'ProfessionalService',
  '@id': `${baseUrl}/#business`,
  name: 'Built By Jason',
  description:
    'Custom websites, AI chatbots, and AI agents, plus Mason, a free AI website designer. Based in Las Vegas, NV.',
  url: baseUrl,
  image: `${baseUrl}/opengraph-image`,
  telephone: '+17029829560',
  email: 'builtbyjasondev@gmail.com',
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
    'AI Website Design',
    'AI Chatbot Development',
    'AI Agent Development',
    'Website Redesign',
  ],
  areaServed: [
    { '@type': 'City', name: 'Las Vegas' },
    { '@type': 'Country', name: 'United States' },
  ],
  priceRange: '$500 – $2,000+',
}

const mason = {
  '@type': 'WebApplication',
  '@id': `${baseUrl}/#mason`,
  name: 'Mason — Free AI Website Designer',
  description:
    'Describe any website (a business, portfolio, wedding, or side project) and Mason designs a custom mockup in minutes, free.',
  url: baseUrl,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Any (web browser)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@id': `${baseUrl}/#business` },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    business,
    mason,
    { '@type': 'WebSite', '@id': `${baseUrl}/#website`, name: 'Built By Jason', url: baseUrl, publisher: { '@id': `${baseUrl}/#business` } },
  ],
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
        <Analytics />
      </body>
    </html>
  )
}
