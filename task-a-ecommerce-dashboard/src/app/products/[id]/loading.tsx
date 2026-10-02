import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div role="status" aria-label="Loading product" className="grid gap-10 lg:grid-cols-2">
      <Skeleton className="aspect-square w-full rounded-3xl" />
      <div className="space-y-4">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    </div>
  );
}
