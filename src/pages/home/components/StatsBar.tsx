import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { heroContent } from '@/mocks/hero';

export default function StatsBar() {
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

  const stats = [
    {
      value: heroContent.trustPillars[0].value,
      label: t('hero_stat_years_label'),
      icon: 'ri-calendar-check-line',
    },
    {
      value: heroContent.trustPillars[1].value,
      label: t('hero_stat_ports_label'),
      icon: 'ri-map-pin-2-line',
    },
    {
      value: heroContent.trustPillars[2].value,
      label: t('hero_stat_247_label'),
      icon: 'ri-time-line',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-primary-950 py-14 md:py-16 lg:py-20 border-y border-white/5"
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="reveal flex items-center gap-4 md:gap-5 md:justify-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 shrink-0">
                  <i className={`${stat.icon} text-xl md:text-2xl text-accent-500`} />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-none">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base font-semibold text-white/60 mt-1">
                    {stat.label}
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