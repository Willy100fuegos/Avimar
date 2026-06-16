import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { portsContent } from '@/mocks/ports';

export default function PortsSection() {
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
      className="relative w-full bg-background-50 py-24 md:py-32 lg:py-40"
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-14 md:mb-20">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary-300/60 text-xs md:text-sm font-semibold tracking-wider text-secondary-700 uppercase mb-4 md:mb-6">
              {t('ports_tag')}
            </div>
            <h2 className="reveal text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight mb-4 md:mb-5">
              {t('ports_headline')}
            </h2>
            <p className="reveal text-sm md:text-base text-foreground-600 max-w-3xl leading-relaxed">
              {t('ports_subheadline')}
            </p>
          </div>

          {/* Pacific Ocean */}
          <div className="reveal mb-10 md:mb-12">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary-500/10">
                <i className="ri-map-pin-line text-primary-500" />
              </div>
              <h3 className="text-sm md:text-base font-heading font-bold text-foreground-800 tracking-wide uppercase">
                {t('ports_pacific_title')}
              </h3>
              <div className="flex-grow h-px bg-background-200/70" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {portsContent.pacific.map((port, index) => (
                <div
                  key={port.key}
                  className="group flex items-center gap-4 p-4 md:p-5 rounded-lg bg-background-100 border border-white/10 hover:border-primary-300/40 transition-all duration-300"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md bg-primary-500/10 shrink-0">
                    <i className="ri-anchor-line text-primary-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm md:text-base font-heading font-bold text-foreground-800">
                        {port.name}
                      </h4>
                      <span className="text-[10px] font-semibold text-foreground-400 bg-background-200/60 px-2 py-0.5 rounded">
                        {port.state}
                      </span>
                    </div>
                    <p className="text-[10px] md:text-xs text-foreground-500 mt-0.5 font-mono">
                      {port.coordinates}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <i className="ri-arrow-right-line text-foreground-400 group-hover:text-primary-500 transition-colors duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gulf of Mexico */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-accent-500/10">
                <i className="ri-map-pin-line text-accent-500" />
              </div>
              <h3 className="text-sm md:text-base font-heading font-bold text-foreground-800 tracking-wide uppercase">
                {t('ports_gulf_title')}
              </h3>
              <div className="flex-grow h-px bg-background-200/70" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {portsContent.gulf.map((port, index) => (
                <div
                  key={port.key}
                  className="group flex items-center gap-4 p-4 md:p-5 rounded-lg bg-background-100 border border-white/10 hover:border-accent-300/40 transition-all duration-300"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md bg-accent-500/10 shrink-0">
                    <i className="ri-anchor-line text-accent-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm md:text-base font-heading font-bold text-foreground-800">
                        {port.name}
                      </h4>
                      <span className="text-[10px] font-semibold text-foreground-400 bg-background-200/60 px-2 py-0.5 rounded">
                        {port.state}
                      </span>
                      {port.isHeadquarter && (
                        <span className="text-[10px] font-semibold text-accent-500 bg-accent-500/10 px-2 py-0.5 rounded">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] md:text-xs text-foreground-500 mt-0.5 font-mono">
                      {port.coordinates}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <i className="ri-arrow-right-line text-foreground-400 group-hover:text-accent-500 transition-colors duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}