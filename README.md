# 🌐 Esteban Portfolio - Portafolio Profesional de Esteban

Este repositorio contiene el código de la web portafolio personal y profesional de Esteban. Está construida utilizando el generador de sitios estáticos de alto rendimiento **Astro** junto con **React** para islas interactivas de interfaz, estilado mediante **Tailwind CSS v4** y desplegado en **Cloudflare Pages**.

---

## 🛠️ Stack Tecnológico

*   **Framework Principal:** [Astro v5](https://astro.build/) (para SSG y renderizado híbrido ultra rápido).
*   **Librería UI:** [React v19](https://react.dev/) (para componentes dinámicos como galerías de proyectos y listados interactivos).
*   **Manejo de Estado Ligero:** [Nano Stores](https://github.com/nanostores/nanostores) (administración del estado global de idioma/idioma alternante `$lang` con reactividad instantánea en cliente).
*   **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (integrado mediante el compilador rápido `@tailwindcss/vite`).
*   **Animaciones:** [Framer Motion v12](https://www.framer.com/motion/) (transiciones de modal de proyectos, interactividad hover y micro-interacciones).
*   **Despliegue y Serverless:** Cloudflare Pages mediante `@astrojs/cloudflare` y [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

---

## 🏛️ Arquitectura del Proyecto

El desarrollo está organizado bajo la estructura estándar de Astro:

*   **`src/pages/`:** Contiene las rutas principales del portafolio. `index.astro` es el punto de entrada principal donde se importan las islas de React.
*   **`src/components/`:** Componentes modulares y reutilizables de UI en React:
    *   `Navbar.tsx`: Barra de navegación responsive con selector de idioma.
    *   `HeroInfo.tsx`: Presentación principal de perfil con animaciones de entrada.
    *   `ProjectList.tsx`: Listado de proyectos con filtrado por categoría y modal dinámico de galería de imágenes animada.
    *   `ExperienceList.tsx` / `PageSections.tsx`: Secciones estructuradas de trayectoria profesional.
*   **`src/data/portfolio.ts`:** Archivo de datos centralizado en TypeScript. Toda la información de proyectos, experiencia laboral, habilidades técnicas y enlaces de contacto se define aquí para facilitar su mantenimiento.
*   **`src/store/ui.ts`:** Almacén reactivo de Nano Stores para persistir y alternar el idioma del usuario.
*   **`src/styles/global.css`:** Contiene directivas `@import "tailwindcss"` y animaciones personalizadas definidas mediante `@keyframes` CSS nativos.

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
