import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  UserCheck
} from "lucide-react";
import { encryptDNASimulation, decryptDNASimulation } from "../services/bioAlgorithms";
import { UserRole } from "../types";

interface SecurityCenterViewProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
}

export const SecurityCenterView: React.FC<SecurityCenterViewProps> = ({
  currentRole,
  onChangeRole,
}) => {
  const [dnaInput, setDnaInput] = useState("ATGCGTACGTAGCTAGCTAG");
  const [encryptedOutput, setEncryptedOutput] = useState<{
    salt: string;
    ciphertext: string;
    fullPayload: string;
  }>(() => encryptDNASimulation("ATGCGTACGTAGCTAGCTAG"));
  const [decryptedOutput, setDecryptedOutput] = useState("ATGCGTACGTAGCTAGCTAG");

  function handleEncrypt() {
    const enc = encryptDNASimulation(dnaInput);
    setEncryptedOutput(enc);
    setDecryptedOutput(decryptDNASimulation(enc.fullPayload));
  }

  const controls = [
    { title: "Salted Cryptographic Hashing", desc: "Passwords hashed with PBKDF2 / SHA-256 + 128-bit cryptographic salts. Plaintext credentials never stored.", status: "Active" },
    { title: "Stateless JWT Authentication", desc: "HMAC-SHA256 signed access tokens with 120-minute expiration and role payload verification.", status: "Active" },
    { title: "Role-Based Access Control (RBAC)", desc: "Enforces strict principle of least privilege across ADMIN, RESEARCHER, and VIEWER roles.", status: "Active" },
    { title: "Sequence Encryption at Rest", desc: "DNA sequences encrypted with AES/Fernet keystream before persisting to SQLite database records.", status: "Active" },
    { title: "Anonymized Identifiers", desc: "Specimens identified via synthetic tokens (e.g., DNA-2026-0042) rather than personal identifiable info.", status: "Active" },
    { title: "Immutable Audit Trail", desc: "Every login, sequence comparison, prediction, and report generation logged with timestamps.", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Prototype Security Architecture & Data Privacy</h2>
            <p className="text-xs text-slate-500">
              Demonstrating secure genetic sequence handling, encryption at rest, and audit logging
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 space-y-1">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Prototype Security Controls Notice:
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            These security controls represent architectural blueprints for prototype compliance. They prevent casual sequence leakage and enforce role-based API boundaries in demonstration environments.
          </p>
        </div>
      </div>

      {/* Security Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {controls.map((ctrl) => (
          <div key={ctrl.title} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">{ctrl.title}</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> {ctrl.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{ctrl.desc}</p>
          </div>
        ))}
      </div>

      {/* Live Interactive DNA Encryption Tool */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-sm text-slate-900">Live DNA Encryption at Rest Inspector</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">AES / Fernet Stream Cipher</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Input side */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              1. Raw Sequence in Memory (Plaintext):
            </label>
            <textarea
              rows={3}
              value={dnaInput}
              onChange={(e) => setDnaInput(e.target.value)}
              className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 bg-slate-50 uppercase tracking-wider focus:outline-teal-500"
              placeholder="Enter nucleotide sequence..."
            />
            <button
              onClick={handleEncrypt}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypt Sequence</span>
            </button>
          </div>

          {/* Cipher output side */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs border border-slate-800">
            <div>
              <span className="text-teal-400 font-bold block mb-1">2. Stored Ciphertext (In Database):</span>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] break-all text-amber-300">
                {encryptedOutput.fullPayload}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
              <div>Salt (128-bit): <span className="text-slate-200 font-bold">{encryptedOutput.salt.slice(0, 10)}...</span></div>
              <div>Cipher: <span className="text-slate-200 font-bold">{encryptedOutput.ciphertext.slice(0, 10)}...</span></div>
            </div>

            <div className="border-t border-slate-800 pt-2">
              <span className="text-emerald-400 font-bold block mb-1">3. Decrypted Sequence on Authorized Read:</span>
              <div className="text-emerald-300 font-bold tracking-widest break-all">
                {decryptedOutput}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role-Based Access Control Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">Role-Based Access Control Matrix (RBAC)</h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Current Role:</span>
            <span className="font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
              {currentRole}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Permission / Capability</th>
                <th className="py-2.5 px-4 text-center">ADMIN</th>
                <th className="py-2.5 px-4 text-center">RESEARCHER</th>
                <th className="py-2.5 px-4 text-center">VIEWER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {[
                { perm: "Upload DNA & Run Validation", admin: true, researcher: true, viewer: false },
                { perm: "Compute LCS & DP Matrix", admin: true, researcher: true, viewer: false },
                { perm: "Execute Random Forest ML", admin: true, researcher: true, viewer: false },
                { perm: "Generate Lab Research Reports", admin: true, researcher: true, viewer: false },
                { perm: "View Shared Analysis Results", admin: true, researcher: true, viewer: true },
                { perm: "Access Security Audit Trail", admin: true, researcher: false, viewer: false },
                { perm: "Manage User Roles & Database", admin: true, researcher: false, viewer: false },
              ].map((row) => (
                <tr key={row.perm} className="hover:bg-slate-50">
                  <td className="py-2 px-4 font-sans font-medium text-slate-800">{row.perm}</td>
                  <td className="py-2 px-4 text-center">
                    {row.admin ? (
                      <span className="text-emerald-600 font-bold">✓ Granted</span>
                    ) : (
                      <span className="text-slate-300">✗ Denied</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {row.researcher ? (
                      <span className="text-emerald-600 font-bold">✓ Granted</span>
                    ) : (
                      <span className="text-slate-300">✗ Denied</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {row.viewer ? (
                      <span className="text-emerald-600 font-bold">✓ Granted</span>
                    ) : (
                      <span className="text-slate-300">✗ Denied</span>
                    )}
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
