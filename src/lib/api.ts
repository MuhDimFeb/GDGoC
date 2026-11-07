import type { ApiResponse } from "./types";

const API_BASE = (import.meta.env.VITE_API_URL ?? "https://gdgoc-ugm-api.vercel.app/api").replace(/\/$/, "");

// One request per endpoint – the navbar and footer share /navigation, for example.
const cache = new Map<string, Promise<unknown>>();

export function getJson<T>(path: string): Promise<T> {
  const cached = cache.get(path);
  if (cached) return cached as Promise<T>;

  const request = fetch(`${API_BASE}${path}`, { headers: { Accept: "application/json" } }).then(
    async (response) => {
      if (!response.ok) throw new Error(`The server answered with status ${response.status}.`);
      const body = (await response.json()) as ApiResponse<T>;
      if (!body.success) throw new Error("The server reported an error.");
      return body.data;
    },
  );

  cache.set(path, request);
  // Don't cache failures, so "Try again" really sends a new request.
  request.catch(() => cache.delete(path));
  return request;
}
