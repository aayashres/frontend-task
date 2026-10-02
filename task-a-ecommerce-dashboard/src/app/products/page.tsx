import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsView } from "@/components/products/ProductsView";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ErrorState } from "@/components/ui/ErrorState";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { ApiError } from "@/lib/api/client";
import { getCategories, getProducts } from "@/lib/api/products";
import { parseSort } from "@/lib/filters";

export const metadata: Metadata = {
  title: "All products",
  description: "Search, filter and sort the full catalogue of electronics, jewelery and clothing.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const sort = parseSort((await searchParams).sort);

  let products, categories;
  try {
    [products, categories] = await Promise.all([getProducts(sort), getCategories()]);
  } catch (error) {
    const message = error instanceof ApiError ? error.message : "We couldn't load the products.";
    return <ErrorState title="Couldn't load products" message={message} />;
  }

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">All products</h1>
        <p className="mt-2 text-slate-500">Server-rendered catalogue with instant client-side filtering.</p>
        {(products.isFallback || categories.isFallback) && (
          <p role="status" className="mt-4 inline-block rounded-xl bg-amber-50 px-4 py-2 text-sm text-amber-800 ring-1 ring-amber-200">
            The live store API is unreachable, so you&apos;re seeing a saved copy of the catalogue.
          </p>
        )}
      </header>

      <ErrorBoundary fallbackTitle="Couldn't display products">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsView products={products.data} categories={categories.data} sort={sort} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
