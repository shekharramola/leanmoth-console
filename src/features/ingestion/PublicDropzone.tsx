"use client";
import Link from "next/link";
import { useState } from "react";

import { dropScanningBay } from "./Dropzone";
import { parseAwsCurCsv } from "./parser";
import { summarizeForPublicDemo, type PublicSummary } from "./publicSummary";

export function PublicDropZone() {
  const [status, setStatus] = useState<"idle" | "parsing" | "done" | "error">("idle");
  const [summary, setSummary] = useState<PublicSummary | null>(null);

  async function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setStatus("parsing");
    try {
      const rawCsvText = await selectedFile.text();
      const entries = parseAwsCurCsv(rawCsvText);
      setSummary(summarizeForPublicDemo(entries));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4 text-left">
      <div className={dropScanningBay}>
        <label htmlFor="public-csv-upload" className="block mb-2 font-medium text-sm">
          Try it now with your own CSV — no signup, nothing leaves your browser
        </label>
        <input
          id="public-csv-upload"
          type="file"
          accept=".csv"
          onChange={handleFileSelected}
          disabled={status === "parsing"}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
        />

        <p role="status" aria-live="polite" className="text-sm">
          {status === "parsing" && "Reading your file..."}
          {status === "error" && "Couldn't read that file — please try a valid CUR CSV export."}
          {status === "done" && summary && (
            <>
              Found <strong>{summary.awsTotalVolumeGb.toFixed(1)}GB</strong> of transfer, totaling{" "}
              <strong>${summary.totalCostUsd.toFixed(2)}</strong>.
            </>
          )}
        </p>
      </div>
      {status === "done" && (
        <Link
          href="/login"
          className="inline-block underline text-primary-container text-sm text-center"
        >
          Sign in to see exactly which patterns are wasting money →
        </Link>
      )}
    </div>
  );
}
