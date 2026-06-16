# Avimar Ship Chandlers - Rediseño Web Portal Corporativo B2B

Este es el repositorio del rediseño del portal web corporativo B2B para **Avimar Ship Chandlers**, una empresa mexicana líder con más de 50 años de experiencia en el avituallamiento, lanchaje y servicios multimodales para el sector marítimo.

El sitio está desarrollado con **React**, **Vite**, **TypeScript** y **Tailwind CSS**.

---

## 🌐 Sitio Web
El sitio web está alojado y configurado en:
🔗 **[https://avimar.pixmedia.agency/](https://avimar.pixmedia.agency/)** (GitHub Pages)

---

## 🛠️ Tecnologías Utilizadas

- **Vite** - Build tool rápido y moderno
- **React 19** - Librería para la interfaz de usuario
- **TypeScript** - Tipado estático y desarrollo robusto
- **Tailwind CSS v3** - Framework CSS utilitario para diseño moderno y responsive
- **React Router Dom v7** - Enrutamiento del lado del cliente
- **Lucide React** - Iconografía moderna
- **React i18next** - Sistema de localización/traducción

---

## 🚀 Desarrollo Local

Para correr el proyecto en tu máquina local, sigue estos pasos:

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Corre el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Construye el proyecto para producción:
   ```bash
   npm run build
   ```

4. Previsualiza la build local:
   ```bash
   npm run preview
   ```

---

## ⚙️ Configuración del Servidor y DNS (cPanel)

Para apuntar el subdominio `avimar.pixmedia.agency` a GitHub Pages, se ha configurado un archivo `CNAME` en el directorio `public` y se debe añadir el siguiente registro en la configuración DNS de cPanel:

- **Tipo:** `CNAME`
- **Nombre/Host:** `avimar` (o `avimar.pixmedia.agency.`)
- **Valor/Destino:** `Willy100fuegos.github.io.`
- **TTL:** `14400` (o automático)
