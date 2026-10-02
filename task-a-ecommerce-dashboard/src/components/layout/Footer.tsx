import { SITE_NAME } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. Built with Next.js, TypeScript &amp; Zustand.
        </p>
        <p>
          Data by{" "}
          <a
            href="https://fakestoreapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-600 hover:underline"
          >
            Fake Store API
          </a>
        </p>
      </div>
    </footer>
  );
}
