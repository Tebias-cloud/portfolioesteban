"use client"
import { useState, useCallback, useEffect, useRef } from "react";
import { Moon, Sun, User, Briefcase, FolderCode } from "lucide-react";
import { flushSync } from "react-dom";
import { useStore } from '@nanostores/react';
import { $lang, $isModalOpen } from '../store/ui';
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const currentLang = useStore($lang);
  const isModalOpen = useStore($isModalOpen);
  const [isDark, setIsDark] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleLang = () => {
    $lang.set(currentLang === 'ES' ? 'EN' : 'ES');
  };

  const toggleTheme = useCallback(() => {
    const isTouchOrMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    if (!buttonRef.current || !document.startViewTransition || isTouchOrMobile) {
      const newTheme = !isDark;
      setIsDark(newTheme);
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      });
    });

    transition.ready.then(() => {
      const { top, left, width, height } = buttonRef.current!.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top));

      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
        { duration: 450, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }, [isDark]);

  const navLabels = {
    ES: {
      profile: "Ir a perfil",
      projects: "Ir a proyectos",
      experience: "Ir a experiencia",
      langToggle: "Cambiar idioma a inglés",
      themeDark: "Cambiar a modo claro",
      themeLight: "Cambiar a modo oscuro"
    },
    EN: {
      profile: "Go to profile",
      projects: "Go to projects",
      experience: "Go to experience",
      langToggle: "Switch language to Spanish",
      themeDark: "Switch to light mode",
      themeLight: "Switch to dark mode"
    }
  };

  const labels = navLabels[currentLang as "ES" | "EN"];

  return (
    <nav
      aria-label="Navegación principal"
      className={`site-navbar fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-opacity duration-200 ease-in-out ${
        isModalOpen
          ? "opacity-0 pointer-events-none invisible"
          : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-full border border-zinc-200/80 dark:border-white/5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-md dark:shadow-2xl transition-[color,background-color] duration-300">
        <div className="flex items-center">
          <a
            href="#top"
            title={labels.profile}
            aria-label={labels.profile}
            className="p-2.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-[color,background-color] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80"
          >
            <User size={18} />
          </a>
          <a
            href="#projects"
            title={labels.projects}
            aria-label={labels.projects}
            className="p-2.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-[color,background-color] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80"
          >
            <FolderCode size={18} />
          </a>
          <a
            href="#experience"
            title={labels.experience}
            aria-label={labels.experience}
            className="p-2.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-[color,background-color] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80"
          >
            <Briefcase size={18} />
          </a>
        </div>
        <div className="w-px h-4 bg-zinc-200 dark:bg-white/10 mx-1 transition-[color,background-color] duration-300" />
        <div className="flex items-center gap-0.5">
          <button
            onClick={toggleLang}
            aria-label={labels.langToggle}
            className="flex items-center justify-center w-10 h-10 rounded-full text-[10px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-[color,background-color] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80 cursor-pointer"
          >
            {currentLang}
          </button>
          <button
            ref={buttonRef}
            onClick={toggleTheme}
            aria-label={isDark ? labels.themeDark : labels.themeLight}
            className="rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-[color,background-color] duration-300 w-10 h-10 flex items-center justify-center cursor-pointer overflow-hidden relative focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/80"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "sun" : "moon"}
                initial={{ y: 12, opacity: 0, rotate: 45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -12, opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </nav>
  );
};
