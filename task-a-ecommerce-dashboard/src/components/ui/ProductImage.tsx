"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BagIcon } from "./icons";

interface ProductImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** Product photo that degrades to a neutral placeholder when the image fails to load. */
export function ProductImage({ src, alt, sizes, priority, className }: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div role="img" aria-label={alt} className="grid size-full place-items-center bg-slate-100 text-slate-300">
        <BagIcon width={48} height={48} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailedSrc(src)}
      className={cn("object-contain p-6 mix-blend-multiply", className)}
    />
  );
}
