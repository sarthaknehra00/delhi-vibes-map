"use client";

import { useState, useCallback } from "react";
import { MapContainer } from "@/components/map/MapContainer";
import { ControlToolbar } from "@/components/ui-overlays/ControlToolbar";
import { FoodPanel } from "@/components/ui-overlays/FoodPanel";
import { useFoodStore } from "@/stores/foodStore";
import { MapPin, UserCircle } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  const { selectedHotspotId, setSelectedHotspot } = useFoodStore();
  const isFoodPanelOpen = !!selectedHotspotId;

  const setIsFoodPanelOpen = (open: boolean) => {
    if (!open) setSelectedHotspot(null);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white selection:bg-orange-500/30">
      
      {/* 3D Mapbox + Deck.gl Engine */}
      <MapContainer />

      {/* App Header / Logo */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 px-5 shadow-2xl">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg text-white">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight leading-none bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            DelhiNCR<span className="text-orange-500">Vibe</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-0.5">
            Crowdsourced Truth
          </p>
        </div>
      </div>

      {/* User Profile / Auth Button */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <button 
          onClick={() => {
            if (isFoodPanelOpen) {
              setSelectedHotspot(null);
            } else {
              setSelectedHotspot('cp');
            }
          }}
          className="flex items-center gap-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors shadow-2xl text-sm font-bold"
        >
          🍔 Top Eats
        </button>
        <button 
          onClick={() => alert('🔐 Sign In with Supabase Auth coming soon! Connect your Supabase project to enable this.')}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 transition-colors text-white rounded-full px-4 py-2 shadow-2xl text-sm font-bold"
        >
          <UserCircle size={16} />
          Sign In
        </button>
      </div>

      {/* Painting controls centered bottom */}
      <ControlToolbar />

      {/* Slide-out Food & Vibes Ranking Panel */}
      <FoodPanel isOpen={isFoodPanelOpen} onClose={() => setIsFoodPanelOpen(false)} />

      {/* Footer warning */}
      <div className="absolute bottom-2 left-4 z-50 text-[10px] text-white/30 font-medium tracking-wide">
        Delhi NCR Vibe Map © 2026. Made with Google Antigravity. Not factual data. Read the room.
      </div>
    </main>
  );
}
