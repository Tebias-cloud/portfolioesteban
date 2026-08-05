import React, { useState, useEffect } from "react";
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
      arch: "Contexto del Proyecto",
      eng: "Solución Técnica",
      tech: "Stack",
      close: "Cerrar modal",
      imgUnavailable: "Imagen no disponible"
    },
    EN: {
      visit: "Visit Project",
      arch: "Project Context",
      eng: "Technical Solution",
      tech: "Stack",
      close: "Close modal",
      imgUnavailable: "Image not available"
    },
  };

  const handleImageError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8"
    >
      {/* Overlay: solid background with opacity transition */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-50/90 dark:bg-black/95"
      />

      {/* Contenido del modal con will-change forzado */}
      <motion.div
        key="modal-content"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[72rem] h-[90vh] md:h-auto md:max-h-[90vh] bg-white/60 dark:bg-[#070707]/80 backdrop-blur-sm border border-zinc-200/50 dark:border-white/5 rounded-[24px] shadow-2xl overflow-hidden flex flex-col z-10"
      >
        <div className="flex flex-col h-full p-8 md:p-10 relative">
          <header className="flex justify-between items-center mb-8 shrink-0 relative z-10">
            <div className="flex flex-col">
              <h2 
                id="modal-project-title" 
                className="text-2xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 uppercase leading-none"
              >
                {project.title}
              </h2>
              <div className="flex flex-wrap items-center mt-3 gap-x-3 gap-y-1.5">
                <span className="text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-[0.4em]">
                  {project.subtitle[lang]}
                </span>
                {project.status && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden md:inline"></span>
                    {/* Contrast improved: changed from text-zinc-500 to text-zinc-700 in light mode */}
                    <span className="text-zinc-700 dark:text-zinc-400 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5">
                      {project.status[lang]}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                >
                  <Icons.Github size={20} strokeWidth={1.5} />
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 rounded-full font-bold uppercase tracking-[0.1em] text-[10px] transition-colors"
                >
                  {labels[lang].visit} <Icons.ArrowUpRight size={14} />
                </a>
              )}
              <button
                onClick={onClose}
                aria-label={labels[lang].close}
                className="text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 ml-2 transition-all hover:rotate-90"
              >
                <Icons.X size={20} strokeWidth={1.5} />
              </button>
            </div>
          </header>

          <div className="grid lg:grid-cols-2 gap-10 min-h-0 flex-1 relative z-10 overflow-y-auto lg:overflow-visible pr-2 scrollbar-hide">
            <div className="flex flex-col gap-6 relative shrink-0 lg:shrink">
              {/* Imagen principal con glow optimizado (blur reducido) */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden flex items-center justify-center group shadow-xl border border-zinc-200/50 dark:border-white/5 bg-zinc-100 dark:bg-black/50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-purple-500/10 dark:bg-purple-500/5 blur-2xl rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0 will-change-[opacity]" />
                
                {imgErrors[activeImg] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-50 dark:bg-zinc-900 z-10">
                    <Icons.ImageOff size={40} className="mb-3" />
                    <span className="text-[12px] uppercase tracking-widest font-bold">
                      {labels[lang].imgUnavailable}
                    </span>
                  </div>
                ) : (
                  <img
                    src={project.images[activeImg]}
                    alt={`${project.title} - ${lang === "ES" ? "captura principal" : "main screenshot"}`}
                    loading="lazy"
                    decoding="async"
                    onError={() => handleImageError(activeImg)}
                    className="w-full h-full object-cover relative z-10"
                  />
                )}
              </div>

              {/* Miniaturas con transiciones acotadas y bordes fijos para evitar reflows */}
              <div className="grid grid-cols-3 gap-4 shrink-0 pb-1 px-1">
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    aria-label={`${project.title} - ${lang === "ES" ? `ver captura ${idx + 1}` : `view screenshot ${idx + 1}`}`}
                    className={`relative aspect-video rounded-xl overflow-hidden focus:outline-none border-2 transition-[opacity,transform,border-color] duration-200 will-change-transform ${
                      activeImg === idx
                        ? "border-purple-500/70 opacity-100 scale-[1.02]"
                        : "border-zinc-200 dark:border-white/5 opacity-40 hover:opacity-100 hover:-translate-y-0.5"
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
            </div>

            {/* Contrast improved: changed text-zinc-500/600 to text-zinc-700/800 in light mode */}
            <aside className="flex flex-col gap-8 py-2 lg:overflow-y-auto pr-2 scrollbar-hide">
              <section>
                <h4 className="text-[10px] text-zinc-700 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>{" "}
                  {labels[lang].arch}
                </h4>
                <p className="text-sm text-zinc-800 dark:text-zinc-400 leading-relaxed">
                  {project.description[lang]}
                </p>
              </section>

              <section>
                <h4 className="text-[10px] text-zinc-700 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(10,185,129,0.6)]"></span>{" "}
                  {labels[lang].eng}
                </h4>
                <p className="text-sm text-zinc-800 dark:text-zinc-400 leading-relaxed">
                  {project.engineeringFocus[lang]}
                </p>
              </section>

              <section className="mt-auto pt-6 border-t border-zinc-100 dark:border-white/5">
                <h4 className="text-[10px] text-zinc-700 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] mb-4">
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
                        className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-500"
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
