import { tracks } from "@/data/catalog";
import { TrackCard } from "@/components/TrackCard";
import { AppShell } from "@/components/AppShell";
import { ForestPanel } from "@/components/ForestPanel";
import { GardenWidget } from "@/components/GardenWidget";
import { useProgress } from "@/hooks/useProgress";
import { GroveAmbience } from "@/components/GroveAmbience";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { garden } = useProgress();

  return (
    <AppShell>
      <div className="relative min-h-screen pb-24">
        <GroveAmbience variant="trunk" />
        <header className="border-b border-border">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-primary text-lg">◈</span>
              <h1 className="font-mono text-lg font-bold text-foreground tracking-tight">PM Grove</h1>
            </div>
            <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
              Concept-driven product learning. Trunks hold branches; branches hold stems; each stem opens in read,
              listen, and visual modes.
            </p>
            <Link
              to="/playbook"
              className="inline-flex mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-primary hover:text-primary/80 border border-primary/30 rounded-md px-3 py-2 transition-colors hover:bg-primary/5"
            >
              View full academy map — playbook index →
            </Link>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.22em] text-dim mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary/45" aria-hidden />
            Choose a trunk
            <span className="h-px max-w-[5rem] flex-1 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      </div>

      <ForestPanel garden={garden} className="hidden md:flex" />
      <GardenWidget garden={garden} className="md:hidden" />
    </AppShell>
  );
}
