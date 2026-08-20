import { describe, expect, it } from "vitest";

import { resolveApiBaseUrl } from "./resolveApiBaseUrl";

describe("resolveBaseApiUrl", () => {
  it("points at local wrangler dev server when running on localhost", () => {
    expect(resolveApiBaseUrl("localhost", "http://localhost:3000")).toBe("http://localhost:8787");
  });

  it("uses the current origin in production", () => {
    expect(resolveApiBaseUrl("zeroegress.in", "https://zeroegress.in")).toBe(
      "https://zeroegress.in"
    );
  });

  it("defaults to local dev server when hostname is unavailable (server-side)", () => {
    expect(resolveApiBaseUrl(undefined, "")).toBe("http://localhost:8787");
  });
});
