"use client";

import { useAudioStore } from "@/stores/audioStore";
import { Disc3, Pause, Play, Volume2, VolumeX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function VibePlayer() {
  const { currentTrack, isPlaying, isLoading, volume, togglePlay, setVolume } = useAudioStore();

  if (!currentTrack && !isLoading) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-yellow-500/20 rounded-full p-2 pr-6 shadow-[0_4px_30px_rgba(250,204,21,0.15)] flex items-center gap-4 group hover:border-yellow-500/40 transition-colors cursor-pointer" onClick={!isLoading ? togglePlay : undefined}>
        
        {/* Album Art / Disc */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-yellow-500/30">
          {isLoading ? (
            <div className="absolute inset-0 bg-yellow-500/10 flex items-center justify-center">
              <Loader2 className="animate-spin text-yellow-500" size={20} />
            </div>
          ) : currentTrack ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={currentTrack.albumArt} 
                alt="Album Art" 
                className={cn(
                  "w-full h-full object-cover transition-all duration-700",
                  isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
                )}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                {isPlaying ? <Pause size={20} className="text-white" fill="white" /> : <Play size={20} className="text-white ml-1" fill="white" />}
              </div>
              {/* Center hole of the record */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#0a0a0a] rounded-full border border-white/20" />
            </>
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <Disc3 className="text-yellow-500/50" />
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex flex-col justify-center min-w-[120px] max-w-[200px]">
          {isLoading ? (
            <>
              <div className="h-3.5 w-24 bg-white/10 rounded animate-pulse mb-1.5" />
              <div className="h-2.5 w-16 bg-white/5 rounded animate-pulse" />
            </>
          ) : currentTrack ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-yellow-500 tracking-wider">
                  Vibe check
                </span>
                {isPlaying && (
                  <div className="flex items-end gap-[2px] h-2.5">
                    <div className="w-[2px] bg-yellow-400 rounded-full animate-[music-bar_1s_ease-in-out_infinite]" />
                    <div className="w-[2px] bg-yellow-400 rounded-full animate-[music-bar_1.2s_ease-in-out_infinite_0.2s]" />
                    <div className="w-[2px] bg-yellow-400 rounded-full animate-[music-bar_0.8s_ease-in-out_infinite_0.4s]" />
                  </div>
                )}
              </div>
              <h4 className="text-sm font-bold text-white truncate leading-tight mt-0.5" title={currentTrack.name}>
                {currentTrack.name}
              </h4>
              <p className="text-[11px] text-white/50 truncate" title={currentTrack.artist}>
                {currentTrack.artist}
              </p>
            </>
          ) : null}
        </div>

        {/* Volume Control */}
        {!isLoading && currentTrack && (
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors ml-2"
            onClick={(e) => {
              e.stopPropagation();
              setVolume(volume === 0 ? 0.5 : 0);
            }}
          >
            {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
