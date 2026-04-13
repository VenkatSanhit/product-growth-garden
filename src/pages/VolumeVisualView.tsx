import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVolumeBySlug, volumePath } from "@/data/catalog";
import {
  topicMediaUrl,
  topicMediaAbsoluteUrl,
  isRasterImageMediaRef,
  officeOnlineEmbedUrl,
  googleViewerEmbedUrl,
  getPowerPointMediaRef,
} from "@/data/topics";
import { GamificationOverlay } from "@/components/GamificationOverlay";
import { useProgress } from "@/hooks/useProgress";

type GamStage = "seed" | "water" | "tree" | null;

type EmbedEngine = "office" | "google";

export default function VolumeVisualView() {
  const { trackSlug, seriesSlug, volumeSlug } = useParams<{
    trackSlug: string;
    seriesSlug: string;
    volumeSlug: string;
  }>();
  const navigate = useNavigate();
  const volume =
    trackSlug && seriesSlug && volumeSlug ? getVolumeBySlug(trackSlug, seriesSlug, volumeSlug) : undefined;

  const { getVolumeProgress, completeFormat } = useProgress();
  const [gamStage, setGamStage] = useState<GamStage>(null);
  const [engine, setEngine] = useState<EmbedEngine>("office");

  const pptRef = volume ? getPowerPointMediaRef({ media: volume.media }) : "";
  const isPpt = Boolean(pptRef);
  const isImage = volume ? isRasterImageMediaRef(volume.media.visual) : false;

  const relUrl = volume && isImage ? topicMediaUrl(volume.contentFolder, volume.media.visual) : "";
  const absoluteDeckUrl = useMemo(() => {
    if (!volume || !pptRef) return "";
    return topicMediaAbsoluteUrl(volume.contentFolder, pptRef);
  }, [volume, pptRef]);

  /** Office/Google fetch the file from the internet — not localhost / plain http. */
  const deckUrlEmbeddableRemotely = useMemo(() => {
    if (!absoluteDeckUrl) return false;
    try {
      const u = new URL(absoluteDeckUrl);
      if (u.protocol !== "https:") return false;
      const h = u.hostname.toLowerCase();
      if (h === "localhost" || h === "127.0.0.1" || h.endsWith(".local")) return false;
      return true;
    } catch {
      return false;
    }
  }, [absoluteDeckUrl]);

  /** If a .pptx is wired but not publicly reachable, prefer static visual.png (etc.) instead of a broken iframe. */
  const useRasterInsteadOfLocalDeck = Boolean(isPpt && isImage && relUrl && !deckUrlEmbeddableRemotely);

  const embedSrc = useMemo(() => {
    if (!absoluteDeckUrl || useRasterInsteadOfLocalDeck) return "";
    return engine === "office" ? officeOnlineEmbedUrl(absoluteDeckUrl) : googleViewerEmbedUrl(absoluteDeckUrl);
  }, [absoluteDeckUrl, engine, useRasterInsteadOfLocalDeck]);

  const showDeckEmbedChrome = isPpt && absoluteDeckUrl && deckUrlEmbeddableRemotely;
  const showIframe = Boolean(embedSrc);
  const showRaster = Boolean(isImage && relUrl && (!isPpt || useRasterInsteadOfLocalDeck));
  const showLocalDeckEmbedWarning =
    isPpt && absoluteDeckUrl && !deckUrlEmbeddableRemotely && !useRasterInsteadOfLocalDeck;

  if (!volume || !trackSlug || !seriesSlug || !volumeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-sm text-dim">Stem not found</div>
    );
  }

  const backHref = volumePath(trackSlug, seriesSlug, volumeSlug);

  const backToVolume = () => navigate(backHref);

  const handleDone = () => {
    const prev = getVolumeProgress(volume.id);
    const prevCount = [prev.read, prev.listen, prev.revise].filter(Boolean).length;
    completeFormat(volume.id, "revise", volume.treeType);
    const newCount = prevCount + 1;
    if (newCount === 1) setGamStage("seed");
    else if (newCount === 2) setGamStage("water");
    else if (newCount === 3) setGamStage("tree");
    else backToVolume();
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_4%)] flex flex-col text-foreground">
      <header className="shrink-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="px-4 h-14 flex items-center justify-between gap-4 max-w-[100vw]">
          <button
            type="button"
            onClick={backToVolume}
            className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-dim hover:text-foreground transition-colors"
          >
            Back
          </button>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground truncate text-center">
            {showDeckEmbedChrome ? "Deck" : "Visual"} · {volume.title}
          </span>
          <button
            type="button"
            onClick={handleDone}
            className="text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            Done
          </button>
        </div>
      </header>

      {showDeckEmbedChrome ? (
        <div className="shrink-0 flex flex-wrap items-center justify-center gap-2 px-3 py-2 border-b border-border/40 bg-background/80">
          <div className="flex rounded-md border border-border overflow-hidden font-mono text-[10px] uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setEngine("office")}
              className={`px-3 py-1.5 transition-colors ${
                engine === "office" ? "bg-primary/15 text-primary" : "text-dim hover:text-foreground"
              }`}
            >
              Office
            </button>
            <button
              type="button"
              onClick={() => setEngine("google")}
              className={`px-3 py-1.5 border-l border-border transition-colors ${
                engine === "google" ? "bg-primary/15 text-primary" : "text-dim hover:text-foreground"
              }`}
            >
              Google
            </button>
          </div>
          <a
            href={absoluteDeckUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-[10px] font-mono uppercase tracking-wider text-dim hover:text-foreground hover:border-primary/30 transition-colors"
          >
            Download
          </a>
        </div>
      ) : null}

      {useRasterInsteadOfLocalDeck ? (
        <div className="shrink-0 flex flex-wrap items-center justify-center gap-2 px-3 py-2 border-b border-border/40 bg-background/80">
          <p className="text-[10px] font-mono text-muted-foreground text-center max-w-xl leading-relaxed">
            Showing <strong className="text-foreground/90">visual</strong> preview. Inline .pptx needs a public{" "}
            <strong className="text-foreground/90">https://</strong> URL or deploy this site over HTTPS.
          </p>
          <a
            href={absoluteDeckUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-[10px] font-mono uppercase tracking-wider text-dim hover:text-foreground hover:border-primary/30 transition-colors"
          >
            Download .pptx
          </a>
        </div>
      ) : null}

      {showLocalDeckEmbedWarning ? (
        <p className="text-[10px] font-mono text-amber-500/90 text-center px-4 py-2 bg-amber-500/5 border-b border-amber-500/20 max-w-3xl mx-auto leading-relaxed">
          This deck URL is not reachable by Office/Google (localhost, <code className="text-amber-400/95">http://</code>, or
          private host). <strong>Best fix:</strong> deploy the app on <strong>HTTPS</strong> so the file is at a public{" "}
          <strong>https://…</strong> path, or set <code className="text-amber-400/95">media.deck</code> to a{" "}
          <strong>public https://</strong> link to the .pptx (CDN, blob storage, or your deployed site). Otherwise use{" "}
          <strong>Download</strong> and open locally.
        </p>
      ) : null}

      <div className="flex-1 flex flex-col min-h-0">
        {showIframe ? (
          <iframe
            key={engine}
            title="Presentation"
            src={embedSrc}
            className="flex-1 w-full min-h-[calc(100dvh-7rem)] border-0 bg-[hsl(0_0%_6%)]"
            allowFullScreen
          />
        ) : showRaster ? (
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-[hsl(0_0%_5%)]">
            <img
              src={relUrl}
              alt={volume.visualCaption || volume.title}
              className="max-w-full max-h-[calc(100dvh-5rem)] object-contain rounded-md border border-border/60 shadow-2xl"
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
            <p className="text-xs font-mono text-dim text-center max-w-md leading-relaxed">
              No deck or image is wired for this stem yet. Add a <span className="text-foreground/85">.pptx</span> (and
              optional PNG) under <span className="text-foreground/85">public/topics/{volume.contentFolder}/</span> and
              update the stem&apos;s <span className="text-foreground/85">media</span> in{" "}
              <span className="text-foreground/85">catalog.ts</span>.
            </p>
          </div>
        )}
        {isImage && volume.visualCaption ? (
          <p className="shrink-0 text-[10px] font-mono text-dim text-center px-4 py-3 border-t border-border/40">
            {volume.visualCaption}
          </p>
        ) : null}
      </div>

      <GamificationOverlay stage={gamStage} treeType={volume.treeType} onDismiss={() => setGamStage(null)} />
    </div>
  );
}
