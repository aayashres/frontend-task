"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
}

/** Fades its children up the first time they scroll into view. */
export function Reveal({ children, delay = 0, as: Tag = "div", className }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>(0.15);

  return (
    <Tag
      ref={ref}
      data-reveal
      data-visible={inView}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
