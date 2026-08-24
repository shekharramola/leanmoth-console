"use client";
import { useState } from "react";

import { parseAwsCurCsv } from "./parser";
import { analyzeEntries, type AnalyzeResult } from "../analysis/analysis.api";
import { createCheckoutLink } from "../checkout/checkout.api";

export function DropZone() {
  const [status, setStatus] = useState<"idle" | "analyzing" | "done" | "unlocking" | "error">(
    "idle"
  );
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  async function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    setStatus("analyzing");

    try {
      const rawCsvText = await selectedFile.text();
      const entries = parseAwsCurCsv(rawCsvText);
      const analyzeResult = await analyzeEntries(entries);

      setResult(analyzeResult);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  async function handleUnlockClick() {
    if (!result) {
      return;
    }

    setStatus("unlocking");

    try {
      const checkoutUrl = await createCheckoutLink(result.reportId);
      window.location.href = checkoutUrl;
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="border border-gray-300 p-4">
      <label htmlFor="csv-upload" className="block mb-2 font-medium">
        Upload your AWS Cost & Usage CSV
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileSelected}
        disabled={status === "analyzing" || status === "unlocking"}
      />

      <p role="status" aria-live="polite" className="mt-4">
        {status === "idle" && "Waiting for a file."}
        {status === "analyzing" && "Analyzing your CSV..."}
        {status === "unlocking" && "Redirecting to checkout..."}
        {status === "error" && "Something went wrong — please try again."}
        {status === "done" && result && (
          <>
            We found <strong>${result.potentialMonthlySavingsUsd}/month</strong> in avoidable waste
            across {result.awsTotalVolumeGb}GB of transfer.
          </>
        )}
      </p>

      {status === "done" && (
        <button
          onClick={handleUnlockClick}
          className="mt-4 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Unlock full findings
        </button>
      )}
    </div>
  );
}
