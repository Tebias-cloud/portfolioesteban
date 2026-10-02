import React, { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/utils";
import { useStore } from "@nanostores/react";
import { $isModalOpen } from "../../store/ui";

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((char) => char + char).join("");
  const hexInt = parseInt(hex, 16);
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
  paused?: boolean;
}

const checkIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
};

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 60,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  paused: propsPaused = false,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const rafID = useRef<number | null>(null);
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isModalOpen = useStore($isModalOpen);
  const paused = propsPaused || isModalOpen;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const circleParams = (): Circle => {
    const isMobile = checkIsMobile();
    // En mobile: movimiento sutil y muy lento (factor 0.03 vs 0.1)
    const speedFactor = isMobile ? 0.03 : 0.1;
    return {
      x: Math.floor(Math.random() * canvasSize.current.w),
      y: Math.floor(Math.random() * canvasSize.current.h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * speedFactor,
      dy: (Math.random() - 0.5) * speedFactor,
      magnetism: 0.1 + Math.random() * 4,
    };
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle: Circle) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.save();
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.restore();
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < circles.current.length; i++) {
      drawCircle(circles.current[i]);
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      const isMobile = checkIsMobile();
      // DPR max 1.5 en mobile para no saturar GPUs móviles; max 2 en desktop
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      // Cantidad reducida en mobile (16 partículas) vs desktop (por defecto 50/60)
      const targetQuantity = isMobile ? 16 : quantity;

      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      circles.current = [];
      for (let i = 0; i < targetQuantity; i++) {
        circles.current.push(circleParams());
      }
    }
  };

  const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    if (paused) {
      rafID.current = null;
      return;
    }
    clearContext();
    const isMobile = checkIsMobile();

    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;

      // En mobile no hay interacción con mouse/touch
      if (!isMobile) {
        circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
        circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
      } else {
        circle.translateX = 0;
        circle.translateY = 0;
      }

      drawCircle(circle);
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current[i] = circleParams();
      }
    });
    rafID.current = window.requestAnimationFrame(animate);
  };

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!paused && !prefersReducedMotion) {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
        rafID.current = null;
      }
      rafID.current = window.requestAnimationFrame(animate);
    }

    const handleResize = () => {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => {
        initCanvas();
      }, 200);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafID.current != null) {
          window.cancelAnimationFrame(rafID.current);
          rafID.current = null;
        }
      } else if (!paused && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (rafID.current != null) {
          window.cancelAnimationFrame(rafID.current);
          rafID.current = null;
        }
        rafID.current = window.requestAnimationFrame(animate);
      }
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      if (motionQuery.matches) {
        if (rafID.current != null) {
          window.cancelAnimationFrame(rafID.current);
          rafID.current = null;
        }
        drawParticles();
      } else if (!paused && !document.hidden) {
        if (rafID.current != null) {
          window.cancelAnimationFrame(rafID.current);
          rafID.current = null;
        }
        rafID.current = window.requestAnimationFrame(animate);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener?.("change", handleMotionChange);

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
        rafID.current = null;
      }
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener?.("change", handleMotionChange);
    };
  }, [color, paused]);

  // Manejo de mousemove directamente con refs sin re-renderizar React (solo en desktop)
  useEffect(() => {
    // En mobile o dispositivos táctiles NO se registra el listener mousemove
    if (checkIsMobile()) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const { w, h } = canvasSize.current;
        const x = event.clientX - rect.left - w / 2;
        const y = event.clientY - rect.top - h / 2;
        const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
        if (inside) {
          mouse.current.x = x;
          mouse.current.y = y;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  return (
    <div
      className={cn(
        "pointer-events-none transition-opacity duration-1000",
        className,
        paused && "opacity-20",
        mounted ? "" : "opacity-0"
      )}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
