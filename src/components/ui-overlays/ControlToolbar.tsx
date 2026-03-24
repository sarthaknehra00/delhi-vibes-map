"use client";

import { CATEGORIES } from "@/data/categories";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ControlToolbar() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
      <div className="text-[10px] font-bold tracking-widest uppercase text-white/50 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
        Delhi Socio-Economic Vibe Map
      </div>
      <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-2 px-3 shadow-2xl overflow-x-auto max-w-[90vw] scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <TooltipProvider key={cat.id}>
            <Tooltip>
              {/* @ts-expect-error - Radix UI version mismatch for asChild */}
              <TooltipTrigger asChild>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm shadow-lg cursor-help transition-transform hover:scale-110"
                  style={{ backgroundColor: cat.colorRgba, border: `2px solid ${cat.color}` }}
                >
                  {cat.emoji}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-black/90 border-white/10">
                <p className="font-bold text-white mb-1" style={{ color: cat.color }}>{cat.label}</p>
                <p className="text-xs text-white/70 max-w-[150px]">{cat.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
