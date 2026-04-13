import { formatTreeLabel } from "@/data/topics";
import { gardenLabelsForVolume } from "@/data/catalog";
import type { GardenTree } from "@/hooks/useProgress";
import { PixelTree } from "@/components/pixelTrees";

interface ForestEntriesListProps {
  garden: GardenTree[];
  /** Tighter rows for the mobile garden popover */
  compact?: boolean;
}

export function ForestEntriesList({ garden, compact }: ForestEntriesListProps) {
  if (garden.length === 0) {
    return (
      <p
        className={`px-1 text-center text-[10px] font-mono leading-relaxed text-dim ${
          compact ? "py-3" : "py-6"
        }`}
      >
        {compact
          ? "Complete all three modes on a stem to plant your first tree."
          : "Finish read, listen, and visual on each stem. Species stay hidden until you unlock them."}
      </p>
    );
  }

  const pad = compact ? "px-2 py-1.5" : "px-2.5 py-2";
  const box = compact ? "h-9 w-9" : "h-11 w-11";

  return (
    <ul className="flex flex-col gap-2">
      {[...garden]
        .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
        .map((tree) => {
          const { primary, secondary } = gardenLabelsForVolume(tree.volumeId);
          return (
            <li
              key={tree.volumeId}
              className={`group rounded-lg border border-border/35 bg-card/30 transition-colors hover:border-primary/25 hover:bg-card/50 ${pad}`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex shrink-0 items-center justify-center rounded-md border border-border/40 bg-background/50 ${box}`}
                >
                  <PixelTree type={tree.treeType} size="sm" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-mono font-semibold leading-tight text-foreground">{primary}</p>
                  {secondary ? (
                    <p className="mt-0.5 truncate text-[9px] font-mono text-muted-foreground/90">{secondary}</p>
                  ) : null}
                  <p className="mt-0.5 text-[9px] font-mono uppercase tracking-[0.12em] text-primary/90">
                    {formatTreeLabel(tree.treeType)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

interface ForestPanelProps {
  garden: GardenTree[];
  className?: string;
}

export function ForestPanel({ garden, className = "" }: ForestPanelProps) {
  return (
    <aside
      className={`fixed top-20 right-3 z-40 flex w-[13.75rem] max-h-[min(32rem,calc(100vh-5.5rem))] flex-col rounded-xl border border-border/50 bg-background/75 shadow-[0_0_0_1px_hsl(var(--foreground)/0.04),0_12px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl ${className}`}
    >
      <div className="shrink-0 border-b border-border/40 px-3 py-3">
        <p className="text-[9px] font-mono uppercase tracking-[0.28em] text-dim">Forest</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-mono text-xl font-bold tabular-nums text-foreground tracking-tight">{garden.length}</span>
          <span className="text-[10px] font-mono text-muted-foreground">trees grown</span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 py-2 scrollbar-hide">
        <ForestEntriesList garden={garden} />
      </div>
    </aside>
  );
}
