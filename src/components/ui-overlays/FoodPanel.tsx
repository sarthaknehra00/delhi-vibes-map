"use client";

import { useState, useMemo } from "react";
import { X, Utensils, Flame, MapPin, Plus, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFoodStore } from "@/stores/foodStore";
import { HOTSPOTS } from "@/data/hotspots";
import { cn } from "@/lib/utils";

export function FoodPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { selectedHotspotId, getTop5ForHotspot, voteRestaurant, addRestaurant } = useFoodStore();
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
    <div className="absolute top-4 bottom-4 right-4 w-[400px] max-w-[calc(100vw-32px)] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-right-8 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Utensils size={20} className="text-orange-500" />
            Eats in {hotspot.name}
          </h2>
          <p className="text-xs text-white/50 mt-1">{hotspot.description}</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors shrink-0 ml-4">
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-5">
        <div className="flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest text-orange-500">Local Rankings</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-2 border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold"
              onClick={() => setIsAdding(!isAdding)}
            >
              {isAdding ? <X size={14} /> : <Plus size={14} />}
              {isAdding ? "Cancel" : "Add Place"}
            </Button>
          </div>

          {isAdding && (
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
              <Input 
                placeholder="Restaurant name..." 
                className="bg-black/50 border-white/10 h-9 text-sm"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Input 
                placeholder="Why is it local truth? (e.g. Best Momos)" 
                className="bg-black/50 border-white/10 h-9 text-sm"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
              <div className="flex gap-2">
                {(['Street Food', 'Cafes', 'Hidden Gems'] as const).map(c => (
                  <Badge 
                    key={c}
                    variant={newCat === c ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer text-[10px]",
                      newCat === c ? "bg-orange-500 hover:bg-orange-600" : "text-white/40 border-white/10"
                    )}
                    onClick={() => setNewCat(c)}
                  >
                    {c}
                  </Badge>
                ))}
              </div>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-500 h-8 gap-2 font-bold" onClick={handleAdd}>
                <Send size={14} /> Post Truth
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {top5.map((res, index) => (
              <div key={res.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-bold text-white leading-tight">{res.name}</h4>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-white/10 text-white/40">{res.category}</Badge>
                    </div>
                    {index === 0 && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded mb-2">
                         🔥 Area Champion
                      </div>
                    )}
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed italic">
                      "{res.description}"
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-black/40 rounded-lg p-1.5 min-w-[50px] border border-white/5">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-orange-400 hover:bg-orange-500/20 active:scale-90 transition-transform"
                      onClick={() => voteRestaurant(res.id, 1)}
                    >
                      <Flame size={16} />
                    </Button>
                    <span className="text-xs font-black text-white my-1 tabular-nums">
                      {res.votes > 1000 ? `${(res.votes/1000).toFixed(1)}k` : res.votes}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-white/20 hover:bg-white/10 hover:text-red-400 active:scale-90 transition-transform"
                      onClick={() => voteRestaurant(res.id, -1)}
                    >
                      <Flame size={16} className="rotate-180" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] text-white/30 font-bold uppercase tracking-widest border-t border-white/5 pt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-red-600" />
                    @{res.addedBy}
                  </div>
                  <span>Fair Ranking Verified</span>
                </div>
              </div>
            ))}

            {top5.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center opacity-30">
                <Utensils size={40} className="mb-4" />
                <p className="font-bold uppercase tracking-widest text-sm text-white">No truth found here yet.</p>
                <p className="text-xs mt-1">Be the first to drop a food recommendation.</p>
              </div>
            )}
          </div>

        </div>
      </ScrollArea>
      
      {/* Footer hint */}
      <div className="p-4 text-center border-t border-white/5 bg-black/20">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
           Reddit-style dynamic ranking enabled
        </p>
      </div>
    </div>
  );
}
