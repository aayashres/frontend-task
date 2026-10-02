"use client";

import { MAX_CART_QUANTITY } from "@/lib/config";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = MAX_CART_QUANTITY,
  size = "md",
}: QuantitySelectorProps) {
  const button = cn(
    "grid place-items-center font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent",
    size === "md" ? "size-11 text-lg" : "size-9",
  );

  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
      <button
        type="button"
        aria-label="Decrease quantity"
        className={button}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <output aria-live="polite" className={cn("text-center text-sm font-semibold tabular-nums", size === "md" ? "w-10" : "w-8")}>
        {value}
      </output>
      <button
        type="button"
        aria-label="Increase quantity"
        className={button}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
