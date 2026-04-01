"use client";

import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { useMarketStore } from "@/stores/marketStore";
import { useWeatherStore } from "@/stores/weatherStore";
import { AREA_PROFILES } from "@/data/areaProfiles";
import { X, Shield, Users, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export function AreaIntelligencePanel() {
  const { focusedMarket } = useMarketStore();
  const { getRealTimeContext } = useIntelligenceStore();
  const { timeOfDay } = useWeatherStore();

  if (!focusedMarket) return null;

  const intel = getRealTimeContext(focusedMarket.id);
  const profile = AREA_PROFILES.find(p => p.areaId === focusedMarket.id);

  if (!intel || !profile) return null;

  const isAvoid = intel.advisoryLevel === "avoid";
  const isOptimal = intel.advisoryLevel === "optimal";

  return (
    <div className="
      absolute bottom-6 left-6 z-50 w-[320px] max-w-[calc(100vw-48px)]
      bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl
      animate-in slide-in-from-left-8 duration-300 ease-out overflow-hidden
    ">
      {/* Dynamic Header based on Advisory Level */}
      <div className={`
        relative px-4 py-2.5 flex items-center justify-between border-b
        ${isAvoid ? "bg-red-500/10 border-red-500/20" : ""}
        ${isOptimal ? "bg-emerald-500/10 border-emerald-500/20" : ""}
        ${!isAvoid && !isOptimal ? "bg-amber-500/5 border-amber-500/10" : ""}
      `}>
        <div className="flex items-center gap-2">
          {isAvoid && <AlertTriangle size={16} className="text-red-400" />}
          {isOptimal && <CheckCircle2 size={16} className="text-emerald-400" />}
          {!isAvoid && !isOptimal && <Clock size={16} className="text-amber-400" />}
          
          <span className={`text-xs font-black uppercase tracking-widest
            ${isAvoid ? "text-red-400" : ""}
            ${isOptimal ? "text-emerald-400" : ""}
            ${!isAvoid && !isOptimal ? "text-amber-400" : ""}
          `}>
            {isAvoid ? "Advisory: Avoid Now" : isOptimal ? "Optimal Conditions" : "Moderate Activity"}
          </span>
        </div>
        
        {/* Cost Indicator */}
        <div className="text-[10px] font-black text-white/50 tracking-widest bg-black/40 px-2 rounded-full border border-white/5">
          {'$'.repeat(intel.costLevel)}<span className="opacity-20">{'$'.repeat(3 - intel.costLevel)}</span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-black text-white mb-1 leading-tight">
          {focusedMarket.market_name}
        </h2>
        <p className="text-sm font-bold text-indigo-400 mb-4 tracking-wide">
          "{intel.personality}"
        </p>

        {/* Live Insight Pill */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-5">
          <p className="text-xs text-white/70 italic leading-relaxed">
            "{intel.liveInsight}"
          </p>
        </div>

        {/* Predictive Bars */}
        <div className="space-y-4 mb-6">
          <ProgressBar 
            label="Live Crowd Density" 
            value={intel.predictedCrowd} 
            icon={<Users size={12} />} 
            colorClass={intel.predictedCrowd > 0.8 ? "bg-red-500" : intel.predictedCrowd > 0.4 ? "bg-amber-500" : "bg-emerald-500"} 
          />
          <ProgressBar 
            label="Safety Level" 
            value={intel.predictedSafety} 
            icon={<Shield size={12} />} 
            colorClass={intel.predictedSafety < 0.5 ? "bg-red-500" : intel.predictedSafety < 0.8 ? "bg-amber-500" : "bg-emerald-500"} 
          />
        </div>

        {/* Advanced Market Intelligence (If applicable) */}
        {profile.advancedIntel && (
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em] mb-3">
              Insider Strategy
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                <span className="block text-white/40 mb-1">Peak Hours</span>
                <span className="font-bold text-white/80">{profile.advancedIntel.peakHoursText}</span>
              </div>
              <div className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                <span className="block text-white/40 mb-1">Best Entry</span>
                <span className="font-bold text-white/80 line-clamp-1">{profile.advancedIntel.bestEntryPoints[0]}</span>
              </div>
            </div>
            <p className="text-[11px] text-white/50 mt-3 bg-white/[0.02] p-3 rounded-lg border border-white/5 border-l-2 border-l-indigo-500">
              {profile.advancedIntel.shoppingStrategy}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgressBar({ label, value, icon, colorClass }: { label: string, value: number, icon: React.ReactNode, colorClass: string }) {
  // value is 0.0 to 1.0
  const percentage = Math.max(5, Math.min(100, value * 100)); // minimum 5% for visual
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-bold text-white/60 flex items-center gap-1.5">
          {icon} {label}
        </span>
        <span className="text-[10px] tabular-nums font-black text-white/40">
          {Math.round(value * 10)} / 10
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
