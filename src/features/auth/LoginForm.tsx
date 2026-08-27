"use client";

import { useState } from "react";

import { requestMagicLink } from "./auth.api";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await requestMagicLink(email);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p role="status" aria-live="polite">
        Check your email for a login link
      </p>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label
            className="font-label-md text-on-surface-variant uppercase tracking-widest"
            htmlFor="email"
          >
            Email
          </label>
        </div>
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-on-surface-variant pointer-events-none">
            mail
          </span>
          <input
            aria-label="email"
            className="cost-input w-full bg-[#0f1522] border border-surface-variant rounded text-white font-data-mono py-4 pl-12 pr-4 placeholder-on-surface-variant focus:ring-0 transition-all duration-200"
            id="email"
            name="email"
            placeholder="you@company.com"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </div>
      </div>
      <div className="pt-2">
        <button
          disabled={status === "sending"}
          type="submit"
          aria-label="Send Magic Link for Authentication"
          className="w-full cursor-pointer btn-glow text-void-base font-label-lg py-4 px-6 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-container-lowest focus:ring-strategic-primary font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,157,0.3)]"
        >
          <span className="material-symbols-outlined text-[20px]">auto_mode</span>
          <span className="">SEND MAGIC LINK</span>
        </button>
      </div>
      <p className="mt-4 text-xs font-mono text-on-surface-variant/50 tracking-wide text-center md:text-left">
        By continuing, you agree to our{" "}
        <a
          href="/privacy"
          className="text-on-surface-variant underline decoration-on-surface-variant/40 hover:text-primary-container hover:decoration-primary-container transition-colors focus:outline-none focus:text-primary-container"
        >
          privacy practices
        </a>
        .
      </p>

      {status === "error" && <p role="alert">Something went wrong. Please try again.</p>}
    </form>
  );
}
