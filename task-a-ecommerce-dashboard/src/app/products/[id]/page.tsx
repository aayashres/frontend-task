import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchasePanel } from "@/components/products/ProductPurchasePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { ErrorState } from "@/components/ui/ErrorState";
import { ProductImage } from "@/components/ui/ProductImage";
import { Rating } from "@/components/ui/Rating";
import { ApiError } from "@/lib/api/client";
import { getProduct } from "@/lib/api/products";
import { SITE_URL } from "@/lib/config";
import { capitalize, formatPrice, truncate } from "@/lib/utils";

type Props = PageProps<"/products/[id]">;

async function loadProduct(rawId: string) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) notFound();

  try {
    return (await getProduct(id)).data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await loadProduct(id);
    const description = truncate(product.description, 155);
    return {
      title: product.title,
      description,
      alternates: { canonical: `/products/${product.id}` },
      openGraph: { title: product.title, description, images: [{ url: product.image }], type: "website" },
      twitter: { card: "summary_large_image", title: product.title, description, images: [product.image] },
    };
  } catch {
    return { title: "Product" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  let product;
  try {
    product = await loadProduct(id);
  } catch (error) {
    // `notFound()` throws a special error that Next handles; only render for API failures.
    if (error instanceof ApiError) {
      return <ErrorState title="Couldn't load this product" message={error.message} />;
    }
    throw error;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.description,
    category: product.category,
    sku: String(product.id),
    url: `${SITE_URL}/products/${product.id}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.rate,
      reviewCount: product.rating.count,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/products/${product.id}`,
    },
  };

  return (
    <article className="fade-up">
      <JsonLd data={jsonLd} />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/products" className="hover:text-brand-600">
              Products
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-600">
              {capitalize(product.category)}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200/70">
          <ProductImage src={product.image} alt={product.title} priority sizes="(min-width:1024px) 45vw, 100vw" className="p-10" />
        </div>

        <div>
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-600">
            {capitalize(product.category)}
          </span>
          <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{product.title}</h1>
          <div className="mt-3">
            <Rating rating={product.rating} />
          </div>
          <p className="mt-6 text-4xl font-extrabold tracking-tight">{formatPrice(product.price)}</p>
          <p className="mt-6 leading-7 text-slate-600">{product.description}</p>

          <ProductPurchasePanel product={product} />

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200/70">
              <dt className="text-slate-500">Product ID</dt>
              <dd className="mt-1 font-semibold">#{product.id}</dd>
            </div>
            <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200/70">
              <dt className="text-slate-500">Reviews</dt>
              <dd className="mt-1 font-semibold">{product.rating.count} customers</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}
