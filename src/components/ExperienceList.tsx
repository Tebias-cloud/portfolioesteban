import React from 'react';
import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';

export const ExperienceList = React.memo(() => {
  const currentLang = useStore($lang);

  const labels = {
    ES: "Experiencia",
    EN: "Experience"
  };

  const experience = {
    ES: [
      { 
        company: "Desarrollador de Software Freelance", 
        role: "Consultoría y Desarrollo de Software", 
        date: "2025 — Presente",
        description: "Desarrollo soluciones de software para proyectos independientes, abarcando el ciclo completo de desarrollo, desde el análisis de requerimientos hasta la implementación de la solución."
      }
    ],
    EN: [
      { 
        company: "Freelance Software Developer", 
        role: "Software Consulting & Development", 
        date: "2025 — Present",
        description: "I develop software solutions for independent projects, covering the full development lifecycle, from requirements analysis to implementation."
      }
    ]
  };

  return (
    <div className="w-full">
      <div className="flex flex-col mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-sm bg-purple-500"></div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-800 dark:text-zinc-300 font-bold transition-colors duration-500">
            {labels[currentLang as "ES" | "EN"]}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-12 md:gap-16 w-full">
        {experience[currentLang as "ES" | "EN"].map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-12 group">
            
            <div className="md:w-1/3 flex flex-col shrink-0">
              <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors duration-500 tracking-tight">
                {item.company}
              </h3>
              <h4 className="text-sm md:text-base font-medium text-zinc-700 dark:text-zinc-400 mt-1 transition-colors duration-500">
                {item.role}
              </h4>
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-3 transition-colors duration-500 uppercase tracking-widest">
                {item.date}
              </span>
            </div>

            <div className="md:w-2/3 flex flex-col justify-center">
              {item.description.split("\n\n").map((paragraph, idx) => (
                <p 
                  key={idx} 
                  className="text-sm md:text-[15px] text-zinc-700 dark:text-zinc-400 leading-relaxed font-light transition-colors duration-500 mb-4 last:mb-0 max-w-prose"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});