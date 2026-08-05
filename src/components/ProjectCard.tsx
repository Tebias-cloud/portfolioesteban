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
        ease: [0.25, 0.46, 0.45, 0.94],
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
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer relative flex flex-col h-full
        bg-white/80 dark:bg-[#0a0a0a]/90
        border border-zinc-200/50 dark:border-white/5
        shadow-sm hover:shadow-lg
        overflow-hidden rounded-[24px]
        transition-shadow duration-300
        hover:-translate-y-1 transition-transform duration-300 ease-out
        will-change-transform"
    >
      {/* Glow púrpura animado solo con opacidad (no background-color) */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none
          bg-purple-500/20 dark:bg-purple-500/30 blur-xl
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          will-change-[opacity]"
      />

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
            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}
      </div>

      {/* Card content */}
      <div className="p-6 flex flex-col flex-1 z-10">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {project.title}
        </h3>

        {/* Contrast improved: changed from text-zinc-500 to text-zinc-700 in light mode */}
        <p className="text-zinc-700 dark:text-zinc-400 text-[13px] mt-3 mb-6 line-clamp-3 overflow-hidden leading-relaxed font-light">
          {project.description[lang]}
        </p>

        <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-white/5">
          <div className="flex flex-wrap content-start gap-2 min-h-[48px]">
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
