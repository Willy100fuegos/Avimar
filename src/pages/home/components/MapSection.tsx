import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import { portsContent } from '@/mocks/ports';

function parseCoordinates(coordStr: string): [number, number] | null {
  const parts = coordStr.split(',');
  if (parts.length !== 2) return null;

  const latMatch = parts[0].trim().match(/([\d.]+)°\s*([NS])/);
  const lngMatch = parts[1].trim().match(/([\d.]+)°\s*([EW])/);

  if (!latMatch || !lngMatch) return null;

  let lat = parseFloat(latMatch[1]);
  let lng = parseFloat(lngMatch[1]);

  if (latMatch[2] === 'S') lat = -lat;
  if (lngMatch[2] === 'W') lng = -lng;

  return [lat, lng];
}

const allPorts = [...portsContent.pacific, ...portsContent.gulf];

export default function MapSection() {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePort, setActivePort] = useState<string | null>(null);

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

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div class="marker-pin"></div>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    const bounds: [number, number][] = [];

    allPorts.forEach((port) => {
      const coords = parseCoordinates(port.coordinates);
      if (coords) {
        bounds.push(coords);
        const marker = L.marker(coords, { icon: customIcon }).addTo(map);
        marker.bindPopup(
          `<div class="text-center">
            <h3 class="text-sm font-bold mb-1">${port.name}</h3>
            <span class="avimar-hub-tag">${t('map_popup_hub')}</span>
          </div>`,
          { closeButton: false, offset: [0, -10] }
        );
        marker.on('click', () => {
          setActivePort(port.key);
        });
        marker.on('popupclose', () => {
          setActivePort(null);
        });
      }
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 6 });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [t]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background-50 py-24 md:py-32 lg:py-40"
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 md:mb-20">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary-300/60 text-xs md:text-sm font-semibold tracking-wider text-secondary-700 uppercase mb-4 md:mb-6">
              {t('map_tag')}
            </div>
            <h2 className="reveal text-2xl md:text-3xl lg:text-4xl font-heading font-extrabold text-foreground-950 leading-tight mb-3 md:mb-4">
              {t('map_headline')}
            </h2>
            <p className="reveal text-sm md:text-base text-foreground-600 max-w-3xl mx-auto leading-relaxed">
              {t('map_subheadline')}
            </p>
          </div>

          {/* Map Container */}
          <div className="reveal relative rounded-lg overflow-hidden border border-white/10 bg-background-100">
            <div ref={mapRef} className="w-full h-[450px] md:h-[550px] lg:h-[600px]" />

            {/* Active Port Info Overlay */}
            {activePort && (
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-[500]">
                <div className="px-4 py-3 rounded-lg bg-background-50/95 backdrop-blur-md border border-white/10 shadow-lg">
                  <div className="flex items-center gap-2">
                    <i className="ri-map-pin-fill text-accent-500 text-sm" />
                    <span className="text-sm font-semibold text-foreground-800">
                      {allPorts.find((p) => p.key === activePort)?.name}
                    </span>
                    <span className="text-xs font-semibold text-accent-500 bg-accent-500/10 px-2 py-0.5 rounded">
                      {t('map_popup_hub')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Port Legend */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-[500]">
              <div className="px-3 py-2 rounded-lg bg-background-50/95 backdrop-blur-md border border-white/10 shadow-lg">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-3 h-3 rounded-full bg-accent-500 border border-white shadow-sm" />
                  <span className="text-xs font-medium text-foreground-700">{t('map_popup_hub')}</span>
                </div>
                <p className="text-[10px] text-foreground-500">
                  {allPorts.length} {t('hero_stat_ports_label').toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}