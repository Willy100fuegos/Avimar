import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { openWhatsApp } from '@/utils/whatsapp';
import { heroContent } from '@/mocks/hero';

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

const HERO_IMAGE_URL = 'https://readdy.ai/api/search-image?query=Aerial%20photography%20of%20massive%20container%20cargo%20ship%20docked%20at%20industrial%20Mexican%20port%20with%20towering%20gantry%20cranes%20loading%20containers%2C%20dramatic%20stormy%20sky%20with%20deep%20navy%20blue%20and%20orange%20safety%20lighting%20accents%2C%20industrial%20maritime%20atmosphere%2C%20steel%20structures%20and%20wet%20concrete%2C%20professional%20cinematic%20editorial%20photography%20with%20high%20contrast%20dark%20moody%20atmosphere%20and%20film%20grain%20texture&width=1600&height=900&seq=hero-avimar-2026&orientation=landscape';

export default function HeroSection() {
  const { t } = useTranslation();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[720px] lg:min-h-[800px] overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0"
          style={{ willChange: 'transform' }}
        >
          <img
            src={HERO_IMAGE_URL}
            alt="Buque carguero en puerto industrial mexicano con grúas pórtico"
            className="w-full h-[120%] object-cover object-center"
            loading="eager"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            style={{
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.8s ease-out',
            }}
          />
        </div>
        {/* Overlays - Azul Marino a Negro Industrial */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2B4A]/70 via-[#1A2B4A]/50 to-[#0A0F1A]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1A]/40 via-transparent to-[#0A0F1A]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-accent-500/15 border border-accent-500/25 mb-6 md:mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-accent-400 tracking-wide">
              {t('hero_coverage_title')} · {heroContent.trustPillars[1].value} {t('hero_stat_ports_label')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight tracking-tight mb-4 md:mb-6">
            {t('hero_headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8 md:mb-10">
            {t('hero_subheadline')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <button
              onClick={() => openWhatsApp('Hola, me interesa solicitar una cotización para aprovisionamiento naval.')}
              className="px-8 py-3.5 rounded-md bg-accent-500 text-white font-semibold text-sm md:text-base hover:bg-accent-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-accent-500/25 whitespace-nowrap cursor-pointer"
            >
              {t('hero_cta_primary')}
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="px-8 py-3.5 rounded-md bg-white/8 text-white font-semibold text-sm md:text-base border border-white/15 hover:bg-white/12 transition-all duration-300 shadow-lg shadow-black/20 whitespace-nowrap cursor-pointer"
            >
              {t('hero_cta_secondary')}
            </button>
          </div>
        </div>

        {/* Trust Pillars */}
        <div className="mt-12 md:mt-16 lg:mt-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {heroContent.trustPillars.map((pillar, index) => (
              <div
                key={index}
                className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md bg-accent-500/15 border border-accent-500/20 shrink-0">
                  <span className="text-accent-400 font-heading font-bold text-lg md:text-xl">
                    {pillar.value}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-xs md:text-sm font-semibold text-white">
                    {t(`hero_stat_${index === 0 ? 'years' : index === 1 ? 'ports' : '247'}_label`)}
                  </p>
                  <p className="text-[10px] md:text-xs text-white/55 leading-tight">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="mt-10 md:mt-14 text-center">
          <p className="text-xs text-white/35 tracking-wider mb-2">{t('hero_scroll')}</p>
          <div className="w-5 h-8 rounded-full border border-white/25 mx-auto flex justify-center pt-1">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}