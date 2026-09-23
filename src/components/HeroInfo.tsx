import React from 'react';
import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';
import { Download, Github, Linkedin } from 'lucide-react';
import { CopyEmail } from './CopyEmail';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-normal leading-none text-zinc-950 dark:text-white transition-[color,background-color] duration-300 -ml-[0.03em]">
          Esteban Vidal.
        </h1>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-light transition-[color,background-color] duration-300">
          {content[lang].bio}
        </p>
      </div>
      
      {/* ACTION BAR: Ultra Minimalista y Simétrica */}
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 opacity-0 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]">
        
        {/* CORREO */}
        <CopyEmail textClassName="text-zinc-500 dark:text-zinc-400" />

        {/* REDES & CV */}
        <div className="flex items-center gap-6">
          <motion.a 
            href="https://github.com/Tebias-cloud" 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ scale: 1.1, opacity: 0.85 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="group flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors focus:outline-none" 
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
            whileHover={{ scale: 1.1, opacity: 0.85 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="group flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors focus:outline-none" 
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
            whileHover={{ scale: 1.1, opacity: 0.85 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="group flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors focus:outline-none"
          >
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors select-none">
              {lang === "ES" ? "CV" : "CV"}
            </span>
            <Download size={16} strokeWidth={1.5} />
          </motion.a>
        </div>

        {/* UBICACIÓN */}
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
    </motion.div>
  );
});