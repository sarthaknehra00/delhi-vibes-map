import { TAGS, TagId } from "@/data/areas";
import { cn } from "@/lib/utils";

interface TagChipProps {
  tagId: TagId;
  active?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
}

export function TagChip({ tagId, active = false, onClick, size = "md" }: TagChipProps) {
  const tag = TAGS.find((t) => t.id === tagId);
  if (!tag) return null;

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium transition-all duration-200 select-none",
        "active:scale-[0.96]",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3.5 py-1.5 text-sm",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-background text-foreground hover:border-primary hover:bg-primary/10",
        onClick ? "cursor-pointer" : "cursor-default"
      )}
    >
      <span>{tag.emoji}</span>
      <span>{tag.label}</span>
    </button>
  );
}
