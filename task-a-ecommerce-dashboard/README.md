# Lumen Store — E-commerce Dashboard (Task A)

A production-style storefront built with **Next.js (App Router) + TypeScript**, powered by the [Fake Store API](https://fakestoreapi.com/docs). Product data is fetched on the server with React Server Components, then filtered instantly on the client. The cart is managed with **Zustand** and persisted in `localStorage`.

## Features

| Area | What's included |
| --- | --- |
| **Products (SSR)** | `/products` fetched on the server, image / title / price / category / rating, server-side sorting via `?sort=asc\|desc`, pagination, responsive grid |
| **Product detail (SSR)** | Dynamic `/products/[id]` route, server-fetched, full product info, quantity picker |
| **Client-side filtering** | Category (loaded from `/products/categories`), price range, name search — all applied client-side after the server fetch |
| **Cart** | Add with quantity, update quantity, remove, live total, persisted in `localStorage` (Zustand `persist`) |
| **Auth (bonus)** | Login through the Fake Store `/auth/login` API; cart actions are available to logged-in users only |
| **URL query params (bonus)** | `/products?category=electronics&sort=asc&search=ssd&minPrice=50&maxPrice=200&page=2` — shareable, back/forward aware |
| **SEO (bonus)** | Per-page metadata + Open Graph, JSON-LD `Product` schema, `sitemap.xml`, `robots.txt` |
| **UX** | Skeleton loading states (`loading.tsx`), route-level `error.tsx`, reusable `ErrorBoundary`, friendly error messages, fully responsive |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, defaults work out of the box
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

**Demo login:** `mor_2314` / `83r5^_` (the "Fill in demo credentials" link on the login page fills it in).

### Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | `https://fakestoreapi.com` | API base URL |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Canonical URLs, sitemap and JSON-LD |

## Architecture

```
src/
├─ app/                     Routes (Server Components by default)
│  ├─ products/             page.tsx (SSR list) · [id]/page.tsx (SSR detail) · loading / error
│  ├─ cart/  login/         Client-driven pages
│  └─ sitemap.ts robots.ts  SEO endpoints
├─ components/
│  ├─ ui/                   Button, Pagination, Rating, Skeleton, ErrorState, ErrorBoundary, QuantitySelector…
│  ├─ products/             ProductCard, ProductGrid, ProductsView, ProductFilters, AddToCartButton…
│  └─ cart/  auth/  layout/  seo/
├─ hooks/                   useProductFilters (URL state), useAddToCart, useHydrated, useDebouncedValue
├─ lib/
│  ├─ api/client.ts         Reusable fetch wrapper ("interceptor")
│  ├─ api/products.ts       Typed endpoint functions
│  ├─ api/auth.ts
│  └─ filters.ts            Pure filtering / URL (de)serialisation logic
├─ store/                   Zustand stores (cart, auth)
└─ types/                   Shared TypeScript types
```

### Key decisions

- **API wrapper (`lib/api/client.ts`)** — a single `apiFetch<T>()` built on native `fetch` (no Axios). It builds URLs and query strings, serialises JSON, applies a timeout, exposes request/response **interceptor** hooks (`addRequestInterceptor` / `addResponseInterceptor`) and converts every failure into a typed `ApiError` with a user-friendly message.
- **SSR + client filtering** — `/products` is an async Server Component that fetches products (sorted by the API) and categories, then passes them to the client `ProductsView`, which filters, searches and paginates in memory.
- **Sorting is server-side; filtering is client-side.** Changing the sort re-requests the page on the server (`?sort=`). Filters use the History API, so they update the URL and `useSearchParams` **without** a server round-trip while still supporting sharing and back/forward.
- **State management** — Zustand with the `persist` middleware. Selectors (`selectItemCount`, `selectSubtotal`) keep derived data out of the store. `useHydrated` prevents hydration mismatches for localStorage-backed UI.
- **Auth gating** — adding to the cart while logged out redirects to `/login?redirect=…` and returns afterwards; `/cart` shows a login prompt to anonymous visitors.
- **Resilience** — if the public Fake Store API is unreachable (it is occasionally down), the server falls back to a bundled snapshot of the catalogue and shows a banner. The demo account can still log in offline. Client errors such as 404 are never masked.

## Tech stack

Next.js 16 · React 19 · TypeScript (strict) · Tailwind CSS 4 · Zustand · native `fetch`
