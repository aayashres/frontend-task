import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <div className="mb-8 space-y-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <ProductGridSkeleton />
    </>
  );
}
