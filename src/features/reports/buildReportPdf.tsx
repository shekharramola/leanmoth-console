import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import React from "react";

export type Finding = {
  label: string;
  estimatedMonthlyCostUsd: number;
  detail: string;
  remediationSteps: string[];
};

interface ReportProps {
  potentialMonthlySavingsUsd: number;
  awsTotalVolumeGb: number;
  findings: Finding[];
}

function sanitizeReportText(text: string): string {
  if (!text) return "";
  const spaceCount = (text.match(/ /g) || []).length;
  if (spaceCount > text.length / 2) {
    return text.replace(/ {2,}/g, " || ").replace(/ /g, "").replace(/\|\|/g, " ").trim();
  }
  return text.replace(/\s+/g, " ").trim();
}

// ============================================================
// PREMIUM VECTOR STYLESHEET (Mapping your exact Tailwind tokens)
// ============================================================
const styles = StyleSheet.create({
  page: {
    padding: 45,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    color: "#0c1324",
    fontSize: 10,
    lineHeight: 1.5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // Synchronises bottom line metrics across the axis
    borderBottomWidth: 2,
    borderBottomColor: "#0c1324",
    paddingBottom: 15,
    marginBottom: 25,
  },
  titleArea: {
    flexDirection: "row",
    alignItems: "center", // 🚀 CRITICAL FIX A: Centers logo exactly against the block metrics
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 14,
  },
  textBlock: {
    flexDirection: "column",
    justifyContent: "center",
  },
  metaLabel: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#6366f1",
    fontFamily: "Helvetica-Bold",
  },
  title: {
    fontSize: 24,
    color: "#0c1324",
    fontFamily: "Helvetica-Bold",
    marginTop: 2,
    lineHeight: 1.1, // Protects vertical bounding layout boxes
  },
  metaRight: {
    textAlign: "right",
    fontSize: 9,
    color: "#64748b",
    paddingBottom: 2, // Aligns neatly with the text baseline
  },
  summaryGrid: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderLeftWidth: 4,
    borderLeftColor: "#00ff9d",
    borderRadius: 4,
    padding: 16,
    marginBottom: 25,
  },
  summaryCol: {
    flex: 1,
  },
  summaryColRight: {
    flex: 1,
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: "#e2e8f0",
  },
  summaryLabel: {
    fontSize: 8.5,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: "#64748b",
    fontFamily: "Helvetica-Bold",
  },
  summaryValueAccent: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#059669",
    marginTop: 4,
  },
  summaryValue: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#0c1324",
    marginTop: 4,
  },
  summaryDesc: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 6,
  },
  sectionHeading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#6366f1",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 6,
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 8,
    marginBottom: 10,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardBadgeCounter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#f1f5f9",
    color: "#475569",
    textAlign: "center",
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginRight: 8,
    paddingTop: 2,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#0c1324",
  },
  cardSavingsBadge: {
    backgroundColor: "#ecfdf5",
    borderWidth: 1,
    borderColor: "#a7f3d0",
    color: "#065f46",
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  cardDetail: {
    fontSize: 10,
    color: "#475569",
    textAlign: "justify",
  },
  remediationBox: {
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    padding: 12,
    marginTop: 12,
    borderRadius: 2,
  },
  remediationTitle: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#6366f1",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  remediationItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  remediationBullet: {
    color: "#6366f1",
    marginRight: 6,
    fontSize: 10,
  },
  remediationText: {
    fontSize: 9.5,
    color: "#334155",
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 45,
    right: 45,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
    color: "#94a3b8",
  },
});

// ============================================================
// THEMED VECTOR PDF COMPONENT
// ============================================================
export const ReportDocument = ({
  potentialMonthlySavingsUsd,
  awsTotalVolumeGb,
  findings,
}: ReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* 1. Themed Corporate Header Band */}
      <View style={styles.headerRow}>
        <View style={styles.titleArea}>
          <Image src="/brand/logo.png" style={styles.logo} />

          <View style={styles.textBlock}>
            <Text style={styles.metaLabel}>Cloud Infrastructure Audit</Text>
            <Text style={styles.title}>LeanMoth Waste Report</Text>
          </View>
        </View>

        <View style={styles.metaRight}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Report Ref: LM-2026-Q3</Text>
          <Text style={{ marginTop: 2 }}>Issued: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* 2. Executive Impact Box */}
      <View style={styles.summaryGrid}>
        <View style={styles.summaryCol}>
          <Text style={styles.summaryLabel}>Potential Monthly Savings</Text>
          <Text style={styles.summaryValueAccent}>
            ${potentialMonthlySavingsUsd.toLocaleString()} / mo
          </Text>
          <Text style={styles.summaryDesc}>
            Annualized run-rate optimization potential loops out to $50,400.
          </Text>
        </View>
        <View style={styles.summaryColRight}>
          <Text style={styles.summaryLabel}>Analyzed Transfer Volume</Text>
          <Text style={styles.summaryValue}>{awsTotalVolumeGb.toLocaleString()} GB</Text>
          <Text style={styles.summaryDesc}>
            Data transit pipeline parsing covered active cloud network nodes.
          </Text>
        </View>
      </View>

      {/* 3. Section Heading */}
      <Text style={styles.sectionHeading}>Targeted System Optimization Measures</Text>

      {/* 4. Findings Card Loop */}
      {findings.map((finding, idx) => (
        <View key={idx} style={styles.card} wrap={false}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <Text style={styles.cardBadgeCounter}>{idx + 1}</Text>
              <Text style={styles.cardTitle}>{sanitizeReportText(finding.label)}</Text>
            </View>
            <Text style={styles.cardSavingsBadge}>
              -${finding.estimatedMonthlyCostUsd}/mo waste
            </Text>
          </View>

          <Text style={styles.cardDetail}>{sanitizeReportText(finding.detail)}</Text>

          {/* 5. Clean, prefix-safe Remediation steps loop block */}
          {finding.remediationSteps?.length > 0 && (
            <View style={styles.remediationBox}>
              <Text style={styles.remediationTitle}>Execution Action Steps:</Text>
              {finding.remediationSteps.map((step, sIdx) => (
                <View key={sIdx} style={styles.remediationItem}>
                  <Text style={styles.remediationBullet}>{"\u2022"}</Text>
                  <Text style={styles.remediationText}>{sanitizeReportText(step)}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      {/* 6. Pagination Footer */}
      <View style={styles.footer} fixed>
        <Text>LeanMoth Systems Architecture Analytics Engine</Text>
        <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
      </View>
    </Page>
  </Document>
);
