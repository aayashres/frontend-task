"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";

/** Adds to the cart when logged in, otherwise sends the visitor to log in and back. */
export function useAddToCart() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const addItem = useCartStore((s) => s.addItem);

  return useCallback(
    (product: Product, quantity = 1): boolean => {
      if (!user) {
        // Read the location at click time so the hook doesn't need useSearchParams (which forces Suspense).
        const back = window.location.pathname + window.location.search;
        router.push(`/login?redirect=${encodeURIComponent(back)}`);
        return false;
      }
      addItem(product, quantity);
      return true;
    },
    [user, addItem, router],
  );
}
