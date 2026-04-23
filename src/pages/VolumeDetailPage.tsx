import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getVolumeBySlug,
  getTrackBySlug,
  getSeriesBySlug,
  volumeReadPath,
  volumeVisualPath,
} from "@/data/catalog";
import {
  topicMediaUrl,
  isPowerPointMediaRef,
  isRasterImageMediaRef,
  getPowerPointMediaRef,
  audioMimeTypeForUrl,
  formatTreeLabel,
  type FormatType,
} from "@/data/topics";
import { FormatCard } from "@/components/FormatCard";
import { AppShell } from "@/components/AppShell";
import { ForestPanel } from "@/components/ForestPanel";
import { GardenWidget } from "@/components/GardenWidget";
import { GamificationOverlay } from "@/components/GamificationOverlay";
import { useProgress } from "@/hooks/useProgress";
import { GroveAmbience } from "@/components/GroveAmbience";
import { BrandMark } from "@/components/BrandMark";

type GamStage = "seed" | "water" | "tree" | null;

const formatOrder: FormatType[] = ["read", "listen", "revise"];

export default function VolumeDetailPage() {
  const { trackSlug, seriesSlug, volumeSlug } = useParams<{
    trackSlug: string;
    seriesSlug: string;
    volumeSlug: string;
  }>();
  const track = trackSlug ? getTrackBySlug(trackSlug) : undefined;
  const series = trackSlug && seriesSlug ? getSeriesBySlug(trackSlug, seriesSlug) : undefined;
  const volume =
    trackSlug && seriesSlug && volumeSlug ? getVolumeBySlug(trackSlug, seriesSlug, volumeSlug) : undefined;

  const { getVolumeProgress, completeFormat, garden } = useProgress();
  const [gamStage, setGamStage] = useState<GamStage>(null);
  const [openFormat, setOpenFormat] = useState<"listen" | "revise" | null>(null);
  const navigate = useNavigate();

  if (!track || !series || !volume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-dim font-mono">Stem not found</p>
      </div>
    );
  }

  const progress = getVolumeProgress(volume.id);
  const folder = volume.contentFolder;
  const audioUrl = topicMediaUrl(folder, volume.media.audio);
  const visualUrl = topicMediaUrl(folder, volume.media.visual);
  const pptRef = getPowerPointMediaRef({ media: volume.media });
  const visualIsPpt = Boolean(pptRef);

  const handleComplete = (formatType: FormatType) => {
    const prev = getVolumeProgress(volume.id);
    const prevCount = [prev.read, prev.listen, prev.revise].filter(Boolean).length;
    completeFormat(volume.id, formatType, volume.treeType);

    const newCount = prevCount + 1;
    if (newCount === 1) setGamStage("seed");
    else if (newCount === 2) setGamStage("water");
    else if (newCount === 3) setGamStage("tree");
  };

  const openRead = () => navigate(volumeReadPath(track.slug, series.slug, volume.slug));

  const openVisual = () => navigate(volumeVisualPath(track.slug, series.slug, volume.slug));

  const listenSlot = audioUrl ? (
    <div className="rounded-lg border border-accent/30 bg-accent/5 px-3 py-4">
      <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-dim mb-3">Playback</p>
      <audio controls className="w-full h-10 accent-[hsl(28,87%,58%)]" preload="metadata">
        <source src={audioUrl} type={audioMimeTypeForUrl(audioUrl)} />
        Your browser does not support audio.
      </audio>
    </div>
  ) : (
    <p className="text-[10px] font-mono text-dim/90 leading-relaxed italic">
      Audio for this stem isn't published yet—Read carries the full narrative for now.
    </p>
  );

  const imageVisualSlot =
    visualUrl && !isPowerPointMediaRef(volume.media.visual) ? (
      <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 overflow-hidden">
        <img
          src={visualUrl}
          alt={volume.visualCaption || volume.title}
          className="w-full object-contain max-h-72 md:max-h-96 bg-black/20"
        />
        {volume.visualCaption ? (
          <p className="text-[10px] font-mono text-dim px-3 py-2 border-t border-border/50">{volume.visualCaption}</p>
        ) : null}
        {volume.visualMoreUrl ? (
          <div className="px-3 pb-2 text-center">
            <a
              href={volume.visualMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-primary hover:underline"
            >
              {volume.visualMoreLabel || "Open deck link"}
            </a>
          </div>
        ) : null}
      </div>
    ) : !isPowerPointMediaRef(volume.media.visual) && !visualIsPpt ? (
      <p className="text-[10px] font-mono text-dim/90 italic leading-relaxed">
        Visuals for this stem are still in production—use Read (canonical) or Listen when available.
      </p>
    ) : null;

  const pathsDone = [progress.read, progress.listen, progress.revise].filter(Boolean).length;
  const treeUnlocked = pathsDone === 3;

  return (
    <AppShell activeTrackSlug={track.slug}>
      <div className="relative min-h-screen pb-20">
        <GroveAmbience variant="stem" />
        <header className="border-b border-border relative overflow-hidden">
          <div className="read-matrix-dots absolute inset-0 opacity-[0.22] pointer-events-none" aria-hidden />
          <div className="relative max-w-2xl mx-auto px-4 py-6">
            <Link
              to={`/t/${track.slug}/${series.slug}`}
              className="inline-flex items-center gap-1 text-xs text-dim hover:text-foreground transition-colors mb-4 font-mono"
            >
              Back · {series.title}
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-2 text-[10px] font-mono uppercase tracking-wider text-dim">
              <span className="text-primary/90">{track.title}</span>
              <span className="text-border">/</span>
              <span>{series.title}</span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary/80">Stem {volume.volumeNumber}</p>
            <div className="flex items-start gap-3 mt-1">
              <BrandMark size={36} className="mt-0.5" />
              <h1 className="font-mono text-xl font-bold text-foreground tracking-tight">{volume.title}</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{volume.subtitle}</p>
            <p className="text-xs text-muted-foreground/90 mt-3 leading-relaxed">{volume.description}</p>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-6">
          <h2 className="mb-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-dim">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-primary/45" aria-hidden />
            Three modes through this stem
            <span className="h-px max-w-[5rem] flex-1 bg-gradient-to-r from-primary/35 to-transparent" aria-hidden />
          </h2>
          <div className="grid gap-3">
            {volume.formats.map((fmt) => {
              if (fmt.type === "read") {
                return (
                  <FormatCard
                    key={fmt.type}
                    format={fmt}
                    completed={progress.read}
                    expanded={false}
                    onComplete={() => handleComplete("read")}
                    onToggleOpen={() => {}}
                    onActivate={openRead}
                    actionHint="Open reader"
                  />
                );
              }
              if (fmt.type === "listen") {
                return (
                  <FormatCard
                    key={fmt.type}
                    format={fmt}
                    completed={progress.listen}
                    expanded={openFormat === "listen"}
                    expandedSlot={listenSlot}
                    onComplete={() => handleComplete("listen")}
                    onToggleOpen={() => setOpenFormat((c) => (c === "listen" ? null : "listen"))}
                    actionHint={openFormat === "listen" ? "Hide player" : "Show player"}
                  />
                );
              }
              if (fmt.type === "revise") {
                if (visualIsPpt) {
                  return (
                    <FormatCard
                      key={fmt.type}
                      format={fmt}
                      completed={progress.revise}
                      expanded={false}
                      onComplete={() => handleComplete("revise")}
                      onToggleOpen={() => {}}
                      onActivate={openVisual}
                      actionHint="Open visual"
                      secondarySlot={
                        isRasterImageMediaRef(volume.media.visual) ? (
                          <div className="rounded-md border border-emerald-500/20 overflow-hidden bg-black/40">
                            <img
                              src={topicMediaUrl(folder, volume.media.visual)}
                              alt=""
                              className="w-full max-h-40 object-contain opacity-95"
                            />
                          </div>
                        ) : null
                      }
                    />
                  );
                }
                return (
                  <FormatCard
                    key={fmt.type}
                    format={fmt}
                    completed={progress.revise}
                    expanded={openFormat === "revise"}
                    expandedSlot={imageVisualSlot ?? undefined}
                    onComplete={() => handleComplete("revise")}
                    onToggleOpen={() => setOpenFormat((c) => (c === "revise" ? null : "revise"))}
                    actionHint={openFormat === "revise" ? "Hide visual" : "Show visual"}
                  />
                );
              }
              return null;
            })}
          </div>

          <div className="mt-8 text-center">
            <div className="flex gap-1 justify-center mb-2">
              {formatOrder.map((ft, i) => (
                <div
                  key={ft}
                  className={`w-8 h-1 rounded-full ${
                    progress[ft]
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
            <p className="text-[10px] font-mono uppercase tracking-wider text-dim">
              {pathsDone}/3 modes completed
              {treeUnlocked ? (
                <>
                  {" "}
                  · <span className="text-primary/90 normal-case tracking-normal">{formatTreeLabel(volume.treeType)}</span>
                </>
              ) : (
                <>
                  {" "}
                  · <span className="text-muted-foreground normal-case tracking-normal">tree species hidden until finish</span>
                </>
              )}
            </p>
          </div>
        </div>

        <ForestPanel garden={garden} className="hidden md:flex" />

        <GardenWidget
          garden={garden}
          currentTopicProgress={progress}
          currentVolumeId={volume.id}
          currentTreeType={volume.treeType}
        />

        <GamificationOverlay stage={gamStage} treeType={volume.treeType} onDismiss={() => setGamStage(null)} />
      </div>
    </AppShell>
  );
}
