// Extracted so it's testable in isolation, without needing a DOM/window at all — same
// pure-function-separation principle used throughout the backend (see Section 8).
export function resolveApiBaseUrl(hostname: string | undefined, origin: string): string {
  if (hostname === undefined || hostname === "localhost") {
    return "http://localhost:8787";
  }
  return origin;
}
