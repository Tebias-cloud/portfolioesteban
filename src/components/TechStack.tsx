import React from 'react';
import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';
import { techCategories } from '../data/portfolio';
import * as Icons from 'lucide-react';

export const TechStack = React.memo(() => {
  const currentLang = useStore($lang);
  const lang = currentLang as "ES" | "EN";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full">
      {techCategories.map((category) => (
        <div key={category.title.EN} className="flex flex-col gap-4">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${category.color}`} style={{ boxShadow: `0 0 8px ${category.shadow}` }}></span> 
            <span>
              {category.title[lang]}
            </span>
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {category.items.map(({ name, icon }) => {
              const IconComponent = Icons[icon as keyof typeof Icons] as React.ElementType;
              return (
                <span key={name} className="group flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200/80 dark:border-white/5 bg-white/60 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 text-xs font-medium transition-[color,transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05] hover:bg-white dark:hover:bg-white/10 hover:border-zinc-400 dark:hover:border-white/20 hover:text-zinc-950 dark:hover:text-white cursor-default">
                  {IconComponent && <IconComponent size={14} strokeWidth={2} className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-[color,transform] duration-300 group-hover:scale-110" />}
                  {name}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});
