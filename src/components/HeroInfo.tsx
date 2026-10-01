import React from 'react';
import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';
import { Download, Github, Linkedin } from 'lucide-react';
import { CopyEmail } from './CopyEmail';
import { motion } from 'framer-motion';

// Control de avatar de perfil: mantener false (no reserva hueco ni añade placeholders).
// Cambiar a true en el futuro para usar /public/profile.webp o un monograma/icono local.
const SHOW_PROFILE_IMAGE = false;
const PROFILE_IMAGE_SRC = "/profile.webp";

export const HeroInfo = React.memo(() => {
  const currentLang = useStore($lang);
  const lang = currentLang as "ES" | "EN";

  const content = {
    ES: {
      bio: "Diseño y desarrollo soluciones de software orientadas a sistemas mantenibles y preparados para evolucionar, desde el modelado de datos hasta la implementación de lógica de negocio.",
      country: "Iquique, Chile",
      cvTitle: "Descargar CV",
      cvFile: "/Esteban_Vidal_CV_ES.pdf"
    },
    EN: {
      bio: "I design and develop software solutions focused on maintainable systems that can evolve over time, from data modeling to business logic implementation.",
      country: "Iquique, Chile",
      cvTitle: "Download CV",
      cvFile: "/Esteban_Vidal_CV_EN.pdf"
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 md:gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          {SHOW_PROFILE_IMAGE && (
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-zinc-200/80 dark:border-white/10 shrink-0 shadow-xs bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
              {/* Opción A: Imagen en public/profile.webp | Opción B: Avatar/monograma local */}
              <img
                src={PROFILE_IMAGE_SRC}
                alt="Esteban Vidal"
                width={80}
                height={80}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-[5.2rem] lg:text-[5.5rem] font-bold tracking-tight md:tracking-normal leading-none text-zinc-950 dark:text-white transition-[color,background-color] duration-300 md:-ml-[0.03em]">
            Esteban Vidal.
          </h1>
        </div>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-light transition-[color,background-color] duration-300">
          {content[lang].bio}
        </p>
      </div>

      {/* ACTION BAR: En mobile ordenado explícitamente (1. correo, 2. redes+cv, 3. ubicación) */}
      <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center gap-y-4 md:gap-x-8 md:gap-y-5">

        {/* 1. CORREO */}
        <div className="flex items-center">
          <CopyEmail textClassName="text-zinc-500 dark:text-zinc-400" />
        </div>

        {/* 2. REDES & CV */}
        <div className="flex items-center gap-5 sm:gap-6">
          <motion.a
            href="https://github.com/Tebias-cloud"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="group flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80 rounded px-1 -mx-1 py-0.5"
            aria-label="GitHub"
          >
            <Github size={16} strokeWidth={1.5} />
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors select-none">
              GitHub
            </span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/esteban-vidal-/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="group flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80 rounded px-1 -mx-1 py-0.5"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} strokeWidth={1.5} />
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors select-none">
              LinkedIn
            </span>
          </motion.a>

          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 transition-[color,background-color] duration-300"></div>

          <motion.a
            href={content[lang].cvFile}
            download
            target="_blank"
            rel="noopener noreferrer"
            title={content[lang].cvTitle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="group flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80 rounded px-1 -mx-1 py-0.5"
          >
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors select-none">
              CV
            </span>
            <Download size={16} strokeWidth={1.5} />
          </motion.a>
        </div>

        {/* 3. UBICACIÓN */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-[0.15em] transition-[color,background-color] duration-300">
            {content[lang].country}
          </span>
        </div>

      </div>
    </div>
  );
});
