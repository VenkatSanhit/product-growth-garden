import { Link } from "react-router-dom";
import { tracks } from "@/data/catalog";
import { TrackCard } from "@/components/TrackCard";
import { AppShell } from "@/components/AppShell";
import { ForestPanel } from "@/components/ForestPanel";
import { GardenWidget } from "@/components/GardenWidget";
import { useProgress } from "@/hooks/useProgress";
import { GroveAmbience } from "@/components/GroveAmbience";
import { BrandMark } from "@/components/BrandMark";
import { FallingLeaves } from "@/components/FallingLeaves";
import { TrunkSilhouette, BranchNetwork } from "@/components/BranchDecoration";

export default function Dashboard() {
  const { garden } = useProgress();

  return (
    <AppShell>
      <div className="relative min-h-screen pb-24 overflow-hidden">
        <GroveAmbience variant="trunk" />
        <FallingLeaves density={10} types={["leaf", "petal"]} />
        <TrunkSilhouette className="left-1/2 -translate-x-1/2 top-0 opacity-30 pointer-events-none z-0" />

        <header className="border-b border-border relative z-10">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-1">
              <BrandMark size={36} />
              <h1 className="font-mono text-lg font-bold text-foreground tracking-tight">PM Grove</h1>
            </div>
            <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
              Concept-driven product learning. Trunks hold branches; branches hold stems; each stem opens in read,
              listen, and visual modes.
            </p>
            <Link
              to="/app/playbook"
              className="inline-flex mt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-primary hover:text-primary/80 border border-primary/30 rounded-md px-3 py-2 transition-colors hover:bg-primary/5"
            >
              View full academy map — playbook index →
            </Link>
            <div className="mt-6 flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-dim shrink-0">
                <path
                  d="M8 0C6 3 4 5 2 6C0 7 0 9 1 10C2 11 4 11 5 10C6 9 7 7 8 5C9 7 10 9 11 10C12 11 14 11 15 10C16 9 16 7 14 6C12 5 10 3 8 0Z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          </div>
        </header>

        <div className="relative z-10">
          <BranchNetwork className="top-0 left-0 opacity-35 pointer-events-none" />
          <div className="max-w-3xl mx-auto px-4 py-8 relative">
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

        <div className="max-w-3xl mx-auto px-4 mt-8 relative z-10 flex items-end justify-center gap-1 opacity-20">
          <div className="w-8 h-px bg-border" />
          <div className="w-1 h-2 bg-border rounded-t-full" />
          <div className="w-12 h-px bg-border" />
          <div className="w-0.5 h-3 bg-border rounded-t-full" />
          <div className="w-6 h-px bg-border" />
          <div className="w-1 h-1.5 bg-border rounded-t-full" />
          <div className="w-10 h-px bg-border" />
          <div className="w-0.5 h-2 bg-border rounded-t-full" />
          <div className="w-8 h-px bg-border" />
        </div>
      </div>

      <ForestPanel garden={garden} className="hidden md:flex" />
      <GardenWidget garden={garden} className="md:hidden" />
    </AppShell>
  );
}
