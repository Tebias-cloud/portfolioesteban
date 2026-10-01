# Reporte de Revisión Técnica: Portafolio

Revisión técnica de la implementación del portafolio web de Esteban Vidal ([https://www.estebanvidal.dev/](https://www.estebanvidal.dev/)), detallando arquitectura, separación de responsabilidades, accesibilidad, SEO y rendimiento móvil.

---

## 1. Arquitectura y Mantenibilidad

- **Generación Estática (SSG):** El portafolio se compila por completo a HTML estático con Astro 5, minimizando el tiempo de respuesta inicial (TTFB) y el consumo de recursos en Cloudflare Pages.
- **Islas de Interactividad:** Los componentes interactivos (Navbar, listados y modales) se hidratan selectivamente (`client:load` para elementos críticos de navegación, `client:visible` para secciones de contenido).
- **Separación de Responsabilidades:** Toda la información de proyectos y experiencia se centraliza en `src/data/portfolio.ts`, distinguiendo entre la descripción del problema resuelto (`description`), la solución técnica y arquitectura (`engineeringFocus`) y la evidencia de uso real (`impact`).
- **Estado Global Ligero:** Nano Stores (`$lang` e `$isModalOpen`) proporciona comunicación reactiva entre componentes sin la sobrecarga de contextos pesados.

---

## 2. Rendimiento y UX Móvil

- **Fondo y Efectos Visuales:** El componente `Particles` limita su `devicePixelRatio` a un máximo de 2 para evitar saturación en pantallas de alta densidad de píxeles, elimina re-renderizados en eventos de movimiento del cursor mediante referencias directas y respeta `prefers-reduced-motion`. Tanto `Particles` como `Meteors` se desactivan en pantallas móviles, manteniendo el gradiente estático para un rendimiento fluido y eficiente en batería.
- **Modal y Contextos de Apilamiento:** `ProjectModal` se renderiza mediante un portal en `document.body`, eliminando problemas de stacking context. Cuando el modal está activo, la `Navbar` se oculta mediante la regla CSS global `body.modal-open .site-navbar` sin alterar su centrado horizontal (`transform: translateX(-50%)`).
- **Galería Táctil:** Soporta desplazamiento gestual (swipe) con `touch-action: pan-y` para no entorpecer el scroll vertical, junto con una transición horizontal y de opacidad breve (~180 ms).
- **Hero y Espaciado:** Espaciados verticales adaptados para móviles en `src/pages/index.astro`, evitando vacíos excesivos. El Hero define un orden vertical claro en pantallas pequeñas (correo, redes y ubicación) y soporte preparado para avatar de perfil circular sin saltos de maquetación (CLS).

---

## 3. Accesibilidad (a11y) y SEO

- **Navegación por Teclado:** Las tarjetas de proyectos son navegables mediante `Tab` y accionables con `Enter` o `Espacio` sin romper los enlaces anidados a repositorios o demos en vivo. La `Navbar` dispone de `aria-label` descriptivos en todos sus accesos e interactivos.
- **Gestión de Foco y Semántica en Diálogo:** `ProjectModal` implementa los atributos `role="dialog"`, `aria-modal="true"` y `aria-labelledby`, soporte de cierre mediante `Escape`, foco inicial en el botón de cierre, trampa de foco (`focus trap`) mientras permanece abierto y restauración del foco al elemento detonador al cerrarse.
- **Controles con Foco Visible:** Todos los elementos interactivos cuentan con estilos de `focus-visible` discretos basados en el color morado de la paleta.
- **Internacionalización y HTML:** La preferencia de idioma se almacena en `localStorage` y actualiza inmediatamente el atributo `lang` de la etiqueta `<html>`, evitando parpadeos de carga.
- **Metadatos y Schema:** Configuración de URL canónica, Open Graph y Twitter Cards bajo el dominio oficial `https://www.estebanvidal.dev/`, junto con marcado estructurado Schema.org (`JSON-LD`) con perfiles de GitHub y LinkedIn. Limpieza completa de dependencias de analítica no utilizadas.
