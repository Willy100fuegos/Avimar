import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { servicesContent } from '@/mocks/services';

export default function ServicesSection() {
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

  const getServiceKey = (id: string) => {
    const map: Record<string, string> = {
      avituallamiento: 'service_avituallamiento',
      lanchaje: 'service_lanchaje',
      reparaciones: 'service_reparaciones',
      almacenamiento: 'service_almacenamiento',
      residuos: 'service_residuos',
      agencia: 'service_agencia',
    };
    return map[id] || id;
  };

  const getServiceDescKey = (id: string) => {
    const map: Record<string, string> = {
      avituallamiento: 'service_avituallamiento_desc',
      lanchaje: 'service_lanchaje_desc',
      reparaciones: 'service_reparaciones_desc',
      almacenamiento: 'service_almacenamiento_desc',
      residuos: 'service_residuos_desc',
      agencia: 'service_agencia_desc',
    };
    return map[id] || id;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background-100 py-24 md:py-32 lg:py-40"
    >
      {/* Background image subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=Industrial%20port%20terminal%20aerial%20view%20at%20night%20with%20orange%20safety%20lights%20and%20deep%20blue%20sky%2C%20container%20stacks%20and%20crane%20silhouettes%2C%20dark%20moody%20industrial%20atmosphere%2C%20minimal%20abstract%20background%20with%20steel%20textures%20and%20faint%20grid%20pattern%2C%20low%20opacity%20suitable%20for%20website%20background"
          alt="Industrial port background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      <div className="relative w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 md:mb-20">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary-300/60 text-xs md:text-sm font-semibold tracking-wider text-secondary-700 uppercase mb-4 md:mb-6">
              {t('services_tag')}
            </div>
            <h2 className="reveal text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-foreground-950 leading-tight mb-3 md:mb-4">
              {t('services_headline')}
            </h2>
            <p className="reveal text-sm md:text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed">
              {t('services_subheadline')}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {servicesContent.services.map((service, index) => (
              <div
                key={service.id}
                className="reveal group relative p-6 md:p-7 rounded-lg bg-background-50 border border-white/10 hover:border-accent-500/30 transition-all duration-300 cursor-pointer"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {/* Glassmorphism layer */}
                <div className="absolute inset-0 rounded-lg bg-white/5 backdrop-blur-sm pointer-events-none" />

                <div className="relative">
                  {/* Icon */}
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-secondary-100 border border-secondary-200/60 group-hover:bg-accent-500 group-hover:border-accent-500 transition-all duration-300 mb-4 md:mb-5">
                    <i className={`${service.icon} text-xl md:text-2xl text-secondary-700 group-hover:text-white transition-colors duration-300`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-heading font-bold text-foreground-950 group-hover:text-accent-500 transition-colors duration-300 mb-2 md:mb-3">
                    {t(getServiceKey(service.id))}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-foreground-600 leading-relaxed mb-4 md:mb-5">
                    {t(getServiceDescKey(service.id))}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-4 md:mb-5">
                    {service.highlights.slice(0, 3).map((highlight, hi) => {
                      const highlightKeys: Record<string, string[]> = {
                        avituallamiento: ['services_highlight_delivery', 'services_highlight_cold', 'services_highlight_stock'],
                        lanchaje: ['services_highlight_crew', 'services_highlight_docs', 'services_highlight_weather'],
                        reparaciones: ['services_highlight_maintenance', 'services_highlight_urgent', 'services_highlight_certified'],
                        almacenamiento: ['services_highlight_temp', 'services_highlight_digital', 'services_highlight_security'],
                        residuos: ['services_highlight_marpol', 'services_highlight_docs_port', 'services_highlight_scheduled'],
                        agencia: ['services_highlight_clearance', 'services_highlight_dispatch', 'services_highlight_permits'],
                      };
                      const key = highlightKeys[service.id]?.[hi] || '';
                      return (
                        <li key={hi} className="flex items-center gap-2 text-xs text-foreground-500">
                          <i className="ri-check-line text-accent-500" />
                          {key ? t(key) : highlight}
                        </li>
                      );
                    })}
                  </ul>

                  {/* Link */}
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-accent-500 transition-colors duration-300"
                  >
                    {t('services_cta')}
                    <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}