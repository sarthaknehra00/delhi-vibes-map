"use client";

import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { useMarketStore } from "@/stores/marketStore";
import { MARKET_DATA } from "@/data/marketData";
import { Sparkles, Search, Compass, MapPin } from "lucide-react";
import { useState } from "react";

const INTENT_TAGS = [
  "Cheap shopping",
  "Date spot",
  "Peaceful place",
  "Street fashion",
  "Food exploration",
  "Wholesale goods",
  "Nightlife cluster",
  "Hidden gem"
];

export function IntentEngine({
  onAISearch
}: {
  onAISearch?: (query: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { queryTopMatchesForIntent, setHighlightedAreas } = useIntelligenceStore();
  const { triggerFlyTo } = useMarketStore();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleIntentSelection = (intent: string) => {
    setActiveTag(intent);
    
    // Query the intelligence store for the top 3 matching areas
    const matches = queryTopMatchesForIntent(intent);
    
    if (matches.length > 0) {
      // Highlight them globally
      setHighlightedAreas(matches.map(m => m.areaId));
      
      // Fly to the TOP match immediately
      const topMatchId = matches[0].areaId;
      const targetMarket = MARKET_DATA.find(m => m.id === topMatchId);
      
      if (targetMarket) {
        triggerFlyTo(targetMarket);
      }
      
      // Close the intent picker after 1 second so the user can enjoy the flyTo
      setTimeout(() => setIsOpen(false), 1000);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    // Close the Intent overlay and push the query to the AI Chat Panel
    setIsOpen(false);
    onAISearch?.(searchValue.trim());
    setSearchValue("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="
          absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2
          backdrop-blur-2xl border border-indigo-500/30 rounded-full
          px-5 py-2.5 bg-[#0a0a0a]/90 text-indigo-300 shadow-[0_0_40px_rgba(99,102,241,0.15)]
          hover:bg-indigo-500/10 hover:border-indigo-500/50 hover:text-indigo-200
          transition-all text-sm font-black tracking-wide
        "
      >
        <Sparkles size={16} />
        What&#39;s the vibe?
      </button>
    );
  }

  return (
    <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex flex-col items-center pt-[15vh] animate-in fade-in duration-300">
      
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-8 right-8 text-white/40 hover:text-white font-bold tracking-widest text-xs uppercase"
      >
        Close [Esc]
      </button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-500/20 border border-indigo-500/30 mb-6 shadow-[0_0_60px_rgba(99,102,241,0.2)]">
          <Compass size={32} className="text-indigo-400" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-3">
          Explore by Intent.
        </h1>
        <p className="text-indigo-200/60 font-medium max-w-md mx-auto">
          Don&#39;t just search for places. Tell the Intelligence Engine what you want to experience, and it will find the perfect area.
        </p>
      </div>

      {/* Active Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl px-6 mb-12">
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 px-4 shadow-2xl backdrop-blur-xl focus-within:border-indigo-500/40 transition-colors">
          <Search size={20} className="text-white/40 absolute left-6" />
          <input 
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="e.g. I want thrift shopping on a tight budget..."
            className="w-full bg-transparent border-none outline-none text-white text-lg font-medium pl-10 py-3 placeholder:text-white/20"
            autoFocus
          />
          {searchValue.trim() && (
            <button 
              type="submit"
              className="ml-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-black transition-all flex-shrink-0 shadow-lg shadow-indigo-500/20"
            >
              Ask AI
            </button>
          )}
        </div>
        <p className="text-center text-[11px] text-white/20 mt-3 font-medium">
          Powered by Gemini AI — ask anything about Delhi exploration
        </p>
      </form>

      {/* Vibe Pills */}
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl px-6">
        {INTENT_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => handleIntentSelection(tag)}
            className={`
              px-5 py-3 rounded-full border transition-all duration-300 font-bold text-sm flex items-center gap-2
              ${activeTag === tag 
                ? "bg-indigo-500 text-white border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.4)] scale-105" 
                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white hover:-translate-y-1"}
            `}
          >
            {activeTag === tag && <MapPin size={14} className="animate-bounce" />}
            {tag}
          </button>
        ))}
      </div>
      
    </div>
  );
}
