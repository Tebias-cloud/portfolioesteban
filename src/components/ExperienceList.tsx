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
        description: "Diseñé e implementé la plataforma de gestión para un circuito deportivo regional, trabajando directamente con los organizadores para levantar requisitos y validar funcionalidades. Responsable del ciclo completo: análisis, arquitectura, desarrollo y despliegue. Entregué una plataforma unificada que estandarizó los procesos de inscripción, puntuación y ranking de 7 clubes independientes."
      },
      { 
        company: "Joyería Fran", 
        role: "Software Engineer", 
        date: "2024 — 2025",
        description: "Diseñé la arquitectura y lideré el desarrollo de la plataforma de e-commerce para una marca de retail en transición digital. Integré Mercado Pago como pasarela de pagos y desarrollé un panel administrativo a medida que centralizó la gestión de productos, pedidos y pagos, eliminando procesos manuales."
      },
      { 
        company: "Bobstore", 
        role: "Software Engineer", 
        date: "2024",
        description: "Desarrollé una solución mobile-first de inventario y ventas para una marca de indumentaria. Diseñé la arquitectura cloud sobre Firebase e implementé un embudo de ventas con integración directa a WhatsApp Business, reemplazando procesos de pedido manuales."
      }
    ],
    EN: [
      { 
        company: "Campeonato MTB Regional", 
        role: "Software Engineer", 
        date: "2024 — Present",
        description: "I designed and implemented the management platform for a regional sports circuit, working directly with the organizers to gather requirements and validate functionalities. Responsible for the full cycle: analysis, architecture, development, and deployment. Delivered a unified platform that standardized the registration, scoring, and ranking processes of 7 independent clubs."
      },
      { 
        company: "Joyería Fran", 
        role: "Software Engineer", 
        date: "2024 — 2025",
        description: "I designed the architecture and led the development of the e-commerce platform for a retail brand undergoing digital transition. I integrated Mercado Pago as the payment gateway and developed a custom admin panel that centralized product, order, and payment management, eliminating manual processes."
      },
      { 
        company: "Bobstore", 
        role: "Software Engineer", 
        date: "2024",
        description: "I developed a mobile-first inventory and sales solution for a clothing brand. I designed the cloud architecture on Firebase and implemented a sales funnel with direct integration to WhatsApp Business, replacing manual order processes."
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