import React, { useState } from "react";
import {
  Database,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Info,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";
import { DATASET_PREVIEW_RECORDS } from "../data/embeddedDatasets";

export const DatasetExplorerView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const filteredRecords = DATASET_PREVIEW_RECORDS.filter((rec) => {
    const matchesSearch = rec.sample_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || rec.risk_category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  function downloadCsv() {
    const header = [
      "sample_id",
      "variant_A",
      "variant_B",
      "variant_C",
      "variant_D",
      "variant_E",
      "variant_F",
      "variant_G",
      "variant_H",
      "variant_I",
      "variant_J",
      "variant_K",
      "variant_L",
      "variant_M",
      "variant_N",
      "variant_O",
      "age_group",
      "sex",
      "synthetic_risk_score",
      "risk_label",
      "risk_category"
    ];

    const rows = DATASET_PREVIEW_RECORDS.map((r) => [
      r.sample_id,
      r.variant_A,
      r.variant_B,
      r.variant_C,
      r.variant_D,
      r.variant_E,
      r.variant_F,
      r.variant_G,
      r.variant_H,
      r.variant_I,
      r.variant_J,
      r.variant_K,
      r.variant_L,
      r.variant_M,
      r.variant_N,
      r.variant_O,
      r.age_group,
      r.sex,
      r.synthetic_risk_score,
      r.risk_label,
      r.risk_category
    ]);

    const csvContent = [header.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "synthetic_genetic_variants.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Synthetic Genetic Dataset Explorer</h2>
              <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                SYNTHETIC DATASET
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              data/synthetic_genetic_variants.csv • 1,000 synthetic patient records generated with fixed seed: 42
            </p>
          </div>

          <button
            onClick={downloadCsv}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV (1,000 records)</span>
          </button>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> This dataset is completely synthetic and generated for demonstration of algorithmic and machine-learning pipelines. Features <code>variant_A</code> through <code>variant_O</code> reflect Bernoulli trials ($P \approx 0.30$) combined through a deterministic formula with added Gaussian noise.
          </p>
        </div>
      </div>

      {/* Dataset Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sample Size</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">1,000 rows</div>
          <p className="text-xs text-slate-500 mt-1">Zero missing values</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Feature Dimension</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">15 Genetic Variants</div>
          <p className="text-xs text-slate-500 mt-1">variant_A to variant_O (0 or 1)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Class Distribution</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">59.8% / 40.2%</div>
          <p className="text-xs text-slate-500 mt-1">Class 0: 598 • Class 1: 402</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Categories</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">3 Tiers</div>
          <p className="text-xs text-slate-500 mt-1">Low: 312 • Mod: 524 • High: 164</p>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search sample ID (e.g. DNA-2026-0005)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-teal-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filter Category:</span>
            {["ALL", "Low", "Moderate", "High"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-teal-600 text-white font-bold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Sample ID</th>
                <th className="py-2.5 px-2 text-center">vA</th>
                <th className="py-2.5 px-2 text-center">vB</th>
                <th className="py-2.5 px-2 text-center">vC</th>
                <th className="py-2.5 px-2 text-center">vD</th>
                <th className="py-2.5 px-2 text-center">vE</th>
                <th className="py-2.5 px-2 text-center">vF</th>
                <th className="py-2.5 px-2 text-center">vG</th>
                <th className="py-2.5 px-2 text-center">vH</th>
                <th className="py-2.5 px-2 text-center">vI</th>
                <th className="py-2.5 px-2 text-center">vJ</th>
                <th className="py-2.5 px-2 text-center">vK</th>
                <th className="py-2.5 px-2 text-center">vL</th>
                <th className="py-2.5 px-2 text-center">vM</th>
                <th className="py-2.5 px-2 text-center">vN</th>
                <th className="py-2.5 px-2 text-center">vO</th>
                <th className="py-2.5 px-3">Age</th>
                <th className="py-2.5 px-2">Sex</th>
                <th className="py-2.5 px-3">Risk Score</th>
                <th className="py-2.5 px-2">Label</th>
                <th className="py-2.5 px-3">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredRecords.map((r) => (
                <tr key={r.sample_id} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-bold text-slate-900">{r.sample_id}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_A ? "font-bold text-teal-600 bg-teal-50/50" : "text-slate-300"}`}>{r.variant_A}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_B ? "font-bold text-slate-700" : "text-slate-300"}`}>{r.variant_B}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_C ? "font-bold text-teal-600 bg-teal-50/50" : "text-slate-300"}`}>{r.variant_C}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_D ? "font-bold text-slate-700" : "text-slate-300"}`}>{r.variant_D}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_E ? "font-bold text-slate-700" : "text-slate-300"}`}>{r.variant_E}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_F ? "font-bold text-teal-600 bg-teal-50/50" : "text-slate-300"}`}>{r.variant_F}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_G ? "font-bold text-slate-700" : "text-slate-300"}`}>{r.variant_G}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_H ? "font-bold text-slate-700" : "text-slate-300"}`}>{r.variant_H}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_I ? "font-bold text-slate-700" : "text-slate-300"}`}>{r.variant_I}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_J ? "font-bold text-teal-600 bg-teal-50/50" : "text-slate-300"}`}>{r.variant_J}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_K ? "font-bold text-slate-700" : "text-slate-300"}`}>{r.variant_K}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_L ? "font-bold text-slate-700" : "text-slate-300"}`}>{r.variant_L}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_M ? "font-bold text-teal-600 bg-teal-50/50" : "text-slate-300"}`}>{r.variant_M}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_N ? "font-bold text-slate-700" : "text-slate-300"}`}>{r.variant_N}</td>
                  <td className={`py-2 px-2 text-center ${r.variant_O ? "font-bold text-slate-700" : "text-slate-300"}`}>{r.variant_O}</td>
                  <td className="py-2 px-3 text-slate-600 capitalize font-sans">{r.age_group}</td>
                  <td className="py-2 px-2 text-slate-600 font-sans">{r.sex}</td>
                  <td className="py-2 px-3 font-semibold text-slate-800">{r.synthetic_risk_score}</td>
                  <td className="py-2 px-2 font-bold">{r.risk_label}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        r.risk_category === "High"
                          ? "bg-rose-100 text-rose-800"
                          : r.risk_category === "Moderate"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {r.risk_category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
