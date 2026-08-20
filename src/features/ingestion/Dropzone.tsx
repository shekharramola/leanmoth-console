"use client";
import { useState } from "react";

import { parseAwsCurCsv, type ParsedUsageEntry } from "./parser";

export function DropZone() {
  const [parsedEntries, setParsedEntries] = useState<ParsedUsageEntry[]>([]);

  async function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    const rawCsvText = await selectedFile.text();
    const entries = parseAwsCurCsv(rawCsvText);
    setParsedEntries(entries);
  }

  return (
    <>
      <label htmlFor="csv-upload" className="block mb-2 font-medium">
        Upload your AWS Cost & Usage CSV
      </label>
      <input type="file" id="csv-upload" accept=".csv" onChange={handleFileSelected} />

      <p role="status" aria-live="polite">
        Parsed {parsedEntries.length} rows
      </p>
    </>
  );
}
