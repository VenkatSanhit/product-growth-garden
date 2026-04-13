import { useState } from "react";
import type { GardenTree, TopicProgress } from "@/hooks/useProgress";
import { PixelSeed, PixelSprout, PixelTree } from "@/components/pixelTrees";
import { ForestEntriesList } from "@/components/ForestPanel";

interface GardenWidgetProps {
  garden: GardenTree[];
  currentTopicProgress?: TopicProgress;
  /** Current volume when viewing a volume page (progress dots + growth). */
  currentVolumeId?: string;
  /** @deprecated use currentVolumeId */
  currentTopicId?: string;
  currentTreeType?: string;
  onFormatAction?: (format: "read" | "listen" | "revise") => void;
  className?: string;
}

export function GardenWidget({
  garden,
  currentTopicProgress,
  currentVolumeId,
  currentTopicId,
  currentTreeType = "mango",
  className = "",
}: GardenWidgetProps) {
  const activeVolumeId = currentVolumeId ?? currentTopicId;
  const [expanded, setExpanded] = useState(false);

  const completedCount = currentTopicProgress
    ? [currentTopicProgress.read, currentTopicProgress.listen, currentTopicProgress.revise].filter(Boolean).length
    : 0;

  const isFullyComplete = completedCount === 3;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {expanded && (
        <div className="mb-2 flex max-h-[min(22rem,55vh)] w-56 flex-col overflow-hidden rounded-xl border border-border/60 bg-background/85 p-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl animate-fade-in">
          <div className="mb-2 flex shrink-0 items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-dim">Forest</span>
            <span className="text-[10px] font-mono text-muted-foreground tabular-nums">{garden.length} trees</span>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pr-0.5">
            <ForestEntriesList garden={garden} compact />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="relative flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-xl border border-border/70 bg-background/80 shadow-[0_0_0_1px_hsl(var(--foreground)/0.05)] backdrop-blur-md transition-colors hover:border-primary/35 group"
      >
        {activeVolumeId ? (
          <div className="flex flex-col items-center">
            {completedCount === 0 && (
              <span className="text-[9px] font-mono uppercase tracking-wider text-dim">Start</span>
            )}
            {completedCount === 1 && <PixelSeed animate />}
            {completedCount === 2 && <PixelSprout animate />}
            {isFullyComplete && <PixelTree type={currentTreeType} animate />}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[9px] font-mono uppercase tracking-wider text-dim">Forest</span>
            <span className="text-[8px] text-dim font-mono tabular-nums">{garden.length}</span>
          </div>
        )}

        {activeVolumeId && (
          <div className="flex gap-0.5">
            <div className={`h-1 w-1 rounded-full ${currentTopicProgress?.read ? "bg-primary" : "bg-border"}`} />
            <div className={`h-1 w-1 rounded-full ${currentTopicProgress?.listen ? "bg-accent" : "bg-border"}`} />
            <div className={`h-1 w-1 rounded-full ${currentTopicProgress?.revise ? "bg-emerald-500" : "bg-border"}`} />
          </div>
        )}
      </button>
    </div>
  );
}
