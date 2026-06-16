import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function StrategySection() {
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

  const strategies = [
    {
      id: 'logistica',
      icon: 'ri-ship-2-line',
      title: t('strategy_logistica_title'),
      desc: t('strategy_logistica_desc'),
      stat: '13',
      statLabel: t('strategy_logistica_stat'),
    },
    {
      id: 'suministros',
      icon: 'ri-truck-line',
      title: t('strategy_suministros_title'),
      desc: t('strategy_suministros_desc'),
      stat: '6',
      statLabel: t('strategy_suministros_stat'),
    },
    {
      id: 'reparaciones',
      icon: 'ri-tools-line',
      title: t('strategy_reparaciones_title'),
      desc: t('strategy_reparaciones_desc'),
      stat: '24h',
      statLabel: t('strategy_reparaciones_stat'),
    },
    {
      id: 'residuos',
      icon: 'ri-recycle-line',
      title: t('strategy_residuos_title'),
      desc: t('strategy_residuos_desc'),
      stat: '100%',
      statLabel: t('strategy_residuos_stat'),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background-100 py-24 md:py-32 lg:py-40"
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-14 md:mb-20">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary-300/60 text-xs md:text-sm font-semibold tracking-wider text-secondary-700 uppercase mb-4 md:mb-6">
              {t('strategy_tag')}
            </div>
            <h2 className="reveal text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground-950 leading-tight mb-4 md:mb-5">
              {t('strategy_headline')}
            </h2>
            <p className="reveal text-sm md:text-base text-foreground-600 max-w-3xl leading-relaxed">
              {t('strategy_subheadline')}
            </p>
          </div>

          {/* Grid 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {strategies.map((item, index) => (
              <div
                key={item.id}
                className="reveal group relative p-6 md:p-8 lg:p-10 rounded-lg bg-background-50 border border-white/10 hover:border-accent-500/30 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Glassmorphism subtle */}
                <div className="absolute inset-0 rounded-lg bg-white/5 backdrop-blur-sm pointer-events-none" />
                
                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between mb-5 md:mb-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-primary-500/10 border border-primary-500/20">
                      <i className={`${item.icon} text-xl md:text-2xl text-primary-500`} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-heading font-bold text-accent-500">
                        {item.stat}
                      </div>
                      <div className="text-[10px] md:text-xs font-semibold text-foreground-500 uppercase tracking-wider">
                        {item.statLabel}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg font-heading font-bold text-foreground-950 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed flex-grow">
                    {item.desc}
                  </p>

                  <div className="mt-5 pt-5 border-t border-background-200/60">
                    <div className="flex items-center gap-2 text-xs font-semibold text-accent-500">
                      <i className="ri-check-double-line" />
                      <span>{t(`strategy_${item.id}_highlight`)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}