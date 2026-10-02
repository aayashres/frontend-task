"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart-store";

export function CheckoutSuccess() {
  const clear = useCartStore((state) => state.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <section className="mx-auto max-w-xl py-12 text-center sm:py-20">
      <div
        className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
        aria-hidden="true"
      >
        <span className="text-3xl font-bold">✓</span>
      </div>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Checkout complete
      </h1>
      <p className="mt-3 text-slate-600">
        Thank you for your order. Your checkout has been completed successfully.
      </p>
      <ButtonLink href="/products" size="lg" className="mt-8">
        Back to products
      </ButtonLink>
    </section>
  );
}
