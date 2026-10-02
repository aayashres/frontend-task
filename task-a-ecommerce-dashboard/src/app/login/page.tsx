import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md py-6">
      <div className="rounded-3xl bg-white p-8 shadow-xl shadow-brand-500/5 ring-1 ring-slate-200/70 sm:p-10">
        <h1 className="text-2xl font-extrabold tracking-tight">Welcome back</h1>
        <p className="mb-8 mt-2 text-slate-500">Log in to {SITE_NAME} to add products to your cart.</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
