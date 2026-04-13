import { useState, useEffect } from "react";
import { PixelTree } from "@/components/pixelTrees";
import { formatTreeLabel } from "@/data/topics";

type Stage = "seed" | "water" | "tree" | null;

interface GamificationOverlayProps {
  stage: Stage;
  treeType: string;
  onDismiss: () => void;
}

export function GamificationOverlay({ stage, treeType, onDismiss }: GamificationOverlayProps) {
  const [step, setStep] = useState<"intro" | "action" | "done">("intro");

  useEffect(() => {
    if (stage) setStep("intro");
  }, [stage]);

  if (!stage) return null;

  const content = {
    seed: {
      title: "You earned a seed",
      action: "Continue",
      done: "Seed recorded for your forest.",
    },
    water: {
      title: "Water this stem",
      action: "Continue",
      done: "Progress saved.",
    },
    tree: {
      title: `${formatTreeLabel(treeType)} unlocked`,
      action: "Continue",
      done: "Added to your forest.",
    },
  };

  const c = content[stage];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="surface border border-border rounded-xl p-8 max-w-xs text-center">
        <div className="mb-4 min-h-[4rem] flex items-center justify-center">
          {stage === "tree" ? (
            <PixelTree type={treeType} size="lg" animate />
          ) : (
            <div className="w-16 h-16 rounded-lg border-2 border-dashed border-primary/35 flex items-center justify-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-dim">
                {stage === "seed" ? "Seed" : "Water"}
              </span>
            </div>
          )}
        </div>
        <h3 className="font-mono text-foreground text-sm font-bold mb-2">{c.title}</h3>

        {step === "intro" && (
          <button
            onClick={() => setStep("action")}
            className="mt-4 text-xs font-mono text-primary hover:text-primary/80 transition-colors"
          >
            {c.action} →
          </button>
        )}

        {step === "action" && (
          <button
            onClick={() => setStep("done")}
            className="mt-4 px-4 py-2 rounded-md border border-primary/40 text-xs font-mono uppercase tracking-wider text-foreground hover:bg-primary/10 transition-colors"
          >
            Tap to confirm
          </button>
        )}

        {step === "done" && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-3">{c.done}</p>
            <button
              onClick={onDismiss}
              className="text-xs font-mono text-dim hover:text-foreground transition-colors"
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
