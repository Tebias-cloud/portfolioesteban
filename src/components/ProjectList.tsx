import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useStore } from "@nanostores/react";
import { $lang, $isModalOpen } from "../store/ui";
import { myProjects } from "../data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export const ProjectList = () => {
  const currentLang = useStore($lang);
  const lang = currentLang as "ES" | "EN";

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = myProjects.find((p) => p.id === selectedId);

  // Lock body scroll and handle modal open state
  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    document.body.classList.toggle('modal-open', !!selectedId);
    $isModalOpen.set(!!selectedId);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove('modal-open');
      $isModalOpen.set(false);
    };
  }, [selectedId]);

  return (
    <>
      {/* Grid: 1 column on mobile, 2 columns on desktop */}
      <div
        id="projects-grid"
        role="region"
        aria-label={lang === "ES" ? "Proyectos destacados" : "Featured projects"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {myProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            lang={lang}
            index={index}
            onClick={() => setSelectedId(project.id)}
          />
        ))}
      </div>

      {/* Modal con AnimatePresence para entrada/salida suaves */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <ProjectModal
            project={selectedProject}
            lang={lang}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
