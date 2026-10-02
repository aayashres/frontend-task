# Services & Courses — Figma UI Build (Task B)

A responsive **Next.js (App Router) + TypeScript + Tailwind CSS 4** implementation of the two frames in the provided Figma file: **service** and **Course**.

## What's implemented

**Service frame**
- Intro statement with a blue "Services" pill button, and the service list (*UI & UX Development*, *Blockchain*)
- Photo **carousel**: drag with the mouse (custom round "Drag" cursor), swipe on touch, arrow keys when focused, snap scrolling
- Progress scrollbar under the carousel that mirrors the scroll position
- "Our Partners" row with grayscale logos (colour on hover)

**Course frame**
- "Explore our classes…" eyebrow with the *Dive Into **What's Hot Right Now!** 🔥* heading
- Red **All Courses** card with tech badges and a **23+** count-up
- Two blush stat cards with vertical titles: **05+ Upcoming Courses** and **10+ Ongoing Courses**
- Numbers count up once when scrolled into view; sections fade in (both respect `prefers-reduced-motion`)

**Responsive** — fluid gutters and type via `clamp()`; the three course cards collapse to a "wide + two tall" grid on mobile. No horizontal overflow from 320px up to ultra-wide (content is capped at 120rem).

**Accessibility** — semantic landmarks/headings, carousel roles and labels, keyboard support, visible focus rings, screen-reader-friendly counters.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Structure

```
src/
├─ app/                 layout (next/font: Outfit, Hanken Grotesk, Bricolage Grotesque), page, globals.css (design tokens)
├─ components/          ServicesSection, CoursesSection, Carousel, StatCounter, Reveal, PartnerLogos, CourseIcons
├─ hooks/               useDragScroll, useInView, useCountUp
└─ data/content.ts      All copy, slides and numbers in one typed place
public/images/          Carousel photos
```

## Notes on fidelity

The Figma file was viewed read-only (no Dev Mode / inspect access), so spacing, font sizes and colours were measured from the rendered design rather than exported specs. Design tokens (`--color-crimson`, `--color-blush`, `--color-mint`, `--spacing-gutter`, …) live in `globals.css`, so exact values can be tweaked in one place. The carousel photos are royalty-free [Unsplash](https://unsplash.com) stand-ins, and the partner logos and course icons are hand-drawn SVG approximations. Swap in the original assets in `public/images` and `PartnerLogos.tsx` / `CourseIcons.tsx` if you have them.
