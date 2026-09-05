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

const demoSection = "w-full max-w-2xl mx-auto px-6 pb-4 space-y-4";
const demoLabel =
  "font-mono text-xs font-semibold uppercase tracking-wider text-on-surface-variant/60";
const demoCard =
  "p-5 border border-primary-container/20 rounded bg-surface-container-lowest text-left space-y-4";

const sampleFindings = [
  {
    label: "Cross-AZ transfer",
    cost: 38.25,
    detail:
      "Traffic moving between Availability Zones. Consolidate resources into the same AZ or use placement groups to cut this.",
    comparisonLabel: "Down from $52.00",
    remediationSteps: [
      "Identify which resources are communicating across different Availability Zones.",
      "Re-deploy tightly-coupled services into the same AZ where latency/cost matters most.",
      "For services that must span AZs, confirm they're using private IPs, not public endpoints.",
    ],
  },
  {
    label: "NAT Gateway processing",
    cost: 15.2,
    detail: "Replace the NAT Gateway with VPC endpoints for AWS-service-to-AWS-service traffic.",
    comparisonLabel: "No change since last report",
    remediationSteps: [
      "Identify which services route to S3/DynamoDB/other AWS APIs through the NAT Gateway.",
      "Create a VPC Gateway or Interface Endpoint for that service in the same VPC.",
      "Update the route table so that traffic uses the endpoint instead of the NAT Gateway.",
    ],
  },
  {
    label: "Internet egress",
    cost: 1.8,
    detail: "Check for internal traffic routed over public IPs instead of a VPC-private path.",
    comparisonLabel: "New finding",
    remediationSteps: [
      "Audit security groups for rules unnecessarily allowing 0.0.0.0/0 outbound.",
      "Route internal service-to-service calls over private subnets and VPC peering.",
    ],
  },
];

const featuresTripleGrid = "grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left mt-4";
const featureCardFrame =
  "p-6 rounded bg-surface-container-lowest border border-surface-variant/20 shadow-xl flex flex-col space-y-3";
const featureCardTitle =
  "font-mono text-xs font-semibold uppercase tracking-wider text-primary-container flex items-center gap-2";
const featureCardBody = "font-main text-xs text-on-surface-variant leading-relaxed";

const whyUsSection = "w-full max-w-3xl mx-auto px-6 pb-4 text-left space-y-3";
const whyUsBody = "text-sm text-on-surface-variant leading-relaxed font-main";

const howItWorksGrid = "grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left";
const howItWorksStep = "space-y-2";
const howItWorksNumber =
  "w-7 h-7 rounded-full bg-primary-container text-void-base flex items-center justify-center font-mono text-xs font-bold";

const pricingSection = "w-full max-w-2xl mx-auto px-6 pb-4 text-center space-y-2";

export function Landing() {
  return (
    <div className={outerWrapper}>
      <main className={heroSection}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-variant/40 border border-surface-variant/60 text-[10px] font-mono tracking-widest text-primary-container uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping" />
          Pay once per report — no subscriptions
        </div>

        <h1 className={mainHeadline}>
          See exactly what is standing between you and{" "}
          <span className="text-primary-container">a lean cloud bill</span>.
        </h1>

        <p className={textSubDescription}>
          LeanMoth reads and analyzes your AWS Cost & Usage report entirely in your browser. The raw
          CSV never leaves your machine — only a summarized, anonymized metrics snapshot is sent for
          analysis.
        </p>

        <div className={featuresTripleGrid} aria-label="Core Architectural Pillars">
          <div className={featureCardFrame}>
            <h3 className={featureCardTitle}>
              <span className="material-symbols-outlined text-sm">shield_lock</span>
              100% Client-Side
            </h3>
            <p className={featureCardBody}>
              Your account IDs, resource names, and tags are never read from the file at all — not
              redacted after the fact, simply never touched. Only usage type, data volume, and cost
              per line item ever leave your browser.
            </p>
          </div>

          <div className={featureCardFrame}>
            <h3 className={featureCardTitle}>
              <span className="material-symbols-outlined text-sm">terminal</span>
              Publicly Verifiable
            </h3>
            <p className={featureCardBody}>
              A privacy claim shouldn&apos;t require trust. Our client-side parsing code is public
              on GitHub — read exactly what it does and doesn&apos;t touch, yourself.
            </p>
          </div>

          <div className={featureCardFrame}>
            <h3 className={featureCardTitle}>
              <span className="material-symbols-outlined text-sm">description</span>
              Executive-Ready PDF
            </h3>
            <p className={featureCardBody}>
              Every unlocked report exports as a polished PDF — ranked findings, concrete
              remediation steps, and a savings summary you can hand straight to a manager or
              finance, no reformatting needed.
            </p>
          </div>
        </div>

        <div className="w-full max-w-4xl">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface-variant/60 mb-4 text-left">
            How it works
          </h2>
          <div className={howItWorksGrid}>
            <div className={howItWorksStep}>
              <span className={howItWorksNumber}>1</span>
              <p className="text-sm text-on-surface-variant">
                Drop your AWS Cost & Usage CSV. It&apos;s parsed entirely in your browser — nothing
                uploaded yet.
              </p>
            </div>
            <div className={howItWorksStep}>
              <span className={howItWorksNumber}>2</span>
              <p className="text-sm text-on-surface-variant">
                Get an instant, free headline number — how much you&apos;re likely wasting per
                month.
              </p>
            </div>
            <div className={howItWorksStep}>
              <span className={howItWorksNumber}>3</span>
              <p className="text-sm text-on-surface-variant">
                Pay a fair, savings-based fee to unlock the ranked findings, remediation steps, and
                a downloadable PDF.
              </p>
            </div>
          </div>
        </div>

        <div className={whyUsSection}>
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface-variant/60">
            Did your fix actually work?
          </h2>
          <p className={whyUsBody}>
            Run a report today, run another one after you&apos;ve made changes — we show you exactly
            which findings improved, which stayed flat, and what&apos;s new. Every report
            you&apos;ve ever run stays saved, so you&apos;re always comparing against real history,
            not memory.
          </p>
        </div>

        <div className={demoSection}>
          <h2 className={demoLabel}>
            &gt;_ Example output — not your data, just what a report looks like
          </h2>
          <div className={demoCard}>
            <p className="text-white font-medium">
              $55.25/month in avoidable waste found across 650GB of transfer.
            </p>
            <div className="space-y-4">
              {sampleFindings.map((finding) => (
                <div
                  key={finding.label}
                  className="pb-4 border-b border-surface-variant/10 last:border-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-white">{finding.label}</span>
                    <span className="font-data-mono text-sm font-bold text-primary-container shrink-0">
                      -${finding.cost}/mo
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant/80 mt-1">{finding.detail}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant/50 mt-1 mb-2">
                    {finding.comparisonLabel}
                  </p>
                  <ol className="space-y-1 text-xs text-on-surface-variant/70 list-decimal list-inside">
                    {finding.remediationSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={pricingSection}>
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-on-surface-variant/60">
            Pricing
          </h2>
          <p className="text-sm text-on-surface-variant">
            One report, one payment — no subscription. We charge roughly 15% of one month&apos;s
            discovered savings, with a small minimum and a $50 cap, so the price always scales with
            what you actually get.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/login" className={ctaPrimaryButton}>
            <span>Get Started</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
