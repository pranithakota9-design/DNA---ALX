import React from "react";
import {
  Dna,
  Database,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Activity,
  ChevronRight,
  Info
} from "lucide-react";
import { UserRole } from "../types";

interface DashboardViewProps {
  onStartAnalysis: () => void;
  onRunDemo: () => void;
  onNavigateTab: (tab: string) => void;
  userRole: UserRole;
  explainMode: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartAnalysis,
  onRunDemo,
  onNavigateTab,
  userRole,
  explainMode,
}) => {
  const pipelineSteps = [
    { title: "DNA Upload", subtitle: "FASTA / raw sequence", num: "01", tab: "analysis" },
    { title: "DNA Validation", subtitle: "{A, T, G, C} check", num: "02", tab: "analysis" },
    { title: "LCS DP Table", subtitle: "O(m×n) matrix", num: "03", tab: "analysis" },
    { title: "Backtracking", subtitle: "Reconstruct alignment", num: "04", tab: "analysis" },
    { title: "Candidate Variants", subtitle: "Identify differences", num: "05", tab: "analysis" },
    { title: "Variant Annotation", subtitle: "Synthetic catalog lookup", num: "06", tab: "analysis" },
    { title: "Cancer Risk Analysis", subtitle: "Evidence synthesis (0-100)", num: "07", tab: "cancer" },
    { title: "Review Queue", subtitle: "Researcher triaging", num: "08", tab: "review" },
    { title: "Explainable ML", subtitle: "Random Forest ensemble", num: "09", tab: "analysis" },
    { title: "Secure Report", subtitle: "Audited research report", num: "10", tab: "analysis" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-slate-700/50">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Hackathon & Educational Bioinformatics Prototype
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Understand DNA. Explain Every Step.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            DNA-ALX connects classical computer science (2D Dynamic Programming & LCS) with candidate sequence difference detection, synthetic variant annotation, and explainable machine learning. Every transition is transparent and verifiable.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
            >
              <Dna className="w-4 h-4" />
              <span>Start DNA Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onRunDemo}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-200 border border-teal-500/40 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Run Automated 10-Step Demo</span>
            </button>

            <button
              onClick={() => onNavigateTab("dataset")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 border border-slate-700 font-medium text-xs sm:text-sm transition-all cursor-pointer"
            >
              <Database className="w-4 h-4" />
              <span>Explore Synthetic Dataset</span>
            </button>
          </div>
        </div>
      </div>

      {explainMode && (
        <div className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-4 text-indigo-900 text-xs flex items-start gap-3">
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-indigo-950">Educational Note: The DNA-ALX Architecture</p>
            <p className="text-indigo-800/90 leading-relaxed">
              In real genetics, sequence analysis and variant risk modeling often happen in disparate pipelines. DNA-ALX structures this into a coherent pedagogical architecture: from raw strings of {`{A, T, G, C}`} to exact algorithmic difference matrices, synthetic catalog queries, and explainable feature-weighted Random Forest predictions.
            </p>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Synthetic Samples</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">1,000</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span>Reproducible seed: 42</span>
              <span>•</span>
              <span className="text-teal-600 font-medium">15 Variants (A-O)</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Simulated Annotations</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Dna className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">24 Loci</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span>SIM_VAR_001 to 024</span>
              <span>•</span>
              <span className="text-indigo-600 font-medium">Simulated conditions</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Random Forest Model</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">88.56% Acc</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span>200 trees</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium">F1: 0.8686</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Security Controls</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">AES & PBKDF2</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-cyan-700 font-medium">Encrypted at Rest</span>
              <span>•</span>
              <span>Audit Logged</span>
            </p>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Architecture */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">End-to-End Computational Pipeline</h2>
            <p className="text-xs text-slate-500">
              Each stage produces deterministic, explainable mathematical output passed forward into the next.
            </p>
          </div>
          <button
            onClick={onStartAnalysis}
            className="text-xs text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-1 cursor-pointer"
          >
            Launch Interactive View <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 gap-2.5 pt-2">
          {pipelineSteps.map((step) => (
            <div
              key={step.num}
              onClick={() => onNavigateTab(step.tab || "analysis")}
              className="group p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-teal-50/50 hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-teal-600 block mb-1">
                  STEP {step.num}
                </span>
                <h3 className="font-semibold text-xs text-slate-900 group-hover:text-teal-800 transition-colors">
                  {step.title}
                </h3>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">{step.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Feature Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dynamic Programming Spotlight */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              DP
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">LCS Dynamic Programming Engine</h3>
              <p className="text-xs text-slate-500">Exact recurrence relations with clickable cell inspector</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
            <div className="text-teal-400 font-semibold text-[11px]">// Mathematical Recurrence Relation:</div>
            <div className="text-slate-300">
              if reference[i-1] == sample[j-1]:<br />
              &nbsp;&nbsp;dp[i][j] = dp[i-1][j-1] + 1<br />
              else:<br />
              &nbsp;&nbsp;dp[i][j] = max(dp[i-1][j], dp[i][j-1])
            </div>
            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800 flex justify-between">
              <span>Time: O(m × n)</span>
              <span>Space: O(m × n) table</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Unlike heuristic aligners (e.g. BLAST), our LCS engine stores the full dynamic programming matrix so students and researchers can inspect every character-match choice and trace back the optimal alignment path.
          </p>

          <button
            onClick={onStartAnalysis}
            className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Open Interactive DP Matrix <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Explainable ML Spotlight */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              RF
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Explainable Machine Learning Model</h3>
              <p className="text-xs text-slate-500">200-Tree Random Forest trained on synthetic variants</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-slate-600 flex justify-between">
              <span className="font-medium">Top Feature Importances:</span>
              <span className="text-[11px] text-slate-400">Trained on 1,000 samples</span>
            </div>
            {[
              { name: "variant_J (weight = 2.2)", pct: 23.5, color: "bg-teal-500" },
              { name: "variant_A (weight = 2.0)", pct: 21.0, color: "bg-teal-600" },
              { name: "variant_F (weight = 1.8)", pct: 18.5, color: "bg-teal-700" },
              { name: "variant_C (weight = 1.5)", pct: 15.5, color: "bg-teal-800" },
              { name: "variant_M (weight = 1.2)", pct: 11.5, color: "bg-teal-900" },
            ].map((f) => (
              <div key={f.name} className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-700">
                  <span className="font-mono">{f.name}</span>
                  <span className="font-bold">{f.pct}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${f.color} h-full rounded-full transition-all`}
                    style={{ width: `${f.pct * 3.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab("model")}
            className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            View Confusion Matrix & Metrics <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
