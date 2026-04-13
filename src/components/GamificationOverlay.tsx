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
      emoji: "🌰",
      title: "You earned a seed!",
      action: "Tap to plant it",
      done: "Seed planted! 🌱",
    },
    water: {
      emoji: "💧",
      title: "Time to water!",
      action: "Tap to pour water",
      done: "Your sprout is growing! 🌿",
    },
    tree: {
      emoji: "🌳",
      title: `${formatTreeLabel(treeType)} — revealed!`,
      action: "Tap to add to your forest",
      done: "Added to your forest 🎉",
    },
  };

  const c = content[stage];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="surface border border-border rounded-xl p-8 max-w-xs text-center">
        <div className="text-5xl mb-4">
          {stage === "tree" ? <PixelTree type={treeType} size="lg" animate /> : c.emoji}
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
            className="mt-4 w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto hover:border-primary/60 transition-colors active:scale-95"
          >
            <span className="text-2xl">{stage === "seed" ? "🌱" : stage === "water" ? "🚿" : "✨"}</span>
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
