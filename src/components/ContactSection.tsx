import React from 'react';
import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { CopyEmail } from './CopyEmail';
import { motion } from 'framer-motion';

export const ContactSection = React.memo(() => {
  const currentLang = useStore($lang);
  const lang = currentLang as "ES" | "EN";

  const content = {
    ES: {
      title: "¿Quieres trabajar juntos?",
      desc: "Escríbeme para explorar colaboraciones o nuevos proyectos.",
      status: "Abierto a nuevas colaboraciones"
    },
    EN: {
      title: "Want to work together?",
      desc: "Contact me to explore collaborations or new projects.",
      status: "Open to new collaborations"
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {content[lang].title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-400 font-light max-w-lg">
          {content[lang].desc}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <CopyEmail textClassName="text-zinc-500 dark:text-zinc-400" />

        <motion.a 
          href="https://github.com/Tebias-cloud" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, opacity: 0.85 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="group flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors focus:outline-none"
        >
          <Github size={16} strokeWidth={1.5} />
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors select-none">GitHub</span>
          <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
        </motion.a>

        <motion.a 
          href="https://www.linkedin.com/in/esteban-vidal-/" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, opacity: 0.85 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="group flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors focus:outline-none"
        >
          <Linkedin size={16} strokeWidth={1.5} />
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors select-none">LinkedIn</span>
          <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
        </motion.a>

        <div className="flex items-center gap-2.5 ml-auto md:ml-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] transition-[color,background-color] duration-300">
            {content[lang].status}
          </span>
        </div>
      </div>
    </div>
  );
});
