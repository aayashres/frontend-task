"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { FilterIcon } from "@/components/ui/icons";
import { Pagination } from "@/components/ui/Pagination";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useProductFilters } from "@/hooks/useProductFilters";
import {
  DEFAULT_FILTERS,
  filterProducts,
  hasActiveFilters,
} from "@/lib/filters";
import { PRODUCTS_PER_PAGE } from "@/lib/config";
import { cn, capitalize, formatPrice } from "@/lib/utils";
import type { Product, SortOrder } from "@/types/product";
import {
  CategoryFilter,
  PriceRangeFilter,
  SearchInput,
} from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";

interface ProductsViewProps {
  /** Products fetched on the server, already sorted by the API. */
  products: Product[];
  categories: string[];
  sort: SortOrder | undefined;
}

const SORT_OPTIONS: Array<{ value: SortOrder | ""; label: string }> = [
  { value: "", label: "Default order" },
  { value: "asc", label: "Oldest first (asc)" },
  { value: "desc", label: "Newest first (desc)" },
];

export function ProductsView({
  products,
  categories,
  sort,
}: ProductsViewProps) {
  const router = useRouter();
  const { filters, update } = useProductFilters();
  const [isSorting, startTransition] = useTransition();
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Search box: typed value is local, the debounced value is written to the URL.
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebouncedValue(searchInput);

  useEffect(() => {
    if (debouncedSearch.trim() !== filters.search.trim()) {
      // First keystroke adds a history entry; further typing refines it in place.
      update(
        { search: debouncedSearch },
        { replace: filters.search.trim() !== "" },
      );
    }
    // Only react to the user's typing, not to URL changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Back/forward navigation or "clear filters" changed the URL: mirror it in the input.
  const [urlSearch, setUrlSearch] = useState(filters.search);
  if (urlSearch !== filters.search) {
    setUrlSearch(filters.search);
    if (searchInput.trim() !== filters.search.trim())
      setSearchInput(filters.search);
  }

  const bounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PRODUCTS_PER_PAGE),
  );
  const page = Math.min(filters.page, totalPages);
  const pageItems = filtered.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  const changeSort = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set("sort", value);
    else params.delete("sort");
    params.delete("page");
    const qs = params.toString();
    startTransition(() => router.push(qs ? `?${qs}` : "?", { scroll: false }));
  };

  const goToPage = (next: number) => {
    update({ page: next });
    document
      .getElementById("product-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setSearchInput("");
    update(DEFAULT_FILTERS);
  };

  const active = hasActiveFilters(filters);

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      {/* Filters */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Button
          variant="secondary"
          fullWidth
          className="lg:hidden"
          aria-expanded={filtersOpen}
          aria-controls="filter-panel"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <FilterIcon width={18} height={18} />{" "}
          {filtersOpen ? "Hide filters" : "Show filters"}
        </Button>

        <div
          id="filter-panel"
          className={cn(
            "mt-4 space-y-7 rounded-2xl bg-white p-5 ring-1 ring-slate-200/70 lg:mt-0 lg:block",
            filtersOpen ? "block" : "hidden",
          )}
        >
          <CategoryFilter
            categories={categories}
            value={filters.category}
            onChange={(category) => update({ category })}
          />
          <PriceRangeFilter
            key={`${filters.minPrice}-${filters.maxPrice}`}
            min={filters.minPrice}
            max={filters.maxPrice}
            bounds={bounds}
            onChange={({ min, max }) =>
              update({ minPrice: min, maxPrice: max })
            }
          />
          {active && (
            <Button variant="ghost" size="sm" fullWidth onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      </aside>

      {/* Results */}
      <section id="product-results" className="min-w-0 scroll-mt-24">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <SearchInput value={searchInput} onChange={setSearchInput} />
          </div>
          <label className="block sm:w-56">
            <span className="sr-only">Sort products</span>
            <select
              value={sort ?? ""}
              onChange={(e) => changeSort(e.target.value)}
              className="h-12 w-full rounded-2xl bg-white px-4 text-sm font-medium shadow-sm ring-1 ring-slate-200 focus:outline-2 focus:outline-brand-500"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500"
          aria-live="polite"
        >
          <span>
            Showing <b className="text-slate-800">{pageItems.length}</b> of{" "}
            <b className="text-slate-800">{filtered.length}</b> products
          </span>
          {filters.category && (
            <Chip
              label={capitalize(filters.category)}
              onRemove={() => update({ category: "" })}
            />
          )}
          {filters.minPrice !== null && (
            <Chip
              label={`≥ ${formatPrice(filters.minPrice)}`}
              onRemove={() => update({ minPrice: null })}
            />
          )}
          {filters.maxPrice !== null && (
            <Chip
              label={`≤ ${formatPrice(filters.maxPrice)}`}
              onRemove={() => update({ maxPrice: null })}
            />
          )}
        </div>

        <div
          className={cn(
            "transition-opacity",
            isSorting && "pointer-events-none opacity-50",
          )}
        >
          {pageItems.length > 0 ? (
            <ProductGrid products={pageItems} />
          ) : (
            <div className="rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-slate-200">
              <p className="text-lg font-bold">
                No products match your filters
              </p>
              <p className="mt-1 text-slate-500">
                Try a different search term or widen the price range.
              </p>
              <Button className="mt-6" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </section>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Remove filter ${label}`}
      className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100"
    >
      {label} <span aria-hidden="true">×</span>
    </button>
  );
}
