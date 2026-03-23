"use client";

import { X, TrendingUp, Utensils, Star, Flame, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export function FoodPanel({ isOpen, onClose, areaName }: { isOpen: boolean; onClose: () => void; areaName: string }) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-4 bottom-4 right-4 w-[400px] max-w-[calc(100vw-32px)] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-right-8 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Utensils size={20} className="text-orange-500" />
            Eats in {areaName}
          </h2>
          <p className="text-sm text-white/50">Curated by the locals, judged by Reddit.</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Filters Base */}
      <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide border-b border-white/5">
        <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 cursor-pointer border-orange-500/30">🔥 Trending</Badge>
        <Badge variant="outline" className="text-white/60 hover:text-white cursor-pointer border-white/20">Street Food</Badge>
        <Badge variant="outline" className="text-white/60 hover:text-white cursor-pointer border-white/20">Cafes</Badge>
        <Badge variant="outline" className="text-white/60 hover:text-white cursor-pointer border-white/20">Hidden Gems</Badge>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          
          {/* Mock Mock Restaurant Card */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Ramesh Chole Bhature
                  <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">
                    <TrendingUp size={10} /> #1
                  </span>
                </h3>
                <p className="text-xs text-white/50 flex items-center gap-1 mt-1">
                  <MapPin size={10} /> Opposite Metro Station Pillar 42
                </p>
              </div>
              <div className="flex flex-col items-center bg-white/5 rounded-lg p-1">
                <Button variant="ghost" size="icon" className="h-6 w-6 text-orange-400 hover:bg-orange-500/20">
                  <Flame size={14} />
                </Button>
                <span className="text-xs font-bold text-white my-0.5">3.4k</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-white/40 hover:bg-white/10 hover:text-red-400">
                  <Star size={14} className="rotate-180" />
                </Button>
              </div>
            </div>
            
            <div className="mt-3 bg-black/40 rounded-lg p-3 text-sm text-white/70 border border-white/5 relative">
              <span className="absolute -top-2 -left-2 text-2xl opacity-20">"</span>
              Yaha sirf chole bhature nahi, acidity aur cholesterol free milta hai. But 10/10 worth it.
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-orange-500" />
                <span className="text-xs font-medium text-white/50">@SouthDelhibwoy</span>
                <span className="text-xs text-orange-400 font-bold ml-auto">+420 upvotes</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-base font-bold text-white">The Aesthetic Cafe</h3>
                <p className="text-xs text-white/50 flex items-center gap-1 mt-1">
                  <MapPin size={10} /> Champa Gali
                </p>
              </div>
              <div className="flex flex-col items-center bg-white/5 rounded-lg p-1">
                <Button variant="ghost" size="icon" className="h-6 w-6 text-orange-400 hover:bg-orange-500/20">
                  <Flame size={14} />
                </Button>
                <span className="text-xs font-bold text-white my-0.5">-89</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-white/40 hover:bg-white/10 hover:text-red-400">
                  <Star size={14} className="rotate-180" />
                </Button>
              </div>
            </div>
            
            <div className="mt-3 bg-black/40 rounded-lg p-3 text-sm text-white/70 border border-white/5">
              Food is mid, lights are imported. You pay 800 rupees for a coffee and a mirror selfie.
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-green-500" />
                <span className="text-xs font-medium text-white/50">@DU_Struggles</span>
              </div>
            </div>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}
