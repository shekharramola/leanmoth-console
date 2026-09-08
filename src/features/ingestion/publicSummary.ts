import type { ParsedUsageEntry } from "./parser";

export type PublicSummary = {
  awsTotalVolumeGb: number;
  totalCostUsd: number;
};

export function summarizeForPublicDemo(entries: ParsedUsageEntry[]): PublicSummary {
  return {
    awsTotalVolumeGb: entries.reduce((total, entry) => total + entry.usageAmountGb, 0),
    totalCostUsd: entries.reduce((total, entry) => total + entry.unblendedCostUsd, 0),
  };
}
