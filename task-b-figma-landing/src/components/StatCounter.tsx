"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

interface StatCounterProps {
  value: number;
  /** Minimum digits, so 5 renders as "05". */
  pad?: number;
  className?: string;
  plusClassName?: string;
}

/** Big number that counts up when scrolled into view, followed by a superscript plus. */
export function StatCounter({ value, pad = 2, className = "", plusClassName = "" }: StatCounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const current = useCountUp(value, inView);

  return (
    <span
      ref={ref}
      className={`inline-flex items-start font-numeric font-extrabold leading-[0.85] tracking-[-0.04em] ${className}`}
    >
      <span aria-hidden="true" className="tabular-nums">
        {String(current).padStart(pad, "0")}
      </span>
      <span className="sr-only">{String(value).padStart(pad, "0")}</span>
      <span aria-hidden="true" className={`ml-[0.04em] font-display text-[0.32em] font-bold leading-none ${plusClassName}`}>
        +
      </span>
    </span>
  );
}
