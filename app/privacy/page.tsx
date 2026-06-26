import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Built by Jason',
  description: 'Privacy policy for Built by Jason web development and AI services.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-cream">
      <div className="px-6 md:px-10 pt-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-gold transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      <div className="px-6 md:px-10 py-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-gold">Legal</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream">Privacy Policy</h1>
            <p className="font-body text-sm text-muted">Last updated: June 2026</p>
          </div>

          <div className="flex flex-col gap-8 font-body text-sm text-muted leading-relaxed">

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Overview</h2>
              <p>
                Built by Jason ("we," "us," or "our") operates builtbyjason.dev. This policy explains what information we collect, how we use it, and your rights regarding that information. We keep it simple because we don't do anything shady with your data.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Information We Collect</h2>
              <p>We only collect information you voluntarily provide through our contact or application forms:</p>
              <ul className="flex flex-col gap-2 pl-4">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">—</span>Name, email address, and phone number</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">—</span>Project or inquiry details you submit</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">—</span>Resume files submitted through the careers form</li>
              </ul>
              <p>We do not use tracking cookies, analytics platforms, or any third-party data collection tools on this site.</p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">How We Use Your Information</h2>
              <p>Information submitted through our forms is used solely to:</p>
              <ul className="flex flex-col gap-2 pl-4">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">—</span>Respond to your inquiry or application</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">—</span>Discuss potential projects or working together</li>
              </ul>
              <p>We do not sell, share, rent, or distribute your information to any third parties.</p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Data Retention</h2>
              <p>
                Form submissions are received via email and retained only as long as necessary for the purpose of the inquiry. If you'd like your information removed, contact us and we'll take care of it promptly.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Third-Party Services</h2>
              <p>
                This site is hosted on Vercel. Form submissions are processed via our own server-side API and delivered through Gmail. Neither platform sells your data. You can review Vercel's privacy policy at vercel.com/legal/privacy-policy.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Your Rights</h2>
              <p>
                You have the right to request access to, correction of, or deletion of any personal information you've submitted to us. To exercise these rights, reach out directly at{' '}
                <a href="mailto:builtbyjasondev@gmail.com" className="text-gold hover:text-gold-light transition-colors duration-200">
                  builtbyjasondev@gmail.com
                </a>.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Changes to This Policy</h2>
              <p>
                If we update this policy, we'll update the date at the top. Continued use of the site after changes means you accept the updated policy.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Contact</h2>
              <p>
                Questions about this policy? Email{' '}
                <a href="mailto:builtbyjasondev@gmail.com" className="text-gold hover:text-gold-light transition-colors duration-200">
                  builtbyjasondev@gmail.com
                </a>{' '}
                or call <a href="tel:7029829560" className="text-gold hover:text-gold-light transition-colors duration-200">(702) 982-9560</a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  )
}
