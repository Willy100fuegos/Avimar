import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { aboutContent } from '@/mocks/about';

export default function AboutSection() {
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
          <div className="flex flex-col lg:flex-row items-stretch gap-8 md:gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="reveal">
                <span className="inline-block text-xs md:text-sm font-semibold tracking-wider text-accent-500 uppercase mb-4 md:mb-6">
                  {t('about_tag')}
                </span>
              </div>

              <h2 className="reveal text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-foreground-950 leading-tight mb-4 md:mb-6">
                {t('about_headline')}
              </h2>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <p className="reveal text-sm md:text-base text-foreground-700 leading-relaxed">
                  {t('about_body_1')}
                </p>
                <p className="reveal text-sm md:text-base text-foreground-700 leading-relaxed">
                  {t('about_body_2')}
                </p>
                <p className="reveal text-sm md:text-base text-foreground-700 leading-relaxed">
                  {t('about_body_3')}
                </p>
              </div>

              <div className="reveal">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-secondary-100 text-secondary-900 font-semibold text-sm hover:bg-secondary-200 transition-all duration-300 shadow-sm"
                >
                  {t('about_cta')}
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>

              {/* Stats */}
              <div className="reveal grid grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-14 pt-8 md:pt-10 border-t border-background-200/70">
                {aboutContent.stats.map((stat, index) => (
                  <div key={index} className="text-center md:text-left">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-foreground-950">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm font-semibold text-foreground-800 mt-1">
                      {t(
                        index === 0
                          ? 'about_stat_years'
                          : index === 1
                          ? 'about_stat_ports'
                          : 'about_stat_247'
                      )}
                    </div>
                    <div className="text-[10px] md:text-xs text-foreground-500 mt-0.5">
                      {t(
                        index === 0
                          ? 'about_stat_years_desc'
                          : index === 1
                          ? 'about_stat_ports_desc'
                          : 'about_stat_247_desc'
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <div className="reveal relative h-[400px] md:h-[500px] lg:h-full rounded-lg overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Industrial%20port%20warehouse%20interior%20with%20refrigerated%20trucks%20loading%20ship%20supplies%2C%20organized%20steel%20shelves%20with%20maritime%20provisions%2C%20workers%20in%20high%20visibility%20safety%20vests%20operating%20forklifts%2C%20cold%20chain%20logistics%20facility%2C%20stainless%20steel%20and%20concrete%20industrial%20architecture%2C%20dramatic%20overhead%20lighting%20with%20deep%20shadows%2C%20professional%20cinematic%20photography%20dark%20moody%20industrial%20atmosphere"
                  alt="Avimar port logistics warehouse with refrigerated operations"
                  className="w-full h-full object-cover object-center"
                />
                {/* Location Tag */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/90 backdrop-blur-sm border border-white/20 text-xs font-semibold text-foreground-800">
                    <i className="ri-map-pin-line text-accent-500" />
                    {t('about_hq_location')}
                  </div>
                </div>
                {/* Bottom Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0A0F1A]/80 to-transparent">
                  <p className="text-xs md:text-sm font-semibold text-white">
                    {t('about_hq_label')}
                  </p>
                  <p className="text-[10px] md:text-xs text-white/70">
                    {t('about_hq_caption')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}