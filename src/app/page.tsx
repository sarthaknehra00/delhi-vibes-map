"use client";

import { useState, useCallback } from "react";
import { MapContainer } from "@/components/map/MapContainer";
import { ControlToolbar } from "@/components/ui-overlays/ControlToolbar";
import { FoodPanel } from "@/components/ui-overlays/FoodPanel";
import { VibePlayer } from "@/components/ui-overlays/VibePlayer";
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
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white selection:bg-yellow-500/30">
      
      {/* 3D Mapbox + Deck.gl Engine */}
      <MapContainer />

      {/* App Header / Logo */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-3 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-yellow-500/15 rounded-2xl p-3 px-5 shadow-[0_0_40px_rgba(250,204,21,0.06)]">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/20 text-black">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight leading-none text-white">
            DelhiNCR<span className="text-yellow-400">Vibe</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500/40 mt-0.5">
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
          className="flex items-center gap-2 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-yellow-500/15 rounded-full px-4 py-2 hover:bg-yellow-500/10 hover:border-yellow-500/30 transition-all shadow-lg text-sm font-black text-yellow-400"
        >
          🍔 Top Eats
        </button>
        <button 
          onClick={() => alert('🔐 Sign In with Supabase Auth coming soon! Connect your Supabase project to enable this.')}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition-all text-black rounded-full px-4 py-2 shadow-lg shadow-yellow-500/20 text-sm font-black"
        >
          <UserCircle size={16} />
          Sign In
        </button>
      </div>

      {/* Painting controls centered bottom */}
      <ControlToolbar />

      {/* Slide-out Food & Vibes Ranking Panel */}
      <FoodPanel isOpen={isFoodPanelOpen} onClose={() => setIsFoodPanelOpen(false)} />

      {/* Floating Vibe Player */}
      <VibePlayer />

      {/* Footer warning */}
      <div className="absolute bottom-2 left-4 z-50 text-[10px] text-white/30 font-medium tracking-wide">
        Delhi NCR Vibe Map © 2026. Made with Google Antigravity. Not factual data. Read the room.
      </div>
    </main>
  );
}
