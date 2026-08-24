"use client";
import { useState } from "react";

import { parseAwsCurCsv } from "./parser";
import { analyzeEntries, type AnalyzeResult } from "../analysis/analysis.api";

export function DropZone() {
  const [status, setStatus] = useState<"idle" | "analyzing" | "done" | "error">("idle");
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
        disabled={status === "analyzing"}
      />

      <p role="status" aria-live="polite" className="mt-4">
        {status === "idle" && "Waiting for a file."}
        {status === "analyzing" && "Analyzing your CSV..."}
        {status === "error" && "Something went wrong — please try again."}
        {status === "done" && result && (
          <>
            We found <strong>${result.potentialMonthlySavingsUsd}/month</strong> in avoidable waste
            across {result.awsTotalVolumeGb}GB of transfer.
          </>
        )}
      </p>
    </div>
  );
}
