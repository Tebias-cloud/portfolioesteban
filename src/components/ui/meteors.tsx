"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { useStore } from "@nanostores/react";
import { $isModalOpen } from "../../store/ui";

export const Meteors = ({
  number = 12,
  minDelay = 0.5,
  maxDelay = 4,
  minDuration = 3,
  maxDuration = 10,
  angle = 215,
  className,
  paused: propsPaused = false,
}: { number?: number; minDelay?: number; maxDelay?: number; minDuration?: number; maxDuration?: number; angle?: number; className?: string; paused?: boolean; }) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);
  const isModalOpen = useStore($isModalOpen);
  const paused = propsPaused || isModalOpen;

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * 100)}%)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s",
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={{ ...style, animationPlayState: paused ? "paused" : "running" }}
          className={cn("animate-meteor pointer-events-none absolute rotate-[var(--angle)]", className)}
        >
          {/* La línea ahora tiene color morado/fucsia coherente */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1.5px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-purple-500/40 via-fuchsia-500/20 to-transparent" />
        </span>
      ))}
    </>
  );
};