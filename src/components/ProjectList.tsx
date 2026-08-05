import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { useStore } from "@nanostores/react";
import { $lang, $isModalOpen } from "../store/ui";
import { myProjects, extraProjects } from "../data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export const ProjectList = () => {
  const currentLang = useStore($lang);
  const lang = currentLang as "ES" | "EN";

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = myProjects.find((p) => p.id === selectedId) || extraProjects.find((p) => p.id === selectedId);

  const INITIAL_VISIBLE_COUNT = 4;
  const initialProjects = myProjects;

  // Safe localStorage reading with try-catch
  const [isExpanded, setIsExpanded] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("portfolio-projects-expanded") === "true";
      }
    } catch (error) {
      console.warn("Storage access is blocked or restricted:", error);
    }
    return false;
  });

  const isInitialMount = useRef(true);

  // Safe localStorage writing, avoiding unnecessary initial write
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio-projects-expanded", String(isExpanded));
      }
    } catch (error) {
      console.warn("Could not save to storage:", error);
    }
  }, [isExpanded]);

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

  const handleToggle = () => {
    if (isExpanded) {
      const element = document.getElementById("projects-grid");
      if (element) {
        // Scroll to the bottom of the main 4 projects grid to keep the view focused and eliminate the browser scroll snap
        const rect = element.getBoundingClientRect();
        const yOffset = -200; // offset to keep the bottom of the grid visible
        const y = rect.top + window.scrollY + rect.height + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Grid: 1 column on mobile, 2 columns on desktop */}
      <div
        id="projects-grid"
        role="region"
        aria-label={lang === "ES" ? "Proyectos principales" : "Featured projects"}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {initialProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            lang={lang}
            index={index}
            onClick={() => setSelectedId(project.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="projects-extra-wrapper"
            initial={{ clipPath: "inset(0% 0% 100% 0%)", y: -20 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              id="projects-grid-extra"
              role="region"
              aria-label={lang === "ES" ? "Proyectos adicionales" : "Additional projects"}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6"
            >
              {extraProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  lang={lang}
                  index={index + INITIAL_VISIBLE_COUNT}
                  animateEntry={false}
                  onClick={() => setSelectedId(project.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {extraProjects.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            id="toggle-projects-btn"
            aria-expanded={isExpanded}
            aria-controls="projects-grid-extra"
            onClick={handleToggle}
            className="flex items-center gap-1.5 py-2 text-zinc-700 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors cursor-pointer focus:outline-none select-none"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isExpanded ? "expanded" : "collapsed"}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="flex items-center gap-1.5"
              >
                {isExpanded
                  ? (lang === "ES" ? "Ver menos" : "Show less")
                  : (lang === "ES" ? "Ver más" : "Show more")}
                {isExpanded ? <Icons.ChevronUp size={14} /> : <Icons.ChevronDown size={14} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      )}

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