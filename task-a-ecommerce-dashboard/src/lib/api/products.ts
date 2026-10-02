import { FALLBACK_PRODUCTS } from "@/data/fallback-products";
import { PRODUCT_REVALIDATE_SECONDS } from "@/lib/config";
import type { ApiResult, Category, Product, SortOrder } from "@/types/product";
import { ApiError, apiFetch } from "./client";

const cacheOptions = { next: { revalidate: PRODUCT_REVALIDATE_SECONDS } };

/**
 * Runs a request and, if the API is unreachable or failing server-side,
 * resolves with the bundled snapshot instead so the UI keeps working.
 * Client errors (e.g. 404) still propagate.
 */
async function withFallback<T>(
  request: () => Promise<T>,
  fallback: () => T,
): Promise<ApiResult<T>> {
  try {
    return { data: await request(), isFallback: false };
  } catch (error) {
    if (error instanceof ApiError && (error.isNetworkError || error.isServerError)) {
      console.warn(`[api] falling back to bundled data: ${error.message}`);
      return { data: fallback(), isFallback: true };
    }
    throw error;
  }
}

function sortById(products: Product[], sort?: SortOrder): Product[] {
  // Mirrors the API: `sort=desc` returns the highest ids first.
  return [...products].sort((a, b) => (sort === "desc" ? b.id - a.id : a.id - b.id));
}

export function getProducts(sort?: SortOrder): Promise<ApiResult<Product[]>> {
  return withFallback(
    () => apiFetch<Product[]>("/products", { query: { sort }, ...cacheOptions }),
    () => sortById(FALLBACK_PRODUCTS, sort),
  );
}

export function getProduct(id: number): Promise<ApiResult<Product>> {
  return withFallback(
    () => apiFetch<Product>(`/products/${id}`, cacheOptions),
    () => {
      const product = FALLBACK_PRODUCTS.find((p) => p.id === id);
      if (!product) throw new ApiError("We couldn't find that product.", 404);
      return product;
    },
  );
}

export function getCategories(): Promise<ApiResult<Category[]>> {
  return withFallback(
    () => apiFetch<Category[]>("/products/categories", cacheOptions),
    () => [...new Set(FALLBACK_PRODUCTS.map((p) => p.category))],
  );
}
