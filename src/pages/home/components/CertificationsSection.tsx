import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function CertificationsSection() {
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

  const certifications = [
    {
      id: '247',
      icon: 'ri-time-line',
      title: t('cert_247_title'),
      desc: t('cert_247_desc'),
    },
    {
      id: 'iso',
      icon: 'ri-shield-check-line',
      title: t('cert_iso_title'),
      desc: t('cert_iso_desc'),
    },
    {
      id: 'safety',
      icon: 'ri-shield-user-line',
      title: t('cert_safety_title'),
      desc: t('cert_safety_desc'),
    },
    {
      id: 'response',
      icon: 'ri-flashlight-line',
      title: t('cert_response_title'),
      desc: t('cert_response_desc'),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-primary-950 py-16 md:py-20 lg:py-24"
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="reveal flex flex-col items-center text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 mb-4 md:mb-5">
                  <i className={`${cert.icon} text-xl md:text-2xl text-accent-500`} />
                </div>
                <h3 className="text-sm md:text-base font-heading font-bold text-white mb-2">
                  {cert.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed max-w-[200px]">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}