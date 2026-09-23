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
        description: "Diseño y desarrollo de la plataforma web centralizada para la gestión del Campeonato Regional MTB Tarapacá, utilizada por 7 clubes y más de 240 corredores. El sistema centraliza inscripciones, dorsales, calendario, resultados y clasificaciones, e integra el sistema de cronometraje para la actualización de resultados."
      },
      {
        company: "Joyería Fran",
        role: "Desarrollador de Software",
        date: "2025 — Presente",
        description: "Desarrollo de una plataforma de comercio electrónico para digitalizar la operación de un negocio existente. Incluye catálogo online, gestión de productos, inventario y pedidos, integración con Mercado Pago y validaciones del lado servidor para proteger el proceso de compra."
      }
    ],
    EN: [
      {
        company: "Tarapacá Regional MTB Championship",
        role: "Software Developer",
        date: "2025 — Present",
        description: "Design and development of the centralized web platform for the Tarapacá Regional MTB Championship, used by 7 clubs and more than 240 riders. The system centralizes registrations, bib assignments, event scheduling, results, and rankings, and integrates with the race timing system for result updates."
      },
      {
        company: "Joyería Fran",
        role: "Software Developer",
        date: "2025 — Present",
        description: "Development of an e-commerce platform to digitize the operations of an existing business. It includes an online catalog, product, inventory and order management, Mercado Pago integration, and server-side validations to protect the purchasing process."
      }
    ]
  };

  const items = experience[currentLang as "ES" | "EN"];

  return (
    <div className="w-full">
      <div className="flex flex-col mb-12">
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
            className={`flex flex-col md:flex-row gap-4 md:gap-12 group ${
              i > 0 ? "pt-10 md:pt-14" : ""
            } ${i < items.length - 1 ? "pb-10 md:pb-14" : ""}`}
          >
            <div className="md:w-1/3 flex flex-col shrink-0">
              <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors duration-500 tracking-tight">
                {item.company}
              </h3>
              <h4 className="text-sm md:text-base font-medium text-zinc-700 dark:text-zinc-400 mt-1 transition-colors duration-500">
                {item.role}
              </h4>
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-2.5 transition-colors duration-500 uppercase tracking-widest">
                {item.date}
              </span>
            </div>

            <div className="md:w-2/3 flex flex-col justify-center">
              <p className="text-sm md:text-[15px] text-zinc-700 dark:text-zinc-400 leading-relaxed font-light transition-colors duration-500 max-w-prose">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
