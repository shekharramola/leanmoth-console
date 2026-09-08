import { describe, expect, it } from "vitest";

import { summarizeForPublicDemo } from "./publicSummary";

describe("summarizeForPublicDemo", () => {
  it("sums volume and cost across all parsed entries", () => {
    const entries = [
      { usageType: "a", usageAmountGb: 10, unblendedCostUsd: 5 },
      { usageType: "b", usageAmountGb: 20, unblendedCostUsd: 3 },
    ];
    expect(summarizeForPublicDemo(entries)).toEqual({ awsTotalVolumeGb: 30, totalCostUsd: 8 });
  });

  it("returns zeros for an empty file", () => {
    expect(summarizeForPublicDemo([])).toEqual({ awsTotalVolumeGb: 0, totalCostUsd: 0 });
  });
});
