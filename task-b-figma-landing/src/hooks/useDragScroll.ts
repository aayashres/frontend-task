"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const DRAG_THRESHOLD_PX = 4;

/**
 * Turns a horizontally scrollable element into a drag-to-scroll track and
 * reports scroll progress so a custom scrollbar can mirror it.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState({ start: 0, size: 1 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const size = Math.min(1, clientWidth / scrollWidth);
    const maxScroll = scrollWidth - clientWidth;
    const ratio = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setProgress({ size, start: ratio * (1 - size) });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      resize.disconnect();
    };
  }, [measure]);

  const onPointerDown = (event: ReactPointerEvent<T>) => {
    // Touch already scrolls natively; only mouse/pen need the drag behaviour.
    if (event.pointerType === "touch" || event.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: event.clientX, startScroll: el.scrollLeft, moved: false };
  };

  const onPointerMove = (event: ReactPointerEvent<T>) => {
    const state = drag.current;
    const el = ref.current;
    if (!state.active || !el) return;
    const delta = event.clientX - state.startX;
    if (!state.moved && Math.abs(delta) > DRAG_THRESHOLD_PX) {
      state.moved = true;
      setDragging(true);
      el.setPointerCapture(event.pointerId);
    }
    if (state.moved) el.scrollLeft = state.startScroll - delta;
  };

  const endDrag = (event: ReactPointerEvent<T>) => {
    const el = ref.current;
    if (drag.current.active && drag.current.moved && el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
    drag.current.active = false;
    setDragging(false);
  };

  const scrollByPage = (direction: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return {
    ref,
    dragging,
    progress,
    scrollByPage,
    handlers: { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag, onPointerLeave: endDrag },
  };
}
