import React from "react";
import {
  LayoutDashboard,
  Dna,
  Database,
  BarChart3,
  ShieldCheck,
  ClipboardList,
  SlidersHorizontal,
  Activity,
  ClipboardCheck
} from "lucide-react";
import { UserRole } from "../types";

interface NavigationProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  currentRole: UserRole;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  currentRole,
}) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "analysis", label: "DNA Analysis & DP Engine", icon: Dna },
    { id: "cancer", label: "Cancer Risk & Variants", icon: Activity },
    { id: "review", label: "Review Queue", icon: ClipboardCheck },
    { id: "dataset", label: "Synthetic Dataset Explorer", icon: Database },
    { id: "model", label: "ML Model & Metrics", icon: BarChart3 },
    { id: "security", label: "Security Center", icon: ShieldCheck },
    { id: "audit", label: "Audit Trail", icon: ClipboardList },
    ...(currentRole === "ADMIN"
      ? [{ id: "admin", label: "Admin Console", icon: SlidersHorizontal }]
      : []),
  ];

  return (
    <nav className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto space-x-1 py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-teal-500 text-slate-950 font-semibold shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
