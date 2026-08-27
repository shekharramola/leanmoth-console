import Image from "next/image";

import { LoginForm } from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <div
      aria-label="ZeroEgress Access Portal"
      className="bg-surface-container-lowest text-on-surface font-body-md antialiased min-h-screen flex flex-col md:flex-row selection:bg-strategic-primary selection:text-surface-container-lowest"
    >
      {/* Left Pane: Branding & Metrics */}
      <section className="relative w-full md:w-5/12 lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 bg-void-atmosphere border-b md:border-b-0 md:border-r border-strategic-primary/30 overflow-hidden min-h-[50vh] md:min-h-screen">
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
              src="/brand/logo.jpg"
              alt="ZeroEgress Optimization Mark"
              width={40}
              height={40}
              priority // Tells Next.js to load this instantly on first paint without lazy-load lag
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-white tracking-tight leading-none mb-2">
              ZeroEgress
              <br className="text-small" />
              Optimization Engine
            </h1>
          </div>
        </header>
        {/* Metrics Cluster */}
      </section>
      {/* Right Pane: Authentication */}
      <main
        aria-labelledby="portal-main-heading"
        className="w-full md:w-7/12 lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-surface-container-lowest"
      >
        <div className="w-full max-w-md space-y-10">
          <header className="text-left">
            <span className="inline-block px-2 py-1 bg-surface-variant text-on-surface-variant font-label-md rounded mb-4">
              Preview
            </span>
            <h2 className="font-display-lg-mobile text-white mb-2 tracking-tight">
              Optimization Access Portal
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Authenticate to access the resource recovery center
            </p>
          </header>
          <LoginForm />
          <div className="bg-[#0f1522] border border-surface-variant rounded p-4 flex justify-between items-center">
            <p className="font-data-mono text-xs text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary-container">
                recycling
              </span>{" "}
              Resource Enclave Active
            </p>
            <p className="font-data-mono text-xs text-primary-container">SIG-ADAPTIVE / DYNAMIC</p>
          </div>
          <footer className="pt-8 flex justify-center">
            <p className="font-label-md text-on-surface-variant opacity-40 uppercase tracking-widest text-[10px]">
              Powered by RAMOLAY
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
