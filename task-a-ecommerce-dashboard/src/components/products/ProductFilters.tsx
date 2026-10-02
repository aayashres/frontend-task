"use client";

import { Button } from "@/components/ui/Button";
import { SearchIcon } from "@/components/ui/icons";
import { cn, capitalize } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  const options = [{ value: "", label: "All categories" }, ...categories.map((c) => ({ value: c, label: capitalize(c) }))];

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Category</legend>
      <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value || "all"}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "rounded-xl px-3.5 py-2 text-left text-sm font-medium transition",
                active
                  ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                  : "text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 lg:ring-0",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

interface PriceRangeFilterProps {
  min: number | null;
  max: number | null;
  /** Lowest and highest price in the catalogue; used as placeholders. */
  bounds: { min: number; max: number };
  onChange: (range: { min: number | null; max: number | null }) => void;
}

const toNumber = (value: string): number | null => {
  const n = parseFloat(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

/**
 * Uncontrolled price inputs that commit on blur / Enter. Mount it with a `key`
 * derived from the committed values so external URL changes reset the fields.
 */
export function PriceRangeFilter({ min, max, bounds, onChange }: PriceRangeFilterProps) {
  const commit = (form: HTMLFormElement) => {
    const data = new FormData(form);
    let nextMin = toNumber(String(data.get("min") ?? ""));
    let nextMax = toNumber(String(data.get("max") ?? ""));
    if (nextMin !== null && nextMax !== null && nextMin > nextMax) [nextMin, nextMax] = [nextMax, nextMin];
    if (nextMin !== min || nextMax !== max) onChange({ min: nextMin, max: nextMax });
  };

  const inputClass =
    "h-11 w-full rounded-xl bg-white px-3 text-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-2 focus:outline-brand-500";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        commit(e.currentTarget);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) commit(e.currentTarget);
      }}
    >
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Price range</p>
      <div className="flex items-center gap-2">
        <label className="flex-1">
          <span className="sr-only">Minimum price</span>
          <input
            name="min"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            defaultValue={min ?? ""}
            placeholder={`$${Math.floor(bounds.min)}`}
            className={inputClass}
          />
        </label>
        <span className="text-slate-400">–</span>
        <label className="flex-1">
          <span className="sr-only">Maximum price</span>
          <input
            name="max"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            defaultValue={max ?? ""}
            placeholder={`$${Math.ceil(bounds.max)}`}
            className={inputClass}
          />
        </label>
      </div>
      <Button type="submit" variant="secondary" size="sm" fullWidth className="mt-3">
        Apply
      </Button>
    </form>
  );
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="relative block">
      <span className="sr-only">Search products by name</span>
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products by name…"
        className="h-12 w-full rounded-2xl bg-white pl-11 pr-4 text-sm shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-2 focus:outline-brand-500"
      />
    </label>
  );
}
