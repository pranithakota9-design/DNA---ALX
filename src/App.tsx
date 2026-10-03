/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { UserRole, AuditLogEntry } from "./types";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { DashboardView } from "./components/DashboardView";
import { AnalysisView } from "./components/AnalysisView";
import { DatasetExplorerView } from "./components/DatasetExplorerView";
import { ModelInfoView } from "./components/ModelInfoView";
import { SecurityCenterView } from "./components/SecurityCenterView";
import { AuditView } from "./components/AuditView";
import { AdminView } from "./components/AdminView";
import { CancerAnalysisView } from "./components/CancerAnalysisView";
import { ReviewQueueView } from "./components/ReviewQueueView";
import { AlertTriangle, Dna } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [currentRole, setCurrentRole] = useState<UserRole>("RESEARCHER");
  const [explainMode, setExplainMode] = useState<boolean>(true);
  const [autoRunDemoTrigger, setAutoRunDemoTrigger] = useState<boolean>(false);

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 1,
      timestamp: "2026-10-03 07:30:12",
      user_id: "demo@dna-alx.local",
      action: "LOGIN",
      sample_id: "N/A",
      status: "SUCCESS",
      ip_address: "127.0.0.1",
      details: "Authenticated via local demo session"
    },
    {
      id: 2,
      timestamp: "2026-10-03 07:32:45",
      user_id: "demo@dna-alx.local",
      action: "RUN_LCS",
      sample_id: "DNA-SEQ-DEMO-01",
      status: "SUCCESS",
      ip_address: "127.0.0.1",
      details: "LCS computed: len 19/20, similarity: 95.0%"
    },
    {
      id: 3,
      timestamp: "2026-10-03 07:33:10",
      user_id: "demo@dna-alx.local",
      action: "RUN_PREDICTION",
      sample_id: "DNA-2026-DEMO",
      status: "SUCCESS",
      ip_address: "127.0.0.1",
      details: "Random Forest classified as High Risk (prob: 99.8%)"
    }
  ]);

  function handleLogAuditEvent(action: string, sampleId: string, status: string, details?: string) {
    const newEntry: AuditLogEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      user_id: currentRole === "ADMIN" ? "admin@dna-alx.local" : "demo@dna-alx.local",
      action,
      sample_id: sampleId,
      status: (status as "SUCCESS" | "FAILED" | "UNAUTHORIZED"),
      ip_address: "127.0.0.1",
      details: details || ""
    };
    setAuditLogs((prev) => [newEntry, ...prev.slice(0, 99)]);
  }

  function handleRunDemoMode() {
    setActiveTab("analysis");
    setAutoRunDemoTrigger(true);
    setTimeout(() => setAutoRunDemoTrigger(false), 500);
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onChangeRole={(role) => {
          setCurrentRole(role);
          handleLogAuditEvent("CHANGE_ROLE", "N/A", "SUCCESS", `Role switched to ${role}`);
        }}
        explainMode={explainMode}
        onToggleExplainMode={() => setExplainMode(!explainMode)}
        onRunDemoMode={handleRunDemoMode}
        activeTab={activeTab}
      />

      {/* Primary Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentRole={currentRole}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <DashboardView
            onStartAnalysis={() => setActiveTab("analysis")}
            onRunDemo={handleRunDemoMode}
            onNavigateTab={setActiveTab}
            userRole={currentRole}
            explainMode={explainMode}
          />
        )}

        {activeTab === "analysis" && (
          <AnalysisView
            userRole={currentRole}
            explainMode={explainMode}
            onLogAuditEvent={handleLogAuditEvent}
            autoRunDemo={autoRunDemoTrigger}
            onNavigateToCancer={() => setActiveTab("cancer")}
          />
        )}

        {activeTab === "cancer" && (
          <CancerAnalysisView
            currentRole={currentRole}
            explainMode={explainMode}
            onLogAuditEvent={handleLogAuditEvent}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === "review" && (
          <ReviewQueueView
            currentRole={currentRole}
            onLogAuditEvent={handleLogAuditEvent}
          />
        )}

        {activeTab === "dataset" && <DatasetExplorerView />}

        {activeTab === "model" && <ModelInfoView />}

        {activeTab === "security" && (
          <SecurityCenterView
            currentRole={currentRole}
            onChangeRole={setCurrentRole}
          />
        )}

        {activeTab === "audit" && <AuditView logs={auditLogs} />}

        {activeTab === "admin" && currentRole === "ADMIN" && <AdminView />}
      </main>

      {/* Persistent Ethical Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center font-bold text-[10px]">
              ALX
            </div>
            <span className="font-semibold text-slate-700">DNA-ALX Platform</span>
            <span>•</span>
            <span>Explainable Sequence Alignment & Synthetic Genetic Risk Analysis</span>
          </div>

          <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-[11px]">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>Educational & research prototype — Not for clinical or diagnostic use.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
