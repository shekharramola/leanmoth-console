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
    <form onSubmit={handleSubmit}>
      <label htmlFor="email-input" className="block mb-2 font-medium">
        Email
      </label>
      <input
        type="email"
        id="email-input"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send login link"}
      </button>
      {status === "error" && <p role="alert">Something went wrong. Please try again.</p>}
    </form>
  );
}
