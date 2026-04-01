"use client";

import { useState, useCallback } from "react";
import { MapContainer } from "@/components/map/MapContainer";
import { ControlToolbar } from "@/components/ui-overlays/ControlToolbar";
import { FoodPanel } from "@/components/ui-overlays/FoodPanel";
import { CrimePanel } from "@/components/ui-overlays/CrimePanel";
import { MarketPanel } from "@/components/ui-overlays/MarketPanel";
import { IntentEngine } from "@/components/ui-overlays/IntentEngine";
import { AreaIntelligencePanel } from "@/components/ui-overlays/AreaIntelligencePanel";
import { AIChatPanel } from "@/components/ui-overlays/AIChatPanel";
import { VibePlayer } from "@/components/ui-overlays/VibePlayer";
import { WeatherWidget } from "@/components/ui-overlays/WeatherWidget";
import { WeatherEffects } from "@/components/ui-overlays/WeatherEffects";
import { useFoodStore } from "@/stores/foodStore";
import { MapPin, UserCircle } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  const { selectedHotspotId, setSelectedHotspot } = useFoodStore();
  const isFoodPanelOpen = !!selectedHotspotId;

  const setIsFoodPanelOpen = (open: boolean) => {
    if (!open) setSelectedHotspot(null);
  };

  // AI Chat Panel state
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState<string | undefined>(undefined);
  const [isGeneratingHotspot, setIsGeneratingHotspot] = useState(false);

  const handleAISearch = useCallback((query: string) => {
    setAiInitialQuery(query);
    setIsAIChatOpen(true);
  }, []);

  const handlePlaceClick = useCallback(async (placeName: string) => {
    const store = useFoodStore.getState();
    const existingParamId = placeName.toLowerCase().replace(/\s+/g, '');
    let existing = store.getHotspot(existingParamId);
    
    // Also try checking by exact name
    if (!existing) {
      existing = store.dynamicHotspots.find(h => h.name.toLowerCase() === placeName.toLowerCase());
    }
    
    if (existing) {
      setSelectedHotspot(existing.id);
      return;
    }

    // Dynamic AI Generation
    try {
      setIsGeneratingHotspot(true);
      const res = await fetch('/api/hotspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placeName })
      });

      if (!res.ok) throw new Error('Failed to generate hotspot');
      
      const data = await res.json();
      if (data && data.description) {
        const newId = `dynamic_${Date.now()}`;
        const newHotspot = {
          id: newId,
          name: placeName,
          lat: 28.6139, // placeholder for map UI usage if needed
          lng: 77.2090,
          description: data.description,
          vibeQuery: data.vibeQuery || 'Delhi Belly Bhaag D.K. Bose',
          tier: 3 as const
        };

        const newRestaurants = (data.restaurants || []).map((r: any) => ({
          id: Math.random().toString(36).substring(7),
          name: r.name,
          hotspotId: newId,
          category: r.category || 'Street Food',
          votes: Math.floor(Math.random() * 50) + 10,
          description: r.description,
          addedBy: "Delhi Vibe AI"
        }));

        store.addDynamicHotspot(newHotspot, newRestaurants);
        setSelectedHotspot(newId);
      }
    } catch (e) {
      console.error(e);
      alert('AI rate limited or busy. Could not scan vibe right now.');
    } finally {
      setIsGeneratingHotspot(false);
    }
  }, [setSelectedHotspot]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white selection:bg-yellow-500/30">
      
      {/* 3D Mapbox + Deck.gl Engine */}
      <MapContainer 
        onPlaceClick={handlePlaceClick} 
      />
      
      {/* Ambient Weather Overlays (CSS Rain/Thunder/Fog) */}
      <WeatherEffects />

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

      {/* Global Weather Widget */}
      <WeatherWidget />

      {/* Painting controls centered bottom */}
      <ControlToolbar />

      {/* Slide-out Food & Vibes Ranking Panel */}
      <FoodPanel isOpen={isFoodPanelOpen} onClose={() => setIsFoodPanelOpen(false)} />

      {/* Floating Vibe Player */}
      <VibePlayer />

      {/* Market Explorer Panel */}
      <MarketPanel />

      {/* Urban Intelligence UI */}
      <IntentEngine onAISearch={handleAISearch} />
      <AreaIntelligencePanel />

      {/* AI Chat Panel */}
      <AIChatPanel 
        isOpen={isAIChatOpen} 
        onClose={() => { setIsAIChatOpen(false); setAiInitialQuery(undefined); }} 
        initialQuery={aiInitialQuery} 
      />

      {/* Crime Data Overlay */}
      <CrimePanel />

      {isGeneratingHotspot && (
        <div className="absolute inset-0 z-[150] bg-black/40 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a]/90 border border-yellow-500/20 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl">
            <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-yellow-400 animate-spin" />
            <div>
              <p className="text-white font-black tracking-tight">AI Scanning Area Vibe...</p>
              <p className="text-xs text-white/50 tracking-widest font-bold uppercase mt-0.5">Finding top eats & songs</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer warning */}
      <div className="absolute bottom-2 left-4 z-50 text-[10px] text-white/30 font-medium tracking-wide">
        Delhi NCR Vibe Map © 2026. Made with Google Antigravity. Not factual data. Read the room.
      </div>
    </main>
  );
}

