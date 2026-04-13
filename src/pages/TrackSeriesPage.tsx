import { Link, useParams } from "react-router-dom";
import { getTrackBySlug } from "@/data/catalog";
import { AppShell } from "@/components/AppShell";
import { SeriesCard } from "@/components/SeriesCard";
import { ForestPanel } from "@/components/ForestPanel";
import { GardenWidget } from "@/components/GardenWidget";
import { useProgress } from "@/hooks/useProgress";
import { GroveAmbience } from "@/components/GroveAmbience";
import { BrandMark } from "@/components/BrandMark";

export default function TrackSeriesPage() {
  const { trackSlug } = useParams<{ trackSlug: string }>();
  const track = trackSlug ? getTrackBySlug(trackSlug) : undefined;
  const { garden, getSeriesExploredCount } = useProgress();

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-sm text-dim">
        Trunk not found
      </div>
    );
  }

  return (
    <AppShell activeTrackSlug={track.slug}>
      <div className="relative min-h-screen pb-24">
        <GroveAmbience variant="branch" />
        <header className="border-b border-border">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-dim hover:text-foreground transition-colors mb-4 font-mono"
            >
              Back · Trunks
            </Link>
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-dim mb-1">Trunk</p>
            <div className="flex items-center gap-3">
              <BrandMark size={32} />
              <h1 className="font-mono text-xl font-bold text-foreground tracking-tight">{track.title}</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl leading-relaxed">{track.description}</p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.22em] text-dim mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary/45" aria-hidden />
            Branches in this trunk
            <span className="h-px max-w-[5rem] flex-1 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
          </h2>

          {track.series.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border/60 bg-muted/10 px-6 py-12 text-center">
              <p className="text-sm font-mono text-dim">Branches for this trunk are being staged.</p>
              <p className="text-xs text-muted-foreground mt-2">Check another trunk or check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {track.series.map((series) => (
                <SeriesCard
                  key={series.id}
                  track={track}
                  series={series}
                  exploredVolumes={getSeriesExploredCount(series.volumes.map((v) => v.id))}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ForestPanel garden={garden} className="hidden md:flex" />
      <GardenWidget garden={garden} className="md:hidden" />
    </AppShell>
  );
}
