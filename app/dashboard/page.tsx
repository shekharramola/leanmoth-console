"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUserSession } from "@/context/UserSessionContext";
import { DropZone } from "@/features/ingestion/Dropzone";

const masterDashboardFrame =
  "min-h-screen bg-background text-on-surface font-body-md antialiased flex flex-col";
const mainWorkspaceCanvas = "flex-1 max-w-3xl w-full mx-auto p-6 md:p-12 space-y-10";
const mainHeadlineH1 = "text-3xl font-bold font-main text-white tracking-tight";
const sectionLabelH2 =
  "text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-surface-variant/20 pb-2 mb-4 block";
const dataPanelContainer =
  "p-6 rounded bg-surface-container-lowest border border-surface-variant/20 shadow-xl shadow-black/30 flex flex-col";
const signatureFooter =
  "pt-8 text-center font-mono text-[10px] tracking-[0.25em] text-on-surface-variant/20 uppercase select-none";

export default function DashboardPage() {
  const { isLoggedIn } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) router.replace("/login");
  }, [isLoggedIn, router]);

  if (isLoggedIn === null || isLoggedIn === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-mono text-xs text-on-surface-variant/60 uppercase tracking-widest">
        <span className="material-symbols-outlined text-sm text-primary-container animate-spin mr-2">
          progress_activity
        </span>
        Verifying Security Credentials...
      </div>
    );
  }

  return (
    <div className={masterDashboardFrame}>
      {/* 2. CORE WORKSPACE AREA */}
      <main className={mainWorkspaceCanvas} aria-labelledby="dashboard-main-title">
        <div className="text-left space-y-1">
          <h1 id="dashboard-main-title" className={mainHeadlineH1}>
            Your AWS Waste Report
          </h1>
          <p className="text-sm text-on-surface-variant font-main">
            Execute local multi-region traffic analytics and identify data transfer leakage.
          </p>
        </div>

        <section aria-label="Cloud Logs Ingestion Ingress">
          <div className={dataPanelContainer}>
            <span className={sectionLabelH2}>Data Ingestion Hub</span>
            <DropZone />
          </div>
        </section>

        <footer className={signatureFooter}>
          System Boundary Security Scope: RAMOLAY Infrastructure Trust
        </footer>
      </main>
    </div>
  );
}
