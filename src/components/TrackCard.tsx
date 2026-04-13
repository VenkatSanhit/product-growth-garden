import { useNavigate } from "react-router-dom";
import type { Track } from "@/data/catalog";

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  const navigate = useNavigate();
  const n = track.series.length;

  return (
    <button
      type="button"
      onClick={() => navigate(`/t/${track.slug}`)}
      className="content-card surface w-full text-left border border-border rounded-lg p-5 cursor-pointer group transition-colors hover:border-primary/25"
    >
      <h3 className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors">
        {track.title}
      </h3>
      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{track.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
        <span className="text-[10px] font-mono uppercase tracking-wider text-dim">
          {n === 0 ? "Branch catalog expanding" : `${n} branches`}
        </span>
        <span className="text-[10px] font-mono text-primary/80">Open →</span>
      </div>
    </button>
  );
}
