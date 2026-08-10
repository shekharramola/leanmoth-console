"use client";
import { hc } from "hono/client";
import React, { useState } from "react";
// Pulls live route signatures natively from your committed contract asset!
import type { AppType } from "@backend-types";

// Initialize the lightweight, type-safe Hono RPC Client mesh
const client = hc<AppType>("http://127.0.0.1:8787");

export default function HomeDashboardPage() {
  const [systemStatusMessage, setSystemStatusMessage] = useState<string>("Disconnected");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function executeIntegrationHandshake() {
    setIsLoading(true);
    try {
      // Full autocomplete route signatures display natively inside your editor tabs!
      // const response = await client.api.skeleton.$get();
      const response = await client.api.brokenRouteFake.$get();
      const data = (await response.json()) as { status: string; message: string };
      setSystemStatusMessage(`Connected! Engine Response: ${data.message}`);
    } catch (error) {
      setSystemStatusMessage("Cross-Repository Handshake Matrix Failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-xl mx-auto mt-12 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-blue-600">ZeroEgress</h1>
          <p className="text-xs text-slate-500">Contract-Driven E2E Verification Portal</p>
        </header>

        <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-sm">
          <button
            onClick={executeIntegrationHandshake}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition"
          >
            {isLoading ? "Executing Handshake..." : "Run E2E Pipeline Handshake"}
          </button>

          <div className="text-center p-3 bg-slate-100 rounded-lg text-xs font-mono">
            Matrix Status: <span className="font-bold">{systemStatusMessage}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
