import { TAGS } from "@/data/areas";
import { TagChip } from "./TagChip";
import { useVibeStore } from "@/stores/vibeStore";
import { X } from "lucide-react";

export function TagFilterBar() {
  const { activeFilters, toggleFilter, clearFilters } = useVibeStore();

  return (
    <div className="flex items-center gap-2 overflow-x-auto rounded-xl bg-background/90 px-3 py-2 shadow-lg backdrop-blur-md">
      {TAGS.map((tag) => (
        <TagChip
          key={tag.id}
          tagId={tag.id}
          active={activeFilters.includes(tag.id)}
          onClick={() => toggleFilter(tag.id)}
          size="sm"
        />
      ))}
      {activeFilters.length > 0 && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground active:scale-95"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      )}
    </div>
  );
}
