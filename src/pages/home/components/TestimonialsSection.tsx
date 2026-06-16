import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { testimonialsContent } from '@/mocks/testimonials';

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / testimonialsContent.testimonials.length;
    const scrollAmount = cardWidth * index;
    scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const scrollNext = useCallback(() => {
    const maxIndex = testimonialsContent.testimonials.length - 1;
    const nextIndex = activeIndex >= maxIndex ? 0 : activeIndex + 1;
    scrollTo(nextIndex);
  }, [activeIndex, scrollTo]);

  const scrollPrev = useCallback(() => {
    const prevIndex = activeIndex <= 0 ? testimonialsContent.testimonials.length - 1 : activeIndex - 1;
    scrollTo(prevIndex);
  }, [activeIndex, scrollTo]);

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      scrollNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [scrollNext]);

  // Track scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / testimonialsContent.testimonials.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, testimonialsContent.testimonials.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background-50 py-24 md:py-32 lg:py-40"
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
            <div className="text-center md:text-left">
              <div className="reveal flex items-center justify-center md:justify-start gap-2 mb-4 md:mb-6">
                <span className="w-2 h-2 rounded-full bg-accent-500" />
                <span className="text-xs md:text-sm font-semibold tracking-wider text-accent-500 uppercase">
                  {t('testimonials_tag')}
                </span>
              </div>
              <h2 className="reveal text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-foreground-950 leading-tight mb-3 md:mb-4">
                {t('testimonials_headline')}
              </h2>
              <p className="reveal text-sm md:text-base text-foreground-600 max-w-2xl leading-relaxed">
                {t('testimonials_subheadline')}
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="reveal flex items-center justify-center md:justify-end gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-background-100 border border-background-200/70 text-foreground-600 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 cursor-pointer"
                aria-label="Anterior"
              >
                <i className="ri-arrow-left-line text-lg" />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-background-100 border border-background-200/70 text-foreground-600 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 cursor-pointer"
                aria-label="Siguiente"
              >
                <i className="ri-arrow-right-line text-lg" />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="reveal flex overflow-x-auto snap-x snap-mandatory gap-5 md:gap-6 pb-4 scrollbar-hide"
          >
            {testimonialsContent.testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`flex-shrink-0 snap-start ${
                  isMobile ? 'w-[85vw]' : 'w-[calc(33.333%-1rem)]'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex flex-col h-full p-5 md:p-6 rounded-lg bg-background-100 border border-white/10 hover:border-background-300/60 transition-all duration-300">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-3 md:mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i
                        key={i}
                        className={i < testimonial.rating ? 'ri-star-fill text-accent-500 text-sm' : 'ri-star-line text-accent-500 text-sm'}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-foreground-700 leading-relaxed mb-4 md:mb-5 flex-grow">
                    &ldquo;{t(`testimonials_quote_${testimonial.id}`)}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-background-200/60">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary-100 flex items-center justify-center shrink-0 border border-primary-200/50">
                      <span className="text-sm font-bold text-primary-600">
                        {t(`testimonials_author_${testimonial.id}`).split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground-800">
                        {t(`testimonials_author_${testimonial.id}`)}
                      </p>
                      <p className="text-xs text-foreground-500">
                        {t(`testimonials_role_${testimonial.id}`)} &middot; {t(`testimonials_company_${testimonial.id}`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="reveal flex items-center justify-center gap-2 mt-6 md:mt-8">
            {testimonialsContent.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`carousel-dot ${activeIndex === index ? 'active' : ''}`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}