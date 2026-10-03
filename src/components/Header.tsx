import React from "react";
import { UserRole } from "../types";
import { Dna, ShieldCheck, UserCheck, AlertTriangle, Sparkles, BookOpen } from "lucide-react";

interface HeaderProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  explainMode: boolean;
  onToggleExplainMode: () => void;
  onRunDemoMode: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onChangeRole,
  explainMode,
  onToggleExplainMode,
  onRunDemoMode,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-1.5 text-xs text-amber-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="font-semibold">SYNTHETIC EDUCATIONAL PROTOTYPE:</span>
          <span>
            Datasets, variants, and machine-learning predictions are simulated for demonstration. Not for medical diagnosis or clinical use.
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-amber-700/80 font-mono text-[11px]">
          <span>Seed: 42</span>
          <span>•</span>
          <span>Random Forest (200 Trees)</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm ring-2 ring-teal-500/20">
            <Dna className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-lg tracking-tight">DNA-ALX</span>
              <span className="bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                PROTOTYPE v1.0
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Explainable DNA Sequence & Synthetic Genetic Risk Analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Demo Button */}
          <button
            onClick={onRunDemoMode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 transition-colors shadow-2xs cursor-pointer"
            title="Load demo DNA sequences and automatically run complete analysis pipeline"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">1-Click</span> Demo Workflow
          </button>

          {/* Explain Mode Toggle */}
          <button
            onClick={onToggleExplainMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              explainMode
                ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-2xs"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
            title="Toggle educational explainers across the pipeline"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Explain Mode</span>
            <span
              className={`w-2 h-2 rounded-full ${
                explainMode ? "bg-indigo-600" : "bg-slate-300"
              }`}
            />
          </button>

          {/* Role Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <span className="text-[11px] font-medium text-slate-500 px-2 flex items-center gap-1 hidden md:flex">
              <UserCheck className="w-3.5 h-3.5" /> Role:
            </span>
            {(["RESEARCHER", "ADMIN", "VIEWER"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onChangeRole(r)}
                className={`px-2 py-1 rounded-md font-medium text-[11px] transition-colors cursor-pointer ${
                  currentRole === r
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/60 font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
