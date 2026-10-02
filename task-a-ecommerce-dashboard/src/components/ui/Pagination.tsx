import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** Returns page numbers with `null` marking a gap, e.g. [1, null, 4, 5, 6, null, 12]. */
function getPageItems(page: number, total: number): Array<number | null> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const items: Array<number | null> = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push(null);
    items.push(p);
  });
  return items;
}

const buttonBase =
  "grid size-10 place-items-center rounded-xl text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-brand-500";

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(buttonBase, "bg-white ring-1 ring-slate-200 hover:bg-slate-50 disabled:opacity-40")}
      >
        <ChevronLeftIcon />
      </button>

      {getPageItems(page, totalPages).map((item, i) =>
        item === null ? (
          <span key={`gap-${i}`} className="px-1 text-slate-400">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={cn(
              buttonBase,
              item === page
                ? "bg-gradient-to-br from-brand-500 to-fuchsia-600 text-white shadow-md shadow-brand-500/30"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={cn(buttonBase, "bg-white ring-1 ring-slate-200 hover:bg-slate-50 disabled:opacity-40")}
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
