import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';

export const ExperienceList = () => {
  const currentLang = useStore($lang);

  const labels = {
    ES: "Experiencia",
    EN: "Experience"
  };

  const experience = {
    ES: [
      { 
        company: "Campeonato MTB Regional", 
        role: "Full-Stack Developer", 
        date: "2024 — Actual",
        description: "Dirigí la digitalización completa de un circuito deportivo regional trabajando directamente con los organizadores. Fui responsable del ciclo de vida completo del software, desde el levantamiento de requerimientos hasta el despliegue en producción, logrando estandarizar los procesos operativos de 7 clubes independientes bajo una única plataforma."
      },
      { 
        company: "Joyería Fran", 
        role: "Full-Stack Developer", 
        date: "2024 — 2025",
        description: "Lideré la estrategia técnica para la transición de una marca de retail tradicional hacia el comercio electrónico. Gestioné la arquitectura del proyecto, la integración con proveedores de pago externos y la entrega de un panel administrativo diseñado a medida para optimizar el flujo de trabajo diario del cliente."
      },
      { 
        company: "Bobstore", 
        role: "Full-Stack Developer", 
        date: "2024",
        description: "Colaboré con una marca de indumentaria para diseñar una solución de inventario y ventas enfocada en dispositivos móviles. Mi rol abarcó la concepción de la arquitectura cloud y la implementación de un embudo de ventas que conectara directamente la infraestructura en la nube con la atención al cliente."
      }
    ],
    EN: [
      { 
        company: "Campeonato MTB Regional", 
        role: "Full-Stack Developer", 
        date: "2024 — Present",
        description: "Led the complete digitization of a regional sports circuit by working directly with organizers. Responsible for the full software lifecycle, from requirements gathering to production deployment, successfully standardizing the operational processes of 7 independent clubs under a single platform."
      },
      { 
        company: "Joyería Fran", 
        role: "Full-Stack Developer", 
        date: "2024 — 2025",
        description: "Led the technical strategy for transitioning a traditional retail brand into e-commerce. Managed project architecture, third-party payment gateway integration, and the delivery of a custom-built administrative dashboard to optimize the client's daily workflow."
      },
      { 
        company: "Bobstore", 
        role: "Full-Stack Developer", 
        date: "2024",
        description: "Collaborated with an apparel brand to design a mobile-first inventory and sales solution. My role encompassed cloud architecture conception and the implementation of a sales funnel connecting cloud infrastructure directly with customer support."
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
};