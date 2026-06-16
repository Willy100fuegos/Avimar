import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { openWhatsApp } from '@/utils/whatsapp';

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav_home'), sectionId: 'inicio' },
    { label: t('nav_services'), sectionId: 'servicios' },
    { label: t('nav_map'), sectionId: 'mapa' },
    { label: t('nav_catalog'), sectionId: 'suministros' },
    { label: t('nav_testimonials'), sectionId: 'testimonios' },
    { label: t('nav_contact'), sectionId: 'contacto' },
  ];

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection(sectionId);
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1A2B4A] border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-accent-500 rounded-md">
              <i className="ri-anchor-line text-white text-base md:text-lg" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm md:text-base font-heading font-bold tracking-tight text-white transition-colors duration-300">
                AVIMAR
              </span>
              <span className="text-[10px] md:text-xs font-medium tracking-wider text-white/60 transition-colors duration-300">
                SHIP CHANDLERS
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => handleNavClick(link.sectionId)}
                className="px-3 lg:px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openWhatsApp('Hola, me interesa solicitar una cotización para aprovisionamiento naval.')}
              className="px-5 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-md bg-accent-500 text-white hover:bg-accent-600 shadow-accent-500/25 cursor-pointer"
            >
              {t('nav_quote')}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-md text-white transition-colors cursor-pointer"
            aria-label={t('nav_menu')}
          >
            <i className={`ri-${mobileOpen ? 'close-line' : 'menu-line'} text-2xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1A2B4A]/98 backdrop-blur-lg border-b border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => handleNavClick(link.sectionId)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                openWhatsApp('Hola, me interesa solicitar una cotización para aprovisionamiento naval.');
              }}
              className="block w-full text-center px-4 py-3 mt-2 text-sm font-semibold bg-accent-500 text-white rounded-md cursor-pointer"
            >
              {t('nav_quote')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}