import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getVolumeBySlug, volumePath } from "@/data/catalog";
import { topicMediaUrl } from "@/data/topics";
import { parseReadDocument } from "@/lib/parseReadDocument";
import { GamificationOverlay } from "@/components/GamificationOverlay";
import { useProgress } from "@/hooks/useProgress";

type GamStage = "seed" | "water" | "tree" | null;

export default function VolumeReadView() {
  const { trackSlug, seriesSlug, volumeSlug } = useParams<{
    trackSlug: string;
    seriesSlug: string;
    volumeSlug: string;
  }>();
  const navigate = useNavigate();
  const volume =
    trackSlug && seriesSlug && volumeSlug ? getVolumeBySlug(trackSlug, seriesSlug, volumeSlug) : undefined;

  const { getVolumeProgress, completeFormat } = useProgress();
  const [text, setText] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ok" | "err">("loading");
  const [gamStage, setGamStage] = useState<GamStage>(null);

  const url = volume ? topicMediaUrl(volume.contentFolder, volume.media.read) : "";

  useEffect(() => {
    if (!url) {
      setLoadState("err");
      return;
    }
    let cancelled = false;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((t) => {
        if (!cancelled) {
          setText(t);
          setLoadState("ok");
        }
      })
      .catch(() => {
        if (!cancelled) setLoadState("err");
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  const segments = useMemo(() => {
    if (!text?.trim()) return [];
    const parsed = parseReadDocument(text);
    if (parsed.length === 0) return [{ kind: "paragraph" as const, text: text.trim() }];
    return parsed;
  }, [text]);

  if (!volume || !trackSlug || !seriesSlug || !volumeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-sm text-dim">Stem not found</div>
    );
  }

  const backHref = volumePath(trackSlug, seriesSlug, volumeSlug);

  const goBackToVolume = () => navigate(backHref);

  const handleDone = () => {
    const prev = getVolumeProgress(volume.id);
    const prevCount = [prev.read, prev.listen, prev.revise].filter(Boolean).length;
    completeFormat(volume.id, "read", volume.treeType);
    const newCount = prevCount + 1;
    if (newCount === 1) setGamStage("seed");
    else if (newCount === 2) setGamStage("water");
    else if (newCount === 3) setGamStage("tree");
    else goBackToVolume();
  };

  return (
    <div className="read-matrix-page relative min-h-screen text-foreground">
      <div className="read-matrix-dots fixed inset-0 z-0 pointer-events-none" aria-hidden />
      <div className="read-matrix-scan fixed inset-0 z-0 pointer-events-none opacity-50" aria-hidden />

      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goBackToVolume}
            className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-dim hover:text-foreground transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <div className="flex items-center gap-2 min-w-0 justify-center">
            <span className="w-1 h-1 rounded-full bg-primary/90 shrink-0 shadow-[0_0_8px_hsl(var(--primary)/0.6)]" aria-hidden />
            <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-muted-foreground truncate text-center">
              Read · {volume.title}
            </span>
            <span className="w-1 h-1 rounded-full bg-primary/90 shrink-0 shadow-[0_0_8px_hsl(var(--primary)/0.6)]" aria-hidden />
          </div>
          <button
            type="button"
            onClick={handleDone}
            className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary hover:text-primary/85 transition-colors shrink-0"
          >
            Done
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-5 py-14 md:py-20 md:px-10">
        {loadState === "loading" ? (
          <p className="read-matrix-prose text-dim animate-pulse tracking-[0.3em] text-[11px] uppercase">
            ·· loading ··
          </p>
        ) : loadState === "err" || !text?.trim() ? (
          <p className="read-matrix-prose text-dim leading-relaxed">
            No read file yet for this stem. Add <span className="text-foreground/90">{volume.media.read}</span> under{" "}
            <span className="text-foreground/90">public/topics/{volume.contentFolder}/</span> in the repo.
          </p>
        ) : (
          <article className="read-matrix-article">
            {segments.map((seg, i) => {
              switch (seg.kind) {
                case "divider":
                  return (
                    <div key={i} className="read-division" aria-hidden>
                      <span className="text-[9px] font-mono text-primary/40 tracking-[0.5em]">···</span>
                    </div>
                  );
                case "section":
                  return (
                    <h2 key={i} className="read-matrix-section">
                      {seg.title}
                    </h2>
                  );
                case "heading":
                  return (
                    <h3 key={i} className="read-matrix-heading">
                      {seg.text}
                    </h3>
                  );
                case "subheading":
                  return (
                    <h4 key={i} className="read-matrix-sub">
                      {seg.text}
                    </h4>
                  );
                case "list":
                  return (
                    <ul key={i} className="read-matrix-list">
                      {seg.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );
                case "paragraph":
                  return (
                    <p key={i} className="read-matrix-para whitespace-pre-line">
                      {seg.text}
                    </p>
                  );
              }
            })}
          </article>
        )}
      </main>

      <GamificationOverlay stage={gamStage} treeType={volume.treeType} onDismiss={() => setGamStage(null)} />
    </div>
  );
}
