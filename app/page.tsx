import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
// import ZeroToAgents from '@/components/ZeroToAgents'
import Pricing from '@/components/Pricing'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-background text-cream overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      {/* <ZeroToAgents /> */}
      <Pricing />
      <Contact />
      <Footer />
    </main>
  )
}
