import { useState } from "react";
import { TAGS, TagId } from "@/data/areas";
import { TagChip } from "./TagChip";
import { useVibeStore } from "@/stores/vibeStore";
import { Send, CheckCircle } from "lucide-react";

interface AddVibeFormProps {
  areaId: string;
  areaName: string;
}

export function AddVibeForm({ areaId, areaName }: AddVibeFormProps) {
  const [tags, setTags] = useState<TagId[]>([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { addVibe } = useVibeStore();

  const toggleTag = (tagId: TagId) => {
    setTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = () => {
    setError(null);
    const result = addVibe(areaId, tags, description);
    if (result.success) {
      setDescription("");
      setTags([]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } else {
      setError(result.error || "Something went wrong");
    }
  };

  if (success) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-4 animate-fade-in">
        <CheckCircle className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-foreground">Vibe added! 🎉</span>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Drop a vibe for {areaName}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {TAGS.map((tag) => (
          <TagChip
            key={tag.id}
            tagId={tag.id}
            active={tags.includes(tag.id)}
            onClick={() => toggleTag(tag.id)}
            size="sm"
          />
        ))}
      </div>

      <div className="relative">
        <textarea
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 120) {
              setDescription(e.target.value);
              setError(null);
            }
          }}
          placeholder="Keep it real, keep it funny... (120 chars max)"
          rows={2}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          style={{ overflowWrap: "break-word" }}
        />
        <span className="absolute bottom-2 right-3 text-xs tabular-nums text-muted-foreground">
          {description.length}/120
        </span>
      </div>

      {error && (
        <p className="text-xs font-medium text-destructive animate-fade-in">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={description.trim().length === 0 || tags.length === 0}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.97]"
      >
        <Send className="h-4 w-4" />
        Drop Vibe
      </button>
    </div>
  );
}
