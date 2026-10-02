import Link from "next/link";
import { SITE_NAME } from "@/lib/config";
import { BagIcon } from "@/components/ui/icons";
import { HeaderActions } from "./HeaderActions";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-600 text-white shadow-md shadow-brand-500/30">
            <BagIcon width={20} height={20} />
          </span>
          <span className="text-lg">{SITE_NAME}</span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 text-sm font-medium text-slate-600">
          <Link href="/" className="hidden rounded-lg px-3 py-2 hover:bg-slate-100 sm:block">
            Home
          </Link>
          <Link href="/products" className="rounded-lg px-3 py-2 hover:bg-slate-100">
            Products
          </Link>
          <HeaderActions />
        </nav>
      </div>
    </header>
  );
}
