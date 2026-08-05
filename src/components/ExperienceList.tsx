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
        company: "Campeonato Regional MTB Tarapacá", 
        role: "Desarrollador de Software", 
        date: "2025 — Presente",
        description: "Desarrollé una plataforma web para centralizar la gestión de inscripciones, resultados y rankings del Campeonato Regional MTB Tarapacá.\n\nReemplacé la gestión distribuida en planillas por una plataforma centralizada utilizada por los 7 clubes organizadores del campeonato, centralizando la administración y disponibilidad de la información.\n\nDiseñé e implementé la solución completa, incluyendo el modelado de la base de datos, panel administrativo, sitio público e integración con un sistema de cronometraje para automatizar el procesamiento de resultados."
      }
    ],
    EN: [
      { 
        company: "Regional MTB Championship Tarapacá", 
        role: "Software Developer", 
        date: "2025 — Present",
        description: "Developed a web platform to centralize registrations, race results, and rankings for the Regional MTB Championship Tarapacá.\n\nReplaced spreadsheet-based management with a centralized platform used by the 7 organizing clubs, centralizing administration and information availability.\n\nDesigned and implemented the complete solution, including database modeling, an administrative dashboard, public website, and integration with a timing system to automate race result processing."
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