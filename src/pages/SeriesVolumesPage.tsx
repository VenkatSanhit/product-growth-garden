import { Link, useParams } from "react-router-dom";
import { getSeriesBySlug, getTrackBySlug } from "@/data/catalog";
import { AppShell } from "@/components/AppShell";
import { VolumeCard } from "@/components/VolumeCard";
import { ForestPanel } from "@/components/ForestPanel";
import { GardenWidget } from "@/components/GardenWidget";
import { useProgress } from "@/hooks/useProgress";
import { GroveAmbience } from "@/components/GroveAmbience";

export default function SeriesVolumesPage() {
  const { trackSlug, seriesSlug } = useParams<{ trackSlug: string; seriesSlug: string }>();
  const track = trackSlug ? getTrackBySlug(trackSlug) : undefined;
  const series = trackSlug && seriesSlug ? getSeriesBySlug(trackSlug, seriesSlug) : undefined;
  const { garden, getCompletedCount, getSeriesExploredCount } = useProgress();

  if (!track || !series) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-sm text-dim">
        Branch not found
      </div>
    );
  }

  const explored = getSeriesExploredCount(series.volumes.map((v) => v.id));

  return (
    <AppShell activeTrackSlug={track.slug}>
      <div className="relative min-h-screen pb-24">
        <GroveAmbience variant="stem" />
        <header className="border-b border-border relative overflow-hidden">
          <div className="read-matrix-dots absolute inset-0 opacity-[0.14] pointer-events-none" aria-hidden />
          <div className="relative max-w-3xl mx-auto px-4 py-6">
            <Link
              to={`/t/${track.slug}`}
              className="inline-flex items-center gap-1 text-xs text-dim hover:text-foreground transition-colors mb-4 font-mono"
            >
              Back · {track.title}
            </Link>
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-dim mb-1">Branch</p>
            <h1 className="font-mono text-xl font-bold text-foreground tracking-tight">{series.title}</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">{series.description}</p>
            <p className="text-[10px] font-mono text-dim mt-4 uppercase tracking-wider">
              {series.volumes.length} stems · {explored}/{series.volumes.length} explored
            </p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.22em] text-dim mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary/45" aria-hidden />
            Stems · three modes each
            <span className="h-px max-w-[5rem] flex-1 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
          </h2>
          <p className="text-xs text-muted-foreground mb-6 max-w-xl leading-relaxed">
            Read is the canonical layer; listen and visual are alternate modes through the same stem. Complete all three
            modes to reveal the tree for that stem.
          </p>
          <div className="flex flex-col gap-3">
            {series.volumes.map((volume) => (
              <VolumeCard
                key={volume.id}
                track={track}
                series={series}
                volume={volume}
                completedCount={getCompletedCount(volume.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <ForestPanel garden={garden} className="hidden md:flex" />
      <GardenWidget garden={garden} className="md:hidden" />
    </AppShell>
  );
}
