import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { topics } from "@/data/topics";
import { ModuleCard } from "@/components/ModuleCard";
import { GardenWidget } from "@/components/GardenWidget";
import { GamificationOverlay } from "@/components/GamificationOverlay";
import { useProgress } from "@/hooks/useProgress";

type GamStage = "seed" | "water" | "tree" | null;

export default function TopicDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const topic = topics.find((t) => t.id === id);
  const { getTopicProgress, completeModule, garden } = useProgress();
  const [gamStage, setGamStage] = useState<GamStage>(null);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-dim font-mono">Topic not found</p>
      </div>
    );
  }

  const progress = getTopicProgress(topic.id);

  const handleComplete = (moduleType: "read" | "listen" | "revise") => {
    const prev = getTopicProgress(topic.id);
    const prevCount = [prev.read, prev.listen, prev.revise].filter(Boolean).length;
    completeModule(topic.id, moduleType, topic.treeType);

    const newCount = prevCount + 1;
    if (newCount === 1) setGamStage("seed");
    else if (newCount === 2) setGamStage("water");
    else if (newCount === 3) setGamStage("tree");
  };

  const moduleTypeMap: ("read" | "listen" | "revise")[] = ["read", "listen", "revise"];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-xs text-dim hover:text-foreground transition-colors mb-4 font-mono"
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
              {topic.category}
            </span>
          </div>
          <h1 className="font-mono text-xl font-bold text-foreground mt-2">{topic.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{topic.subtitle}</p>
        </div>
      </header>

      {/* Modules */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="grid gap-3">
          {topic.modules.map((mod, i) => (
            <ModuleCard
              key={mod.type}
              module={mod}
              completed={progress[moduleTypeMap[i]]}
              onComplete={() => handleComplete(moduleTypeMap[i])}
              onOpen={() => {
                // Future: navigate to module content
              }}
            />
          ))}
        </div>

        {/* Progress summary */}
        <div className="mt-8 text-center">
          <div className="flex gap-1 justify-center mb-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-8 h-1 rounded-full ${
                  [progress.read, progress.listen, progress.revise][i]
                    ? i === 0 ? "bg-primary" : i === 1 ? "bg-accent" : "bg-emerald-500"
                    : "bg-border"
                }`}
              />
            ))}
          </div>
          <p className="text-[10px] text-dim font-mono uppercase tracking-wider">
            {[progress.read, progress.listen, progress.revise].filter(Boolean).length}/3 · {topic.treeType} tree
          </p>
        </div>
      </div>

      <GardenWidget
        garden={garden}
        currentTopicProgress={progress}
        currentTopicId={topic.id}
        currentTreeType={topic.treeType}
      />

      <GamificationOverlay
        stage={gamStage}
        treeType={topic.treeType}
        onDismiss={() => setGamStage(null)}
      />
    </div>
  );
}
