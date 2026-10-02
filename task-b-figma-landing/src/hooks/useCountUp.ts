"use client";

import { useEffect, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Animates an integer from 0 to `target` once `active` becomes true. */
export function useCountUp(target: number, active: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const [reduceMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    if (!active || reduceMotion) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs, reduceMotion]);

  // Users who prefer reduced motion skip the animation and see the final value immediately.
  return reduceMotion && active ? target : value;
}
