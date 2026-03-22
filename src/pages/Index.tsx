import { MapView } from "@/components/MapView";
import { AreaPanel } from "@/components/AreaPanel";
import { TagFilterBar } from "@/components/TagFilterBar";
import { Disclaimer } from "@/components/Disclaimer";
import { MapPin, Plus } from "lucide-react";
import { useVibeStore } from "@/stores/vibeStore";

const Index = () => {
  const { selectedAreaId, selectArea } = useVibeStore();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Map */}
      <MapView />

      {/* Logo */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-xl bg-background/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <MapPin className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-extrabold leading-none tracking-tight text-foreground">
            NoFilter
          </h1>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Delhi
          </p>
        </div>
      </div>

      {/* Tag filters */}
      <div className="absolute right-4 top-4 z-20 max-w-[calc(100vw-200px)]">
        <TagFilterBar />
      </div>

      {/* Floating add button (when no area selected) */}
      {!selectedAreaId && (
        <button
          onClick={() => {
            // Select a random area to prompt adding
            const randomArea = ["cp", "hauz-khas", "chandni-chowk", "gurgaon", "khan-market"];
            const pick = randomArea[Math.floor(Math.random() * randomArea.length)];
            selectArea(pick);
          }}
          className="absolute bottom-16 right-4 z-20 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95 md:bottom-12"
        >
          <Plus className="h-5 w-5" />
          Drop a Vibe
        </button>
      )}

      {/* Area panel */}
      <AreaPanel />

      {/* Disclaimer */}
      <Disclaimer />
    </div>
  );
};

export default Index;
