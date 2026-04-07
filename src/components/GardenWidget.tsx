import { useState } from "react";
import type { GardenTree, TopicProgress } from "@/hooks/useProgress";

// Pixel art representations as simple CSS pixel grids
const PixelSeed = ({ animate }: { animate?: boolean }) => (
  <div className={`flex flex-col items-center ${animate ? "animate-seed-drop" : ""}`}>
    <div className="w-2 h-2 rounded-full bg-accent" />
    <div className="w-1 h-1 bg-accent/60 mt-px" />
  </div>
);

const PixelSprout = ({ animate }: { animate?: boolean }) => (
  <div className={`flex flex-col items-center ${animate ? "animate-plant-grow" : ""}`}>
    <div className="flex gap-px">
      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-sm -rotate-45" />
      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm rotate-45" />
    </div>
    <div className="w-0.5 h-3 bg-emerald-700" />
    <div className="w-3 h-0.5 bg-amber-800" />
  </div>
);

const PixelTree = ({ type, animate }: { type: string; animate?: boolean }) => {
  const colors: Record<string, { canopy: string; fruit: string }> = {
    mango: { canopy: "bg-emerald-700", fruit: "bg-amber-400" },
    neem: { canopy: "bg-green-800", fruit: "bg-green-400" },
    date: { canopy: "bg-emerald-600", fruit: "bg-amber-700" },
    banyan: { canopy: "bg-green-900", fruit: "bg-green-300" },
    cherry: { canopy: "bg-pink-900", fruit: "bg-pink-400" },
    oak: { canopy: "bg-green-800", fruit: "bg-amber-600" },
    pine: { canopy: "bg-emerald-900", fruit: "bg-emerald-400" },
    maple: { canopy: "bg-red-900", fruit: "bg-orange-500" },
    bamboo: { canopy: "bg-lime-700", fruit: "bg-lime-400" },
    willow: { canopy: "bg-teal-800", fruit: "bg-teal-400" },
  };
  const c = colors[type] || colors.mango;

  return (
    <div className={`flex flex-col items-center pixel-art ${animate ? "animate-plant-grow" : ""}`}>
      {/* Canopy */}
      <div className="relative">
        <div className={`w-5 h-3 ${c.canopy} rounded-full`} />
        <div className={`absolute top-0.5 left-0.5 w-1 h-1 ${c.fruit} rounded-full`} />
        <div className={`absolute top-1 right-1 w-1 h-1 ${c.fruit} rounded-full`} />
      </div>
      {/* Trunk */}
      <div className="w-0.5 h-2.5 bg-amber-900" />
      {/* Ground */}
      <div className="w-4 h-0.5 bg-amber-800/50 rounded-full" />
    </div>
  );
};

const WaterDrop = () => (
  <div className="animate-water-pour">
    <div className="w-1.5 h-2 bg-blue-400/80 rounded-b-full" />
  </div>
);

interface GardenWidgetProps {
  garden: GardenTree[];
  currentTopicProgress?: TopicProgress;
  currentTopicId?: string;
  currentTreeType?: string;
  onModuleAction?: (module: "read" | "listen" | "revise") => void;
}

export function GardenWidget({
  garden,
  currentTopicProgress,
  currentTopicId,
  currentTreeType = "mango",
}: GardenWidgetProps) {
  const [expanded, setExpanded] = useState(false);

  const completedCount = currentTopicProgress
    ? [currentTopicProgress.read, currentTopicProgress.listen, currentTopicProgress.revise].filter(Boolean).length
    : 0;

  const isFullyComplete = completedCount === 3;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Expanded garden view */}
      {expanded && (
        <div className="mb-2 p-3 surface border border-border rounded-lg w-48 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground">YOUR GROVE</span>
            <span className="text-xs text-dim">{garden.length} trees</span>
          </div>
          <div className="grid grid-cols-4 gap-2 min-h-[40px]">
            {garden.map((tree) => (
              <div key={tree.topicId} className="flex flex-col items-center">
                <PixelTree type={tree.treeType} />
              </div>
            ))}
            {garden.length === 0 && (
              <div className="col-span-4 text-center text-xs text-dim py-2">
                Complete topics to grow trees
              </div>
            )}
          </div>
        </div>
      )}

      {/* Widget button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="relative w-16 h-16 surface border border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-primary/30 transition-colors group"
      >
        {/* Current progress visualization */}
        {currentTopicId ? (
          <div className="flex flex-col items-center">
            {completedCount === 0 && (
              <div className="text-lg">🌱</div>
            )}
            {completedCount === 1 && <PixelSeed animate />}
            {completedCount === 2 && <PixelSprout animate />}
            {isFullyComplete && <PixelTree type={currentTreeType} animate />}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-lg">🌳</span>
            <span className="text-[8px] text-dim font-mono">{garden.length}</span>
          </div>
        )}

        {/* Progress dots */}
        {currentTopicId && (
          <div className="flex gap-0.5">
            <div className={`w-1 h-1 rounded-full ${currentTopicProgress?.read ? "bg-primary" : "bg-border"}`} />
            <div className={`w-1 h-1 rounded-full ${currentTopicProgress?.listen ? "bg-accent" : "bg-border"}`} />
            <div className={`w-1 h-1 rounded-full ${currentTopicProgress?.revise ? "bg-emerald-500" : "bg-border"}`} />
          </div>
        )}
      </button>
    </div>
  );
}
