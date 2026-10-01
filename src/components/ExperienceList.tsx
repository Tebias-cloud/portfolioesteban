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
        role: "Desarrollador de Software",
        company: "Freelance",
        date: "2025 — Presente",
        location: "Iquique, Chile · Remoto",
        description: "Desarrollo soluciones de software para proyectos reales, desde el modelado de datos y la lógica de negocio hasta la implementación, integración y despliegue.",
        responsibilities: [
          "Diseño de arquitectura, bases de datos y lógica de negocio.",
          "Integraciones con servicios externos, pagos y automatización de procesos.",
          "Despliegue, mantenimiento y evolución de aplicaciones en producción."
        ],
        projectsLabel: "Proyectos",
        projects: "Campeonato Regional MTB Tarapacá · Joyería Fran"
      }
    ],
    EN: [
      {
        role: "Software Developer",
        company: "Freelance",
        date: "2025 — Present",
        location: "Iquique, Chile · Remote",
        description: "I build software solutions for real-world projects, from data modeling and core business logic to implementation, third-party integrations, and deployment.",
        responsibilities: [
          "Architecture design, database schemas, and core business logic.",
          "Third-party integrations, payment processing, and workflow automation.",
          "Production deployment, maintenance, and continuous application evolution."
        ],
        projectsLabel: "Projects",
        projects: "Tarapacá Regional MTB Championship · Joyería Fran"
      }
    ]
  };

  const items = experience[currentLang as "ES" | "EN"];

  return (
    <div className="w-full">
      <div className="flex flex-col mb-10 md:mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-sm bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-800 dark:text-zinc-300 font-bold transition-colors duration-500">
            {labels[currentLang as "ES" | "EN"]}
          </h2>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-zinc-200/60 dark:divide-white/5 w-full">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row gap-5 md:gap-12 group ${
              i > 0 ? "pt-10 md:pt-14" : ""
            } ${i < items.length - 1 ? "pb-10 md:pb-14" : ""}`}
          >
            <div className="md:w-1/3 flex flex-col shrink-0">
              <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors duration-500 tracking-tight">
                {item.role}
              </h3>
              <h4 className="text-sm md:text-base font-medium text-purple-600 dark:text-purple-400 mt-1 transition-colors duration-500">
                {item.company}
              </h4>
              <div className="flex flex-col gap-1 mt-2.5">
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 transition-colors duration-500 uppercase tracking-widest">
                  {item.date}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-500 font-light">
                  {item.location}
                </span>
              </div>
            </div>

            <div className="md:w-2/3 flex flex-col">
              <p className="text-sm md:text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-light transition-colors duration-500 max-w-prose">
                {item.description}
              </p>

              <ul className="mt-4 space-y-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-light">
                {item.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60 shrink-0 mt-1.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-3.5 border-t border-zinc-200/60 dark:border-white/5">
                <p className="text-xs text-zinc-500 dark:text-zinc-500 font-mono tracking-tight">
                  <span className="font-semibold text-zinc-600 dark:text-zinc-400">{item.projectsLabel}:</span> {item.projects}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
