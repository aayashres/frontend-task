"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { useAuthStore } from "@/store/auth-store";

/** Only allow same-site relative redirects. */
function safeRedirect(target: string | null): string {
  return target && target.startsWith("/") && !target.startsWith("//") ? target : "/products";
}

const inputClass =
  "mt-1.5 h-12 w-full rounded-xl bg-white px-4 text-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-2 focus:outline-brand-500";

export function LoginForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"));
  const signIn = useAuthStore((s) => s.signIn);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fillDemo = () => {
    setUsername("mor_2314");
    setPassword("83r5^_");
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter both your username and password.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const { token } = await login({ username: username.trim(), password });
      signIn({ username: username.trim(), token });
      router.replace(redirect);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to log in. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <label className="block text-sm font-semibold">
        Username
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          placeholder="mor_2314"
          className={inputClass}
        />
      </label>
      <label className="block text-sm font-semibold">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClass}
        />
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" fullWidth disabled={submitting}>
        {submitting ? "Signing in…" : "Log in"}
      </Button>

      <div className="rounded-xl bg-brand-50 p-4 text-sm text-brand-700">
        <p className="font-semibold">Demo account</p>
        <p className="mt-1">
          <code>mor_2314</code> / <code>83r5^_</code>
        </p>
        <button type="button" onClick={fillDemo} className="mt-2 font-semibold underline underline-offset-2">
          Fill in demo credentials
        </button>
      </div>
    </form>
  );
}
