import { API_BASE_URL } from "@/lib/config";

/** Error thrown by every failed request made through {@link apiFetch}. */
export class ApiError extends Error {
  constructor(
    message: string,
    /** HTTP status code, or 0 when the server could not be reached. */
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }
}

type QueryValue = string | number | boolean | undefined | null;

export interface ApiRequestConfig extends Omit<RequestInit, "body"> {
  query?: Record<string, QueryValue>;
  body?: unknown;
  /** Abort the request after this many milliseconds. */
  timeoutMs?: number;
  url: string;
}

type RequestInterceptor = (
  config: ApiRequestConfig,
) => ApiRequestConfig | Promise<ApiRequestConfig>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

/** Register a hook that can modify every outgoing request (e.g. attach auth headers). */
export function addRequestInterceptor(fn: RequestInterceptor): () => void {
  requestInterceptors.push(fn);
  return () => {
    requestInterceptors.splice(requestInterceptors.indexOf(fn), 1);
  };
}

/** Register a hook that can inspect or replace every incoming response. */
export function addResponseInterceptor(fn: ResponseInterceptor): () => void {
  responseInterceptors.push(fn);
  return () => {
    responseInterceptors.splice(responseInterceptors.indexOf(fn), 1);
  };
}

const STATUS_MESSAGES: Record<number, string> = {
  400: "The request was invalid. Please check your input and try again.",
  401: "Your credentials were not accepted.",
  403: "You do not have permission to do that.",
  404: "We couldn't find what you were looking for.",
  408: "The request took too long. Please try again.",
  429: "Too many requests. Please slow down and try again shortly.",
  500: "The store service is having trouble right now. Please try again later.",
  502: "The store service is temporarily unavailable.",
  503: "The store service is temporarily unavailable.",
  504: "The store service took too long to respond.",
};

function messageForStatus(status: number): string {
  if (STATUS_MESSAGES[status]) return STATUS_MESSAGES[status];
  if (status >= 500) return STATUS_MESSAGES[500];
  return "Something went wrong. Please try again.";
}

function buildUrl(url: string, query?: Record<string, QueryValue>): string {
  const full = /^https?:\/\//.test(url) ? url : `${API_BASE_URL}${url}`;
  if (!query) return full;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }
  const qs = params.toString();
  return qs ? `${full}?${qs}` : full;
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Thin wrapper around the native `fetch` API that centralises URL building,
 * JSON handling, timeouts, interceptors and error normalisation.
 */
export async function apiFetch<T>(
  url: string,
  init: Omit<ApiRequestConfig, "url"> = {},
): Promise<T> {
  let config: ApiRequestConfig = {
    timeoutMs: 8000,
    ...init,
    url,
    headers: { Accept: "application/json", ...init.headers },
  };

  for (const intercept of requestInterceptors) {
    config = await intercept(config);
  }

  const { query, body, timeoutMs, url: rawUrl, headers, ...rest } = config;
  const finalHeaders = new Headers(headers);
  let serializedBody: BodyInit | undefined;
  if (body !== undefined) {
    serializedBody = JSON.stringify(body);
    if (!finalHeaders.has("Content-Type")) {
      finalHeaders.set("Content-Type", "application/json");
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(buildUrl(rawUrl, query), {
      ...rest,
      headers: finalHeaders,
      body: serializedBody,
      signal: controller.signal,
    });
  } catch (error) {
    const aborted = error instanceof DOMException && error.name === "AbortError";
    throw new ApiError(
      aborted
        ? "The request timed out. Please check your connection and try again."
        : "We couldn't reach the store service. Please check your connection.",
      0,
      error,
    );
  } finally {
    clearTimeout(timer);
  }

  for (const intercept of responseInterceptors) {
    response = await intercept(response);
  }

  const data = await parseBody(response);

  if (!response.ok) {
    const serverMessage = typeof data === "string" && data.length < 120 ? data : "";
    // The Fake Store API answers 401 with a plain-text message, which is
    // more specific than our generic one, so prefer it for client errors.
    const message =
      response.status < 500 && serverMessage
        ? serverMessage
        : messageForStatus(response.status);
    throw new ApiError(message, response.status, data);
  }

  // The API answers `null` with HTTP 200 for unknown product ids.
  if (data === undefined || data === null) {
    throw new ApiError(messageForStatus(404), 404);
  }

  return data as T;
}
