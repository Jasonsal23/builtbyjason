import SectionHeading from './ui/SectionHeading'
import ServiceCard from './ui/ServiceCard'
import { services } from '@/lib/services'

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-10 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <SectionHeading
            label="Services"
            title="What I Build"
            subtitle="Everything your business needs to look sharp and run smarter online."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
