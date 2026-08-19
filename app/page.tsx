"use client";
import { hc } from "hono/client";
import React, { useState } from "react";

import type { AppType } from "@backend-types";

// Force local development fetches to point straight to your running Wrangler engine container
const baseUrl =
  typeof window !== "undefined"
    ? window.location.hostname === "localhost"
      ? "http://localhost:8787"
      : window.location.origin
    : "http://localhost:8787";

const client = hc<AppType>(baseUrl);

export default function HomeDashboardPage() {
  const [systemStatusMessage, setSystemStatusMessage] = useState<string>("Disconnected");
  const [databaseMetrics, setDatabaseMetrics] = useState<string>(
    "No database metrics compiled yet."
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function executeIntegrationHandshake() {
    const a = "b";
    setIsLoading(true);
    try {
      const response = await client.api.skeleton.$get();
      const skeletonRouteResponse = (await response.json()) as {
        status: string;
        message: string;
        databaseMetricRow?: string;
      };

      setSystemStatusMessage(`Live Edge Server: ${skeletonRouteResponse.message}`);
      if (skeletonRouteResponse.databaseMetricRow) {
        setDatabaseMetrics(skeletonRouteResponse.databaseMetricRow);
      }
    } catch {
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
          <p className="text-xs text-slate-500">Live Monolithic Edge Dashboard</p>
        </header>

        <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-sm">
          <button
            onClick={executeIntegrationHandshake}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition"
          >
            {isLoading ? "Reaching Cloud Network..." : "Query Live Monolithic Ledger"}
          </button>

          <div className="p-4 bg-slate-100 rounded-lg text-xs font-mono space-y-2">
            <div>
              Network Status:{" "}
              <span className="font-bold text-emerald-600">{systemStatusMessage}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 text-slate-600">
              Database Ledger state:{" "}
              <span className="font-bold text-blue-600">{databaseMetrics}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
