import { StarIcon } from "./icons";
import type { ProductRating } from "@/types/product";

interface RatingProps {
  rating: ProductRating;
  showCount?: boolean;
}

export function Rating({ rating, showCount = true }: RatingProps) {
  const rounded = Math.round(rating.rate);

  return (
    <div className="flex items-center gap-1.5 text-sm" aria-label={`Rated ${rating.rate} out of 5`}>
      <div className="flex text-amber-400">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} width={16} height={16} filled={i < rounded} />
        ))}
      </div>
      <span className="font-medium text-slate-700">{rating.rate.toFixed(1)}</span>
      {showCount && <span className="text-slate-400">({rating.count})</span>}
    </div>
  );
}
