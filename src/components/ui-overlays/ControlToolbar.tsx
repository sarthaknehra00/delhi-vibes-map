"use client";

import { usePaintStore } from "@/stores/paintStore";
import { CATEGORIES } from "@/data/categories";
import { Paintbrush, Navigation, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ControlToolbar() {
  const { drawMode, setDrawMode, selectedCategory, setCategory, clearAll } = usePaintStore();

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-2 shadow-2xl">
      <div className="flex bg-white/5 rounded-full p-1 gap-1">
        <TooltipProvider>
          <Tooltip>
            {/* @ts-expect-error - Radix UI version mismatch for asChild */}
            <TooltipTrigger asChild>
              <button
                onClick={() => setDrawMode("navigate")}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-all",
                  drawMode === "navigate" ? "bg-white text-black" : "text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                <Navigation size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Navigate Map</TooltipContent>
          </Tooltip>

          <Tooltip>
            {/* @ts-expect-error - Radix UI version mismatch for asChild */}
            <TooltipTrigger asChild>
              <button
                onClick={() => setDrawMode("free")}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-all",
                  drawMode !== "navigate" ? "bg-white text-black" : "text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                <Paintbrush size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Paint Vibe Map</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {drawMode !== "navigate" && (
        <>
          <div className="w-px h-8 bg-white/20 mx-2" />
          <div className="flex gap-1 overflow-x-auto max-w-[60vw] scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <TooltipProvider key={cat.id}>
                <Tooltip>
                  {/* @ts-expect-error - Radix UI version mismatch for asChild */}
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setCategory(cat.id)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all border-2",
                        selectedCategory === cat.id ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-transparent opacity-70 hover:opacity-100"
                      )}
                      style={{ backgroundColor: selectedCategory === cat.id ? cat.color : cat.colorRgba }}
                    >
                      {cat.emoji}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="font-bold">{cat.label}</p>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          <div className="w-px h-8 bg-white/20 mx-2" />
          <button
            onClick={clearAll}
            className="flex items-center justify-center w-10 h-10 rounded-full text-white/50 hover:bg-red-500/20 hover:text-red-400 transition-all"
            title="Clear all paint"
          >
            <RotateCcw size={18} />
          </button>
        </>
      )}
    </div>
  );
}
