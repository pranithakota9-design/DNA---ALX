import React from "react";
import {
  Cpu,
  BarChart3,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Info,
  Activity
} from "lucide-react";
import { MODEL_METRICS_DATA, FEATURE_IMPORTANCES_DATA } from "../data/embeddedDatasets";

export const ModelInfoView: React.FC = () => {
  const cm = MODEL_METRICS_DATA.confusion_matrix;
  const totalTest = cm.tn + cm.fp + cm.fn + cm.tp;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Machine Learning Architecture & Evaluation</h2>
            <p className="text-xs text-slate-500">
              Supervised classification on synthetic genetic variant features (variant_A through variant_O)
            </p>
          </div>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Synthetic Dataset Evaluation Notice:</strong> The performance metrics and confusion matrix below reflect model behavior on simulated data with an artificial scoring rule. Feature importance measures how the decision tree ensemble split on synthetic variant columns.
          </p>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Test Accuracy</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">
            {(MODEL_METRICS_DATA.accuracy * 100).toFixed(2)}%
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">High fidelity on synthetic target</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Precision</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">
            {(MODEL_METRICS_DATA.precision * 100).toFixed(2)}%
          </div>
          <p className="text-xs text-slate-500 mt-1">Positive predictive value</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recall / Sensitivity</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">
            {(MODEL_METRICS_DATA.recall * 100).toFixed(2)}%
          </div>
          <p className="text-xs text-slate-500 mt-1">True positive rate</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">F1-Score</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">
            {MODEL_METRICS_DATA.f1_score.toFixed(4)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Harmonic mean of precision & recall</p>
        </div>
      </div>

      {/* Model Spec & Confusion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Spec */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-600" />
            Model Specification & Hyperparameters
          </h3>

          <div className="divide-y divide-slate-100 text-xs font-mono">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Algorithm:</span>
              <strong className="text-slate-900 font-sans">RandomForestClassifier</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Ensemble Estimators:</span>
              <strong className="text-slate-900">200 Decision Trees</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Random Seed:</span>
              <strong className="text-slate-900">42 (Reproducible)</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Train / Test Split:</span>
              <strong className="text-slate-900">80% Train (799) / 20% Test (201)</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Target Stratification:</span>
              <strong className="text-emerald-700">stratify = y (Enabled)</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-500">Feature Dimensions:</span>
              <strong className="text-slate-900">15 Binary Variables (variant_A..O)</strong>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-slate-900 font-sans">Ensemble Mechanism:</span>
            <p className="leading-relaxed">
              Random Forest aggregates 200 individual decision trees via bootstrap sampling (bagging) and random feature subsets. This combats overfitting on noisy binary genomic indicators while preserving non-linear interactions.
            </p>
          </div>
        </div>

        {/* Confusion Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              Confusion Matrix (201 Test Samples)
            </h3>
            <span className="text-xs text-slate-500 font-mono">Stratified 80/20</span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-center text-xs">
            <div className="grid grid-cols-3 bg-slate-50 font-semibold text-slate-600 py-2 border-b border-slate-200 font-mono">
              <div>Actual \ Pred</div>
              <div>Pred: 0 (Baseline)</div>
              <div>Pred: 1 (Elevated)</div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 py-3 font-mono">
              <div className="font-semibold text-slate-600 flex items-center justify-center">Actual: 0</div>
              <div className="bg-emerald-50/70 text-emerald-900 font-bold p-2">
                TN = {cm.tn}
                <span className="block text-[10px] text-emerald-700 font-normal">True Negatives</span>
              </div>
              <div className="bg-rose-50/50 text-rose-800 p-2">
                FP = {cm.fp}
                <span className="block text-[10px] text-rose-600 font-normal">False Positives</span>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-slate-100 py-3 font-mono">
              <div className="font-semibold text-slate-600 flex items-center justify-center">Actual: 1</div>
              <div className="bg-rose-50/50 text-rose-800 p-2">
                FN = {cm.fn}
                <span className="block text-[10px] text-rose-600 font-normal">False Negatives</span>
              </div>
              <div className="bg-emerald-50/70 text-emerald-900 font-bold p-2">
                TP = {cm.tp}
                <span className="block text-[10px] text-emerald-700 font-normal">True Positives</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-600">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              Specificity: <strong>{((cm.tn / (cm.tn + cm.fp)) * 100).toFixed(2)}%</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              Sensitivity: <strong>{((cm.tp / (cm.tp + cm.fn)) * 100).toFixed(2)}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Performance & Complexity Analysis */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-600" />
          Bioinformatics Algorithm Complexity Analysis (LCS Dynamic Programming)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2 border border-slate-800">
            <div className="text-teal-400 font-bold">Time Complexity: O(m × n)</div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              For reference sequence length <code>m</code> and sample length <code>n</code>, each matrix cell <code>dp[i][j]</code> requires constant-time $O(1)$ lookups into diagonal, top, and left neighbors. The total number of states is strictly $(m + 1)(n + 1)$.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2 border border-slate-800">
            <div className="text-teal-400 font-bold">Space Complexity: O(m × n)</div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              While LCS length can theoretically be calculated in $O(\min(m, n))$ space using two rows, DNA-ALX retains the entire $(m + 1) \times (n + 1)$ table in memory to support full interactive backtracking and step-by-step educational exploration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
