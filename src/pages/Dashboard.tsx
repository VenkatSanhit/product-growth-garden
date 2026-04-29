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
        <FallingLeaves density={22} types={["leaf", "twig", "petal"]} />
        <TrunkSilhouette className="left-1/2 -translate-x-1/2 top-0 opacity-15 pointer-events-none z-0" />
        <TrunkSilhouette className="left-8 top-10 opacity-[0.07] pointer-events-none z-0 scale-75" />
        <TrunkSilhouette className="right-8 top-20 opacity-[0.06] pointer-events-none z-0 scale-75" />

        <header className="relative z-10">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-b from-background/90 via-background/85 to-background/70 backdrop-blur-xl shadow-[0_24px_80px_-40px_rgba(22,163,74,0.45)] p-6 md:p-7">
              <div className="flex items-center gap-3 mb-2">
                <BrandMark size={34} />
                <h1 className="font-mono text-lg font-bold text-foreground tracking-tight">PM Grove</h1>
              </div>
              <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                Your premium PM learning studio. Move stem by stem across read, listen, and visual modes to grow a
                lasting knowledge forest.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-primary">
                  {garden.length} trees planted
                </span>
                <span className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-dim">
                  3 learning modes per stem
                </span>
              </div>
              <Link
                to="/app/playbook"
                className="inline-flex mt-5 text-[10px] font-mono uppercase tracking-[0.18em] text-primary hover:text-primary/80 border border-primary/30 rounded-md px-3 py-2 transition-colors hover:bg-primary/5"
              >
                View full academy map — playbook index →
              </Link>
            </div>
          </div>
        </header>

        <div className="relative z-10">
          <BranchNetwork className="top-0 left-0 opacity-35 pointer-events-none" />
          <BranchNetwork className="bottom-0 left-0 opacity-20 pointer-events-none rotate-180" />
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
