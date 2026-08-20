import { describe, expect, it } from "vitest";

import { parseAwsCurCsv } from "./parser";

describe("parseAwsCurCsv", () => {
  it("extracts only the three allowlisted columns, ignoring everything else in the row", () => {
    const csv = [
      "lineItem/UsageAccountId,lineItem/ResourceId,lineItem/UsageType,lineItem/UsageAmount,lineItem/UnblendedCost",
      "123456789012,i-0abc123def456,USE1-DataTransfer-Out-Bytes,12.5,0.90",
      "123456789012,i-0abc123def456,USE1-NatGateway-Bytes,4.2,0.35",
    ].join("\n");

    const result = parseAwsCurCsv(csv);

    expect(result).toEqual([
      { usageType: "USE1-DataTransfer-Out-Bytes", usageAmountGb: 12.5, unblendedCostUsd: 0.9 },
      { usageType: "USE1-NatGateway-Bytes", usageAmountGb: 4.2, unblendedCostUsd: 0.35 },
    ]);
    // Confirms the account ID / resource ID columns never made it into the output at all —
    // not redacted after the fact, just never read in the first place.
    expect(Object.keys(result[0])).toEqual(["usageType", "usageAmountGb", "unblendedCostUsd"]);
  });

  it("skips rows with missing or non-numeric cost data instead of crashing", () => {
    const csv = [
      "lineItem/UsageType,lineItem/UsageAmount,lineItem/UnblendedCost",
      "USE1-Regional-Bytes,10,not-a-number",
      "USE1-Regional-Bytes,5,1.20",
    ].join("\n");

    const result = parseAwsCurCsv(csv);

    expect(result).toHaveLength(1);
    expect(result[0].unblendedCostUsd).toBe(1.2);
  });

  it("returns an empty array for an empty or header-only file", () => {
    expect(parseAwsCurCsv("")).toEqual([]);
    expect(
      parseAwsCurCsv("lineItem/UsageType,lineItem/UsageAmount,lineItem/UnblendedCost")
    ).toEqual([]);
  });
});
