"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function ProductsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorState
      title="Couldn't load products"
      message="Something went wrong while loading this page. Please try again."
      onRetry={reset}
    />
  );
}
