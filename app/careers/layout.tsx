import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers — Built By Jason',
  description: 'Join Built By Jason. Work on custom websites, AI chatbots, and AI agents for businesses.',
  alternates: { canonical: '/careers' },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children
}
