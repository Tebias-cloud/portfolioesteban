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
        company: "Campeonato MTB Regional", 
        role: "Software Engineer", 
        date: "2024 — Actual",
        description: "Gestioné la digitalización integral de un circuito deportivo regional en colaboración directa con los organizadores. Responsable del ciclo de vida completo del software: análisis de requisitos, diseño de la solución, desarrollo y despliegue en producción. Entregué una plataforma unificada que estandarizó los procesos operativos de 7 clubes independientes."
      },
      { 
        company: "Joyería Fran", 
        role: "Software Engineer", 
        date: "2024 — 2025",
        description: "Diseñé la arquitectura y lideré el desarrollo de la plataforma de e-commerce para la transición digital de una marca de retail. Integré pasarelas de pago externas y desarrollé un panel administrativo a medida que simplificó la operación diaria del negocio."
      },
      { 
        company: "Bobstore", 
        role: "Software Engineer", 
        date: "2024",
        description: "Desarrollé una solución de inventario y ventas mobile-first para una marca de indumentaria. Definí la arquitectura cloud e implementé un embudo de ventas integrado con WhatsApp Business, conectando la infraestructura directamente con la atención al cliente."
      }
    ],
    EN: [
      { 
        company: "Campeonato MTB Regional", 
        role: "Software Engineer", 
        date: "2024 — Present",
        description: "Managed the comprehensive digitization of a regional sports circuit in direct collaboration with the organizers. Responsible for the full software lifecycle: requirements analysis, design of the solution, development, and production deployment. Delivered a unified platform that standardized the operational processes of 7 independent clubs."
      },
      { 
        company: "Joyería Fran", 
        role: "Software Engineer", 
        date: "2024 — 2025",
        description: "Designed the architecture and led the development of the e-commerce platform for the digital transition of a retail brand. Integrated external payment gateways and developed a custom admin panel that simplified the daily operations of the business."
      },
      { 
        company: "Bobstore", 
        role: "Software Engineer", 
        date: "2024",
        description: "Developed a mobile-first inventory and sales solution for an apparel brand. Defined the cloud architecture and implemented a sales funnel integrated with WhatsApp Business, connecting the infrastructure directly to customer support."
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
              <h4 className="text-sm md:text-base font-medium text-zinc-600 dark:text-zinc-400 mt-1 transition-colors duration-500">
                {item.role}
              </h4>
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mt-3 transition-colors duration-500 uppercase tracking-widest">
                {item.date}
              </span>
            </div>

            <div className="md:w-2/3 flex flex-col justify-center">
              <p className="text-sm md:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-light transition-colors duration-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});