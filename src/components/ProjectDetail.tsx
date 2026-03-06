import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { BorderBeam } from "./ui/border-beam.tsx";
import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';
import type { Project } from '../data/projects';

const springTransition = { type: "spring" as const, stiffness: 200, damping: 25 };

export const ProjectDetail = ({ projects }: { projects: Project[] }) => {
  const currentLang = useStore($lang);
  const lang = currentLang as "ES" | "EN"; 
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const selectedProject = projects.find((p) => p.id === selectedId);

  useEffect(() => {
    if (selectedId) setActiveImg(0);
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedId(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedId]);

  const labels = {
    ES: { visit: "Visitar Proyecto", arch: "Contexto del Proyecto", eng: "Solución Técnica", tech: "Stack" },
    EN: { visit: "Visit Project", arch: "Project Context", eng: "Technical Solution", tech: "Stack" }
  };

  const getDisplayTitle = (title: string) => title === "Chaski Riders" ? "Campeonato Regional MTB" : title;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div 
            key={project.id} 
            onClick={() => setSelectedId(project.id)} 
            className="group cursor-pointer relative flex flex-col h-full bg-white/60 dark:bg-[#070707]/80 backdrop-blur-sm border border-zinc-200/50 dark:border-white/5 shadow-sm hover:shadow-lg dark:shadow-none overflow-hidden rounded-[24px] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 dark:group-hover:bg-purple-500/10 blur-2xl transition-all duration-500 rounded-[inherit] pointer-events-none"></div>
            
            <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-[#0a0a0a] z-10">
              <img 
                src={project.images[0]} 
                alt={project.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              />
            </div>
            
            <div className="p-6 flex flex-col flex-1 z-10">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{getDisplayTitle(project.title)}</h3>
              
              <p className="text-zinc-500 dark:text-zinc-400 text-[13px] mt-3 mb-6 line-clamp-3 overflow-hidden leading-relaxed font-light">
                {project.description[lang]}
              </p>
              
              <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-white/5">
                <div className="flex flex-wrap content-start gap-2 min-h-[48px]">
                  {project.tools.slice(0, 3).map((tool) => {
                    const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ElementType;
                    if (!IconComponent) return null;
                    return (
                      <div key={tool.name} className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-500">
                        <IconComponent size={12} strokeWidth={2} />
                        <span className="text-[9px] uppercase tracking-widest font-bold">{tool.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 hidden dark:block pointer-events-none rounded-[inherit] z-20">
              <BorderBeam size={150} duration={8} delay={0} colorFrom="#a855f7" colorTo="transparent" borderWidth={1.5} />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedId(null)} 
              className="absolute inset-0 bg-zinc-50/80 dark:bg-black/90 backdrop-blur-2xl" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.97, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.97, y: 20 }} 
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[72rem] h-[90vh] md:h-auto md:max-h-[90vh] bg-white dark:bg-[#070707] border border-zinc-200 dark:border-white/5 rounded-[32px] shadow-2xl overflow-hidden flex flex-col z-10"
            >
              <div className="flex flex-col h-full p-8 md:p-10 relative">
                
                <header className="flex justify-between items-center mb-8 shrink-0 relative z-10">
                  <div className="flex flex-col">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase leading-none">
                      {getDisplayTitle(selectedProject.title)}
                    </h2>
                    <div className="flex items-center mt-3">
                        <span className="text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-[0.4em]">
                          {selectedProject.subtitle[lang]}
                        </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedProject.github && (
                      <motion.a 
                        href={selectedProject.github} 
                        target="_blank" 
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={springTransition}
                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5"
                      >
                        <Icons.Github size={20} strokeWidth={1.5} />
                      </motion.a>
                    )}
                    <motion.a 
                      href={selectedProject.link} 
                      target="_blank" 
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={springTransition}
                      className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 rounded-full font-bold uppercase tracking-[0.1em] text-[10px]"
                    >
                      {labels[lang].visit} <Icons.ArrowUpRight size={14} />
                    </motion.a>
                    <motion.button 
                      onClick={() => setSelectedId(null)} 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition={springTransition}
                      className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 ml-2"
                    >
                      <Icons.X size={20} strokeWidth={1.5} />
                    </motion.button>
                  </div>
                </header>

                <div className="grid lg:grid-cols-2 gap-10 min-h-0 flex-1 relative z-10">
                  
                  <div className="flex flex-col gap-6 relative">
                    
                    {/* Imagen principal */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden flex items-center justify-center group shadow-xl border border-zinc-200/50 dark:border-white/5 bg-zinc-100 dark:bg-black/50">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-purple-500/10 dark:bg-purple-500/5 blur-[80px] rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"></div>
                        
                        <AnimatePresence mode="wait">
                            <motion.img 
                              key={activeImg} 
                              src={selectedProject.images[activeImg]} 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }} 
                              exit={{ opacity: 0 }} 
                              transition={{ duration: 0.25, ease: "easeInOut" }} 
                              className="w-full h-full object-cover relative z-10" 
                              style={{ transform: "translateZ(0)", WebkitFontSmoothing: "antialiased" }}
                            />
                        </AnimatePresence>
                    </div>

                    {/* MINIATURAS CORREGIDAS: Cambiamos grid-cols-4 a grid-cols-3 */}
                    <div className="grid grid-cols-3 gap-4 shrink-0 pb-1 px-1">
                        {selectedProject.images.map((img, idx) => (
                            <motion.button 
                              key={idx} 
                              onClick={() => setActiveImg(idx)}
                              whileHover={{ scale: activeImg === idx ? 1 : 1.05, y: activeImg === idx ? 0 : -2 }}
                              whileTap={{ scale: 0.95 }}
                              transition={springTransition}
                              className={`relative aspect-video rounded-xl overflow-hidden focus:outline-none transition-all duration-300 ${
                                activeImg === idx 
                                ? 'border border-purple-500/70 shadow-[0_0_15px_rgba(168,85,247,0.3)] opacity-100 scale-[1.02]' 
                                : 'border border-zinc-200 dark:border-white/5 opacity-40 hover:opacity-100'
                              }`}
                            >
                                <img 
                                  src={img} 
                                  className="w-full h-full object-cover" 
                                  style={{ transform: "translateZ(0)" }}
                                />
                            </motion.button>
                        ))}
                    </div>
                  </div>

                  <aside className="flex flex-col gap-8 py-2 overflow-y-auto scrollbar-hide pr-6">
                    <section>
                      <h4 className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span> {labels[lang].arch}
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-light">
                        {selectedProject.description[lang]}
                      </p>
                    </section>
                    
                    <section>
                      <h4 className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span> {labels[lang].eng}
                      </h4>
                      <p className="text-zinc-800 dark:text-zinc-300 text-[14px] leading-relaxed font-medium">
                        {selectedProject.engineeringFocus[lang]}
                      </p>
                    </section>
                    
                    <section className="mt-auto pt-6 border-t border-zinc-100 dark:border-white/5">
                      <h4 className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-[0.2em] mb-4">
                        {labels[lang].tech}
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {selectedProject.tools.map((tool) => {
                          const IconComp = Icons[tool.icon as keyof typeof Icons] as React.ElementType;
                          if (!IconComp) return null;
                          return (
                            <motion.div 
                              key={tool.name} 
                              whileHover={{ y: -2, scale: 1.02 }}
                              transition={springTransition}
                              className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-white/[0.03] rounded-lg border border-zinc-200/50 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-300 cursor-default"
                            >
                              <IconComp size={12} strokeWidth={1.5} />
                              <span className="text-[9px] uppercase tracking-widest font-bold">{tool.name}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </section>
                  </aside>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};