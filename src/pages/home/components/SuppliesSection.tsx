import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { suppliesContent } from '@/mocks/supplies';

export default function SuppliesSection() {
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

  const getCategoryKey = (id: string) => {
    const map: Record<string, string> = {
      provisiones: 'supplies_category_provisiones',
      'consumibles-cabina': 'supplies_category_consumibles',
      'cubierta-maquinas': 'supplies_category_cubierta',
      'cartas-publicaciones': 'supplies_category_cartas',
      salvamento: 'supplies_category_salvamento',
      pirotecnia: 'supplies_category_pirotecnia',
    };
    return map[id] || id;
  };

  const getCategoryDescKey = (id: string) => {
    const map: Record<string, string> = {
      provisiones: 'supplies_category_provisiones_desc',
      'consumibles-cabina': 'supplies_category_consumibles_desc',
      'cubierta-maquinas': 'supplies_category_cubierta_desc',
      'cartas-publicaciones': 'supplies_category_cartas_desc',
      salvamento: 'supplies_category_salvamento_desc',
      pirotecnia: 'supplies_category_pirotecnia_desc',
    };
    return map[id] || id;
  };

  const getTagKey = (tag: string) => {
    const map: Record<string, string> = {
      Fresh: 'supplies_tag_fresh',
      Cabin: 'supplies_tag_cabin',
      Deck: 'supplies_tag_deck',
      Navigational: 'supplies_tag_navigational',
      Safety: 'supplies_tag_safety',
      Emergency: 'supplies_tag_emergency',
    };
    return map[tag] || tag;
  };

  const imageMap: Record<string, string> = {
    provisiones: 'https://readdy.ai/api/search-image?query=Professional%20food%20supply%20photography%20for%20maritime%20industry%20fresh%20meat%20fruits%20vegetables%20and%20beverages%20arranged%20on%20stainless%20steel%20surface%20in%20ship%20galley%20kitchen%20bright%20clean%20minimal%20background%20high%20quality%20commercial%20product%20photography%20with%20soft%20shadows&width=600&height=400&seq=supplies-provisiones&orientation=landscape',
    consumibles: 'https://readdy.ai/api/search-image?query=Ship%20cabin%20consumables%20collection%20linen%20towels%20cleaning%20supplies%20medical%20kits%20office%20stationery%20arranged%20neatly%20on%20white%20shelf%20professional%20product%20photography%20minimal%20clean%20background%20bright%20aesthetic%20commercial%20quality&width=600&height=400&seq=supplies-consumibles&orientation=landscape',
    cubierta: 'https://readdy.ai/api/search-image?query=Marine%20deck%20machinery%20equipment%20collection%20steel%20ropes%20marine%20hoses%20industrial%20valves%20hand%20tools%20lubricant%20containers%20arranged%20on%20dark%20metal%20workbench%20professional%20product%20photography%20moody%20industrial%20lighting%20commercial%20quality&width=600&height=400&seq=supplies-cubierta&orientation=landscape',
    cartas: 'https://readdy.ai/api/search-image?query=Nautical%20navigation%20charts%20and%20maritime%20publications%20spread%20on%20wooden%20captain%20table%20with%20brass%20compass%20dividers%20and%20sextant%20warm%20ambient%20lighting%20professional%20editorial%20photography%20nautical%20atmosphere%20high%20detail%20vintage%20navigation%20instruments&width=600&height=400&seq=supplies-cartas&orientation=landscape',
    salvamento: 'https://readdy.ai/api/search-image?query=Maritime%20life%20saving%20equipment%20collection%20orange%20life%20jackets%20life%20rings%20emergency%20rations%20first%20aid%20kits%20fire%20extinguishers%20arranged%20professionally%20on%20white%20surface%20professional%20product%20photography%20bright%20clean%20background%20commercial%20quality%20safety%20equipment&width=600&height=400&seq=supplies-salvamento&orientation=landscape',
    pirotecnia: 'https://readdy.ai/api/search-image?query=Maritime%20pyrotechnic%20emergency%20signals%20flares%20smoke%20signals%20line%20throwers%20and%20distress%20rockets%20arranged%20on%20dark%20surface%20professional%20product%20photography%20dramatic%20lighting%20safety%20equipment%20commercial%20quality%20industrial%20moody%20atmosphere&width=600&height=400&seq=supplies-pirotecnia&orientation=landscape',
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background-50 py-24 md:py-32 lg:py-40"
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-6 mb-14 md:mb-20">
            <div className="lg:max-w-2xl">
              <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary-300/60 text-xs md:text-sm font-semibold tracking-wider text-secondary-700 uppercase mb-4 md:mb-6">
                {t('supplies_tag')}
              </div>
              <h2 className="reveal text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-foreground-950 leading-tight mb-3 md:mb-4">
                {t('supplies_headline')}
              </h2>
              <p className="reveal text-sm md:text-base text-foreground-600 leading-relaxed">
                {t('supplies_intro')}
              </p>
            </div>
            <div className="reveal shrink-0">
              <Link
                to="/supplies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 shadow-md shadow-primary-500/20"
              >
                {t('supplies_cta')}
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {suppliesContent.categories.map((category, index) => (
              <div
                key={category.id}
                className="reveal group relative rounded-lg bg-background-100 border border-white/10 hover:border-primary-300/40 transition-all duration-300 overflow-hidden"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Glassmorphism */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none" />

                {/* Tag */}
                <div className="relative z-10 absolute top-4 left-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-background-50/80 backdrop-blur-sm border border-white/10 text-xs font-semibold text-foreground-700">
                    <i className={`${category.icon} text-primary-500`} />
                    {t(getTagKey(category.tag))}
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-44 md:h-52 overflow-hidden">
                  <img
                    src={imageMap[category.image]}
                    alt={category.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-5 md:p-6">
                  <h3 className="text-base md:text-lg font-heading font-bold text-foreground-950 mb-2">
                    {t(getCategoryKey(category.id))}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-3">
                    {t(getCategoryDescKey(category.id))}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary-500">
                    <span>{category.items.length}</span>
                    <span>productos</span>
                    <i className="ri-arrow-right-line ml-1 group-hover:translate-x-1 transition-transform duration-300" />
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