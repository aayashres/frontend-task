"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CartIcon, CheckIcon } from "@/components/ui/icons";
import { useAddToCart } from "@/hooks/useAddToCart";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function AddToCartButton({ product, quantity = 1, size = "md", fullWidth }: AddToCartButtonProps) {
  const addToCart = useAddToCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <Button
      size={size}
      fullWidth={fullWidth}
      variant={added ? "secondary" : "primary"}
      onClick={() => setAdded(addToCart(product, quantity))}
      aria-live="polite"
    >
      {added ? (
        <>
          <CheckIcon width={18} height={18} className="text-emerald-500" /> Added
        </>
      ) : (
        <>
          <CartIcon width={18} height={18} /> Add to cart
        </>
      )}
    </Button>
  );
}
