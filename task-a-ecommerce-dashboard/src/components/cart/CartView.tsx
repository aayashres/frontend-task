"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/Button";
import { TrashIcon } from "@/components/ui/icons";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Skeleton } from "@/components/ui/Skeleton";
import { useHydrated } from "@/hooks/useHydrated";
import { capitalize, formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import {
  selectItemCount,
  selectSubtotal,
  useCartStore,
} from "@/store/cart-store";

export function CartView() {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAuthStore((s) => s.user);
  const items = useCartStore((s) => s.items);
  const itemCount = useCartStore(selectItemCount);
  const subtotal = useCartStore(selectSubtotal);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);

  const completeCheckout = () => {
    router.push("/checkout/success");
  };

  if (!hydrated) {
    return (
      <div className="space-y-4" role="status" aria-label="Loading cart">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <EmptyPanel
        title="Log in to view your cart"
        message="The cart is available to logged-in customers only."
        action={<ButtonLink href="/login?redirect=/cart">Log in</ButtonLink>}
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyPanel
        title="Your cart is empty"
        message="Looks like you haven't added anything yet."
        action={<ButtonLink href="/products">Start shopping</ButtonLink>}
      />
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem]">
      <ul className="space-y-4">
        {items.map(({ product, quantity }) => (
          <li
            key={product.id}
            className="fade-up flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200/70 sm:gap-6"
          >
            <Link
              href={`/products/${product.id}`}
              className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:size-32"
            >
              <ProductImage
                src={product.image}
                alt={product.title}
                sizes="128px"
                className="p-3"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {capitalize(product.category)}
              </p>
              <Link
                href={`/products/${product.id}`}
                className="mt-1 line-clamp-2 font-semibold hover:text-brand-600"
              >
                {product.title}
              </Link>
              <p className="mt-1 text-sm text-slate-500">
                {formatPrice(product.price)} each
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                <QuantitySelector
                  size="sm"
                  value={quantity}
                  onChange={(next) => updateQuantity(product.id, next)}
                />
                <div className="flex items-center gap-2">
                  <p className="font-extrabold">
                    {formatPrice(product.price * quantity)}
                  </p>
                  <Button
                    variant="danger"
                    size="sm"
                    aria-label={`Remove ${product.title} from cart`}
                    onClick={() => removeItem(product.id)}
                  >
                    <TrashIcon width={18} height={18} />
                  </Button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="rounded-2xl bg-white p-6 ring-1 ring-slate-200/70 lg:sticky lg:top-24">
        <h2 className="text-lg font-extrabold">Order summary</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Items ({itemCount})</dt>
            <dd className="font-semibold">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Shipping</dt>
            <dd className="font-semibold text-emerald-600">Free</dd>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-4 text-base">
            <dt className="font-bold">Total</dt>
            <dd className="text-xl font-extrabold">{formatPrice(subtotal)}</dd>
          </div>
        </dl>
        <Button size="lg" fullWidth className="mt-6" onClick={completeCheckout}>
          Checkout
        </Button>
        <Button variant="ghost" fullWidth className="mt-2" onClick={clear}>
          Clear cart
        </Button>
      </aside>
    </div>
  );
}

function EmptyPanel({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white px-8 py-14 text-center ring-1 ring-slate-200">
      <h2 className="text-xl font-extrabold">{title}</h2>
      <p className="mb-6 mt-2 text-slate-500">{message}</p>
      {action}
    </div>
  );
}
