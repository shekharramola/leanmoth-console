"use client";
import { InferResponseType } from "hono";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { apiClient } from "@/lib/apiClient";

type ReportApiResponse = InferResponseType<(typeof apiClient.api.reports)[":id"]["$get"], 200>;
type ReportView = { status: "loading" } | { status: "error" } | ReportApiResponse;

function ReportContent() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get("id");
  const [view, setView] = useState<ReportView>({ status: "loading" });

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
    return <p role="status">Loading report...</p>;
  }
  if (view.status === "error") {
    return <p role="alert">Could not load this report.</p>;
  }

  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        ${view.potentialMonthlySavingsUsd}/month in avoidable waste
      </h1>
      <p className="text-gray-600 mb-6">Across {view.awsTotalVolumeGb}GB of data transfer.</p>

      {view.status === "unpaid" && (
        <p role="status" aria-live="polite">
          Payment not yet confirmed. If you just paid, refresh in a few seconds.
        </p>
      )}

      {view.status === "paid" && (
        <ul className="space-y-3">
          {/* Cast, not full inference: findings' type gets lost to a generic JSON union because
        reports.route.ts passes a pre-typed `view` variable to c.json() rather than an object
        literal — Hono's inference works best on literals at the call site, and falls back to
        JSONValue once routed through a variable of a broader union type. The backend's real
        type (WasteFinding[]) is correct; this just doesn't survive into the emitted contract. */}
          {(
            view.findings as { label: string; estimatedMonthlyCostUsd: number; detail: string }[]
          ).map((finding) => (
            <li key={finding.label} className="border border-gray-300 p-4 rounded-lg">
              <div className="font-medium">
                {finding.label} — ${finding.estimatedMonthlyCostUsd}/mo
              </div>
              <div className="text-sm text-gray-600">{finding.detail}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

// useSearchParams() requires a Suspense boundary — without it, Next.js opts the entire page out
// of static generation to render it client-only on every load, which defeats the point of the
// static-export architecture entirely.
export default function ReportPage() {
  return (
    <Suspense fallback={<p role="status">Loading report...</p>}>
      <ReportContent />
    </Suspense>
  );
}
