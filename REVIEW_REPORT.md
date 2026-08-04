# Reporte de Revisión de Ingeniería: Portafolio

Este reporte presenta la revisión técnica del repositorio **Portafolio**, analizando su arquitectura, separación de responsabilidades, decisiones de diseño, mantenibilidad, accesibilidad (a11y) y SEO, basándose en la implementación real del código.

---

## 1. Decisiones de Diseño y Mantenibilidad del Código

El portafolio está estructurado sobre **Astro 5** con la integración de **React 19** para componentes interactivos y **Tailwind CSS v4** para estilos.

### Separación entre Contenido y Presentación
El archivo [src/data/portfolio.ts](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/src/data/portfolio.ts) centraliza la información de proyectos, experiencia, categorías de tecnologías y enlaces externos. 
*   **Mantenibilidad:** Agregar, remover o editar un proyecto o puesto laboral requiere modificar únicamente este archivo de datos, sin alterar componentes de interfaz o código JSX, actuando como la fuente que unifica el contenido del sitio.

### Reutilización de Estructuras (Modal Único)
La vista detallada de proyectos en `ProjectList.tsx` implementa un único componente modal reutilizable. 
*   **Diseño Modular:** El modal lee dinámicamente la información del proyecto seleccionado en base al estado del store y renderiza la ficha correspondiente para cualquier ítem, evitando la declaración de un modal o componente separado por cada proyecto del catálogo.

### Sitio Completamente Estático Generado en Build (SSG)
*   **Entrega de Recursos:** El contenido de la página se compila por completo a HTML estático en tiempo de build. Esto elimina la necesidad de procesamiento o cómputo dinámico del lado del servidor (SSR) para renderizar la información básica del portafolio en producción.

### Hidratación de React Limitada a la Interacción (Islands Architecture)
El archivo [index.astro](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/src/pages/index.astro) define la directiva de hidratación de cada isla de React de la siguiente manera:
*   `client:load` en `Navbar` y `HeroInfo` para procesar el cambio de tema e idioma de forma inmediata en el cliente.
*   `client:visible` en `ProjectsHeader`, `ProjectList`, `ExperienceList`, `ContactSection` y `FooterContent`. El código JavaScript de React para estas secciones se descarga e hidrata únicamente cuando entran en la sección visible de la pantalla, difiriendo la hidratación del componente hasta que entra al viewport.

### Internacionalización Basada en Nano Stores
*   **Traducciones:** Las traducciones bilingües se resuelven mediante el tipo `BilingualText` (`ES: string; EN: string`) en `portfolio.ts`.
*   **Manejo de Idioma:** El idioma activo se controla a través de un almacén global ligero de **Nano Stores** (`$lang` en [src/store/ui.ts](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/src/store/ui.ts)). Los componentes leen este estado y cargan la cadena correspondiente al idioma activo sin dependencias de frameworks adicionales de traducción.

### Carga Anticipada de Imágenes
*   **Pre-carga de Assets:** En [ProjectList.tsx](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/src/components/ProjectList.tsx), al abrir la vista detallada de un proyecto, un efecto `useEffect` crea instancias de `new Image()` y les asigna los paths de `project.images`. Esto solicita los archivos de imagen de forma anticipada antes de que el usuario haga clic para alternar la galería.

---

## 2. Estructura CSS y Animaciones

*   **Sugerencia de Composición de Capas:** Se especifica la propiedad `will-change: transform, opacity` en el contenedor del modal [ProjectList.tsx:L74](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/src/components/ProjectList.tsx#L74) y `will-change-transform` en las tarjetas de proyecto (línea 260) para indicar al navegador qué elementos experimentarán transformaciones animadas.
*   **Tailwind CSS v4:** El portafolio migra el estilado a Tailwind v4 integrándolo mediante el plugin de Vite `@tailwindcss/vite` en [astro.config.mjs:L13](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/astro.config.mjs#L13). Las animaciones personalizadas se definen directamente mediante `@keyframes` y clases utilitarias en [src/styles/global.css](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/src/styles/global.css).

---

## 3. Limitaciones y Puntos a Corregir

La auditoría del código identifica las siguientes áreas de mejora técnicas:

### SEO (Optimización en Buscadores)
*   **Meta descripción ausente:** No existe la etiqueta `<meta name="description" content="..." />` en el `<head>` de [Layout.astro](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/src/layouts/Layout.astro), lo que impide definir el extracto de texto en resultados de búsqueda.
*   **Falta de metadatos Open Graph / Twitter Cards:** No se definen propiedades `og:title`, `og:description`, `og:image` ni etiquetas de Twitter, limitando la visualización enriquecida al compartir el enlace del sitio.

### Accesibilidad (a11y)
*   **Enlaces mudos en Navbar:** Los enlaces principales en [Navbar.tsx:L61-63](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/src/components/Navbar.tsx#L61-L63) renderizan exclusivamente iconos de Lucide React. Carecen de etiquetas `aria-label` o texto descriptivo para lectores de pantalla.
*   **Semántica y Roles en Diálogo:** El modal de detalles en `ProjectList.tsx` se renderiza dentro de un elemento `div` genérico sin los atributos WAI-ARIA `role="dialog"` y `aria-modal="true"`.
*   **Falta de Confinamiento de Foco (Opcional):** Al abrir la vista en detalle del proyecto, la tecla `Tab` permite mover el foco del teclado fuera del modal hacia los elementos invisibles del fondo de la página, perdiendo la referencia de entrada de usuario. Esta corrección es recomendada si se desea cumplir estrictamente con los estándares de accesibilidad WCAG AA.

---

## 4. Roadmap de Implementación Sugerido

### 🔴 Alta Prioridad (Saneamiento Básico)

#### A. Agregar Metatags de SEO y Open Graph
*   **Acción:** Editar [Layout.astro](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/src/layouts/Layout.astro) para incluir la meta descripción y los tags Open Graph (`og:title`, `og:description`, `og:image`).

#### B. Añadir Accesibilidad a Enlaces de Navbar
*   **Acción:** Incorporar atributos `aria-label` descriptivos a los enlaces de perfil, proyectos y experiencia en [Navbar.tsx](file:///c:/Users/Esteban/Desktop/proyectosT/portfolioesteban-main/src/components/Navbar.tsx).

---

### 🟡 Media Prioridad (Interactividad y Semántica)

#### C. Atributos ARIA en Modal
*   **Acción:** Incorporar `role="dialog"`, `aria-modal="true"`, y asociar el título con `aria-labelledby` en el contenedor del modal de `ProjectList.tsx`. Agregar `aria-label="Cerrar modal"` al botón de cierre.

#### D. Implementar Trap de Foco (Confinamiento de Foco)
*   **Acción:** Agregar un gestor de eventos en `ProjectModal` que capture el foco del teclado y mantenga el ciclo de tabbing estrictamente entre el botón de cierre, los thumbnails y los enlaces externos del proyecto.
