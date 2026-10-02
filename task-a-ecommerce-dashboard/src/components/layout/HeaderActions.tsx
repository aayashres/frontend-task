"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { CartIcon } from "@/components/ui/icons";
import { useHydrated } from "@/hooks/useHydrated";
import { useAuthStore } from "@/store/auth-store";
import { selectItemCount, useCartStore } from "@/store/cart-store";

export function HeaderActions() {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const itemCount = useCartStore(selectItemCount);

  const loggedIn = hydrated && user !== null;

  return (
    <div className="ml-1 flex items-center gap-1 sm:ml-3 sm:gap-2">
      <Link
        href="/cart"
        aria-label={`Cart${loggedIn ? `, ${itemCount} items` : ""}`}
        className="relative grid size-10 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
      >
        <CartIcon />
        {loggedIn && itemCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-600 px-1 text-[11px] font-bold leading-5 text-white">
            {itemCount}
          </span>
        )}
      </Link>

      {loggedIn ? (
        <>
          <span className="hidden max-w-32 truncate text-sm text-slate-500 md:block">
            Hi, <b className="text-slate-800">{user.username}</b>
          </span>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/");
            }}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Log out
          </button>
        </>
      ) : (
        <ButtonLink href="/login" size="sm">
          Log in
        </ButtonLink>
      )}
    </div>
  );
}
