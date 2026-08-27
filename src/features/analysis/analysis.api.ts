import { apiClient } from "@/lib/apiClient";

import { ParsedUsageEntry } from "../ingestion/parser";

export type AnalyzeResult = {
  reportId: string;
  awsTotalVolumeGb: number;
  potentialMonthlySavingsUsd: number;
  reportPriceInPaise: number;
};

export async function analyzeEntries(entries: ParsedUsageEntry[]) {
  const response = await apiClient.api.analyze.$post({ json: { entries } });
  if (!response.ok) {
    throw new Error("Analysis failed");
  }
  return response.json();
}
