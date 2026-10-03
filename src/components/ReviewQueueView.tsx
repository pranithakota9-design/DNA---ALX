import React, { useState } from "react";
import { VariantReviewItem, ReviewStatus, UserRole } from "../types";
import {
  ClipboardCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  Save,
  MessageSquare,
  ShieldCheck
} from "lucide-react";

interface ReviewQueueViewProps {
  currentRole: UserRole;
  onLogAuditEvent: (action: string, sampleId: string, status: string, details?: string) => void;
}

export const ReviewQueueView: React.FC<ReviewQueueViewProps> = ({
  currentRole,
  onLogAuditEvent
}) => {
  const [reviews, setReviews] = useState<VariantReviewItem[]>([
    {
      variant_id: "SIM_VAR_001",
      priority: "High",
      status: "UNDER REVIEW",
      reviewer_id: "demo@dna-alx.local",
      review_notes: "Elevated functional disruption in simulated locus. High priority follow-up.",
      updated_at: "2026-10-03 08:15:00"
    },
    {
      variant_id: "SIM_VAR_003",
      priority: "Medium",
      status: "NEW",
      reviewer_id: "unassigned",
      review_notes: "Awaiting secondary evidence inspection and cross-species verification.",
      updated_at: "2026-10-03 08:10:00"
    },
    {
      variant_id: "SIM_VAR_006",
      priority: "High",
      status: "REVIEWED",
      reviewer_id: "demo@dna-alx.local",
      review_notes: "Conserved synthetic locus verified. Signal aligned with literature expectation.",
      updated_at: "2026-10-03 08:20:00"
    },
    {
      variant_id: "SIM_VAR_010",
      priority: "High",
      status: "NEEDS MORE EVIDENCE",
      reviewer_id: "demo@dna-alx.local",
      review_notes: "Literature evidence count low (<2 records). Flagged for re-curation.",
      updated_at: "2026-10-03 08:22:00"
    },
    {
      variant_id: "SIM_VAR_013",
      priority: "Medium",
      status: "UNDER REVIEW",
      reviewer_id: "demo@dna-alx.local",
      review_notes: "Frameshift candidate in synthetic exon region.",
      updated_at: "2026-10-03 08:18:00"
    },
    {
      variant_id: "SIM_VAR_002",
      priority: "Low",
      status: "REVIEWED",
      reviewer_id: "demo@dna-alx.local",
      review_notes: "Likely benign synthetic polymorphism with high population frequency.",
      updated_at: "2026-10-03 08:05:00"
    },
    {
      variant_id: "SIM_VAR_004",
      priority: "Low",
      status: "NEW",
      reviewer_id: "unassigned",
      review_notes: "Non-coding difference with minimal regulatory evidence.",
      updated_at: "2026-10-03 08:02:00"
    },
    {
      variant_id: "SIM_VAR_007",
      priority: "Low",
      status: "NEW",
      reviewer_id: "unassigned",
      review_notes: "Synonymous simulated change.",
      updated_at: "2026-10-03 08:00:00"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const canEdit = currentRole === "RESEARCHER" || currentRole === "ADMIN";

  function handleStatusChange(variantId: string, newStatus: ReviewStatus) {
    if (!canEdit) return;

    setReviews((prev) =>
      prev.map((item) => {
        if (item.variant_id !== variantId) return item;
        const updated = {
          ...item,
          status: newStatus,
          reviewer_id: "demo@dna-alx.local",
          updated_at: new Date().toISOString().replace("T", " ").substring(0, 19)
        };
        return updated;
      })
    );

    onLogAuditEvent(
      "UPDATE_REVIEW_STATUS",
      variantId,
      "SUCCESS",
      `Changed review status to ${newStatus}`
    );

    setFeedbackMsg(`Updated ${variantId} status to "${newStatus}" & recorded audit event.`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  }

  function handleNotesSave(variantId: string) {
    if (!canEdit) return;
    const newNote = editingNotes[variantId];
    if (newNote === undefined) return;

    setReviews((prev) =>
      prev.map((item) => {
        if (item.variant_id !== variantId) return item;
        return {
          ...item,
          review_notes: newNote,
          updated_at: new Date().toISOString().replace("T", " ").substring(0, 19)
        };
      })
    );

    onLogAuditEvent(
      "UPDATE_REVIEW_NOTES",
      variantId,
      "SUCCESS",
      `Updated review notes for ${variantId}`
    );

    setFeedbackMsg(`Saved notes for ${variantId} & recorded audit event.`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  }

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.variant_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.review_notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || r.status === filterStatus;
    const matchesPriority = filterPriority === "ALL" || r.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Research Review Queue</h2>
              <p className="text-xs text-slate-500">
                Interactive triaging and human-in-the-loop review of candidate sequence variants
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Authorized Role:</span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md border border-slate-200">
              {currentRole}
            </span>
          </div>
        </div>

        {feedbackMsg && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            <strong>Audit Policy:</strong> Every status transition and note update creates an immutable entry in the system audit trail with user identity and timestamps.
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate variant or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-teal-500 font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            {["ALL", "NEW", "UNDER REVIEW", "REVIEWED", "NEEDS MORE EVIDENCE"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  filterStatus === st
                    ? "bg-teal-600 text-white font-bold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Review Queue Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Variant ID</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Review Status</th>
                <th className="py-2.5 px-3">Reviewer</th>
                <th className="py-2.5 px-4 w-1/3">Review Notes</th>
                <th className="py-2.5 px-3">Last Updated (UTC)</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredReviews.map((r) => {
                const currentNote =
                  editingNotes[r.variant_id] !== undefined
                    ? editingNotes[r.variant_id]
                    : r.review_notes;

                return (
                  <tr key={r.variant_id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">{r.variant_id}</td>
                    <td className="py-3 px-3 font-sans">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          r.priority === "High"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : r.priority === "Medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {r.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {canEdit ? (
                        <select
                          value={r.status}
                          onChange={(e) =>
                            handleStatusChange(r.variant_id, e.target.value as ReviewStatus)
                          }
                          className="bg-white border border-slate-300 rounded px-2 py-1 text-[11px] font-semibold text-slate-800 focus:outline-teal-500 cursor-pointer"
                        >
                          <option value="NEW">NEW</option>
                          <option value="UNDER REVIEW">UNDER REVIEW</option>
                          <option value="REVIEWED">REVIEWED</option>
                          <option value="NEEDS MORE EVIDENCE">NEEDS MORE EVIDENCE</option>
                        </select>
                      ) : (
                        <span className="font-bold text-slate-700">{r.status}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-sans">{r.reviewer_id}</td>
                    <td className="py-3 px-4 font-sans">
                      {canEdit ? (
                        <input
                          type="text"
                          value={currentNote}
                          onChange={(e) =>
                            setEditingNotes({
                              ...editingNotes,
                              [r.variant_id]: e.target.value
                            })
                          }
                          className="w-full text-xs p-1.5 border border-slate-200 rounded focus:outline-teal-500 bg-white"
                        />
                      ) : (
                        <span className="text-slate-700">{r.review_notes}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-500">{r.updated_at}</td>
                    <td className="py-3 px-3 text-right">
                      {canEdit && (
                        <button
                          onClick={() => handleNotesSave(r.variant_id)}
                          className="px-2.5 py-1 rounded bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Save className="w-3 h-3" /> Save Note
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
