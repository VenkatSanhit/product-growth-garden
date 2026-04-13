import { useNavigate } from "react-router-dom";
import type { Series, SeriesContentType, Track } from "@/data/catalog";

const SERIES_TYPE_LABEL: Record<SeriesContentType, string> = {
  "concept-series": "Concept branch",
  "case-study-series": "Case study branch",
  "playbook-series": "Playbook branch",
  "blueprint-series": "Blueprint branch",
  "deep-dive-series": "Deep-dive branch",
};

interface SeriesCardProps {
  track: Track;
  series: Series;
  exploredVolumes: number;
}

export function SeriesCard({ track, series, exploredVolumes }: SeriesCardProps) {
  const navigate = useNavigate();
  const total = series.volumes.length;

  return (
    <button
      type="button"
      onClick={() => navigate(`/t/${track.slug}/${series.slug}`)}
      className="content-card surface w-full text-left border border-border rounded-lg p-5 cursor-pointer group transition-colors hover:border-primary/25"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-dim mb-1">
            {SERIES_TYPE_LABEL[series.contentType]}
          </p>
          <h3 className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors">
            {series.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{series.description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
        <span className="text-[10px] font-mono uppercase tracking-wider text-dim">
          {total} stems · {exploredVolumes}/{total} explored
        </span>
        <span className="text-[10px] font-mono text-primary/80">Branch →</span>
      </div>
    </button>
  );
}
