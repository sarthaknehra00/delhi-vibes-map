import { useState } from "react";
import { useBrutalTruthStore } from "@/stores/brutalTruthStore";
import { Send, CheckCircle } from "lucide-react";
import { AreaId } from "@/data/areas";

interface AddBrutalTruthFormProps {
  areaId: AreaId;
  areaName: string;
}

export function AddBrutalTruthForm({ areaId, areaName }: AddBrutalTruthFormProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { addBrutalTruth } = useBrutalTruthStore();

  const handleSubmit = () => {
    setError(null);
    const result = addBrutalTruth(areaId, content);
    if (result.success) {
      setContent("");
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
        <span className="text-sm font-medium text-foreground">Brutal Truth added! 🎉</span>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Drop a Brutal Truth for {areaName}
      </p>

      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= 120) {
              setContent(e.target.value);
              setError(null);
            }
          }}
          placeholder="Most overrated place 🤡, Never go here on weekend 💀 (120 chars max)"
          rows={2}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          style={{ overflowWrap: "break-word" }}
        />
        <span className="absolute bottom-2 right-3 text-xs tabular-nums text-muted-foreground">
          {content.length}/120
        </span>
      </div>

      {error && (
        <p className="text-xs font-medium text-destructive animate-fade-in">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={content.trim().length === 0}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.97]"
      >
        <Send className="h-4 w-4" />
        Drop Brutal Truth
      </button>
    </div>
  );
}