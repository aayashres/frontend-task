"use client";

import { useState } from "react";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import { AddToCartButton } from "./AddToCartButton";

/** Quantity picker + add-to-cart for the product detail page. */
export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-8 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200/70">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total</p>
          <p className="text-2xl font-extrabold">{formatPrice(product.price * quantity)}</p>
        </div>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>
      <div className="mt-5">
        <AddToCartButton product={product} quantity={quantity} size="lg" fullWidth />
      </div>
    </div>
  );
}
