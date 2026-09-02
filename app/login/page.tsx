import Image from "next/image";

import { LoginForm } from "@/features/auth/LoginForm";

const trustSignalBlock = "space-y-3 pt-2";
const trustSignalRow = "flex items-start gap-2.5 text-xs text-on-surface-variant";

function LoginTrustSignals() {
  return (
    <div className={trustSignalBlock}>
      <div className={trustSignalRow}>
        <span className="material-symbols-outlined text-[16px] text-primary-container shrink-0 mt-0.5">
          key_off
        </span>
        <span>No password — nothing stored that could ever leak in a breach.</span>
      </div>
      <div className={trustSignalRow}>
        <span className="material-symbols-outlined text-[16px] text-primary-container shrink-0 mt-0.5">
          visibility_off
        </span>
        <span>
          Your AWS billing file never leaves your browser — read our{" "}
          <a href="/privacy" className="underline hover:text-white">
            data handling policy
          </a>
          .
        </span>
      </div>
      <div className={trustSignalRow}>
        <span className="material-symbols-outlined text-[16px] text-primary-container shrink-0 mt-0.5">
          code
        </span>
        <span>
          The client-side code that reads your file is{" "}
          <a
            href="https://github.com/shekharramola/leanmoth-console"
            className="underline hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            public on GitHub
          </a>{" "}
          — verify it yourself.
        </span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div
      aria-label="LeanMoth Access Portal"
      className="bg-surface-container-lowest text-on-surface font-body-md antialiased min-h-screen flex flex-col md:flex-row selection:bg-primary-container selection:text-surface-container-lowest"
    >
      {/* Left Pane: Branding */}
      <section className="relative w-full md:w-5/12 lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 bg-void-atmosphere border-b md:border-b-0 md:border-r border-primary-container/30 overflow-hidden min-h-[50vh] md:min-h-screen">
        {/* Animated Background Element (Subtle grid) */}
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.25) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Header / Logo */}
        <header className="relative z-10 mb-section-gap">
          <div className="mb-8 filter drop-shadow-[0_0_12px_rgba(0,255,157,0.4)]">
            <Image
              src="/brand/logo.webp"
              alt="LeanMoth logo"
              width={64}
              height={64}
              priority // Tells Next.js to load this instantly on first paint without lazy-load lag
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-white tracking-tight leading-none mb-2">
              LeanMoth
              <br />
              Optimization Engine
            </h1>
          </div>
        </header>
      </section>

      {/* Right Pane: Authentication */}
      <main
        aria-labelledby="portal-main-heading"
        className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-surface-container-lowest"
      >
        <div className="w-full max-w-md space-y-10">
          <header className="text-left">
            <span className="inline-block px-2 py-1 bg-surface-variant text-on-surface-variant font-label-md rounded mb-4">
              Sign In
            </span>
            <h2 className="font-display-lg-mobile text-white mb-2 tracking-tight">
              Access Your Reports
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Enter your email — we&apos;ll send a secure login link, no password needed.
            </p>
          </header>
          <LoginForm />
          <LoginTrustSignals />
        </div>
      </main>
    </div>
  );
}
