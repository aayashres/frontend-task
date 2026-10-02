import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getCategories, getProducts } from "@/lib/api/products";
import { capitalize } from "@/lib/utils";

export default async function HomePage() {
  const [{ data: products }, { data: categories }] = await Promise.all([getProducts(), getCategories()]);
  const topRated = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4);

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-fuchsia-600 px-6 py-16 text-white sm:px-14 sm:py-24">
        <div aria-hidden="true" className="absolute -right-20 -top-20 size-80 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden="true" className="absolute -bottom-24 left-1/3 size-72 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            New season · Free shipping on everything
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            Find things you&apos;ll actually love.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Electronics, jewelery and fashion in one fast, beautifully simple storefront.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/products" size="lg" variant="secondary">
              Shop now <ArrowRightIcon width={18} height={18} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="mb-6 text-2xl font-extrabold tracking-tight">
          Shop by category
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="group flex items-center justify-between rounded-2xl bg-white p-6 font-bold ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/10 hover:ring-brand-200"
            >
              {capitalize(category)}
              <ArrowRightIcon className="text-brand-500 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="top-rated-heading">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="top-rated-heading" className="text-2xl font-extrabold tracking-tight">
            Top rated
          </h2>
          <Link href="/products" className="text-sm font-semibold text-brand-600 hover:underline">
            View all →
          </Link>
        </div>
        <ProductGrid products={topRated} />
      </section>
    </div>
  );
}
