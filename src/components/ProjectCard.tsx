import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { Project } from "../data/portfolio";

interface ProjectCardProps {
  project: Project;
  lang: "ES" | "EN";
  onClick: () => void;
  index: number;
  animateEntry?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({
  project,
  lang,
  onClick,
  index,
  animateEntry = true,
}) => {
  const [imgError, setImgError] = useState(false);

  const initialVal = animateEntry ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 };
  const whileInViewVal = animateEntry ? { opacity: 1, y: 0 } : undefined;
  const viewportVal = animateEntry ? { once: true, amount: 0.2 } : undefined;
  const transitionVal = animateEntry
    ? {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: index * 0.08,
      }
    : { duration: 0.2 };

  const imageAlt = lang === "ES"
    ? `${project.title} - Captura de pantalla de la interfaz`
    : `${project.title} - Interface screenshot`;

  return (
    <motion.div
      initial={initialVal}
      whileInView={whileInViewVal}
      viewport={viewportVal}
      transition={transitionVal}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={lang === "ES" ? `Ver detalles de ${project.title}` : `View details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group cursor-pointer relative flex flex-col h-full
        bg-white/80 dark:bg-[#0a0a0a]/90
        border border-zinc-200/60 dark:border-white/5
        hover:border-zinc-300/90 dark:hover:border-white/15
        active:border-purple-500/30
        shadow-xs hover:shadow-md
        overflow-hidden rounded-[24px]
        transition-[border-color,box-shadow] duration-200 ease-out
        motion-reduce:transition-none
        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-[#0a0a0a] z-10">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-400 p-4 text-center">
            <Icons.ImageOff size={28} className="mb-2" />
            <span className="text-[10px] uppercase tracking-widest font-bold">
              {lang === "ES" ? "Imagen no disponible" : "Image not available"}
            </span>
          </div>
        ) : (
          <img
            src={project.images[0]}
            alt={imageAlt}
            width="640"
            height="360"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300 ease-out motion-reduce:group-hover:scale-100"
          />
        )}
      </div>

      {/* Card content */}
      <div className="p-5 md:p-6 flex flex-col flex-1 z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {project.title}
            </h3>
            {project.highlights && (
              <div className="flex items-start gap-1.5 mt-1.5 text-[11px] font-mono font-medium text-purple-600 dark:text-purple-400/90 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1" />
                <span className="whitespace-normal leading-snug">{project.highlights[lang]}</span>
              </div>
            )}
          </div>

          {/* Quick links discretos con targets táctiles cómodos */}
          <div className="flex items-center gap-0.5 shrink-0 -mr-2 -mt-1.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === "ES" ? `Código de ${project.title} en GitHub` : `${project.title} GitHub repository`}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80"
              >
                <Icons.Github size={18} strokeWidth={1.75} />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === "ES" ? `Visitar sitio de ${project.title}` : `Visit ${project.title} live site`}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80"
              >
                <Icons.ArrowUpRight size={18} strokeWidth={1.75} />
              </a>
            )}
          </div>
        </div>

        {/* Contrast improved: text-zinc-700 in light mode */}
        <p className="text-zinc-700 dark:text-zinc-400 text-[13px] mt-3 mb-5 line-clamp-3 overflow-hidden leading-relaxed font-light">
          {project.description[lang]}
        </p>

        <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-white/5">
          <div className="flex flex-wrap content-start gap-2">
            {project.tools.map((tool) => {
              const IconComponent = Icons[
                tool.icon as keyof typeof Icons
              ] as React.ElementType;
              if (!IconComponent) return null;
              return (
                <div
                  key={tool.name}
                  className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-500"
                >
                  <IconComponent size={12} strokeWidth={2} />
                  <span className="text-[9px] uppercase tracking-widest font-bold">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
