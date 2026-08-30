"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { listReports } from "@/features/reports/reports.api";

type ReportsListResponse = Awaited<ReturnType<typeof listReports>>;
type ReportSummary = ReportsListResponse["reports"][number];

export default function ReportsListPage() {
  const [reports, setReports] = useState<ReportSummary[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    listReports()
      .then((data) => setReports(data.reports))
      .catch(() => setHasError(true));
  }, []);

  if (hasError) {
    return (
      <main className="min-h-screen p-8 max-w-2xl mx-auto">
        <p role="alert">Could not load your reports.</p>
      </main>
    );
  }

  if (reports === null) {
    return (
      <main className="min-h-screen p-8 max-w-2xl mx-auto">
        <p role="status">Loading your reports...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your reports</h1>

      {reports.length === 0 ? (
        <p className="text-on-surface-variant">No reports yet — upload a CSV to get started.</p>
      ) : (
        <ul className="space-y-3">
          {reports.map((report) => (
            <li key={report.id}>
              <Link
                href={`/dashboard/report?id=${report.id}`}
                className="block p-4 rounded bg-surface-container-lowest border border-surface-variant/20 hover:border-outline-variant/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant/60">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${
                      report.paymentStatus === "paid"
                        ? "text-primary-container bg-surface"
                        : "text-on-surface-variant/60 bg-surface-variant/20"
                    }`}
                  >
                    {report.paymentStatus}
                  </span>
                </div>
                <p className="mt-2 text-white font-medium">
                  ${report.potentialMonthlySavingsUsd}/month found across {report.awsTotalVolumeGb}
                  GB
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
