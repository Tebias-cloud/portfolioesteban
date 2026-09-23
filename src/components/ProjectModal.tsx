import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { Project } from "../data/portfolio";

interface ProjectModalProps {
  project: Project;
  lang: "ES" | "EN";
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = React.memo(({ project, lang, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  // Preload all screenshots for this project on mount safely with try-catch
  useEffect(() => {
    try {
      project.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    } catch (error) {
      console.warn("Failed to preload project images:", error);
    }
  }, [project.images]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const labels = {
    ES: {
      visit: "Visitar Proyecto",
      eng: "Solución Técnica",
      tech: "Tecnologías principales",
      close: "Cerrar modal",
      imgUnavailable: "Imagen no disponible",
      prevImg: "Imagen anterior",
      nextImg: "Imagen siguiente"
    },
    EN: {
      visit: "Visit Project",
      eng: "Technical Solution",
      tech: "Key technologies",
      close: "Close modal",
      imgUnavailable: "Image not available",
      prevImg: "Previous image",
      nextImg: "Next image"
    },
  };

  const handleImageError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImg((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImg((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[150] flex items-center justify-center md:p-8"
    >
      {/* Overlay: solo visible en desktop como backdrop oscuro */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="hidden md:block absolute inset-0 bg-zinc-950/80 backdrop-blur-xs"
      />

      {/* Contenedor del modal: en mobile ocupa la pantalla completa, en desktop es la tarjeta centrada */}
      <motion.div
        key="modal-content"
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl bg-zinc-50 dark:bg-[#070707] md:bg-white/80 md:dark:bg-[#070707]/90 md:backdrop-blur-md md:border md:border-zinc-200/50 md:dark:border-white/5 md:rounded-[24px] shadow-2xl overflow-y-auto overflow-x-hidden md:overflow-hidden flex flex-col z-10"
      >
        {/* Header Sticky en móvil / Fijo en desktop */}
        <header className="sticky top-0 z-30 bg-zinc-50/95 dark:bg-[#070707]/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:pt-8 md:pb-6 border-b border-zinc-200/50 dark:border-white/5 md:border-b-0 flex justify-between items-start md:items-center gap-3 shrink-0">
          <div className="flex flex-col min-w-0 flex-1">
            <h2
              id="modal-project-title"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase leading-tight truncate"
            >
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center mt-1 md:mt-2 gap-x-2.5 gap-y-1">
              <span className="text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">
                {project.subtitle[lang]}
              </span>
              {project.highlights && (
                <>
                  <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:inline" />
                  <span className="text-zinc-600 dark:text-zinc-400 font-mono text-[10px]">
                    {project.highlights[lang]}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 flex items-center justify-center text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-zinc-200/60 dark:hover:bg-white/5 transition-colors"
              >
                <Icons.Github size={18} strokeWidth={1.75} />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 rounded-full font-bold uppercase tracking-[0.1em] text-[10px] transition-colors"
              >
                <span className="hidden sm:inline">{labels[lang].visit}</span>
                <span className="sm:hidden">{lang === "ES" ? "Ver" : "Visit"}</span>
                <Icons.ArrowUpRight size={13} strokeWidth={2} />
              </a>
            )}
            <button
              onClick={onClose}
              aria-label={labels[lang].close}
              className="w-11 h-11 flex items-center justify-center text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-zinc-200/60 dark:hover:bg-white/5 transition-all hover:rotate-90 ml-0.5"
            >
              <Icons.X size={20} strokeWidth={1.75} />
            </button>
          </div>
        </header>

        {/* Cuerpo del contenido */}
        <div className="p-4 sm:p-5 md:p-10 md:pt-2 flex-1 md:overflow-y-auto">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-10 items-center">
            {/* Galería interactiva con flechas y soporte de swipe */}
            <div className="flex flex-col gap-4">
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative w-full aspect-video rounded-2xl overflow-hidden flex items-center justify-center group shadow-md border border-zinc-200/60 dark:border-white/5 bg-zinc-100 dark:bg-black/50 select-none"
              >
                {/* Flechas de navegación (si hay más de 1 imagen) */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      aria-label={labels[lang].prevImg}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-20 opacity-80 md:opacity-0 md:group-hover:opacity-100"
                    >
                      <Icons.ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label={labels[lang].nextImg}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-20 opacity-80 md:opacity-0 md:group-hover:opacity-100"
                    >
                      <Icons.ChevronRight size={20} strokeWidth={2.5} />
                    </button>
                  </>
                )}

                {imgErrors[activeImg] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-50 dark:bg-zinc-900 z-10">
                    <Icons.ImageOff size={36} className="mb-2" />
                    <span className="text-[11px] uppercase tracking-widest font-bold">
                      {labels[lang].imgUnavailable}
                    </span>
                  </div>
                ) : (
                  <img
                    src={project.images[activeImg]}
                    alt={`${project.title} - ${lang === "ES" ? `captura ${activeImg + 1}` : `screenshot ${activeImg + 1}`}`}
                    loading="lazy"
                    decoding="async"
                    onError={() => handleImageError(activeImg)}
                    className="w-full h-full object-cover relative z-10"
                  />
                )}
              </div>

              {/* Miniaturas con targets táctiles cómodos */}
              {project.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3 shrink-0">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      aria-label={`${project.title} - ${lang === "ES" ? `ver captura ${idx + 1}` : `view screenshot ${idx + 1}`}`}
                      className={`relative aspect-video rounded-xl overflow-hidden focus:outline-none border-2 transition-all duration-200 cursor-pointer ${
                        activeImg === idx
                          ? "border-purple-500 opacity-100 scale-[1.02]"
                          : "border-zinc-200/80 dark:border-white/5 opacity-50 hover:opacity-100"
                      }`}
                    >
                      {imgErrors[idx] ? (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
                          <Icons.ImageOff size={16} />
                        </div>
                      ) : (
                        <img
                          src={img}
                          alt={`${project.title} - ${lang === "ES" ? `miniatura ${idx + 1}` : `thumbnail ${idx + 1}`}`}
                          loading="lazy"
                          decoding="async"
                          onError={() => handleImageError(idx)}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Columna técnica: Solución Técnica y Stack agrupados naturalmente */}
            <aside className="flex flex-col gap-6 lg:gap-7 py-2">
              <section>
                <h4 className="text-[10px] text-zinc-700 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] mb-2.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  {labels[lang].eng}
                </h4>
                <p className="text-[13px] md:text-sm text-zinc-800 dark:text-zinc-300 leading-relaxed font-light">
                  {project.engineeringFocus[lang]}
                </p>
              </section>

              <section className="pt-5 border-t border-zinc-200/50 dark:border-white/5">
                <h4 className="text-[10px] text-zinc-700 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] mb-3">
                  {labels[lang].tech}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => {
                    const IconComp = Icons[
                      tool.icon as keyof typeof Icons
                    ] as React.ElementType;
                    if (!IconComp) return null;
                    return (
                      <div
                        key={tool.name}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-800 dark:text-zinc-400 border border-zinc-200/40 dark:border-white/5"
                      >
                        <IconComp size={12} strokeWidth={2} />
                        <span className="text-[9px] uppercase tracking-widest font-bold">
                          {tool.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
