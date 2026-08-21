import { hc } from "hono/client";

import type { AppType } from "@backend-types";

import { resolveApiBaseUrl } from "./resolveApiBaseUrl";

const baseUrl = resolveApiBaseUrl(
  typeof window !== "undefined" ? window.location.hostname : undefined,
  typeof window !== "undefined" ? window.location.origin : ""
);

export const apiClient = hc<AppType>(baseUrl);
