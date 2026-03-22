import { AREAS, TAGS, TagId } from "@/data/areas";
import { useVibeStore } from "@/stores/vibeStore";
import { VibeCard } from "./VibeCard";
import { AddVibeForm } from "./AddVibeForm";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function AreaPanel() {
  const { selectedAreaId, selectArea, getVibesForArea } = useVibeStore();
  const isMobile = useIsMobile();

  if (!selectedAreaId) return null;

  const area = AREAS.find((a) => a.id === selectedAreaId);
  if (!area) return null;

  const vibes = getVibesForArea(selectedAreaId);

  // Tag distribution
  const tagCounts: Record<string, number> = {};
  vibes.forEach((v) => v.tags.forEach((t) => {
    tagCounts[t] = (tagCounts[t] || 0) + 1;
  }));
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id]) => id as TagId);

  const panelClasses = isMobile
    ? "fixed inset-x-0 bottom-0 z-50 max-h-[80vh] animate-slide-in-up"
    : "fixed right-0 top-0 z-50 h-full w-[420px] animate-slide-in-right";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-accent/20 backdrop-blur-sm animate-fade-in"
        onClick={() => selectArea(null)}
      />

      <div className={panelClasses}>
        <div className="flex h-full flex-col overflow-hidden rounded-t-2xl bg-background shadow-2xl md:rounded-none md:rounded-l-2xl">
          {/* Drag handle (mobile) */}
          {isMobile && (
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-border" />
            </div>
          )}

          {/* Header */}
          <div className="flex items-start justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-xl font-bold text-foreground" style={{ lineHeight: "1.15" }}>
                {area.name}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{area.description}</p>
            </div>
            <button
              onClick={() => selectArea(null)}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Top tags */}
          {topTags.length > 0 && (
            <div className="flex gap-2 border-b border-border px-5 py-3">
              {topTags.map((tagId) => {
                const tag = TAGS.find((t) => t.id === tagId);
                return tag ? (
                  <span
                    key={tagId}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-foreground"
                  >
                    {tag.emoji} {tag.label}
                    <span className="text-muted-foreground">({tagCounts[tagId]})</span>
                  </span>
                ) : null;
              })}
            </div>
          )}

          {/* Vibes list */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-3">
              {vibes.slice(0, 10).map((vibe) => (
                <VibeCard key={vibe.id} vibe={vibe} />
              ))}
              {vibes.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-lg font-semibold text-foreground">No vibes yet 🫥</p>
                  <p className="mt-1 text-sm text-muted-foreground">Be the first to drop one!</p>
                </div>
              )}
            </div>
          </div>

          {/* Add vibe form */}
          <div className="border-t border-border px-5 py-4">
            <AddVibeForm areaId={selectedAreaId} areaName={area.name} />
          </div>
        </div>
      </div>
    </>
  );
}
