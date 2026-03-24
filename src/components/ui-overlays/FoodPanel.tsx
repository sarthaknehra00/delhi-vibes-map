"use client";

import { useState, useMemo } from "react";
import { X, Utensils, Flame, Plus, Send, Sparkles, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFoodStore } from "@/stores/foodStore";
import { useAudioStore } from "@/stores/audioStore";
import { useEffect } from "react";
import { HOTSPOTS } from "@/data/hotspots";
import { cn } from "@/lib/utils";

export function FoodPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { selectedHotspotId, getTop5ForHotspot, voteRestaurant, addRestaurant } = useFoodStore();
  const { playVibe } = useAudioStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCat, setNewCat] = useState<'Street Food' | 'Cafes' | 'Fine Dining' | 'Hidden Gems'>("Street Food");

  const hotspot = useMemo(() => 
    HOTSPOTS.find(h => h.id === selectedHotspotId),
    [selectedHotspotId]
  );

  const top5 = useMemo(() => 
    selectedHotspotId ? getTop5ForHotspot(selectedHotspotId) : [],
    [selectedHotspotId, getTop5ForHotspot]
  );

  useEffect(() => {
    if (isOpen && hotspot) {
      // Play the specific vibe or a default Delhi vibe
      playVibe(hotspot.vibeQuery || 'Delhi Belly Bhaag D.K. Bose');
    }
  }, [isOpen, selectedHotspotId]); // only trigger when hotspot changes or panel opens

  if (!isOpen || !hotspot) return null;

  const handleAdd = () => {
    if (!newName) return;
    addRestaurant({
      name: newName,
      hotspotId: hotspot.id,
      category: newCat,
      description: newDesc || "Authentic Delhi vibe.",
      addedBy: "AnonFoodie"
    });
    setNewName("");
    setNewDesc("");
    setIsAdding(false);
  };

  return (
    <div className="absolute top-4 bottom-4 right-4 w-[420px] max-w-[calc(100vw-32px)] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-yellow-500/20 rounded-3xl shadow-[0_0_60px_rgba(250,204,21,0.08)] flex flex-col z-50 animate-in slide-in-from-right-8 duration-300">
      {/* Header with gradient accent */}
      <div className="relative p-5 pb-4 border-b border-yellow-500/10">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 rounded-t-3xl" />
        <div className="flex items-center justify-between mt-1">
          <div className="flex-1">
            <h2 className="text-lg font-black text-white flex items-center gap-2 tracking-tight">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <Utensils size={16} className="text-black" />
              </div>
              Eats in {hotspot.name}
            </h2>
            <p className="text-[11px] text-white/40 mt-1.5 leading-relaxed ml-10">{hotspot.description}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-yellow-500/20 text-white/50 hover:text-yellow-400 transition-all shrink-0 ml-3">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Scrollable Content — native overflow */}
      <div className="flex-1 min-h-0 overflow-y-auto p-5 scrollbar-hide">
        <div className="flex flex-col gap-5">
          
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-yellow-400 flex items-center gap-2">
              <Sparkles size={14} className="text-yellow-400" />
              Local Rankings
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 gap-1.5 border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/15 text-yellow-400 hover:text-yellow-300 text-[10px] font-black uppercase tracking-wider rounded-full px-3"
              onClick={() => setIsAdding(!isAdding)}
            >
              {isAdding ? <X size={12} /> : <Plus size={12} />}
              {isAdding ? "Cancel" : "Add Place"}
            </Button>
          </div>

          {isAdding && (
            <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-2xl p-4 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
              <Input 
                placeholder="Restaurant name..." 
                className="bg-black/60 border-yellow-500/15 h-9 text-sm rounded-xl focus:border-yellow-400 focus:ring-yellow-400/20"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Input 
                placeholder="Why is it local truth? (e.g. Best Momos)" 
                className="bg-black/60 border-yellow-500/15 h-9 text-sm rounded-xl focus:border-yellow-400 focus:ring-yellow-400/20"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
              <div className="flex gap-2 flex-wrap">
                {(['Street Food', 'Cafes', 'Hidden Gems'] as const).map(c => (
                  <Badge 
                    key={c}
                    variant={newCat === c ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer text-[10px] rounded-full px-3 transition-all",
                      newCat === c ? "bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg shadow-yellow-500/20" : "text-white/40 border-white/10 hover:border-yellow-500/30"
                    )}
                    onClick={() => setNewCat(c)}
                  >
                    {c}
                  </Badge>
                ))}
              </div>
              <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black h-8 gap-2 font-black rounded-xl shadow-lg shadow-yellow-500/20" onClick={handleAdd}>
                <Send size={14} /> Post Truth
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {top5.map((res, index) => (
              <div 
                key={res.id} 
                className={cn(
                  "rounded-2xl p-4 border transition-all group hover:scale-[1.01]",
                  index === 0 
                    ? "bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-yellow-500/20 shadow-lg shadow-yellow-500/5" 
                    : "bg-white/[0.03] border-white/[0.06] hover:border-yellow-500/15 hover:bg-white/[0.05]"
                )}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-3">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[11px] font-black text-yellow-500/60 tabular-nums">#{index + 1}</span>
                      <h4 className="text-sm font-bold text-white leading-tight">{res.name}</h4>
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 border-white/8 text-white/30 rounded-full">{res.category}</Badge>
                    </div>
                    {index === 0 && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full mb-1.5 border border-yellow-500/15">
                        <Crown size={10} /> Area Champion
                      </div>
                    )}
                    <p className="text-[11px] text-white/40 line-clamp-2 leading-relaxed italic">
                      &ldquo;{res.description}&rdquo;
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-black/30 rounded-xl p-1 min-w-[44px] border border-white/5">
                    <button
                      className="h-7 w-7 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/20 rounded-lg active:scale-90 transition-all"
                      onClick={() => voteRestaurant(res.id, 1)}
                    >
                      <Flame size={15} />
                    </button>
                    <span className="text-[11px] font-black text-white my-0.5 tabular-nums">
                      {res.votes > 1000 ? `${(res.votes/1000).toFixed(1)}k` : res.votes}
                    </span>
                    <button
                      className="h-7 w-7 flex items-center justify-center text-white/15 hover:bg-white/5 hover:text-red-400 rounded-lg active:scale-90 transition-all"
                      onClick={() => voteRestaurant(res.id, -1)}
                    >
                      <Flame size={15} className="rotate-180" />
                    </button>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[9px] text-white/20 font-bold uppercase tracking-[0.15em] border-t border-white/5 pt-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500" />
                    @{res.addedBy}
                  </div>
                  <span className="text-yellow-500/30">verified</span>
                </div>
              </div>
            ))}

            {top5.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-4 border border-yellow-500/15">
                  <Utensils size={28} className="text-yellow-500/40" />
                </div>
                <p className="font-black uppercase tracking-widest text-xs text-white/30">No truth found here yet.</p>
                <p className="text-[10px] mt-1 text-white/15">Be the first to drop a food recommendation.</p>
              </div>
            )}
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <div className="p-3 text-center border-t border-yellow-500/5 bg-black/30 rounded-b-3xl">
        <p className="text-[9px] font-bold text-yellow-500/20 uppercase tracking-[0.2em]">
          ⚡ dynamic ranking enabled
        </p>
      </div>
    </div>
  );
}
