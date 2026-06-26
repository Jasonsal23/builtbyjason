import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Built by Jason',
  description: 'Terms of service for Built by Jason web development and AI services.',
}

export default function TermsPage() {
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
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream">Terms of Service</h1>
            <p className="font-body text-sm text-muted">Last updated: June 2026</p>
          </div>

          <div className="flex flex-col gap-8 font-body text-sm text-muted leading-relaxed">

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Agreement</h2>
              <p>
                By engaging Built by Jason ("we," "us," or "our") for any service — including website development, AI chatbot implementation, or related work — you agree to these terms. If you don't agree, don't engage our services.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Services</h2>
              <p>
                We provide custom web development, AI chatbot integration, e-commerce builds, and related digital services. The specific scope of work, deliverables, and timeline for each project are agreed upon before work begins and documented in a separate project agreement or proposal.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Payment</h2>
              <p>
                Payment terms are outlined per project. Generally, a deposit is required before work begins, with the remaining balance due upon project completion. Work will not be delivered or transferred until payment is received in full. Late payments may result in project delays.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Client Responsibilities</h2>
              <p>Clients are responsible for:</p>
              <ul className="flex flex-col gap-2 pl-4">
                <li className="flex items-start gap-2"><span className="text-gold mt-1">—</span>Providing accurate content, branding assets, and project information in a timely manner</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">—</span>Reviewing and providing feedback within agreed timeframes</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">—</span>Ensuring they have rights to any content, images, or materials they supply</li>
                <li className="flex items-start gap-2"><span className="text-gold mt-1">—</span>Managing their own domain, hosting credentials, and third-party accounts unless otherwise agreed</li>
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Intellectual Property</h2>
              <p>
                Upon receipt of full payment, the client owns the final deliverable. We retain the right to display the work in our portfolio unless the client requests otherwise in writing prior to project start.
              </p>
              <p>
                Any proprietary tools, frameworks, or components developed by us that are incorporated into your project are licensed to you for use within that project only.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Revisions & Scope</h2>
              <p>
                Each project includes a defined number of revision rounds as agreed in the project proposal. Work outside the agreed scope will be scoped and billed separately at our standard hourly rate of $100/hr.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Maintenance</h2>
              <p>
                Ongoing maintenance is optional and governed by a separate maintenance agreement. Without an active maintenance plan, support and updates are billed at $100/hr. Domain renewal fees are the client's responsibility unless covered under an active maintenance plan.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Limitation of Liability</h2>
              <p>
                We are not liable for any indirect, incidental, or consequential damages arising from the use of our services or deliverables. Our total liability for any claim related to a project shall not exceed the amount paid for that specific project.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Cancellations</h2>
              <p>
                If a client cancels a project after work has begun, any deposit paid is non-refundable. Completed work up to the point of cancellation may be invoiced at the agreed project rate.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Governing Law</h2>
              <p>
                These terms are governed by the laws of the State of Nevada. Any disputes shall be resolved in Clark County, Nevada.
              </p>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-bold text-cream">Contact</h2>
              <p>
                Questions about these terms? Email{' '}
                <a href="mailto:jaysal2789@gmail.com" className="text-gold hover:text-gold-light transition-colors duration-200">
                  jaysal2789@gmail.com
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
