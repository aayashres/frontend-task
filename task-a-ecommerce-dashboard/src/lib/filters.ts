import type { Product, SortOrder } from "@/types/product";

export interface ProductFilters {
  category: string;
  search: string;
  minPrice: number | null;
  maxPrice: number | null;
  page: number;
}

export const DEFAULT_FILTERS: ProductFilters = {
  category: "",
  search: "",
  minPrice: null,
  maxPrice: null,
  page: 1,
};

export function parseSort(value: string | string[] | undefined): SortOrder | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "asc" || v === "desc" ? v : undefined;
}

function parseNumber(value: string | null): number | null {
  if (value === null || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function filtersFromParams(params: URLSearchParams): ProductFilters {
  const page = Number(params.get("page"));
  return {
    category: params.get("category") ?? "",
    search: params.get("search") ?? "",
    minPrice: parseNumber(params.get("minPrice")),
    maxPrice: parseNumber(params.get("maxPrice")),
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

/** Writes non-default filter values into a copy of `params`, leaving unrelated params (e.g. sort) alone. */
export function applyFiltersToParams(
  params: URLSearchParams,
  filters: ProductFilters,
): URLSearchParams {
  const next = new URLSearchParams(params);
  const search = filters.search.trim();

  if (filters.category) next.set("category", filters.category);
  else next.delete("category");

  if (search) next.set("search", search);
  else next.delete("search");

  if (filters.minPrice !== null) next.set("minPrice", String(filters.minPrice));
  else next.delete("minPrice");

  if (filters.maxPrice !== null) next.set("maxPrice", String(filters.maxPrice));
  else next.delete("maxPrice");

  if (filters.page > 1) next.set("page", String(filters.page));
  else next.delete("page");

  return next;
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const query = filters.search.trim().toLowerCase();
  return products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (query && !p.title.toLowerCase().includes(query)) return false;
    if (filters.minPrice !== null && p.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && p.price > filters.maxPrice) return false;
    return true;
  });
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return (
    filters.category !== "" ||
    filters.search.trim() !== "" ||
    filters.minPrice !== null ||
    filters.maxPrice !== null
  );
}
