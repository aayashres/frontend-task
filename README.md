# Frontend Task Submission

This repository contains two independent Next.js applications. Each app has its own dependencies, scripts, source code, and README.

| App                        | Directory                     | Description                                                                                                                                                                                              |
| -------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Task A: Lumen Store        | `task-a-ecommerce-dashboard/` | Responsive ecommerce storefront with product browsing, filtering, product details, authentication, and a persistent cart. Product data comes from the Fake Store API, with a bundled catalogue fallback. |
| Task B: Services & Courses | `task-b-figma-landing/`       | Responsive landing page implementing the Services and Courses sections from the supplied Figma design, including an interactive carousel and animated counters.                                          |

## Tech Stack

Both apps use Next.js App Router, React, TypeScript, and Tailwind CSS 4. Task A also uses Zustand for cart and authentication state.

## Requirements

- Node.js (LTS recommended)
- npm

Install dependencies separately for each app:

```powershell
cd task-a-ecommerce-dashboard
npm ci
```

In a second terminal, install Task B dependencies:

```powershell
cd task-b-figma-landing
npm ci
```

## Run Locally

Start Task A from its directory:

```powershell
cd task-a-ecommerce-dashboard
npm run dev
```

Open <http://localhost:3000>. To run both apps at once, start Task B in a second terminal on another port:

```powershell
cd task-b-figma-landing
npm run dev -- --port 3001
```

Open Task B at <http://localhost:3001>.

Task A supports optional environment variables. Copy `.env.example` to `.env.local` in the Task A directory to customize them; the defaults work for local development. Never commit `.env.local` or other secrets.

## Build and Lint

Run these commands from the repository root:

```powershell
npm --prefix task-a-ecommerce-dashboard run lint
npm --prefix task-a-ecommerce-dashboard run build
npm --prefix task-b-figma-landing run lint
npm --prefix task-b-figma-landing run build
```

## Project Structure

```text
frontend-task/
├── task-a-ecommerce-dashboard/
│   ├── src/app/          Storefront routes, layouts, loading and error states
│   ├── src/components/   Product, cart, auth, layout, SEO, and UI components
│   ├── src/data/         Bundled fallback product catalogue
│   ├── src/hooks/        Product filtering and client-side state hooks
│   ├── src/lib/          API clients, configuration, and filter utilities
│   ├── src/store/        Zustand cart and auth stores
│   ├── src/types/        Shared product, cart, and auth types
│   └── public/           Static assets
└── task-b-figma-landing/
    ├── src/app/          Landing page, layout, and global styles
    ├── src/components/   Services, courses, carousel, partner, and reveal UI
    ├── src/data/         Page copy, slide data, and course counts
    ├── src/hooks/        Carousel, visibility, and count-up hooks
    └── public/images/    Carousel photographs
```

For app-specific features and implementation details, see [Task A's README](task-a-ecommerce-dashboard/README.md) and [Task B's README](task-b-figma-landing/README.md).

## Deploy

Both apps can be deployed from this same GitHub repository as separate Vercel projects. Import the repository once per app and set **Root Directory** to the corresponding folder:

- Task A: `task-a-ecommerce-dashboard`
- Task B: `task-b-figma-landing`

Each Vercel project will have its own deployment URL. Configure any required environment variables in that project's Vercel settings rather than committing local environment files.
