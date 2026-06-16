import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { footerContent } from '@/mocks/footer';
import { portsContent } from '@/mocks/ports';
import { openWhatsApp } from '@/utils/whatsapp';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative w-full bg-[#0A0F1A]">
      {/* Top Section */}
      <div className="w-full px-4 md:px-8 lg:px-12 pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-accent-500 rounded-md">
                  <i className="ri-anchor-line text-white text-base" />
                </div>
                <span className="text-sm font-heading font-bold text-white tracking-tight">
                  AVIMAR
                </span>
              </div>
              <p className="text-sm text-white/55 leading-relaxed mb-4">
                {t('footer_description')}
              </p>
              <div className="space-y-1.5 text-xs text-white/40">
                <p>{t('footer_address')}</p>
                <button
                  onClick={() => openWhatsApp('Hola, me gustaría comunicarme con Avimar Ship Chandlers.')}
                  className="block text-left text-white/40 hover:text-accent-400 transition-colors cursor-pointer"
                >
                  {t('footer_phone')}
                </button>
                <p>{t('footer_email')}</p>
                <p>{t('footer_hours')}</p>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-semibold tracking-wider text-white/30 uppercase mb-4">
                {t('footer_nav_title')}
              </h4>
              <ul className="space-y-2.5">
                {footerContent.navigation.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold tracking-wider text-white/30 uppercase mb-4">
                {t('footer_services_title')}
              </h4>
              <ul className="space-y-2.5">
                {footerContent.services.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ports */}
            <div>
              <h4 className="text-xs font-semibold tracking-wider text-white/30 uppercase mb-4">
                {t('footer_ports_title')}
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-white/40 mb-1.5">{t('footer_ports_pacific')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {portsContent.pacific.map((port) => (
                      <span
                        key={port.key}
                        className="text-xs text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"
                      >
                        {port.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/40 mb-1.5">{t('footer_ports_gulf')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {portsContent.gulf.map((port) => (
                      <span
                        key={port.key}
                        className={`text-xs px-2 py-0.5 rounded-md border ${
                          port.isHeadquarter
                            ? 'bg-accent-500/15 text-accent-400 border-accent-500/20'
                            : 'text-white/50 bg-white/5 border-white/10'
                        }`}
                      >
                        {port.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="w-full px-4 md:px-8 lg:px-12 py-4 md:py-6 border-t border-white/8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30 text-center sm:text-left">
            {t('footer_copyright')}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              {t('footer_privacy')}
            </Link>
            <Link to="/terms" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              {t('footer_terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}