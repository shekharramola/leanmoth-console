import React from "react";

// 1. Structural Layout Grid & Constraints
const pageContainer =
  "min-h-screen flex flex-col bg-background text-on-surface font-body-md antialiased";
const centralContent =
  "w-full max-w-2xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col space-y-10";
const headerBlock = "flex flex-col space-y-3 pb-8 border-b border-surface-variant/30";
const clauseSection =
  "flex flex-col space-y-3 relative pl-6 before:absolute before:left-0 before:top-2 before:w-1 before:h-4 before:bg-strategic-primary/40";

// Content Typography Handles
const badgeTheme =
  "inline-self-start px-2 py-0.5 rounded bg-surface-variant border border-surface-variant/60 text-[10px] font-mono tracking-widest text-on-surface-variant uppercase";
const mainTitleH1 = "text-3xl font-bold font-main text-white tracking-tight";
const sectionTitleH2 =
  "text-sm font-mono font-semibold tracking-wider text-white uppercase flex items-center gap-2";
const textParagraph = "text-sm font-main text-on-surface-variant leading-relaxed font-normal";
const signatureFloor =
  "pt-12 text-center border-t border-surface-variant/20 font-mono text-[10px] tracking-[0.25em] text-on-surface-variant/30 uppercase";

export default function PrivacyPage() {
  return (
    <div className={pageContainer}>
      {/* CORE PRIVACY CLAUSE MASTER LANDMARK */}
      <main className={centralContent} aria-labelledby="privacy-heading">
        {/* Document Header Metadata */}
        <header className={headerBlock}>
          <span className={badgeTheme}>Protocol Spec: Data Isolation</span>
          <h1 id="privacy-heading" className={mainTitleH1}>
            How We Handle Your Data
          </h1>
        </header>

        {/* Clause 1: AWS Ingestion Protocol */}
        <section className={clauseSection} aria-labelledby="aws-billing-title">
          <h2 id="aws-billing-title" className={sectionTitleH2}>
            <span className="material-symbols-outlined text-base text-primary-container">
              shield
            </span>
            Your AWS Billing File
          </h2>
          <p className={textParagraph}>
            Your AWS Cost & Usage CSV is parsed{" "}
            <strong>entirely in your browser environment</strong>. The raw file is never uploaded to
            our servers. Only a summarized, anonymized metrics map—consisting of usage type, data
            transfer volume, and cost per line item, with{" "}
            <strong>absolute zero account IDs or resource identifiers </strong>—is securely
            channeled for analytical tracking.
          </p>
        </section>

        {/* Clause 2: Storage Boundaries */}
        <section className={clauseSection} aria-labelledby="storage-title">
          <h2 id="storage-title" className={sectionTitleH2}>
            <span className="material-symbols-outlined text-base text-primary-container">
              database
            </span>
            What We Store
          </h2>
          <p className={textParagraph}>
            We isolate storage exclusively to your email address and the compiled structural
            findings from each generated optimization report (including waste estimates, core cost
            metrics, and standard transaction states). We enforce a strict zero-retention policy
            regarding your raw CSV source files.
          </p>
        </section>

        {/* Clause 3: Sub-Processor Transmissions */}
        <section className={clauseSection} aria-labelledby="third-parties-title">
          <h2 id="third-parties-title" className={sectionTitleH2}>
            <span className="material-symbols-outlined text-base text-primary-container">hub</span>
            Third Parties
          </h2>
          <p className={textParagraph}>
            The anonymized usage summaries are transmitted to Groq to compile your automated,
            AI-driven remediation analysis. Financial transactional layers are executed exclusively
            via Razorpay—our platform never reads, intercepts, or logs your card data or payment
            configurations directly.
          </p>
        </section>

        {/* Clause 4: Operator Purge Rights */}
        <section className={clauseSection} aria-labelledby="purge-title">
          <h2 id="purge-title" className={sectionTitleH2}>
            <span className="material-symbols-outlined text-base text-primary-container">
              delete_forever
            </span>
            Deleting Your Data
          </h2>
          <p className={textParagraph}>
            Operators retain explicit programmatic purge controls. You can permanently wipe your
            account profile and all structural report history sequences at any time directly from
            your control dashboard, triggering immediate systemic destruction with no support ticket
            delay required.
          </p>
        </section>

        {/* Central Corporate Watermark Stamp */}
        <footer className={signatureFloor}>
          Security Boundary Scope: RAMOLAY Infrastructure Trust
        </footer>
      </main>
    </div>
  );
}
