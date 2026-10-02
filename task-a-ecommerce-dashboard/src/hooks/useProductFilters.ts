"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { applyFiltersToParams, filtersFromParams, type ProductFilters } from "@/lib/filters";

interface UpdateOptions {
  /** Replace the current history entry instead of pushing a new one (used while typing). */
  replace?: boolean;
}

/**
 * Keeps the product filters in the URL query string so filtered views can be
 * shared and work with the browser's back/forward buttons. Updates go through
 * the History API, which Next.js syncs into `useSearchParams` without a server
 * round-trip, so filtering stays purely client-side.
 */
export function useProductFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => filtersFromParams(new URLSearchParams(searchParams.toString())), [searchParams]);

  const update = useCallback(
    (patch: Partial<ProductFilters>, { replace = false }: UpdateOptions = {}) => {
      const params = new URLSearchParams(window.location.search);
      // Any filter change goes back to page 1 unless a page is set explicitly.
      const next: ProductFilters = { ...filtersFromParams(params), page: 1, ...patch };
      const qs = applyFiltersToParams(params, next).toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      window.history[replace ? "replaceState" : "pushState"](null, "", url);
    },
    [pathname],
  );

  return { filters, update };
}
