import { hc } from "hono/client";

import { AppType } from "@/@types/api-contract";
import { apiClient } from "@/lib/apiClient";
import { resolveApiBaseUrl } from "@/lib/resolveApiBaseUrl";

const baseUrl = resolveApiBaseUrl(
  typeof window !== "undefined" ? window.location.hostname : undefined,
  typeof window !== "undefined" ? window.location.origin : ""
);

const client = hc<AppType>(baseUrl);

export async function requestMagicLink(email: string) {
  const response = await client.api.auth["request-link"].$post({ json: { email } });

  if (!response.ok) {
    throw new Error("Failed to request magic link.");
  }
  return response.json();
}

export async function logout(): Promise<void> {
  const response = await apiClient.api.auth.logout.$post();
  if (!response.ok) {
    throw new Error("Failed to log out.");
  }
}

export async function checkSession(signal?: AbortSignal): Promise<{ userId: string } | null> {
  const response = await apiClient.api.auth.me.$get(undefined, { init: { signal: signal } });
  return response.ok ? response.json() : null;
}
