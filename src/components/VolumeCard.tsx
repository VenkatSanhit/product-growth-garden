import { useNavigate } from "react-router-dom";
import type { Track, Series, Volume } from "@/data/catalog";
import { volumePath } from "@/data/catalog";
import { formatTreeLabel } from "@/data/topics";
import { PixelTree } from "@/components/pixelTrees";

interface VolumeCardProps {
  track: Track;
  series: Series;
  volume: Volume;
  completedCount: number;
}

export function VolumeCard({ track, series, volume, completedCount }: VolumeCardProps) {
  const navigate = useNavigate();
  const isComplete = completedCount === 3;
  const href = volumePath(track.slug, series.slug, volume.slug);

  return (
    <button
      type="button"
      onClick={() => navigate(href)}
      className="content-card surface w-full text-left border border-border rounded-lg p-5 cursor-pointer group transition-colors hover:border-primary/25"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-primary/80 mb-1">
            Stem {volume.volumeNumber}
          </p>
          <h3 className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors">
            {volume.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{volume.subtitle}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-border/70 bg-muted/15 transition-colors group-hover:border-primary/25">
          {isComplete ? (
            <div className="flex h-full w-full items-center justify-center rounded-[inherit] border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-transparent">
              <div className="origin-center scale-[0.72]">
                <PixelTree type={volume.treeType} />
              </div>
            </div>
          ) : (
            <span className="text-[10px] font-mono text-dim">?</span>
          )}
        </div>
      </div>

      <div className="flex gap-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors ${
              i < completedCount
                ? i === 0
                  ? "bg-primary"
                  : i === 1
                    ? "bg-accent"
                    : "bg-emerald-500"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] text-dim font-mono uppercase tracking-wider">
          {completedCount}/3 modes completed
        </span>
        <span className="text-[10px] font-mono text-primary/85">
          {isComplete ? formatTreeLabel(volume.treeType) : "Species hidden"}
        </span>
      </div>
    </button>
  );
}
