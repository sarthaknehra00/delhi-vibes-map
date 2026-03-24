"use client";

import { useWeatherStore } from "@/stores/weatherStore";
import { cn } from "@/lib/utils";

export function WeatherEffects() {
  const { condition } = useWeatherStore();

  if (condition === 'clear' || condition === 'clouds') return null;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      
      {/* Dense Winter Fog Overlay */}
      {condition === 'fog' && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] mix-blend-screen transition-all duration-1000" />
      )}

      {/* Rain Details */}
      {(condition === 'rain' || condition === 'thunderstorm') && (
        <div className="absolute inset-0 opacity-40">
          <div className="rain-container absolute inset-0 [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMDAiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')] animate-[rain_0.3s_linear_infinite] mix-blend-overlay" />
        </div>
      )}

      {/* Thunderstorm Lightning Flashes */}
      {condition === 'thunderstorm' && (
        <div className="absolute inset-0 bg-white opacity-0 animate-[lightning_7s_infinite] mix-blend-overlay" />
      )}
      
    </div>
  );
}
