import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import { Rating } from "@/components/ui/Rating";
import { capitalize, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import { AddToCartButton } from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  return (
    <article className="group fade-up flex flex-col overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 hover:ring-brand-200">
      <Link href={`/products/${product.id}`} className="flex flex-1 flex-col focus-visible:outline-none">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
          <ProductImage
            src={product.image}
            alt={product.title}
            priority={priority}
            sizes="(min-width:1280px) 22vw, (min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
            className="transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-600 shadow-sm backdrop-blur">
            {capitalize(product.category)}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-2 pb-1 pt-4">
          <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 group-hover:text-brand-600">
            {product.title}
          </h3>
          <Rating rating={product.rating} />
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-between gap-2 px-2 pb-1">
        <p className="text-xl font-extrabold tracking-tight">{formatPrice(product.price)}</p>
        <AddToCartButton product={product} size="sm" />
      </div>
    </article>
  );
}
