# Avimar Ship Chandlers - Rediseño Web Portal Corporativo B2B

## 1. Project Description
**Producto:** Portal informativo corporativo profesional para Avimar Ship Chandlers, empresa de ship chandling con más de 50 años de experiencia en México.
**Target Users:** Capitanes de navío, gerentes de compras navieros internacionales, operadores portuarios, agencias consignatarias.
**Core Value:** Transmitir confianza absoluta, cobertura portuaria nacional, disponibilidad 24/7 y soluciones multimodales integrales. El sitio debe ser una herramienta de decisión rápida para profesionales del sector marítimo.

## 2. Page Structure
- `/` - Home (Hero principal, servicios, catálogo, testimonios, CTA cotización)
- `/about` - Quiénes Somos (Historia, legado, infraestructura, puertos de cobertura)
- `/services` - Servicios Multimodales (Detalle de avituallamiento, lanchaje, almacenamiento, agencia consignataria)
- `/supplies` - Catálogo de Suministros Técnico (6 categorías principales de productos)
- `/contact` - Contacto y Cotización 24/7 (Formulario, mapa, información directa)

## 3. Core Features
- [ ] Home page con hero cinematico, cobertura portuaria visual, servicios grid, catálogo preview, testimonios de navieras, CTA de cotización
- [ ] Página "Quiénes Somos" con timeline de historia, estadísticas clave, mapa de puertos de cobertura, infraestructura
- [ ] Página "Servicios" con cards detalladas por servicio (avituallamiento, lanchaje, almacenamiento, recolección, agencia)
- [ ] Página "Catálogo de Suministros" con navegación por 6 categorías y grid de productos
- [ ] Página "Contacto" con formulario de cotización 24/7, mapa de ubicación, datos de contacto directo
- [ ] Navegación fija responsive con scroll effects
- [ ] Footer corporativo con suscripción newsletter y links organizados
- [ ] Animaciones scroll-driven (Reveal, hover effects, transiciones fluidas)

## 4. Data Model Design
No se requiere base de datos para la fase inicial. El portal es puramente informativo y corporativo. Los datos se manejarán mediante archivos de mock data estructurados para mantenibilidad.

## 5. Backend / Third-party Integration Plan
- **Supabase:** No requerido para fase inicial. El portal es informativo sin sistema de usuarios.
- **Shopify:** No requerido. No es e-commerce, es un catálogo informativo B2B.
- **Stripe:** No requerido. No hay pagos en línea.
- **Integraciones futuras potenciales:** Mapa de Google Maps para ubicación en contacto, formulario de cotización.

## 6. Development Phase Plan

### Phase 1: Home Page Completa (Portal Informativo Principal)
- **Goal:** Construir la página de inicio como el núcleo del portal, con todas las secciones corporativas esenciales que comunican confianza y alcance.
- **Deliverable:** Home page con Hero principal, sección "Quiénes Somos" (preview), grid de Servicios, preview de Catálogo de Suministros, Testimonios de clientes, CTA de Cotización 24/7, y Footer corporativo completo. Navegación fija y scroll animations.

### Phase 2: Páginas Internas (About, Services, Supplies, Contact)
- **Goal:** Construir las páginas internas que completan el portal informativo.
- **Deliverable:** Página About completa, Página Services con detalles, Página Supplies con categorías, Página Contact con formulario funcional.

### Phase 3: SEO, Polishing y Animaciones Avanzadas
- **Goal:** Optimizar el sitio para SEO local, mejorar metadatos, añadir animaciones avanzadas, testing responsive y accesibilidad.
- **Deliverable:** SEO completo, animaciones scroll-driven, responsive perfecto, performance optimization.