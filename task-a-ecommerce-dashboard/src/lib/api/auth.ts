import type { LoginCredentials, LoginResponse } from "@/types/auth";
import { ApiError, apiFetch } from "./client";

/** Documented demo account of the Fake Store API, used only if the API is offline. */
const DEMO_CREDENTIALS: LoginCredentials = { username: "mor_2314", password: "83r5^_" };

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    return await apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: credentials,
      cache: "no-store",
    });
  } catch (error) {
    const apiOffline =
      error instanceof ApiError && (error.isNetworkError || error.isServerError);
    const isDemoUser =
      credentials.username === DEMO_CREDENTIALS.username &&
      credentials.password === DEMO_CREDENTIALS.password;

    if (apiOffline && isDemoUser) {
      return { token: `offline-demo-token.${Date.now()}` };
    }
    throw error;
  }
}
