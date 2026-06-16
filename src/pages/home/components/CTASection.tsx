import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { openWhatsApp } from '@/utils/whatsapp';

export default function CTASection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0A0F1A] py-24 md:py-32 lg:py-40"
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://readdy.ai/api/search-image?query=Massive%20oil%20tanker%20ship%20approaching%20industrial%20Mexican%20port%20at%20twilight%20with%20dramatic%20dark%20stormy%20sky%20orange%20safety%20lights%20on%20cranes%20and%20terminals%20deep%20blue%20navy%20atmosphere%20industrial%20maritime%20photography%20high%20contrast%20dark%20moody%20cinematic%20editorial%20style)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/80 to-[#0A0F1A]/60" />
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Copy */}
          <div className="text-center">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-accent-500/15 border border-accent-500/25 text-xs font-semibold tracking-wider text-accent-400 uppercase mb-6 md:mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              {t('cta_available_now')}
            </div>

            <h2 className="reveal text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight mb-3 md:mb-4">
              {t('cta_headline')}
            </h2>
            <p className="reveal text-sm md:text-base text-white/60 mb-8 md:mb-10">
              {t('cta_subheadline')}
            </p>
            <div className="reveal">
              <button
                onClick={() => openWhatsApp('Hola, me interesa solicitar una cotización para aprovisionamiento naval.')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-accent-500 text-white font-semibold text-sm md:text-base hover:bg-accent-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-accent-500/25 cursor-pointer"
              >
                {t('cta_button')}
                <i className="ri-arrow-right-line" />
              </button>
            </div>

            {/* Trust bar */}
            <div className="reveal mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs text-white/40">
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-accent-500" />
                <span>{t('cta_trust_247')}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-accent-500" />
                <span>{t('cta_trust_iso')}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-flashlight-line text-accent-500" />
                <span>{t('cta_trust_response')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}