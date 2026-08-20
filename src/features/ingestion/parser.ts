import Papa from "papaparse";

export type ParsedUsageEntry = {
  usageType: string;
  usageAmountGb: number;
  unblendedCostUsd: number;
};

// AWS Cost & Usage Report files contain dozens of columns — account IDs, resource ARNs, tags
// that can contain arbitrary user text. This parser reads ONLY these three named columns and
// never touches anything else, by construction — an allowlist, not a blocklist. That's what
// makes FR-1's "scrubbed entirely in-browser" claim actually true.
const REQUIRED_COLUMNS = {
  usageType: "lineItem/UsageType",
  usageAmount: "lineItem/UsageAmount",
  unblendedCost: "lineItem/UnblendedCost",
} as const;

export function parseAwsCurCsv(rawCsvText: string): ParsedUsageEntry[] {
  const parseResult = Papa.parse<Record<string, string>>(rawCsvText, {
    header: true,
    skipEmptyLines: true,
  });

  return parseResult.data
    .map((row) => ({
      usageType: row[REQUIRED_COLUMNS.usageType] ?? "",
      usageAmountGb: Number.parseFloat(row[REQUIRED_COLUMNS.usageAmount] ?? "0"),
      unblendedCostUsd: Number.parseFloat(row[REQUIRED_COLUMNS.unblendedCost] ?? "0"),
    }))
    .filter((entry) => entry.usageType !== "" && !Number.isNaN(entry.unblendedCostUsd));
}
