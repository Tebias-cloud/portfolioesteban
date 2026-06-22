import React from 'react';
import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';
import { Download, Github, Linkedin } from 'lucide-react';
import { CopyEmail } from './CopyEmail';

export const HeroInfo = React.memo(() => {
  const currentLang = useStore($lang);
  const lang = currentLang as "ES" | "EN";

  const content = {
    ES: {
      bio: "Ingeniero Civil en Informática. Me dedico al desarrollo de software, con énfasis en la arquitectura, la integridad de los datos y la escalabilidad de las soluciones.",
      country: "Iquique, Chile",
      cvTitle: "Descargar CV",
      cvFile: "/Esteban_Vidal_CV_ES.pdf"
    },
    EN: {
      bio: "Civil Informatics Engineer. I dedicate myself to software development, with emphasis on architecture, data integrity, and scalability.",
      country: "Iquique, Chile",
      cvTitle: "Download CV",
      cvFile: "/Esteban_Vidal_CV_EN.pdf"
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-normal leading-none text-zinc-950 dark:text-white transition-[color,background-color] duration-300 -ml-[0.02em]">
          Esteban Vidal.
        </h1>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-light transition-[color,background-color] duration-300">
          {content[lang].bio}
        </p>
      </div>
      
      {/* ACTION BAR: Ultra Minimalista y Simétrica */}
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        
        {/* CORREO */}
        <CopyEmail textClassName="text-zinc-500 dark:text-zinc-400" />

        {/* REDES & CV */}
        <div className="flex items-center gap-5">
          <a href="https://github.com/Tebias-cloud" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-[color,transform] hover:-translate-y-0.5 duration-300" aria-label="GitHub">
            <Github size={18} strokeWidth={1.5} />
          </a>
          <a href="https://www.linkedin.com/in/esteban-vidal-/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#0a66c2] dark:hover:text-[#3b82f6] transition-[color,transform] hover:-translate-y-0.5 duration-300" aria-label="LinkedIn">
            <Linkedin size={18} strokeWidth={1.5} />
          </a>
          
          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 transition-[color,background-color] duration-300"></div>

          <a 
            href={content[lang].cvFile} 
            download
            target="_blank"
            rel="noopener noreferrer"
            title={content[lang].cvTitle}
            className="group flex items-center gap-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-[color,transform] hover:-translate-y-0.5 duration-300"
          >
            <span className="text-sm font-bold tracking-[0.2em]">CV</span>
            <Download size={18} strokeWidth={1.5} className="group-hover:translate-y-0.5 transition-transform duration-300" />
          </a>
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
    </>
  );
});