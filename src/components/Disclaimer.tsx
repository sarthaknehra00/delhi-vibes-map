import { useState } from "react";
import { X } from "lucide-react";

export function Disclaimer() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-3 bg-accent px-4 py-2 text-accent-foreground md:px-6">
      <p className="text-xs leading-snug md:text-sm">
        ⚠️ This platform reflects user opinions and humor. Not factual or verified information.
      </p>
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 rounded-md p-1 transition-colors hover:bg-accent-foreground/10 active:scale-95"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
