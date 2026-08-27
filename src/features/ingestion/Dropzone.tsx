"use client";
import { useState } from "react";

import { parseAwsCurCsv } from "./parser";
import { analyzeEntries, type AnalyzeResult } from "../analysis/analysis.api";
import { createCheckoutLink } from "../checkout/checkout.api";

const masterContainer = "w-full max-w-md mx-auto space-y-6";
const dropScanningBay =
  "relative group rounded border-2 border-dashed border-outline-variant/40 bg-surface-container-low/40 p-8 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-primary-container/40 focus-within:border-primary-container min-h-[200px]";
const textMainLabel =
  "font-mono text-xs font-semibold text-white uppercase tracking-widest cursor-pointer mb-2 block";
const textSubDesc = "font-main text-xs text-on-surface-variant/60 leading-relaxed max-w-[240px]";
const indicatorIcon =
  "material-symbols-outlined text-4xl text-on-surface-variant/30 group-hover:text-primary-container group-hover:drop-shadow-[0_0_8px_rgba(0,255,157,0.3)] transition-all mb-4";
const liveStatusText =
  "font-data-mono text-xs uppercase tracking-wider text-center block mt-2 text-on-surface-variant/80";
const checkoutActionBtn =
  "w-full py-4 px-6 rounded btn-glow text-void-base font-bold font-main text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] cursor-pointer shadow-[0_0_20px_rgba(0,255,157,0.2)]";

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
    <div className={masterContainer}>
      <div className={dropScanningBay}>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleFileSelected}
          disabled={status === "analyzing" || status === "unlocking"}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
        />

        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <span
            className={`${indicatorIcon} ${status === "analyzing" || status === "unlocking" ? "animate-spin" : ""}`}
          >
            {status === "analyzing" && "progress_activity"}
            {status === "unlocking" && "sync_saved_locally"}
            {status === "done" && "verified"}
            {status === "error" && "gpp_bad"}
            {status === "idle" && "cloud_upload"}
          </span>
          <label htmlFor="csv-upload" className={textMainLabel}>
            {status === "idle" && "Ingest AWS Billing Matrix"}
            {status === "analyzing" && "Analyzing Cloud Schema"}
            {status === "unlocking" && "Routing Secure Vault"}
            {status === "error" && "Ingestion Failure"}
            {status === "done" && "Telemetry Analysis Compiled"}
          </label>
          <p className={textSubDesc}>
            {status === "idle" &&
              "Drag and drop your Cost & Usage CSV file here or click to browse local drives securely."}
            {status === "analyzing" &&
              "Parsing regional cross-AZ traffic lines. Extraction executing entirely in local browser sandbox environment."}
            {status === "unlocking" &&
              "Preparing encrypted gateway transmission nodes to clear analytical payload checkout bounds."}
            {status === "error" &&
              "Something went wrong on our end. It's not you, it's completely on us—our systems team has been alerted and we are checking the logs right now."}
            {status === "done" &&
              "Financial wastage footprints extracted successfully. Secure terminal review ready below."}
          </p>
        </div>
      </div>

      <p role="status" aria-live="polite" className={liveStatusText}>
        {status === "idle" && "[ awaiting ingestion payload ]"}
        {status === "done" && result && (
          <span className="flex flex-col space-y-2 p-4 border border-outline-variant/30 rounded bg-surface/50 text-left font-main normal-case tracking-normal">
            <span className="font-mono text-[10px] text-primary-container uppercase tracking-widest block mb-1">
              &gt;_ Analysis Output Summary
            </span>
            <span className="text-sm text-white">
              Identified{" "}
              <strong className="text-primary-container font-data-mono font-bold">
                ${result.potentialMonthlySavingsUsd} / month
              </strong>{" "}
              in completely avoidable data leakage waste across{" "}
              <strong className="font-data-mono font-bold text-white">
                {result.awsTotalVolumeGb} GB
              </strong>{" "}
              of unoptimized cross-AZ network traffic routes.
            </span>
          </span>
        )}
      </p>

      {status === "done" && result && (
        <div className="pt-2 animate-fadeIn">
          <button onClick={handleUnlockClick} className={checkoutActionBtn}>
            <span className="material-symbols-outlined text-base">lock_open</span>
            <span>Unlock full report for ₹{(result.reportPriceInPaise / 100).toFixed(0)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
