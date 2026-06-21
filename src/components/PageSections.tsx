import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';

export const t = {
  ES: {
    selectedWorks: "Proyectos Destacados",
    selectedWorksSub: "Sistemas escalables y plataformas digitales (2025-2026).",
    stack: "Stack",
    stackSub: "Tecnologías Principales",
    footerRights: "© 2026 Esteban Vidal. Todos los derechos reservados.",
    footerDegree: "Ingeniería Civil en Computación",
    footerUni: "U. de Tarapacá"
  },
  EN: {
    selectedWorks: "Selected Works",
    selectedWorksSub: "Scalable systems and digital platforms (2025-2026).",
    stack: "Stack",
    stackSub: "Core Technologies",
    footerRights: "© 2026 Esteban Vidal. All rights reserved.",
    footerDegree: "Computer Science Engineering",
    footerUni: "University of Tarapacá"
  }
};

export const ProjectsHeader = () => {
  const lang = useStore($lang);
  return (
    <div className="flex flex-col mb-12">
      <div className="flex items-center gap-3 mb-2">
        {/* Nodo con brillo sutil para guiar la vista */}
        <div className="w-2 h-2 rounded-sm bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-900 dark:text-zinc-300 font-bold transition-colors duration-500">
            {t[lang].selectedWorks}
        </h2>
      </div>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed">
        {t[lang].selectedWorksSub}
      </p>
    </div>
  );
};

export const StackHeader = () => {
  const lang = useStore($lang);
  return (
    <div className="shrink-0">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 rounded-sm bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)] md:hidden"></div>
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-900 dark:text-zinc-500 font-bold transition-colors duration-500">
            {t[lang].stack}
        </h2>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 text-[10px] uppercase tracking-widest font-medium">
        {t[lang].stackSub}
      </p>
    </div>
  );
};

export const FooterContent = () => {
  const lang = useStore($lang);
  return (
    <>
      <div className="text-zinc-500 dark:text-zinc-400 text-[10px] font-medium tracking-wide">
        {t[lang].footerRights}
      </div>
      <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-500 text-[10px] font-medium tracking-wide">
        <span>{t[lang].footerDegree}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
        <span>{t[lang].footerUni}</span>
      </div>
    </>
  );
};