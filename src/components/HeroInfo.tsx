import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';
import { Copy, Check, Download, Github, Linkedin } from 'lucide-react';

export const HeroInfo = () => {
  const currentLang = useStore($lang);
  const lang = currentLang as "ES" | "EN";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('esteban.vidal.valencia@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = {
    ES: {
      // Adaptado directamente de tu "Personal Statement" del CV
      bio: <>Ingeniero Civil en Computación especializado en <span className="text-zinc-900 dark:text-zinc-200 font-medium transition-colors duration-500">Next.js, TypeScript y PostgreSQL</span>. Diseño y desarrollo soluciones de software end-to-end, conectando arquitecturas complejas con el crecimiento del negocio.</>,
      country: "Iquique, Chile",
      cvTitle: "Descargar CV",
      cvFile: "/Esteban_Vidal_CV_ES.pdf"
    },
    EN: {
      // Traducción exacta de tu CV
      bio: <>Civil Informatics Engineer specialized in <span className="text-zinc-900 dark:text-zinc-200 font-medium transition-colors duration-500">Next.js, TypeScript, and PostgreSQL</span>. I engineer end-to-end software solutions, bridging complex system architecture with business growth.</>,
      country: "Iquique, Chile",
      cvTitle: "Download CV",
      cvFile: "/Esteban_Vidal_CV_EN.pdf"
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter leading-none text-zinc-950 dark:text-white transition-colors duration-500">
          Esteban Vidal.
        </h1>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-light transition-colors duration-500">
          {content[lang].bio}
        </p>
      </div>
      
      {/* ACTION BAR: Ultra Minimalista y Simétrica */}
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
        
        {/* CORREO */}
        <div className="group flex items-center gap-2.5">
          <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium tracking-wide select-all hover:text-zinc-900 dark:hover:text-white transition-colors cursor-text">
            esteban.vidal.valencia@gmail.com
          </span>
          <button 
            onClick={handleCopy} 
            className="flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer active:scale-90" 
            aria-label="Copiar correo"
          >
            {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
          </button>
        </div>

        {/* REDES & CV */}
        <div className="flex items-center gap-5">
          <a href="https://github.com/Tebias-cloud" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:-translate-y-0.5 duration-300" aria-label="GitHub">
            <Github size={18} strokeWidth={1.5} />
          </a>
          <a href="https://www.linkedin.com/in/esteban-vidal-/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#0a66c2] dark:hover:text-[#3b82f6] transition-all hover:-translate-y-0.5 duration-300" aria-label="LinkedIn">
            <Linkedin size={18} strokeWidth={1.5} />
          </a>
          
          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 transition-colors duration-500"></div>

          <a 
            href={content[lang].cvFile} 
            download
            target="_blank"
            rel="noopener noreferrer"
            title={content[lang].cvTitle}
            className="group flex items-center gap-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:-translate-y-0.5 duration-300"
          >
            <span className="text-[11px] font-bold tracking-[0.2em] mt-[1px]">CV</span>
            <Download size={15} strokeWidth={2} className="group-hover:translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>

        {/* UBICACIÓN */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-500">
            {content[lang].country}
          </span>
        </div>

      </div>
    </>
  );
};