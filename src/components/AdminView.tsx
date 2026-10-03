import React, { useState } from "react";
import {
  SlidersHorizontal,
  Users,
  Shield,
  Database,
  CheckCircle2,
  AlertCircle,
  UserPlus
} from "lucide-react";
import { UserRole } from "../types";

interface AdminUser {
  id: string;
  email: string;
  role: UserRole;
  status: "ACTIVE" | "SUSPENDED";
  created_at: string;
}

export const AdminView: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([
    { id: "usr_001", email: "admin@dna-alx.local", role: "ADMIN", status: "ACTIVE", created_at: "2026-10-01 08:00:00" },
    { id: "usr_002", email: "demo@dna-alx.local", role: "RESEARCHER", status: "ACTIVE", created_at: "2026-10-02 10:15:30" },
    { id: "usr_003", email: "student_reviewer@edu.local", role: "VIEWER", status: "ACTIVE", created_at: "2026-10-02 14:22:10" },
  ]);

  function toggleRole(userId: string) {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const nextRole: UserRole = u.role === "RESEARCHER" ? "VIEWER" : u.role === "VIEWER" ? "ADMIN" : "RESEARCHER";
        return { ...u, role: nextRole };
      })
    );
  }

  function toggleStatus(userId: string) {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        return { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" };
      })
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Platform Administration & User Governance</h2>
            <p className="text-xs text-slate-500">
              Restricted to ADMIN role: Manage system access, role authorizations, and persistence health
            </p>
          </div>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Accounts</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{users.length} Users</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">All accounts active</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Encrypted Samples</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">100 Records</div>
          <p className="text-xs text-slate-500 mt-1">SQLite database: data/dna_alx.db</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">ML Model Status</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1">Trained & Ready</div>
          <p className="text-xs text-slate-500 mt-1">model.pkl • 200 Estimators</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Security State</span>
          <div className="text-2xl font-bold text-teal-700 mt-1">Enforced</div>
          <p className="text-xs text-slate-500 mt-1">Zero plaintext DNA leaks</p>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            Authorized Platform Users
          </h3>
          <span className="text-xs text-slate-500">Click role to cycle permissions</span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-4">User ID</th>
                <th className="py-2.5 px-4">Email</th>
                <th className="py-2.5 px-4">Role (Click to Toggle)</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Created At</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{u.id}</td>
                  <td className="py-3 px-4 font-sans text-slate-700 font-medium">{u.email}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleRole(u.id)}
                      className="px-2.5 py-1 rounded-md font-bold text-[10px] bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer"
                    >
                      {u.role} ⟳
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{u.created_at}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      {u.status === "ACTIVE" ? "Suspend" : "Activate"}
                    </button>
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
