# Esteban Portfolio

Web portafolio personal y profesional de Esteban Vidal, construida con **Astro**, **React**, **Tailwind CSS v4** y desplegada en **Cloudflare Pages**.

Dominio oficial: [https://www.estebanvidal.dev/](https://www.estebanvidal.dev/)

---

## Stack Tecnológico

- **Framework:** [Astro v5](https://astro.build/) (SSG / islas de interactividad).
- **UI:** [React v19](https://react.dev/).
- **Estado:** [Nano Stores](https://github.com/nanostores/nanostores) (persistencia de idioma ES/EN y sincronización reactiva de UI).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) con `@tailwindcss/vite`.
- **Animaciones:** [Framer Motion v12](https://www.framer.com/motion/) (transición suave de modales, galería e interacciones táctiles).
- **Despliegue:** Cloudflare Pages mediante `@astrojs/cloudflare` y [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

---

## Arquitectura y Optimizaciones

- **`src/pages/index.astro`:** Estructura base de la página con espaciado responsive adaptado a safe-area en móviles, fondo ambiental optimizado mediante gradientes radiales CSS puros (evitando elementos con `filter: blur()` para reducir el coste de composición manteniendo el glow violeta/cian) y efectos visuales adaptativos (partículas optimizadas a ~30 FPS con compensación temporal en escritorio, versión ligera para móvil y meteoros reservados para escritorio).
- **`src/components/`:** Componentes de interfaz:
  - `Navbar.tsx`: Navegación con cambio de tema (transición circular con View Transitions en escritorio, transición temporal ligera de colores de ~200ms mediante `theme-switching` en móvil/táctil y cambio directo sin animación con `prefers-reduced-motion`), selector de idioma (ES/EN) y ocultación automática cuando un modal está abierto.
  - `HeroInfo.tsx`: Presentación principal con soporte para foto de perfil (`/public/profile.webp`), enlaces sociales y descarga de CV bilingüe.
  - `ProjectList.tsx` / `ProjectCard.tsx`: Catálogo de proyectos destacados con navegación por teclado accesible (`Enter`/`Space`), targets táctiles confortables y feedback discreto.
  - `ProjectModal.tsx`: Modal montado vía portal en `document.body` para aislar el contexto de apilamiento, con focus trap, galería con swipe táctil, transición ligera y textura ambiental sutil en móvil sin canvas adicional.
  - `ExperienceList.tsx`: Trayectoria profesional en desarrollo de software.
  - `ContactSection.tsx`: Sección de contacto con copia rápida de correo y accesos directos.
- **`src/data/portfolio.ts`:** Fuente de datos bilingüe que separa la descripción funcional del enfoque de ingeniería e impacto de cada proyecto.
- **`src/store/ui.ts`:** Manejo reactivo de estado global con persistencia en `localStorage` y actualización sincronizada del atributo `lang` en `<html>`.

---

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar con Wrangler
npm run preview
```
