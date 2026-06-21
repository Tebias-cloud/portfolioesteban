"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { cn } from "../../lib/utils"

export const AnimatedThemeToggler = ({ className, duration = 400 }: { className?: string, duration?: number }) => {
  const [isDark, setIsDark] = useState(true) // Default Dark para tu diseño
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains("dark")
    setIsDark(isDarkTheme)
  }, [])

  const toggleTheme = useCallback(() => {
    if (!buttonRef.current || !document.startViewTransition) {
      const newTheme = !isDark
      setIsDark(newTheme)
      document.documentElement.classList.toggle("dark")
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
      })
    })

    transition.ready.then(() => {
      const { top, left, width, height } = buttonRef.current!.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top))

      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
        { duration, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      )
    })
  }, [isDark, duration])

  return (
    <button ref={buttonRef} onClick={toggleTheme} className={cn("p-2 text-zinc-400 hover:text-white transition-colors", className)}>
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}