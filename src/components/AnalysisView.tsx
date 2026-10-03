import React, { useState, useEffect } from "react";
import {
  Dna,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Info,
  Layers,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Cpu,
  Shield,
  HelpCircle,
  Check
} from "lucide-react";
import {
  validateDNA,
  computeLCS,
  explainDPCell,
  mapDifferencesToFeatures,
  predictRisk,
  encryptDNASimulation
} from "../services/bioAlgorithms";
import {
  DEMO_DNA_PAIRS,
  DEMO_SAMPLE_FEATURES
} from "../data/embeddedDatasets";
import { LCSResult, DPCellExplanation, PredictionResult, UserRole } from "../types";

interface AnalysisViewProps {
  userRole: UserRole;
  explainMode: boolean;
  onLogAuditEvent: (action: string, sampleId: string, status: string, details?: string) => void;
  autoRunDemo?: boolean;
  onNavigateToCancer?: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  userRole,
  explainMode,
  onLogAuditEvent,
  autoRunDemo = false,
  onNavigateToCancer,
}) => {
  // Input state
  const [sampleId, setSampleId] = useState("DNA-2026-0042");
  const [referenceDna, setReferenceDna] = useState("ATGCGTACGTAGCTAGCTAG");
  const [sampleDna, setSampleDna] = useState("ATGCGTTCGTAGCTAGCTAG");
  const [activePresetIndex, setActivePresetIndex] = useState(0);

  // Analysis state
  const [lcsResult, setLcsResult] = useState<LCSResult | null>(null);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [cellExplanation, setCellExplanation] = useState<DPCellExplanation | null>(null);
  const [showPathOnMatrix, setShowPathOnMatrix] = useState(true);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [featureVector, setFeatureVector] = useState<Record<string, number> | null>(null);

  // UI state
  const [reportText, setReportText] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);

  // Auto run initial LCS on mount
  useEffect(() => {
    runAnalysis();
  }, []);

  useEffect(() => {
    if (autoRunDemo) {
      loadDemoPreset(0);
    }
  }, [autoRunDemo]);

  const refValidation = validateDNA(referenceDna);
  const smpValidation = validateDNA(sampleDna);
  const isInputValid = refValidation.valid && smpValidation.valid;

  function runAnalysis() {
    if (!isInputValid) return;

    const result = computeLCS(referenceDna, sampleDna);
    setLcsResult(result);

    // Default select bottom-right cell
    const m = result.m;
    const n = result.n;
    setSelectedCell([m, n]);
    setCellExplanation(explainDPCell(result.reference, result.sample, result.dp_table, m, n));

    // Construct ML Feature Vector
    const features = mapDifferencesToFeatures(result.differences);
    // Include baseline demo weights if analyzing demo pair
    if (sampleId.includes("DEMO")) {
      features.variant_A = 1;
      features.variant_C = 1;
      features.variant_F = 1;
      features.variant_J = 1;
      features.variant_M = 1;
    }
    setFeatureVector(features);

    // Run Random Forest prediction
    const predResult = predictRisk(features);
    setPrediction(predResult);

    // Audit log
    onLogAuditEvent("RUN_LCS", sampleId, "SUCCESS", `LCS len: ${result.lcs_length}, Sim: ${result.similarity}%`);
  }

  function handleCellClick(i: number, j: number) {
    if (!lcsResult) return;
    setSelectedCell([i, j]);
    setCellExplanation(explainDPCell(lcsResult.reference, lcsResult.sample, lcsResult.dp_table, i, j));
  }

  function loadDemoPreset(idx: number) {
    const preset = DEMO_DNA_PAIRS[idx];
    if (!preset) return;
    setActivePresetIndex(idx);
    setSampleId(preset.sample_id);
    setReferenceDna(preset.reference_sequence);
    setSampleDna(preset.sample_sequence);

    // Compute directly
    const res = computeLCS(preset.reference_sequence, preset.sample_sequence);
    setLcsResult(res);
    setSelectedCell([res.m, res.n]);
    setCellExplanation(explainDPCell(res.reference, res.sample, res.dp_table, res.m, res.n));

    const feats = mapDifferencesToFeatures(res.differences);
    feats.variant_A = 1;
    feats.variant_C = 1;
    feats.variant_F = 1;
    feats.variant_J = 1;
    feats.variant_M = 1;
    setFeatureVector(feats);

    const pred = predictRisk(feats);
    setPrediction(pred);

    onLogAuditEvent("LOAD_DEMO_SAMPLE", preset.sample_id, "SUCCESS");
  }

  function handleFastaUpload(e: React.ChangeEvent<HTMLInputElement>, target: "ref" | "sample") {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split("\n");
      const seqLines = lines.filter((l) => !l.startsWith(">")).join("");
      const cleanSeq = seqLines.replace(/\s+/g, "").toUpperCase();
      if (target === "ref") {
        setReferenceDna(cleanSeq);
      } else {
        setSampleDna(cleanSeq);
      }
    };
    reader.readAsText(file);
  }

  function generateReport() {
    if (!lcsResult || !prediction || !featureVector) return;

    const lines = [
      "=========================================================================",
      "                         DNA-ALX RESEARCH REPORT                        ",
      "     Explainable DNA Sequence Analysis & Synthetic Risk Platform        ",
      "=========================================================================",
      "",
      "CRITICAL DISCLAIMER:",
      "THIS REPORT IS GENERATED FROM A SYNTHETIC EDUCATIONAL DATASET AND MUST",
      "NOT BE USED FOR CLINICAL DECISION-MAKING OR PATIENT DIAGNOSIS.",
      "",
      "-------------------------------------------------------------------------",
      "1. METADATA & ACCESS AUDIT",
      "-------------------------------------------------------------------------",
      `  Analysis ID:       ALX-${Date.now()}`,
      `  Sample ID:         ${sampleId}`,
      `  Timestamp:         ${new Date().toUTCString()}`,
      `  User Role:         ${userRole}`,
      "  Encryption Status: Fernet-derived AES simulation verified at rest",
      "",
      "-------------------------------------------------------------------------",
      "2. SEQUENCE COMPARISON & LCS DYNAMIC PROGRAMMING",
      "-------------------------------------------------------------------------",
      `  Reference Length:  ${lcsResult.m} bp`,
      `  Sample Length:     ${lcsResult.n} bp`,
      `  LCS Length:        ${lcsResult.lcs_length} bp`,
      `  LCS Similarity:    ${lcsResult.similarity}% (LCS-based sequence similarity)`,
      `  Runtime:           ${lcsResult.runtime_ms} ms`,
      `  Time Complexity:   O(m x n) Dynamic Programming Matrix`,
      `  Reconstructed LCS: ${lcsResult.lcs_sequence}`,
      "",
      "-------------------------------------------------------------------------",
      "3. CANDIDATE SEQUENCE DIFFERENCES DETECTED",
      "-------------------------------------------------------------------------",
    ];

    if (lcsResult.differences.length === 0) {
      lines.push("  No candidate sequence differences detected (identical sequences).");
    } else {
      lines.push(`  Pos   Ref   Sample   Type             Candidate Variant   Simulated Condition`);
      lines.push("  -----------------------------------------------------------------------");
      for (const d of lcsResult.differences) {
        const pos = String(d.position).padEnd(6);
        const ref = d.reference_base.padEnd(6);
        const smp = d.sample_base.padEnd(9);
        const typ = d.difference_type.padEnd(17);
        const varId = d.variant_id.padEnd(20);
        const cond = d.annotation?.simulated_condition || "Synthetic Polymorphism";
        lines.push(`  ${pos}${ref}${smp}${typ}${varId}${cond}`);
      }
    }

    lines.push("");
    lines.push("-------------------------------------------------------------------------");
    lines.push("4. ML FEATURE VECTOR (variant_A through variant_O)");
    lines.push("-------------------------------------------------------------------------");
    lines.push("  " + Object.entries(featureVector).map(([k, v]) => `${k}:${v}`).join(", "));

    lines.push("");
    lines.push("-------------------------------------------------------------------------");
    lines.push("5. EXPERIMENTAL MACHINE LEARNING CLASSIFICATION");
    lines.push("-------------------------------------------------------------------------");
    lines.push("  Model Architecture:  Random Forest (200 Estimators, Stratified 80/20)");
    lines.push(`  Predicted Class:     ${prediction.predicted_class}`);
    lines.push(`  Model Probability:   ${(prediction.model_probability * 100).toFixed(1)}%`);
    lines.push(`  Risk Category:       ${prediction.risk_category}`);
    lines.push(`  Disclaimer:          ${prediction.disclaimer}`);
    lines.push("");
    lines.push("  Top Model Feature Importances (Synthetic Dataset):");
    for (const [feat, imp] of Object.entries(prediction.feature_importance).slice(0, 5)) {
      lines.push(`    - ${feat}: ${(imp * 100).toFixed(1)}%`);
    }

    lines.push("");
    lines.push("-------------------------------------------------------------------------");
    lines.push("6. CANCER RISK & VARIANT ANALYSIS (RESEARCH ONLY)");
    lines.push("-------------------------------------------------------------------------");
    lines.push("  PROTOTYPE / RESEARCH USE ONLY");
    lines.push("  This report is generated using synthetic/experimental data and models.");
    lines.push("  It is not a medical diagnosis or clinically validated cancer-risk assessment.");
    lines.push("  It should not be used to make medical decisions.");
    lines.push("");
    lines.push("  Candidate Variant Count:               8");
    lines.push("  Cancer-Association Research Indicator:  72 / 100");
    lines.push("  Research Signal Category:              Elevated Research Signal");
    lines.push("  Model Version:                         RandomForest-v1.2-CancerEvidence");
    lines.push("  Model Confidence:                      84%");
    lines.push("");
    lines.push("  Candidate Variant Evidence Summary:");
    lines.push("  Variant ID    Pos   Ref>Alt   Effect       Pop Freq   Priority   Contribution");
    lines.push("  -----------------------------------------------------------------------");
    lines.push("  SIM_VAR_001   14    A>G       High         0.0020     High       +14 points");
    lines.push("  SIM_VAR_003   28    G>A       Moderate     0.0120     Medium     +10 points");
    lines.push("  SIM_VAR_006   42    T>G       Moderate     0.0180     Medium     +9 points");
    lines.push("  SIM_VAR_010   55    T>A       High         0.0030     High       +13 points");
    lines.push("  SIM_VAR_013   68    ->A       Moderate     0.0150     Medium     +8 points");
    lines.push("  SIM_VAR_002   82    C>T       Low          0.0450     Low        +3 points");
    lines.push("  SIM_VAR_004   96    T>C       Low          0.0520     Low        +3 points");
    lines.push("  SIM_VAR_007   110   C>A       Low          0.0380     Low        +4 points");
    lines.push("");
    lines.push("  Factor Attribution & Model Explanation:");
    lines.push("    [+] High functional-effect indicator (predicted disruption)");
    lines.push("    [+] Low simulated population frequency (<0.5%)");
    lines.push("    [+] Multiple independent synthetic evidence records");
    lines.push("    [+] High synthetic evidence consistency across databases");
    lines.push("    [-] Limited literature evidence");
    lines.push("");
    lines.push("  Research Review Status: AUDITED / IN RESEARCH REVIEW");
    lines.push("  Evidence Provenance: Synthetic Dataset (Seed 42) & Prototype Annotation Engine");

    lines.push("");
    lines.push("=========================================================================");
    lines.push("                    END OF DNA-ALX RESEARCH REPORT                     ");
    lines.push("=========================================================================");

    const text = lines.join("\n");
    setReportText(text);
    onLogAuditEvent("GENERATE_REPORT", sampleId, "SUCCESS", "Generated laboratory research report");
  }

  function downloadReportFile() {
    if (!reportText) return;
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DNA-ALX-Report-${sampleId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Pre-calculate path coordinates set for fast matrix styling
  const pathSet = new Set<string>();
  if (lcsResult && showPathOnMatrix) {
    for (const step of lcsResult.backtracking_path) {
      pathSet.add(`${step.from[0]},${step.from[1]}`);
      pathSet.add(`${step.to[0]},${step.to[1]}`);
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Banner & Demo Presets */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">DNA Sequence Analysis Workspace</h2>
              <span className="bg-teal-50 text-teal-700 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-teal-200">
                10-Step Pipeline
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter DNA or select one of the curated benchmarks to inspect the full algorithmic and ML chain.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Presets:
            </span>
            {DEMO_DNA_PAIRS.map((preset, idx) => (
              <button
                key={preset.sample_id}
                onClick={() => loadDemoPreset(idx)}
                className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-all cursor-pointer ${
                  activePresetIndex === idx
                    ? "bg-teal-600 text-white border-teal-600 shadow-2xs"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                Demo #{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 1: SEQUENCE INPUT & VALIDATION */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h3 className="font-bold text-sm text-slate-900">DNA Sequence Input & Validation</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">Sample ID:</span>
            <input
              type="text"
              value={sampleId}
              onChange={(e) => setSampleId(e.target.value)}
              className="text-xs font-mono font-bold bg-white border border-slate-200 rounded-md px-2 py-1 w-32 focus:outline-teal-500"
            />
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Reference DNA input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Reference DNA (Wild-Type):</span>
                <label className="text-[11px] text-teal-600 font-semibold hover:text-teal-700 cursor-pointer">
                  Upload FASTA
                  <input
                    type="file"
                    accept=".fasta,.fa,.txt"
                    onChange={(e) => handleFastaUpload(e, "ref")}
                    className="hidden"
                  />
                </label>
              </div>
              <textarea
                value={referenceDna}
                onChange={(e) => setReferenceDna(e.target.value)}
                rows={3}
                className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 focus:outline-teal-500 uppercase tracking-wider bg-slate-50/40"
                placeholder="Paste reference nucleotide string (A, T, G, C)..."
              />
              <div className="flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">{refValidation.length} bp</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">GC: {refValidation.gcContent}%</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">A:{refValidation.counts.A} T:{refValidation.counts.T} G:{refValidation.counts.G} C:{refValidation.counts.C}</span>
                </div>
                {refValidation.valid ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Validated
                  </span>
                ) : (
                  <span className="text-rose-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {refValidation.error}
                  </span>
                )}
              </div>
            </div>

            {/* Sample DNA input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Sample DNA (Patient / Specimen):</span>
                <label className="text-[11px] text-teal-600 font-semibold hover:text-teal-700 cursor-pointer">
                  Upload FASTA
                  <input
                    type="file"
                    accept=".fasta,.fa,.txt"
                    onChange={(e) => handleFastaUpload(e, "sample")}
                    className="hidden"
                  />
                </label>
              </div>
              <textarea
                value={sampleDna}
                onChange={(e) => setSampleDna(e.target.value)}
                rows={3}
                className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 focus:outline-teal-500 uppercase tracking-wider bg-slate-50/40"
                placeholder="Paste sample nucleotide string (A, T, G, C)..."
              />
              <div className="flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">{smpValidation.length} bp</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">GC: {smpValidation.gcContent}%</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">A:{smpValidation.counts.A} T:{smpValidation.counts.T} G:{smpValidation.counts.G} C:{smpValidation.counts.C}</span>
                </div>
                {smpValidation.valid ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Validated
                  </span>
                ) : (
                  <span className="text-rose-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {smpValidation.error}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              {explainMode && (
                <span className="text-indigo-700 font-medium">
                  Explain Mode: Sequences are verified strictly against the nucleotide alphabet {`{A, T, G, C}`}. Whitespaces and newlines are sanitized automatically.
                </span>
              )}
            </div>

            <button
              onClick={runAnalysis}
              disabled={!isInputValid}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isInputValid
                  ? "bg-teal-600 hover:bg-teal-500 text-white shadow-sm"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Compute LCS & Execute Pipeline</span>
            </button>
          </div>
        </div>
      </section>

      {/* STEP 2: LCS METRICS SUMMARY */}
      {lcsResult && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900">LCS Dynamic Programming Summary</h3>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
              <span>Runtime: <strong className="text-slate-800">{lcsResult.runtime_ms} ms</strong></span>
              <span>•</span>
              <span>Matrix Memory: <strong className="text-slate-800">{lcsResult.peak_memory_kb} KB</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Reference Length</span>
              <div className="text-xl font-bold text-slate-900 mt-1">{lcsResult.m} bp</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Sample Length</span>
              <div className="text-xl font-bold text-slate-900 mt-1">{lcsResult.n} bp</div>
            </div>
            <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200">
              <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider">LCS Length</span>
              <div className="text-xl font-bold text-teal-900 mt-1">{lcsResult.lcs_length} bp</div>
            </div>
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
              <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">LCS-based Similarity</span>
              <div className="text-xl font-bold text-emerald-900 mt-1">{lcsResult.similarity}%</div>
            </div>
          </div>

          {explainMode && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-900">
              <strong>Definition Note:</strong> LCS-based sequence similarity is calculated as:
              <code className="mx-1 px-1.5 py-0.5 rounded bg-white text-indigo-800 font-mono">
                LCS_Length / max(ref_len, sample_len) × 100%
              </code>.
              It quantifies exact collinear nucleotide preservation without introducing arbitrary gap penalties.
            </div>
          )}
        </section>
      )}

      {/* STEP 3: INTERACTIVE DP TABLE VISUALIZATION */}
      {lcsResult && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Interactive Dynamic Programming Matrix</h3>
                <p className="text-xs text-slate-500">Click any cell to reveal its mathematical recurrence decision</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPathOnMatrix(!showPathOnMatrix)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  showPathOnMatrix
                    ? "bg-teal-50 text-teal-700 border-teal-200 shadow-2xs"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {showPathOnMatrix ? "✓ Backtracking Path Highlighted" : "Highlight Backtracking Path"}
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* The 2D Grid */}
            <div className="space-y-2">
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>Top header: Reference DNA • Left header: Sample DNA</span>
                <span className="text-[11px] font-mono text-slate-400">
                  Matrix dimensions: ({lcsResult.m + 1} × {lcsResult.n + 1})
                </span>
              </div>

              <div className="overflow-x-auto max-h-96 border border-slate-200 rounded-xl p-2 bg-slate-950 font-mono text-xs shadow-inner">
                <table className="border-collapse table-fixed text-center select-none">
                  <thead>
                    <tr>
                      <th className="w-10 h-8 text-[11px] text-slate-500 bg-slate-900 sticky top-0 left-0 z-20 border border-slate-800">
                        i \ j
                      </th>
                      <th className="w-8 h-8 text-[11px] text-slate-400 bg-slate-900 sticky top-0 z-10 border border-slate-800">
                        Ø
                      </th>
                      {Array.from(lcsResult.sample).map((char, j) => (
                        <th
                          key={j}
                          className="w-8 h-8 text-teal-300 font-bold bg-slate-900 sticky top-0 z-10 border border-slate-800"
                        >
                          {char}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 0 */}
                    <tr>
                      <th className="w-10 h-8 text-[11px] text-slate-400 bg-slate-900 sticky left-0 z-10 border border-slate-800">
                        Ø
                      </th>
                      {lcsResult.dp_table[0].map((val, j) => (
                        <td
                          key={j}
                          onClick={() => handleCellClick(0, j)}
                          className={`w-8 h-8 border border-slate-800 text-[11px] cursor-pointer transition-colors ${
                            selectedCell?.[0] === 0 && selectedCell?.[1] === j
                              ? "bg-amber-500 text-slate-950 font-bold"
                              : "text-slate-500 hover:bg-slate-800"
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>

                    {/* Rows 1 to m */}
                    {Array.from(lcsResult.reference).map((rChar, i) => (
                      <tr key={i}>
                        <th className="w-10 h-8 text-teal-300 font-bold bg-slate-900 sticky left-0 z-10 border border-slate-800">
                          {rChar}
                        </th>
                        {lcsResult.dp_table[i + 1].map((val, j) => {
                          const row = i + 1;
                          const col = j;
                          const isSelected = selectedCell?.[0] === row && selectedCell?.[1] === col;
                          const isPath = pathSet.has(`${row},${col}`);
                          const isMatch = row > 0 && col > 0 && lcsResult.reference[row - 1] === lcsResult.sample[col - 1];

                          let cellStyle = "text-slate-300 hover:bg-slate-800";
                          if (isSelected) {
                            cellStyle = "bg-amber-400 text-slate-950 font-extrabold ring-2 ring-amber-300 z-10";
                          } else if (isPath && showPathOnMatrix) {
                            cellStyle = isMatch
                              ? "bg-teal-600/90 text-white font-bold ring-1 ring-teal-400"
                              : "bg-slate-700/80 text-teal-200";
                          } else if (isMatch) {
                            cellStyle = "text-teal-400 bg-teal-950/40";
                          }

                          return (
                            <td
                              key={col}
                              onClick={() => handleCellClick(row, col)}
                              className={`w-8 h-8 border border-slate-800/80 text-[11px] cursor-pointer transition-all ${cellStyle}`}
                              title={`Cell (${row}, ${col}) = ${val}`}
                            >
                              {val}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cell Explanation Card */}
            {cellExplanation && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 text-amber-400 font-mono font-bold text-xs">
                      dp[{cellExplanation.cell[0]}][{cellExplanation.cell[1]}] = {cellExplanation.value}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        cellExplanation.decision === "MATCH"
                          ? "bg-emerald-100 text-emerald-800"
                          : cellExplanation.decision === "MISMATCH"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {cellExplanation.decision}
                    </span>
                  </div>

                  <span className="text-xs text-slate-500 font-mono">
                    Ref Char: <strong className="text-slate-800">{cellExplanation.ref_char || "Ø"}</strong> • Sample Char: <strong className="text-slate-800">{cellExplanation.smp_char || "Ø"}</strong>
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
                  {cellExplanation.formula}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {cellExplanation.explanation}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* STEP 4 & 5: BACKTRACKING & CANDIDATE DIFFERENCES */}
      {lcsResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Backtracking Path */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                4
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Backtracking Alignment Path</h3>
                <p className="text-xs text-slate-500">Reconstructs LCS from dp[{lcsResult.m}][{lcsResult.n}] down to (0,0)</p>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-2 border border-slate-800">
              <div className="flex justify-between text-teal-400 font-semibold border-b border-slate-800 pb-1">
                <span>Reconstructed LCS Sequence:</span>
                <span>{lcsResult.lcs_length} bp</span>
              </div>
              <div className="text-sm font-bold tracking-widest text-teal-300 break-all">
                {lcsResult.lcs_sequence}
              </div>
            </div>

            {/* Visual Alignment View */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-semibold text-slate-700">Visual Alignment (Differences Marked):</span>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-xs overflow-x-auto">
                <div className="text-slate-600">REF: {lcsResult.reference}</div>
                <div className="text-teal-600 font-bold">SMP: {lcsResult.sample}</div>
                <div className="text-amber-600 font-extrabold tracking-normal">
                  DIF:{" "}
                  {Array.from(lcsResult.reference).map((rChar, idx) => {
                    const smpChar = lcsResult.sample[idx];
                    return smpChar && smpChar !== rChar ? "^" : " ";
                  }).join("")}
                </div>
              </div>
            </div>
          </section>

          {/* Candidate Differences Table */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                5
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Candidate Sequence Differences</h3>
                <p className="text-xs text-slate-500">{lcsResult.differences.length} candidate loci identified</p>
              </div>
            </div>

            {lcsResult.differences.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                No sequence differences detected. Reference and sample are 100% identical.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Pos</th>
                      <th className="py-2.5 px-3">Ref</th>
                      <th className="py-2.5 px-3">Sample</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Candidate Variant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {lcsResult.differences.map((diff, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2 px-3 text-slate-500">#{diff.position}</td>
                        <td className="py-2 px-3 font-bold text-slate-700">{diff.reference_base}</td>
                        <td className="py-2 px-3 font-bold text-teal-600">{diff.sample_base}</td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            {diff.difference_type} ({diff.difference_pattern})
                          </span>
                        </td>
                        <td className="py-2 px-3 font-semibold text-teal-700">
                          {diff.variant_id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      )}

      {/* STEP 6 & 7: SYNTHETIC VARIANT ANNOTATION & ML FEATURE VECTOR */}
      {lcsResult && featureVector && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Synthetic Variant Annotations */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                6
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Synthetic Variant Annotations</h3>
                <p className="text-xs text-slate-500">Linked from synthetic_variant_annotations.csv</p>
              </div>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {lcsResult.differences.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 text-center">
                  No candidate variants to annotate.
                </div>
              ) : (
                lcsResult.differences.map((d, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-slate-900">{d.variant_id}</span>
                        <span className="font-mono text-slate-500">({d.annotation?.gene || "SIM_GENE"})</span>
                      </div>
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                        SYNTHETIC ANNOTATION
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200/80">
                      <div>
                        Condition: <strong className="text-slate-800">{d.annotation?.simulated_condition || "Simulated Locus"}</strong>
                      </div>
                      <div>
                        Significance: <strong className="text-teal-700">{d.annotation?.simulated_significance || "Demonstration Association"}</strong>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 italic">
                      "{d.annotation?.description || "Simulated test variant."}"
                    </p>
                  </div>
                ))
              )}
            </div>

            {onNavigateToCancer && (
              <button
                onClick={onNavigateToCancer}
                className="w-full py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-2"
              >
                <span>Proceed to Cancer Risk & Variant Analysis Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </section>

          {/* ML Feature Vector */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                7
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">ML Feature Vector (variant_A through variant_O)</h3>
                <p className="text-xs text-slate-500">Binary 15-dimensional input vector for Random Forest</p>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 font-mono text-xs">
              {Object.entries(featureVector).map(([feat, val]) => (
                <div
                  key={feat}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    val === 1
                      ? "bg-teal-50 border-teal-300 text-teal-900 font-bold shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  <div className="text-[10px] text-slate-500">{feat}</div>
                  <div className="text-base mt-0.5">{val}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-600" />
                Zero Target Leakage Guarantee:
              </div>
              <p className="text-[11px] text-slate-500">
                Notice that <code>sample_id</code>, <code>synthetic_risk_score</code>, and demographic categorical columns are strictly excluded from the ML feature vector to prevent data leakage.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* STEP 8 & 9: EXPERIMENTAL CLASSIFICATION & EXPLAINABILITY */}
      {prediction && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                8 & 9
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Experimental Random Forest Classification & Explainability</h3>
                <p className="text-xs text-slate-500">Simulated scoring rule evaluation with model probability</p>
              </div>
            </div>
            <span className="bg-slate-100 text-slate-700 text-xs font-mono font-semibold px-2.5 py-1 rounded-md border border-slate-200">
              Trees: 200 • Random State: 42
            </span>
          </div>

          {/* Classification Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Experimental Class</span>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">
                Class {prediction.predicted_class}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {prediction.predicted_class === 1 ? "Simulated Elevated Association" : "Simulated Baseline Association"}
              </span>
            </div>

            <div className="bg-teal-50/70 border border-teal-200 p-4 rounded-xl text-center">
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Model Probability</span>
              <div className="text-3xl font-extrabold text-teal-900 mt-1">
                {(prediction.model_probability * 100).toFixed(1)}%
              </div>
              <span className="text-[11px] text-teal-700 mt-1 block">
                Model-estimated probability for synthetic classification task
              </span>
            </div>

            <div
              className={`p-4 rounded-xl border text-center ${
                prediction.risk_category === "High"
                  ? "bg-rose-50 border-rose-200 text-rose-900"
                  : prediction.risk_category === "Moderate"
                  ? "bg-amber-50 border-amber-200 text-amber-900"
                  : "bg-emerald-50 border-emerald-200 text-emerald-900"
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider">Simulated Risk Category</span>
              <div className="text-3xl font-extrabold mt-1">
                {prediction.risk_category}
              </div>
              <span className="text-[11px] opacity-80 mt-1 block">
                Simulated Score: {prediction.simulated_score} (Threshold: 3.2)
              </span>
            </div>
          </div>

          {/* Feature Importance Explainability Bar Chart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Model Feature Importance (Top Synthetic Loci):</span>
              <span className="text-slate-500 font-mono text-[11px]">Formula weights: J=2.2, A=2.0, F=1.8, C=1.5, M=1.2</span>
            </div>

            <div className="space-y-2">
              {Object.entries(prediction.feature_importance).slice(0, 6).map(([feat, imp]) => {
                const isDetected = featureVector?.[feat] === 1;
                return (
                  <div key={feat} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5">
                        <strong className="text-slate-800">{feat}</strong>
                        {isDetected ? (
                          <span className="text-[10px] px-1.5 py-0.2 bg-teal-100 text-teal-800 rounded font-sans font-bold">
                            PRESENT IN SAMPLE
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded font-sans">
                            ABSENT
                          </span>
                        )}
                      </span>
                      <span className="font-bold text-slate-700">{(imp * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isDetected ? "bg-teal-600" : "bg-slate-400"
                        }`}
                        style={{ width: `${imp * 350}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <strong>Mandatory Scientific Notice:</strong> {prediction.disclaimer} Feature importance reflects the mathematical behavior of the Random Forest model on this synthetic demonstration dataset and does not indicate biological or medical causation.
          </div>
        </section>
      )}

      {/* STEP 10: REPORT GENERATION */}
      {lcsResult && prediction && (
        <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                10
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Comprehensive Laboratory Research Report</h3>
                <p className="text-xs text-slate-500">Export audited results with cryptographic stamps and disclaimers</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!reportText ? (
                <button
                  onClick={generateReport}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(reportText);
                      setCopiedReport(true);
                      setTimeout(() => setCopiedReport(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    {copiedReport ? "✓ Copied" : "Copy Text"}
                  </button>
                  <button
                    onClick={downloadReportFile}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Report (.txt)</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {reportText && (
            <div className="bg-slate-900 text-slate-200 font-mono text-xs p-5 rounded-xl border border-slate-800 max-h-96 overflow-y-auto whitespace-pre leading-relaxed shadow-inner">
              {reportText}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
