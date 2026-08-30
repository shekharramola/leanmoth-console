import jsPDF from "jspdf";

export type Finding = { label: string; estimatedMonthlyCostUsd: number; detail: string };

export function buildReportPdf(params: {
  potentialMonthlySavingsUsd: number;
  awsTotalVolumeGb: number;
  findings: Finding[];
}): jsPDF {
  const doc = new jsPDF();
  let cursorY = 20;

  doc.setFontSize(18);
  doc.text("LeanMoth Waste Report", 14, cursorY);

  cursorY += 12;
  doc.setFontSize(12);
  doc.text(
    `$${params.potentialMonthlySavingsUsd}/month in avoidable waste across ${params.awsTotalVolumeGb}GB of transfer.`,
    14,
    cursorY
  );

  cursorY += 14;
  doc.setFontSize(14);
  doc.text("Findings", 14, cursorY);
  cursorY += 8;

  doc.setFontSize(10);
  for (const finding of params.findings) {
    doc.setFont("helvetica", "bold");
    doc.text(`${finding.label} — $${finding.estimatedMonthlyCostUsd}/mo`, 14, cursorY);
    cursorY += 6;

    doc.setFont("helvetica", "normal");
    const wrappedDetail = doc.splitTextToSize(finding.detail, 180);
    doc.text(wrappedDetail, 14, cursorY);
    cursorY += wrappedDetail.length * 5 + 6;
  }

  return doc;
}
