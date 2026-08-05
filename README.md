# 🌐 Esteban Portfolio - Portafolio Profesional de Esteban

Este repositorio contiene el código de la web portafolio personal y profesional de Esteban. Está construida utilizando el generador de sitios estáticos de alto rendimiento **Astro** junto con **React** para islas interactivas de interfaz, estilado mediante **Tailwind CSS v4** y desplegado en **Cloudflare Pages**.

---

## 🛠️ Stack Tecnológico

*   **Framework Principal:** [Astro v5](https://astro.build/) (para SSG y renderizado híbrido ultra rápido).
*   **Librería UI:** [React v19](https://react.dev/) (para componentes dinámicos como galerías de proyectos y listados interactivos).
*   **Manejo de Estado Ligero:** [Nano Stores](https://github.com/nanostores/nanostores) (administración del estado global de idioma `$lang` con reactividad instantánea en cliente).
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (integrado mediante el compilador rápido `@tailwindcss/vite`).
*   **Animaciones:** [Framer Motion v12](https://www.framer.com/motion/) (transiciones de modal de proyectos, interactividad hover y micro-interacciones).
*   **Despliegue y Serverless:** Cloudflare Pages mediante `@astrojs/cloudflare` y [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

---

## 🏛️ Arquitectura del Proyecto y Optimizaciones

El desarrollo está organizado bajo la estructura estándar de Astro, optimizada para rendimiento y SEO técnico:

*   **`src/pages/`:** Contiene las rutas principales del portafolio. `index.astro` es el punto de entrada principal.
*   **`src/components/`:** Componentes modulares y reutilizables de UI en React:
    *   `Navbar.tsx`: Barra de navegación responsive con selector de idioma y botón de tema animado (rotación y deslizamiento con `AnimatePresence`).
    *   `HeroInfo.tsx`: Presentación principal alineada al CV con animaciones de entrada.
    *   `ProjectList.tsx`: Listado de proyectos modularizado. La animación de colapso y apertura del contenedor extra está acelerada por hardware (**GPU**) mediante `clip-path` y `y` transform para evitar cálculos costosos de rediseño (Layout/Reflow) en la CPU.
    *   `ProjectCard.tsx`: Tarjetas individuales optimizadas con `loading="lazy"`, `decoding="async"`, control de fallos en imágenes y textos descriptivos alternativos (`alt`) bilingües.
    *   `ProjectModal.tsx`: Diálogo detallado independiente con precarga de imágenes bajo bloques de seguridad `try-catch` y scroll adaptable responsivo.
    *   `ExperienceList.tsx` / `PageSections.tsx`: Secciones estructuradas alineadas con la trayectoria del CV.
*   **`src/data/portfolio.ts`:** Archivo de datos centralizado en TypeScript. Configurado para separar los proyectos activos principales de aquellos placeholders futuros desactivados en producción.
*   **`src/store/ui.ts`:** Almacén reactivo de Nano Stores para persistir el idioma del usuario.
*   **`src/styles/global.css`:** Directivas Tailwind v4 y variables del sistema de diseño.

### 🚀 Características de Rendimiento y Calidad
1.  **Cero Hydration Mismatches:** Carga estática de tema inicial que previene parpadeos y sincroniza el estado en el cliente únicamente tras el montaje en el navegador.
2.  **SEO Técnico Avanzado:** Integración de mapa de sitio dinámico (`@astrojs/sitemap`), etiquetas Open Graph, Twitter Cards y marcado estructurado de Schema.org (`JSON-LD` para la entidad `Person`).
3.  **Accesibilidad (a11y) WCAG AA:** Estilo de foco por teclado visible en botones interactivos, contraste de texto de descripción incrementado a `text-zinc-700` y roles ARIA y `aria-expanded` dinámicos.

---

## ⚙️ Desarrollo y Despliegue Local

### Requisitos Previos
*   **Node.js v18** o superior instalado.

### Instrucciones de Ejecución

1.  Instala las dependencias necesarias:
    ```bash
    npm install
    ```

2.  Inicia el servidor de desarrollo local de Astro:
    ```bash
    npm run dev
    ```
    *El sitio estará disponible para desarrollo local en `http://localhost:4321`.*

3.  Compila el sitio web de forma estática para producción:
    ```bash
    npm run build
    ```
    *Esto generará los archivos estáticos listos para desplegar en la carpeta `./dist/`.*

4.  Previsualiza localmente el build compilado simulando el entorno de Cloudflare Pages:
    ```bash
    npm run preview
    ```

### Despliegue en Cloudflare Pages
El despliegue está automatizado empleando **Wrangler**:
```bash
npm run deploy
```
Esto creará el build de producción y lo subirá directamente a Cloudflare Pages de acuerdo a la configuración de `wrangler.jsonc`.
