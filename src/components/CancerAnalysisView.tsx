import React, { useState } from "react";
import {
  CancerAnalysisResult,
  CancerVariantEvidence,
  UserRole
} from "../types";
import {
  AlertTriangle,
  Sparkles,
  Info,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  Activity,
  Layers,
  BarChart2,
  CheckCircle2,
  HelpCircle,
  FileText,
  Clock,
  Database,
  X
} from "lucide-react";
import { computeCancerAnalysis } from "../services/bioAlgorithms";

interface CancerAnalysisViewProps {
  currentRole: UserRole;
  explainMode: boolean;
  onLogAuditEvent: (action: string, sampleId: string, status: string, details?: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const CancerAnalysisView: React.FC<CancerAnalysisViewProps> = ({
  currentRole,
  explainMode,
  onLogAuditEvent,
  onNavigateTab
}) => {
  const [analysisData, setAnalysisData] = useState<CancerAnalysisResult>(() =>
    computeCancerAnalysis([], "DNA-2026-0042")
  );
  const [selectedVariant, setSelectedVariant] = useState<CancerVariantEvidence | null>(null);
  const [showModelModal, setShowModelModal] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function handleRunDemoAnalysis() {
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = computeCancerAnalysis([], "DNA-2026-0042");
      setAnalysisData(res);
      setIsAnalyzing(false);
      onLogAuditEvent(
        "CANCER_RISK_ANALYSIS",
        res.sample_id,
        "SUCCESS",
        `Research indicator: ${res.research_risk_indicator}/100 (${res.research_category})`
      );
    }, 400);
  }

  const indicator = analysisData.research_risk_indicator;

  return (
    <div className="space-y-6">
      {/* Mandatory Prominent Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-900 shadow-2xs space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-950">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>RESEARCH-ONLY CANCER RISK & VARIANT ANALYSIS (PROTOTYPE)</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed font-medium">
          {analysisData.disclaimer}
        </p>
        <p className="text-[11px] text-amber-700/80 pt-1 border-t border-amber-200">
          <strong>Terminology Standards:</strong> Outputs are denominated as <em>Research Risk Indicators</em>, <em>Cancer-Association Signals</em>, and <em>Research Priority</em>. They do not constitute probabilities of acquiring cancer or clinical diagnoses.
        </p>
      </div>

      {/* Header & Demo Run Control */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Cancer Risk & Variant Analysis Module
              </h1>
              <span className="bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                RESEARCH ONLY
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Multi-dimensional synthetic evidence synthesis on candidate sequence variants (Position, Functional Effect, Conservation, Provenance)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowModelModal(true)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-teal-600" />
              <span>About This Model</span>
            </button>

            <button
              onClick={handleRunDemoAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? "Analyzing Variants..." : "Run Demo Analysis"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Analysis Status Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Sample ID</span>
          <span className="text-sm font-mono font-bold text-slate-900 mt-1 block">{analysisData.sample_id}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Analysis Status</span>
          <span className="text-sm font-semibold text-emerald-700 mt-1 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {analysisData.analysis_status}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Candidate Variants</span>
          <span className="text-lg font-bold text-slate-900 mt-0.5 block">{analysisData.candidate_variant_count}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs border-l-4 border-l-teal-600">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Research Indicator</span>
          <span className="text-xl font-extrabold text-teal-700 mt-0.5 block">{indicator} / 100</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs border-l-4 border-l-amber-500">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Category</span>
          <span className="text-xs font-bold text-amber-800 mt-1 block leading-tight">
            {analysisData.research_category}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Model Confidence</span>
          <span className="text-lg font-bold text-indigo-700 mt-0.5 block">{analysisData.model_confidence_pct}%</span>
        </div>
      </div>

      {/* Visual Indicator Meter & Explainability Factor Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Research Risk Indicator Gauge Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Research Risk Indicator Gauge
              </span>
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Score: {indicator}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Represents synthetic candidate-variant feature matching strength (0-100 scale).
            </p>
          </div>

          {/* Meter Bar */}
          <div className="space-y-2 py-2">
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200 relative">
              <div
                className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-teal-500 via-amber-500 to-rose-500"
                style={{ width: `${indicator}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>0 (Lower)</span>
              <span>31 (Mod)</span>
              <span>61 (Elevated)</span>
              <span>81-100 (High)</span>
            </div>
          </div>

          {/* Research Priority Distribution */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2 text-xs">
            <span className="font-semibold text-slate-700 block">Research Priority Distribution:</span>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg">
                <span className="block text-[10px] text-rose-700 font-bold">High Priority</span>
                <span className="text-base font-extrabold text-rose-900">{analysisData.priority_distribution.High}</span>
              </div>
              <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="block text-[10px] text-amber-700 font-bold">Medium Priority</span>
                <span className="text-base font-extrabold text-amber-900">{analysisData.priority_distribution.Medium}</span>
              </div>
              <div className="p-2 bg-slate-100 border border-slate-200 rounded-lg">
                <span className="block text-[10px] text-slate-600 font-bold">Low Priority</span>
                <span className="text-base font-extrabold text-slate-800">{analysisData.priority_distribution.Low}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Factors Increasing / Decreasing Signal */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs lg:col-span-2 space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Why was this result generated? (Model Factor Attribution)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Explainable breakdown of synthetic evidence attributes influencing the model's priority score
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Increasing factors */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-extrabold">+</span>
                Factors increasing the research signal:
              </span>
              <ul className="space-y-1.5 text-xs text-emerald-900/90 pl-1">
                {analysisData.explanation.increasing_factors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold mt-0.5">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decreasing factors */}
            <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-extrabold">-</span>
                Factors decreasing the research signal:
              </span>
              <ul className="space-y-1.5 text-xs text-rose-900/90 pl-1">
                {analysisData.explanation.decreasing_factors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold mt-0.5">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
            <div>
              <strong>Overall:</strong> {analysisData.research_category} (Score {indicator} / 100)
            </div>
            <button
              onClick={() => onNavigateTab("review")}
              className="text-xs text-teal-700 font-bold hover:text-teal-800 flex items-center gap-1 cursor-pointer"
            >
              Open Research Review Queue <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Variants Table */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Cancer-Associated Candidate Variants
            </h3>
            <p className="text-xs text-slate-500">
              Detailed evidence profiles across functional, population, and conservation metrics
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {analysisData.variants.length} candidate variants evaluated
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Variant ID</th>
                <th className="py-2.5 px-3">Ref → Alt</th>
                <th className="py-2.5 px-2">Pos</th>
                <th className="py-2.5 px-3">Gene</th>
                <th className="py-2.5 px-3">Effect</th>
                <th className="py-2.5 px-3">Pop Freq</th>
                <th className="py-2.5 px-2 text-center">Evidence</th>
                <th className="py-2.5 px-2 text-center">Consis</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Contribution</th>
                <th className="py-2.5 px-3 text-right">Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {analysisData.variants.map((v) => (
                <tr key={v.variant_id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{v.variant_id}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700">
                    {v.reference_base} → {v.sample_base}
                  </td>
                  <td className="py-2.5 px-2 text-slate-500">#{v.position}</td>
                  <td className="py-2.5 px-3 font-semibold text-teal-700">{v.gene}</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        v.functional_effect === "High"
                          ? "bg-rose-100 text-rose-800"
                          : v.functional_effect === "Moderate"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {v.functional_effect}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{v.population_frequency}</td>
                  <td className="py-2.5 px-2 text-center text-slate-600">{v.evidence_count} recs</td>
                  <td className="py-2.5 px-2 text-center text-slate-600">{v.evidence_consistency_pct}%</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        v.research_priority === "High"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : v.research_priority === "Medium"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {v.research_priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-teal-700 font-sans">
                    +{v.contribution_points} pts
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedVariant(v)}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 transition-colors cursor-pointer"
                    >
                      [View Explanation]
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Variant Detail Modal */}
      {selectedVariant && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedVariant(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-900 font-mono">
                  {selectedVariant.variant_id}
                </h3>
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {selectedVariant.reference_base} → {selectedVariant.sample_base}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    selectedVariant.research_priority === "High"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {selectedVariant.research_priority} Research Priority
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Position #{selectedVariant.position} • Region: {selectedVariant.gene} • Type: {selectedVariant.variant_type}
              </p>
            </div>

            {/* Evidence Summary Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Evidence Summary (8 Dimensions):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 block">Functional Effect</span>
                  <strong className="text-slate-900">{selectedVariant.functional_effect} ({selectedVariant.functional_effect_score})</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 block">Pop Frequency</span>
                  <strong className="text-slate-900">{selectedVariant.population_frequency}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 block">Quality Score</span>
                  <strong className="text-slate-900">{selectedVariant.quality_score}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 block">Evidence Records</span>
                  <strong className="text-slate-900">{selectedVariant.evidence_count}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 block">Consistency</span>
                  <strong className="text-slate-900">{selectedVariant.evidence_consistency_pct}%</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 block">Completeness</span>
                  <strong className="text-slate-900">{selectedVariant.annotation_completeness_pct}%</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 block">Conservation</span>
                  <strong className="text-slate-900">{selectedVariant.conservation_score}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] text-slate-500 block">Literature Cites</span>
                  <strong className="text-slate-900">{selectedVariant.literature_evidence_count}</strong>
                </div>
              </div>
            </div>

            {/* Model Contribution */}
            <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold text-teal-900">
                <span>Model Contribution to Research Indicator:</span>
                <span className="text-sm font-mono text-teal-800">+{selectedVariant.contribution_points} points</span>
              </div>
              <p className="text-teal-800/90 leading-relaxed text-[11px]">
                Why this variant received its priority: The machine learning model assigned +{selectedVariant.contribution_points} points based on its rare simulated allele frequency ({selectedVariant.population_frequency}), elevated functional effect ({selectedVariant.functional_effect}), and {selectedVariant.evidence_consistency_pct}% synthetic evidence consistency.
              </p>
            </div>

            {/* Evidence Provenance */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider block">
                Evidence Provenance (Source Tracking):
              </span>
              <div className="p-3 bg-slate-900 text-slate-300 font-mono text-[11px] rounded-xl space-y-1 border border-slate-800">
                <div>Source: <span className="text-teal-400 font-bold">{selectedVariant.evidence_provenance.source}</span></div>
                <div>Record Type: <span className="text-slate-100">{selectedVariant.evidence_provenance.record_type}</span></div>
                <div>Annotation Engine: <span className="text-slate-100">{selectedVariant.evidence_provenance.annotation_engine}</span></div>
                <div>Status: <span className="text-amber-400">{selectedVariant.evidence_provenance.clinical_status}</span></div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedVariant(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer hover:bg-slate-800 transition-colors"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About This Model Modal */}
      {showModelModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative">
            <button
              onClick={() => setShowModelModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-extrabold text-base text-slate-900">
              About This Model (Cancer Variant Research Prototype)
            </h3>

            <div className="space-y-2 text-xs font-mono divide-y divide-slate-100">
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Model:</span>
                <strong className="text-slate-900 font-sans">Random Forest Classifier (200 Trees)</strong>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Training Dataset:</span>
                <strong className="text-slate-900">synthetic_cancer_variant_evidence.csv</strong>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Training Samples:</span>
                <strong className="text-slate-900">1,000+ Records (Seed: 42)</strong>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Input Features:</span>
                <strong className="text-slate-900">8 Normalized Evidence Metrics</strong>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Target Variable:</span>
                <strong className="text-slate-900">Synthetic Research Category</strong>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Purpose:</span>
                <strong className="text-teal-700 font-sans">Prototype Research Prioritization</strong>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-slate-500">Clinical Validation:</span>
                <strong className="text-rose-700 font-sans">None (Educational Prototype Only)</strong>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              This architecture demonstrates how multi-modal evidence (allele rarity, in-silico consequence, evolutionary constraint) is synthesized through an ensemble classifier to prioritize candidate genomic loci for downstream experimental research.
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowModelModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
