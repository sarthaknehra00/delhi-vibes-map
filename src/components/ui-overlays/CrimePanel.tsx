"use client";

import { useCrimeStore, CrimeViewMode } from "@/stores/crimeStore";
import {
  CRIME_CATEGORY_META,
  CrimeCategory,
  DATA_YEARS,
  DataYear,
  getTotalCrimes,
  DELHI_TOTALS,
} from "@/data/crimeData";
import { Shield, Flame, EyeOff, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const CRIME_CATEGORIES = Object.entries(CRIME_CATEGORY_META) as [
  CrimeCategory,
  (typeof CRIME_CATEGORY_META)[CrimeCategory]
][];

const VIEW_MODES: { mode: CrimeViewMode; label: string; icon: typeof Flame }[] = [
  { mode: "heatmap", label: "Heatmap", icon: Flame },
  { mode: "off", label: "Off", icon: EyeOff },
];

export function CrimePanel() {
  const {
    viewMode,
    setViewMode,
    selectedYear,
    setSelectedYear,
    activeCategories,
    toggleCategory,
    resetCategories,
    isPanelOpen,
    togglePanel,
  } = useCrimeStore();

  const [isFiltersExpanded, setFiltersExpanded] = useState(true);

  const activeCount = activeCategories.size;
  const isActive = viewMode !== "off";
  const totalCrimes = isActive
    ? getTotalCrimes(selectedYear, activeCategories.size > 0 ? activeCategories : null)
    : 0;

  return (
    <>
      {/* Toggle button — always visible */}
      <button
        onClick={togglePanel}
        className={`
          absolute top-4 z-50 flex items-center gap-2
          backdrop-blur-2xl border rounded-full
          px-4 py-2 transition-all shadow-lg text-sm font-black
          ${
            isActive
              ? "bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
              : "bg-[#0a0a0a]/90 border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20"
          }
        `}
        style={{ right: "390px" }}
      >
        <Shield size={15} />
        Crime Data
        {isActive && (
          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/30 text-red-300 font-bold">
            NCRB
          </span>
        )}
      </button>

      {/* Slide-out panel */}
      <div
        className={`
          absolute top-0 right-0 z-[60] h-full w-[290px]
          bg-[#0a0a0a]/95 backdrop-blur-2xl
          border-l border-white/5
          transition-transform duration-300 ease-in-out
          flex flex-col
          ${isPanelOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/20">
              <Shield size={14} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-tight leading-none">
                Crime Map
              </h2>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/30 mt-0.5">
                NCRB Official Data
              </p>
            </div>
          </div>
          <button
            onClick={togglePanel}
            className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="p-4 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">
            Visualization
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {VIEW_MODES.map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`
                  flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-[10px] font-bold
                  transition-all duration-200
                  ${
                    viewMode === mode
                      ? mode === "off"
                        ? "bg-white/5 text-white/50 border border-white/10"
                        : "bg-red-500/15 text-red-400 border border-red-500/20 shadow-lg shadow-red-500/5"
                      : "bg-white/[0.02] text-white/30 border border-transparent hover:bg-white/5 hover:text-white/50"
                  }
                `}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Year Selector */}
        {isActive && (
          <div className="px-4 pb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">
              NCRB Report Year
            </p>
            <div className="flex gap-1.5">
              {DATA_YEARS.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`
                    flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all
                    ${
                      selectedYear === year
                        ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                        : "bg-white/[0.02] text-white/30 border border-transparent hover:bg-white/5"
                    }
                  `}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Total crimes display */}
            <div className="mt-2 px-1 flex items-baseline justify-between">
              <span className="text-[9px] text-white/25 uppercase tracking-wide">
                Total FIRs
              </span>
              <span className="text-sm font-black text-white/70 tabular-nums">
                {totalCrimes.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        )}

        {/* Crime Category Filters */}
        {isActive && (
          <div className="px-4 pb-2 flex-1 overflow-hidden flex flex-col">
            <button
              onClick={() => setFiltersExpanded(!isFiltersExpanded)}
              className="flex items-center justify-between w-full mb-2"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                Crime Categories{" "}
                {activeCount > 0 && (
                  <span className="text-yellow-400">({activeCount})</span>
                )}
              </p>
              <ChevronDown
                size={12}
                className={`text-white/30 transition-transform ${
                  isFiltersExpanded ? "rotate-180" : ""
                }`}
              />
            </button>

            {isFiltersExpanded && (
              <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
                {activeCount > 0 && (
                  <button
                    onClick={resetCategories}
                    className="w-full text-left text-[10px] text-yellow-400/70 hover:text-yellow-400 font-bold mb-1 px-1 transition-colors"
                  >
                    ✕ Reset filters (show all)
                  </button>
                )}

                {CRIME_CATEGORIES.map(([cat, meta]) => {
                  const isCatActive =
                    activeCategories.size === 0 || activeCategories.has(cat);
                  const count = DELHI_TOTALS[selectedYear][cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`
                        w-full flex items-center gap-2.5 px-3 py-2 rounded-xl
                        transition-all duration-150 text-left
                        ${
                          isCatActive
                            ? "bg-white/[0.04] border border-white/5"
                            : "opacity-35 border border-transparent hover:opacity-60"
                        }
                      `}
                    >
                      <span className="text-sm">{meta.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-semibold text-white/80 block truncate">
                          {meta.label}
                        </span>
                        <span className="text-[9px] text-white/30 tabular-nums">
                          {count.toLocaleString("en-IN")} cases
                        </span>
                      </div>
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: meta.color }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Footer / Attribution */}
        <div className="p-4 pt-2 border-t border-white/5">
          <p className="text-[9px] text-white/20 leading-relaxed">
            Source: <span className="text-white/35 font-semibold">NCRB &quot;Crime in India&quot;</span> Annual
            Reports (2021-2023) &amp; Delhi Police published district data.
            All figures represent registered FIRs.
          </p>
        </div>
      </div>
    </>
  );
}
