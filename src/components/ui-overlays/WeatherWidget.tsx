"use client";

import { useWeatherStore } from "@/stores/weatherStore";
import { useEffect } from "react";
import { Loader2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function WeatherWidget() {
  const { temperature, icon, condition, timeOfDay, isLoading, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather();
    // Refresh weather every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  if (isLoading) {
    return (
      <div className="absolute top-20 right-4 z-50 flex items-center gap-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-3 shadow-lg">
        <Loader2 className="h-5 w-5 animate-spin text-white/50" />
      </div>
    );
  }

  return (
    <div className="absolute top-20 right-4 z-50 flex items-center gap-3 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-in fade-in slide-in-from-right-5 duration-700">
      
      {/* Icon Bubble */}
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-inner",
        timeOfDay === 'morning' || timeOfDay === 'afternoon' ? "bg-gradient-to-br from-sky-400 to-blue-500" : "bg-gradient-to-br from-indigo-900 to-slate-800",
        condition === 'rain' || condition === 'thunderstorm' ? "from-slate-700 to-slate-900" : ""
      )}>
        {icon}
      </div>

      {/* Temperature Info */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1 leading-none">
          <h3 className="text-xl font-black tracking-tighter text-white">
            {temperature}&deg;
          </h3>
          <span className="text-xs font-bold text-white/40 mb-0.5">C</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/50 mt-0.5">
          <MapPin size={10} className="text-yellow-500" /> Delhi NCR
        </div>
      </div>
    </div>
  );
}
