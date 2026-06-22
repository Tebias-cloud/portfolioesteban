import React from 'react';
import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import { CopyEmail } from './CopyEmail';

export const ContactSection = React.memo(() => {
  const currentLang = useStore($lang);
  const lang = currentLang as "ES" | "EN";

  const content = {
    ES: {
      title: "¿Quieres trabajar juntos?",
      desc: "Escríbeme para explorar colaboraciones técnicas o discutir nuevas oportunidades estratégicas.",
      status: "Abierto a nuevas colaboraciones"
    },
    EN: {
      title: "Want to work together?",
      desc: "Reach out to explore technical collaborations or discuss new strategic opportunities.",
      status: "Open to new collaborations"
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {content[lang].title}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 font-light max-w-lg">
          {content[lang].desc}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
        <CopyEmail textClassName="text-zinc-600 dark:text-zinc-300" />

        <a 
          href="https://www.linkedin.com/in/esteban-vidal-/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-zinc-500 hover:text-[#0a66c2] dark:hover:text-[#3b82f6] transition-[color,transform] duration-300 group"
        >
          <Linkedin size={16} strokeWidth={1.5} />
          <span className="text-sm font-medium">LinkedIn</span>
          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
        </a>

        <div className="flex items-center gap-2.5 ml-auto md:ml-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            {content[lang].status}
          </span>
        </div>
      </div>
    </div>
  );
});
