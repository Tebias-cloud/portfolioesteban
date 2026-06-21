"use client"
import { useState, useCallback, useEffect, useRef } from "react";
import { Moon, Sun, User, Briefcase, FolderCode } from "lucide-react";
import { flushSync } from "react-dom";
import { useStore } from '@nanostores/react';
import { $lang } from '../store/ui';

export const Navbar = () => {
  const currentLang = useStore($lang);
  const [isDark, setIsDark] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleLang = () => {
    $lang.set(currentLang === 'ES' ? 'EN' : 'ES');
  };

  const toggleTheme = useCallback(() => {
    if (!buttonRef.current || !document.startViewTransition) {
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

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-full border border-zinc-200/80 dark:border-white/5 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl shadow-md dark:shadow-2xl transition-colors duration-500">
        <div className="flex items-center">
          <a href="#top" title="Perfil" className="p-2.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"><User size={18} /></a>
          <a href="#projects" title="Proyectos" className="p-2.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"><FolderCode size={18} /></a>
          <a href="#experience" title="Experiencia" className="p-2.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"><Briefcase size={18} /></a>
        </div>
        <div className="w-px h-4 bg-zinc-200 dark:bg-white/10 mx-1 transition-colors duration-500" />
        <div className="flex items-center gap-0.5">
          <button onClick={toggleLang} className="flex items-center justify-center w-10 h-10 rounded-full text-[10px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors">
            {currentLang}
          </button>
          <button ref={buttonRef} onClick={toggleTheme} className="p-2.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};