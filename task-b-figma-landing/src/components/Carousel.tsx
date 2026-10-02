"use client";

import Image from "next/image";
import { useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import type { Slide } from "@/data/content";
import { useDragScroll } from "@/hooks/useDragScroll";

interface CarouselProps {
  slides: readonly Slide[];
}

/**
 * Drag-to-scroll photo carousel with a "Drag" cursor bubble and a progress
 * scrollbar. Touch devices use native swipe; keyboard users get arrow keys.
 */
export function Carousel({ slides }: CarouselProps) {
  const { ref, dragging, progress, scrollByPage, handlers } = useDragScroll<HTMLDivElement>();
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const trackCursor = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByPage(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByPage(-1);
    }
  };

  const scrollPercent = Math.round((progress.start / Math.max(1 - progress.size, 0.0001)) * 100);

  return (
    <div
      className="relative"
      onPointerMove={trackCursor}
      onPointerLeave={() => setCursor(null)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Our work"
    >
      <div
        ref={ref}
        id="carousel-track"
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...handlers}
        className={`no-scrollbar flex gap-3 overflow-x-auto pl-gutter pr-gutter sm:gap-4 ${
          dragging ? "cursor-grabbing" : "snap-x snap-mandatory"
        } ${cursor ? "md:cursor-none" : ""}`}
        style={{ scrollPaddingLeft: "var(--spacing-gutter)" }}
      >
        {slides.map((slide, index) => (
          <figure
            key={slide.id}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            className="relative m-0 aspect-[16/9] w-[82%] shrink-0 snap-start overflow-hidden rounded-[10px] bg-neutral-200 sm:w-[72%] sm:rounded-2xl"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              draggable={false}
              priority={index === 0}
              sizes="(min-width: 640px) 72vw, 82vw"
              className="select-none object-cover"
            />
          </figure>
        ))}
      </div>

      {/* Custom "Drag" cursor bubble (hidden on touch / when the pointer leaves) */}
      {cursor && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 hidden size-[4.75rem] place-items-center rounded-full bg-[#d9d9d9]/95 text-xs font-medium text-ink shadow-sm backdrop-blur transition-transform duration-150 ease-out md:grid ${
            dragging ? "scale-90" : "scale-100"
          }`}
          style={{ left: cursor.x, top: cursor.y, translate: "-50% -50%" }}
        >
          Drag
        </div>
      )}

      {/* Progress scrollbar */}
      <div
        role="scrollbar"
        aria-orientation="horizontal"
        aria-controls="carousel-track"
        aria-valuenow={scrollPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative mx-gutter mt-8 h-[3px] rounded-full bg-track sm:mt-10"
      >
        <div
          className="absolute inset-y-0 rounded-full bg-thumb transition-[left] duration-100"
          style={{ width: `${progress.size * 100}%`, left: `${progress.start * 100}%` }}
        />
      </div>
    </div>
  );
}
