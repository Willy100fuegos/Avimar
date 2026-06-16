import Navbar from '@/components/feature/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import ServicesGallery from './components/ServicesGallery';
import MapSection from './components/MapSection';
import SuppliesSection from './components/SuppliesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from '@/components/feature/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />
      <main>
        <section id="inicio">
          <HeroSection />
        </section>
        <section id="estadisticas">
          <StatsBar />
        </section>
        <section id="servicios">
          <ServicesGallery />
        </section>
        <section id="mapa">
          <MapSection />
        </section>
        <section id="suministros">
          <SuppliesSection />
        </section>
        <section id="testimonios">
          <TestimonialsSection />
        </section>
        <section id="contacto">
          <CTASection />
        </section>
      </main>
      <Footer />
    </div>
  );
}