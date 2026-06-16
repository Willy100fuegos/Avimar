import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const galleryData = {
  storage: {
    id: 'storage',
    icon: 'ri-building-2-line',
    images: [
      'https://avimarshipchandlers.com/images/SERVICES/ALMACENAMIENTO/gallery1.jpg',
      'https://avimarshipchandlers.com/images/SERVICES/ALMACENAMIENTO/gallery2.jpg',
      'https://avimarshipchandlers.com/images/SERVICES/ALMACENAMIENTO/gallery3.jpg',
      'https://avimarshipchandlers.com/images/SERVICES/ALMACENAMIENTO/gallery4.jpg',
      'https://avimarshipchandlers.com/images/SERVICES/ALMACENAMIENTO/gallery5.jpg',
      'https://avimarshipchandlers.com/images/SERVICES/ALMACENAMIENTO/gallery6.jpg',
    ],
  },
  waste: {
    id: 'waste',
    icon: 'ri-recycle-line',
    images: [
      'https://avimarshipchandlers.com/images/SERVICES/BASURA/gallery1.jpg',
      'https://avimarshipchandlers.com/images/SERVICES/BASURA/gallery2.jpg',
      'https://avimarshipchandlers.com/images/SERVICES/BASURA/gallery3.jpg',
    ],
  },
  repair: {
    id: 'repair',
    icon: 'ri-tools-line',
    images: [
      'https://avimarshipchandlers.com/images/SERVICES/REPARACION%20BARCOS/gallery1.jpg',
      'https://avimarshipchandlers.com/images/SERVICES/REPARACION%20BARCOS/gallery2.jpg',
      'https://avimarshipchandlers.com/images/SERVICES/REPARACION%20BARCOS/gallery3.jpg',
    ],
  },
};

type TabKey = 'storage' | 'waste' | 'repair';

const tabKeys: TabKey[] = ['storage', 'waste', 'repair'];

export default function ServicesGallery() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('storage');
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

  const currentImages = galleryData[activeTab].images;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background-100 py-24 md:py-32 lg:py-40"
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary-300/60 text-xs md:text-sm font-semibold tracking-wider text-secondary-700 uppercase mb-4 md:mb-6">
              {t('gallery_tag')}
            </div>
            <h2 className="reveal text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-foreground-950 leading-tight mb-3 md:mb-4">
              {t('gallery_headline')}
            </h2>
            <p className="reveal text-sm md:text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed">
              {t('gallery_subheadline')}
            </p>
          </div>

          {/* Tabs */}
          <div className="reveal flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
            {tabKeys.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'bg-background-50 text-foreground-600 border border-background-200/70 hover:border-primary-300/40 hover:text-primary-500'
                }`}
              >
                <i className={`${galleryData[tab].icon} text-base`} />
                {t(`gallery_tab_${tab}`)}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab ? 'bg-white/20 text-white' : 'bg-background-200/60 text-foreground-500'
                }`}>
                  {galleryData[tab].images.length}
                </span>
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {currentImages.map((src, index) => (
              <div
                key={`${activeTab}-${index}`}
                className={`group relative overflow-hidden rounded-lg border border-white/10 bg-background-50 ${
                  activeTab === 'storage' && index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Image with hover zoom */}
                <div className={`relative overflow-hidden ${
                  activeTab === 'storage' && index === 0 ? 'h-64 sm:h-80 lg:h-full' : 'h-56 md:h-64'
                }`}>
                  <img
                    src={src}
                    alt={`${t(`gallery_tab_${activeTab}`)} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-md bg-accent-500/90 backdrop-blur-sm">
                        <i className={`${galleryData[activeTab].icon} text-white text-sm`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {t(`gallery_tab_${activeTab}`)}
                        </p>
                        <p className="text-xs text-white/70">
                          Imagen {index + 1} / {currentImages.length}
                        </p>
                      </div>
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