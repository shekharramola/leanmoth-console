"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InferResponseType } from "hono";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { createCheckoutLink } from "@/features/checkout/checkout.api";
import { ReportDocument, Finding } from "@/features/reports/buildReportPdf";
import { apiClient } from "@/lib/apiClient";

type ReportApiResponse = InferResponseType<(typeof apiClient.api.reports)[":id"]["$get"], 200>;
type ReportView = { status: "loading" } | { status: "error" } | ReportApiResponse;

const masterPageContainer =
  "min-h-screen bg-background text-on-surface font-body-md antialiased flex flex-col select-none";
const mainWorkspaceCanvas = "flex-1 max-w-2xl w-full mx-auto p-6 md:p-12 space-y-8";
const introBlockHeading = "text-left space-y-1.5 pb-6 border-b border-surface-variant/20";
const primaryHeadlineH1 = "text-3xl font-bold font-main text-white tracking-tight";
const descriptionText = "text-sm text-on-surface-variant font-main leading-relaxed";
const checkoutActionBtn =
  "w-full py-4 px-6 rounded btn-glow text-void-base font-bold font-main text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] cursor-pointer shadow-[0_0_20px_rgba(0,255,157,0.2)]";

// State Message Layout Containers
const statusFeedbackBox =
  "p-4 border border-outline-variant/20 rounded bg-surface-container-low font-mono text-xs uppercase tracking-wider text-on-surface-variant/70 flex items-center gap-2.5 animate-fadeIn";
const loadingEnclaveView =
  "min-h-[40vh] flex flex-col items-center justify-center font-mono text-xs text-on-surface-variant/60 uppercase tracking-widest gap-2.5";
const criticalErrorView =
  "min-h-[40vh] flex flex-col items-center justify-center font-mono text-xs text-error uppercase tracking-widest gap-2.5";

// Success Report Elements
const successBannerCard =
  "p-5 border border-primary-container/20 rounded bg-surface-container-low/40 flex gap-4 items-start shadow-xl shadow-black/20 animate-fadeIn";
const successBannerBody = "text-sm font-main text-on-surface-variant leading-relaxed";

// High-Density Finding Items Stack
const findingsListStack = "space-y-4 pt-2";
const findingRowContainer =
  "p-5 rounded bg-surface-container-lowest border border-surface-variant/20 shadow-lg flex flex-col space-y-2 hover:border-outline-variant/40 transition-colors duration-200 animate-fadeIn";
const findingHeaderTitle =
  "font-mono text-xs font-semibold tracking-wider text-white uppercase flex items-center justify-between gap-4";
const findingCostMetric =
  "font-data-mono text-sm font-bold text-primary-container px-2 py-0.5 rounded bg-surface border border-surface-variant/30 shrink-0";
const findingDetailDesc = "font-main text-xs text-on-surface-variant/80 leading-relaxed";

function getComparisonStatus(
  previous: number,
  current: number
): {
  label: string;
  colorClass: string;
} {
  if (previous === 0) {
    return { label: "New finding", colorClass: "text-on-surface-variant/60" };
  }
  if (current < previous) {
    return { label: `Down from $${previous}`, colorClass: "text-primary-container" };
  }
  if (current > previous) {
    return { label: `Up from $${previous}`, colorClass: "text-error" };
  }
  return { label: "No change since last report", colorClass: "text-on-surface-variant/60" };
}

function ReportContent() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get("id");
  const reportRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<ReportView>({ status: "loading" });
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!reportId) return;

    // 2. Now safeReportId is guaranteed to be just a 'string'
    const safeReportId = reportId;
    const controller = new AbortController();

    async function loadReport() {
      try {
        const response = await apiClient.api.reports[":id"].$get(
          { param: { id: safeReportId } },
          { init: { signal: controller.signal } }
        );

        if (!response.ok) {
          setView({ status: "error" });
          return;
        }
        setView((await response.json()) as ReportView);
      } catch (error: unknown) {
        // 1. Check if the error is an instance of Error to safely read properties
        if (error instanceof Error && error.name === "AbortError") return;

        // Handle actual network or system errors here
        setView({ status: "error" });
      }
    }

    void loadReport();

    return () => {
      controller.abort();
    };
  }, [reportId]);

  if (!reportId) {
    return <p role="alert">No report ID provided.</p>;
  }

  if (view.status === "loading") {
    return (
      <div className={loadingEnclaveView} role="status">
        <span className="material-symbols-outlined text-sm text-primary-container animate-spin">
          progress_activity
        </span>
        Decrypting analytical footprint data...
      </div>
    );
  }
  if (view.status === "error") {
    return (
      <div className={criticalErrorView} role="alert">
        <span className="material-symbols-outlined text-base">error</span>
        Could not load this report.
      </div>
    );
  }

  async function handlePayNow() {
    if (!reportId) return;
    setIsRedirecting(true);
    try {
      const checkoutResult = await createCheckoutLink(reportId);
      if (checkoutResult) {
        window.location.href =
          "alreadyUnlocked" in checkoutResult
            ? `/dashboard/report?id=${reportId}`
            : checkoutResult.checkoutUrl;
      }
    } catch {
      setIsRedirecting(false);
    }
  }

  return (
    <main className={mainWorkspaceCanvas} ref={reportRef}>
      <div className={introBlockHeading}>
        <span className="inline-block px-2 py-0.5 bg-surface-variant border border-surface-variant/60 text-[10px] font-mono tracking-widest text-primary-container uppercase rounded mb-2">
          &gt;_ Finops Intelligence Briefing
        </span>
        <h1 id="report-main-title" className={primaryHeadlineH1}>
          ${view.potentialMonthlySavingsUsd} / month in avoidable waste
        </h1>
        <p className={descriptionText}>
          Extracted footprint analytics across{" "}
          <strong className="font-data-mono text-white font-bold">
            {view.awsTotalVolumeGb} GB
          </strong>{" "}
          of unoptimized cloud cross-AZ transfer routes.
        </p>
      </div>
      {view.status === "unpaid" && view.potentialMonthlySavingsUsd > 0 && (
        <div className={statusFeedbackBox} role="status" aria-live="polite">
          <span className="material-symbols-outlined text-[16px] text-primary-container">lock</span>
          <div className="flex flex-col gap-2">
            <span>Payment not yet confirmed for this report.</span>

            <button onClick={handlePayNow} disabled={isRedirecting} className={checkoutActionBtn}>
              {isRedirecting ? "Redirecting..." : "Pay now to unlock"}
            </button>
          </div>

          <p className="text-xs text-on-surface-variant/60">
            Paying from outside India? Email{" "}
            <a
              href={`mailto:support@leanmoth.ramolatech.com?subject=Report ${reportId}`}
              className="underline"
            >
              support@leanmoth.ramolatech.com
            </a>{" "}
            and we will sort it out manually.
          </p>
        </div>
      )}

      {view.status === "paid" && (
        <>
          {/* Recurring Savings Value Pitch Panel */}
          <div className={successBannerCard}>
            <span className="material-symbols-outlined text-xl text-primary-container mt-0.5">
              verified
            </span>
            <p className={successBannerBody}>
              You uncovered{" "}
              <strong className="text-white">${view.potentialMonthlySavingsUsd}/month</strong> in
              cloud waste. Every billing cycle after this one, those optimizations represent
              **recurring capital back in your engine**, recovered for a single flat report fee.
            </p>
            {/* <button onClick={handleExportPdf} className={checkoutActionBtn}>
              Export as PDF
            </button> */}
            <PDFDownloadLink
              document={
                <ReportDocument
                  potentialMonthlySavingsUsd={view.potentialMonthlySavingsUsd}
                  awsTotalVolumeGb={view.awsTotalVolumeGb}
                  findings={view.findings as Finding[]}
                />
              }
              fileName={`LeanMoth_Executive_Report_${new Date().toISOString().split("T")[0]}.pdf`}
            >
              {({ loading }) => (
                <button disabled={loading} className={checkoutActionBtn}>
                  {loading ? "Compiling Document..." : "Download Report"}
                </button>
              )}
            </PDFDownloadLink>
          </div>

          {/* High-Fidelity Waste Findings Feed */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface-variant/60">
              Identified Network Waste Vectors
            </h2>
            <ul className={findingsListStack}>
              {(view.findings as Finding[]).map((finding) => {
                const comparisonEntry = (
                  view.comparison as
                    | {
                        label: string;
                        previousReportMonthlyCostUsd: number;
                        currentReportMonthlyCostUsd: number;
                      }[]
                    | null
                )?.find((entry) => entry.label === finding.label);

                const comparisonStatus = comparisonEntry
                  ? getComparisonStatus(
                      comparisonEntry.previousReportMonthlyCostUsd,
                      comparisonEntry.currentReportMonthlyCostUsd
                    )
                  : null;

                return (
                  <li key={finding.label} className={findingRowContainer}>
                    <div className={findingHeaderTitle}>
                      <span>{finding.label}</span>
                      <span className={findingCostMetric}>
                        -${finding.estimatedMonthlyCostUsd}/mo
                      </span>
                    </div>
                    <p className={findingDetailDesc}>{finding.detail}</p>
                    {comparisonStatus && (
                      <p
                        className={`font-mono text-[10px] uppercase tracking-wider ${comparisonStatus.colorClass}`}
                      >
                        {comparisonStatus.label}
                      </p>
                    )}
                    {finding.remediationSteps && finding.remediationSteps.length > 0 && (
                      <ol className="mt-2 space-y-1 text-xs text-on-surface-variant list-decimal list-inside">
                        {finding.remediationSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </main>
  );
}

// useSearchParams() requires a Suspense boundary — without it, Next.js opts the entire page out
// of static generation to render it client-only on every load, which defeats the point of the
// static-export architecture entirely.
export default function ReportPage() {
  return (
    <div className={masterPageContainer}>
      <Suspense
        fallback={
          <div className={loadingEnclaveView} role="status">
            <span className="material-symbols-outlined text-sm text-primary-container animate-spin">
              progress_activity
            </span>
            Initializing document stream...
          </div>
        }
      >
        <ReportContent />
      </Suspense>
    </div>
  );
}
