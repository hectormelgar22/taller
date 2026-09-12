import BookingModal from './components/BookingModal'
import CTASection from './components/CTASection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import GarageSection from './components/GarageSection'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import Navbar from './components/Navbar'
import ProcessSection from './components/ProcessSection'
import ReviewsSection from './components/ReviewsSection'
import ServicesSection from './components/ServicesSection'
import TrustSection from './components/TrustSection'
import WhatsAppFab from './components/WhatsAppFab'
import WorkshopShowcase from './components/WorkshopShowcase'
import { CitaProvider } from './lib/cita'

export default function App() {
  return (
    <CitaProvider>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-[0.6875rem] focus:font-semibold focus:uppercase focus:tracking-[0.18em] focus:text-ink-900"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main id="contenido" className="relative overflow-x-clip">
        <HeroSection />
        <MarqueeSection />
        <TrustSection />
        <ServicesSection />
        <GarageSection />
        <ProcessSection />
        <WorkshopShowcase />
        <ReviewsSection />
        <FaqSection />
        <CTASection />
      </main>

      <Footer />
      <WhatsAppFab />
      <BookingModal />
    </CitaProvider>
  )
}
