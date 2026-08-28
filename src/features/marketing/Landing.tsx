import Link from "next/link";

const outerWrapper =
  "min-h-screen bg-background text-on-surface font-body-md antialiased flex flex-col justify-between select-none";
const heroSection =
  "w-full max-w-5xl mx-auto flex flex-col items-center text-center px-6 py-16 md:py-24 space-y-12 my-auto";

const mainHeadline =
  "font-display-lg-mobile md:text-5xl text-white font-bold tracking-tight max-w-3xl leading-[1.12]";
const textSubDescription =
  "text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed font-main";
const ctaPrimaryButton =
  "px-6 py-3.5 rounded btn-glow text-void-base font-bold font-main text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-[0_0_30px_rgba(0,255,157,0.15)]";

const featuresTripleGrid = "grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left mt-4";
const featureCardFrame =
  "p-6 rounded bg-surface-container-lowest border border-surface-variant/20 shadow-xl flex flex-col space-y-3";
const featureCardTitle =
  "font-mono text-xs font-semibold uppercase tracking-wider text-primary-container flex items-center gap-2";
const featureCardBody = "font-main text-xs text-on-surface-variant leading-relaxed";

const footerLayout =
  "w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-8 border-t border-surface-variant/20 text-[10px] font-mono text-on-surface-variant/30 uppercase tracking-widest";

export function Landing() {
  return (
    <div className={outerWrapper}>
      <main className={heroSection}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-variant/40 border border-surface-variant/60 text-[10px] font-mono tracking-widest text-primary-container uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping" />
          Flat Fee per Report — No Subscriptions
        </div>

        <h1 className={mainHeadline}>
          See exactly what is standing between you and{" "}
          <span className="text-primary-container">zero egress cost</span>.
        </h1>

        <p className={textSubDescription}>
          LeanMoth reads and analyzes your AWS Cost & Usage report entirely in your browser. The raw
          CSV never leaves your machine—only a fully scrubbed, anonymized metrics summary is sent to
          the backend.
        </p>

        <div className={featuresTripleGrid} aria-label="Core Architectural Pillars">
          <div className={featureCardFrame}>
            <h3 className={featureCardTitle}>
              <span className="material-symbols-outlined text-sm">shield_lock</span>
              100% Client-Side
            </h3>
            <p className={featureCardBody}>
              Unlike typical SaaS platforms that pull sensitive account details into external cloud
              logs, all data parsing and PII scrubbing execute locally in memory.
            </p>
          </div>

          <div className={featureCardFrame}>
            <h3 className={featureCardTitle}>
              <span className="material-symbols-outlined text-sm">terminal</span>
              Publicly Auditable
            </h3>
            <p className={featureCardBody}>
              Zero-knowledge security claims are easy to market but hard to trust. We made our
              entire frontend client repository open-source so you can verify our ingestion code
              yourself.
            </p>
          </div>

          <div className={featureCardFrame}>
            <h3 className={featureCardTitle}>
              <span className="material-symbols-outlined text-sm">analytics</span>
              Ranked Waste Briefs
            </h3>
            <p className={featureCardBody}>
              Instantly track and rank network leakages like cross-AZ chatter, public-IP-routed
              internal traffic, and idle Elastic IPs with clear trend matching.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Link href="/login" className={ctaPrimaryButton}>
            <span>Initialize Secure Gateway</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </main>

      <footer className={footerLayout}>
        <p>© 2026 RAMOLAY. All Rights Reserved.</p>
        <p>Contract-Driven FinOps Infrastructure</p>
      </footer>
    </div>
  );
}
