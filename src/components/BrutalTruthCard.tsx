import { BrutalTruth } from "@/data/mockBrutalTruths";
import { useBrutalTruthStore } from "@/stores/brutalTruthStore";
import { ChevronUp, ChevronDown, Flag } from "lucide-react";

interface BrutalTruthCardProps {
  truth: BrutalTruth;
}

export function BrutalTruthCard({ truth }: BrutalTruthCardProps) {
  const { upvoteBrutalTruth, downvoteBrutalTruth, reportBrutalTruth } = useBrutalTruthStore();

  return (
    <div className="group rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex gap-3">
        {/* Vote column */}
        <div className="flex flex-col items-center gap-0.5 pt-0.5">
          <button
            onClick={() => upvoteBrutalTruth(truth.id)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground active:scale-95"
            aria-label="Upvote"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <span className="min-w-[2ch] text-center text-sm font-bold tabular-nums text-foreground">
            {truth.votes}
          </span>
          <button
            onClick={() => downvoteBrutalTruth(truth.id)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive active:scale-95"
            aria-label="Downvote"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed text-foreground" style={{ overflowWrap: "break-word" }}>
            {truth.content}
          </p>
        </div>

        {/* Report */}
        <button
          onClick={() => reportBrutalTruth(truth.id)}
          className="self-start rounded-md p-1.5 text-muted-foreground/50 opacity-0 transition-all group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive active:scale-95"
          aria-label="Report"
          title="Report this brutal truth"
        >
          <Flag className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}