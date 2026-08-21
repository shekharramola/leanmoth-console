import { hc } from "hono/client";

import { AppType } from "@/@types/api-contract";
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
