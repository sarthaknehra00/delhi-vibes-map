"use client";

import { useMarketStore } from "@/stores/marketStore";
import { useIntelligenceStore } from "@/stores/intelligenceStore";
import { MARKET_CATEGORIES, MARKET_DATA, MarketDataItem } from "@/data/marketData";
import { ShoppingBag, X, ChevronLeft, MapPin } from "lucide-react";

export function MarketPanel() {
  const {
    isExplorerOpen,
    toggleExplorer,
    selectedCategoryId,
    setSelectedCategory,
    focusedMarket,
    triggerFlyTo,
    resetView
  } = useMarketStore();

  if (!isExplorerOpen) {
    return (
      <button
        onClick={toggleExplorer}
        className="
          absolute top-4 z-50 flex items-center gap-2
          backdrop-blur-2xl border border-white/10 rounded-full
          px-4 py-2 bg-[#0a0a0a]/90 text-white/80
          hover:bg-white/5 hover:border-white/20 hover:text-white
          transition-all shadow-lg text-sm font-black
        "
        style={{ right: "260px" }} // Positioned safely to the left of Top Eats and Sign In
      >
        <ShoppingBag size={15} />
        Markets
      </button>
    );
  }

  // Find active category data if one is selected
  const activeCategory = selectedCategoryId
    ? MARKET_CATEGORIES.find((c) => c.id === selectedCategoryId)
    : null;

  // Filter markets for the active category
  const activeMarkets = selectedCategoryId
    ? MARKET_DATA.filter((m) => m.category_id === selectedCategoryId)
    : [];

  return (
    <div
      className="
        absolute top-0 right-0 z-[60] h-full w-[320px]
        bg-[#0a0a0a]/95 backdrop-blur-2xl border-l border-white/5
        flex flex-col animate-in slide-in-from-right-full duration-300 ease-out
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
            <ShoppingBag size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-base font-black text-white tracking-tight leading-none">
              Market Explorer
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mt-1">
              Delhi NCR
            </p>
          </div>
        </div>
        <button
          onClick={toggleExplorer}
          className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* View 1: Category List */}
      {!selectedCategoryId && (
        <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-2 py-2">
            Select Market Category
          </p>
          {MARKET_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="
                w-full flex items-center gap-3 p-3 rounded-2xl
                bg-white/[0.02] border border-transparent
                hover:bg-white/[0.06] hover:border-white/10
                transition-all text-left group
              "
            >
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-xl"
                style={{ backgroundColor: `${cat.color}15` }}
              >
                <span className="text-lg">{cat.icon}</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-white/90 group-hover:text-white">
                  {cat.label}
                </span>
                <span className="block text-[11px] text-white/40 mt-0.5 line-clamp-1">
                  {cat.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* View 2: Specific Markets in Category */}
      {selectedCategoryId && activeCategory && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Back Navigation */}
          <button
            onClick={resetView}
            className="flex items-center gap-1.5 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-white/40 hover:text-white/80 transition-colors bg-white/[0.02] border-b border-white/5"
          >
            <ChevronLeft size={14} />
            All Categories
          </button>

          <div className="p-4 bg-gradient-to-b from-white/[0.04] to-transparent">
            <h3 className="text-xl font-black flex items-center gap-2">
              <span>{activeCategory.icon}</span> {activeCategory.label}
            </h3>
            <p className="text-xs text-white/40 mt-1">{activeCategory.description}</p>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide p-3 space-y-2">
            {activeMarkets.length === 0 ? (
              <p className="text-center text-sm text-white/30 py-8">No markets mapped yet.</p>
            ) : (
              activeMarkets.map((market) => (
                <MarketCard
                  key={market.id}
                  market={market}
                  isFocused={focusedMarket?.id === market.id}
                  onClick={() => triggerFlyTo(market)}
                  color={activeCategory.color}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/** Information card for a specific market */
function MarketCard({ 
  market, 
  isFocused, 
  onClick,
  color
}: { 
  market: MarketDataItem; 
  isFocused: boolean; 
  onClick: () => void;
  color: string;
}) {
  const { getRealTimeContext } = useIntelligenceStore();
  const intel = getRealTimeContext(market.id);
  
  const isAvoid = intel?.advisoryLevel === "avoid";
  const isOptimal = intel?.advisoryLevel === "optimal";

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left rounded-2xl p-4 transition-all duration-300 border
        ${
          isFocused
            ? "bg-white/[0.08] border-white/20 shadow-lg"
            : "bg-white/[0.02] border-transparent hover:bg-white/[0.05]"
        }
      `}
      style={isFocused ? { borderColor: `${color}40`, boxShadow: `0 4px 20px -5px ${color}20` } : {}}
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className={`text-sm font-bold flex items-center gap-2 ${isFocused ? "text-white" : "text-white/80"}`}>
          {market.market_name}
          {/* Micro Advisory Badge */}
          {intel && (
            <span className={`w-2 h-2 rounded-full border border-white/20 shadow-sm
              ${isAvoid ? "bg-red-500 animate-pulse shadow-red-500/50" : ""}
              ${isOptimal ? "bg-emerald-500 shadow-emerald-500/50" : ""}
              ${!isAvoid && !isOptimal ? "bg-amber-500 shadow-amber-500/50" : ""}
            `} title={`Advisory: ${intel.advisoryLevel}`} />
          )}
        </h4>
        {isFocused && (
          <div 
            className="flex items-center justify-center p-1.5 rounded-full bg-white/10"
            style={{ color }}
          >
            <MapPin size={12} className="animate-pulse" />
          </div>
        )}
      </div>
      
      <p className="text-xs text-white/50 mt-1.5 leading-relaxed line-clamp-2">
        {market.description}
      </p>

      {/* Expanded details when focused */}
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isFocused ? "max-h-[100px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}
        `}
      >
        <div className="pt-3 border-t border-white/10 flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">
            Target Locked
          </span>
          <span className="text-[10px] text-white/50 bg-black/40 px-2 py-0.5 rounded-md">
            Zoom {market.zoom_level}x
          </span>
        </div>
      </div>
    </button>
  );
}
