"use client";

import { ButtonLink } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";

export default function ProductError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorState
      title="Couldn't load this product"
      message="Something went wrong while loading the product. Please try again."
      onRetry={reset}
      action={
        <ButtonLink href="/products" variant="secondary">
          Back to products
        </ButtonLink>
      }
    />
  );
}
