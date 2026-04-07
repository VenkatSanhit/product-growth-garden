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

export const PixelTree = ({ type, animate, size = "sm" }: { type: string; animate?: boolean; size?: "sm" | "lg" }) => {
  const s = size === "lg";

  const treeShapes: Record<string, React.ReactNode> = {
    mango: (
      // Lush mango tree with wide layered canopy and hanging fruits
      <div className="flex flex-col items-center">
        {/* Top canopy layer */}
        <div className={`${s ? "w-8 h-3" : "w-5 h-2"} bg-emerald-600 rounded-full relative z-10`} />
        {/* Middle canopy — widest */}
        <div className={`${s ? "w-12 h-5 -mt-1.5" : "w-7 h-3 -mt-1"} bg-emerald-700 rounded-full relative z-20`}>
          {/* Inner leaf texture */}
          <div className={`absolute ${s ? "top-0.5 left-2 w-3 h-2" : "top-0 left-1 w-2 h-1.5"} bg-emerald-600 rounded-full`} />
          <div className={`absolute ${s ? "top-1 right-1.5 w-2.5 h-2" : "top-0.5 right-1 w-1.5 h-1"} bg-green-700 rounded-full`} />
          {/* Hanging mangoes */}
          <div className={`absolute ${s ? "-bottom-1 left-2 w-2 h-2.5" : "-bottom-0.5 left-1 w-1 h-1.5"} bg-amber-400 rounded-full`} />
          <div className={`absolute ${s ? "-bottom-1.5 right-3 w-2 h-2.5" : "-bottom-1 right-1.5 w-1 h-1.5"} bg-yellow-500 rounded-full`} />
          <div className={`absolute ${s ? "-bottom-0.5 left-5 w-1.5 h-2" : "-bottom-0.5 left-3 w-1 h-1"} bg-amber-500 rounded-full`} />
        </div>
        {/* Trunk — thick and sturdy */}
        <div className={`${s ? "w-2 h-5" : "w-1 h-3"} bg-amber-900 rounded-sm relative`}>
          {/* Small branch stubs */}
          <div className={`absolute ${s ? "top-0.5 -left-1.5 w-2 h-0.5" : "top-0 -left-1 w-1.5 h-px"} bg-amber-800 rounded-full -rotate-12`} />
          <div className={`absolute ${s ? "top-1.5 -right-1 w-1.5 h-0.5" : "top-1 -right-0.5 w-1 h-px"} bg-amber-800 rounded-full rotate-12`} />
        </div>
      </div>
    ),
    neem: (
      // Tall oval canopy, dense leaves
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-7 h-7" : "w-4 h-4"} bg-green-800 rounded-full relative`}>
          <div className={`absolute top-1 left-1 ${s ? "w-2 h-2" : "w-1.5 h-1.5"} bg-green-700 rounded-full`} />
        </div>
        <div className={`${s ? "w-1 h-3" : "w-0.5 h-2"} bg-amber-900`} />
      </div>
    ),
    date: (
      // Palm-style: tall trunk, fan leaves on top
      <div className="flex flex-col items-center">
        <div className="flex gap-px items-end">
          <div className={`${s ? "w-2 h-5" : "w-1 h-3"} bg-emerald-600 rounded-t-full -rotate-[30deg] origin-bottom`} />
          <div className={`${s ? "w-2 h-6" : "w-1 h-3.5"} bg-emerald-500 rounded-t-full`} />
          <div className={`${s ? "w-2 h-5" : "w-1 h-3"} bg-emerald-600 rounded-t-full rotate-[30deg] origin-bottom`} />
        </div>
        <div className={`${s ? "w-1.5 h-5" : "w-0.5 h-3"} bg-amber-800`} />
      </div>
    ),
    banyan: (
      // Wide canopy with aerial roots
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-12 h-5" : "w-7 h-3"} bg-green-900 rounded-full`} />
        <div className="flex gap-px">
          <div className={`${s ? "w-0.5 h-3" : "w-px h-2"} bg-amber-800`} />
          <div className={`${s ? "w-1.5 h-4" : "w-0.5 h-2.5"} bg-amber-900`} />
          <div className={`${s ? "w-0.5 h-3" : "w-px h-2"} bg-amber-800`} />
        </div>
      </div>
    ),
    cherry: (
      // Rounded pink canopy with blossoms
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-8 h-6" : "w-5 h-3.5"} bg-pink-800 rounded-full relative`}>
          <div className={`absolute top-0.5 left-1 ${s ? "w-1.5 h-1.5" : "w-1 h-1"} bg-pink-400 rounded-full`} />
          <div className={`absolute top-1 right-1.5 ${s ? "w-1.5 h-1.5" : "w-1 h-1"} bg-pink-300 rounded-full`} />
          <div className={`absolute bottom-0.5 left-2 ${s ? "w-1 h-1" : "w-0.5 h-0.5"} bg-pink-400 rounded-full`} />
        </div>
        <div className={`${s ? "w-1 h-3" : "w-0.5 h-2"} bg-amber-900`} />
      </div>
    ),
    oak: (
      // Thick round dense canopy
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-9 h-7" : "w-5 h-4"} bg-green-800 rounded-full relative`}>
          <div className={`absolute top-0.5 right-1 ${s ? "w-3 h-3" : "w-2 h-2"} bg-green-700 rounded-full`} />
        </div>
        <div className={`${s ? "w-2 h-3" : "w-1 h-2"} bg-amber-900 rounded-sm`} />
      </div>
    ),
    pine: (
      // Triangle/conical shape
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-0 h-0 border-l-[14px] border-r-[14px] border-b-[20px]" : "w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px]"} border-l-transparent border-r-transparent border-b-emerald-900`} />
        <div className={`${s ? "w-0 h-0 border-l-[16px] border-r-[16px] border-b-[14px] -mt-2" : "w-0 h-0 border-l-[10px] border-r-[10px] border-b-[8px] -mt-1"} border-l-transparent border-r-transparent border-b-emerald-800`} />
        <div className={`${s ? "w-1.5 h-3" : "w-0.5 h-2"} bg-amber-900`} />
      </div>
    ),
    maple: (
      // Rounded with autumn colors
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-9 h-6" : "w-5 h-3.5"} bg-orange-700 rounded-full relative`}>
          <div className={`absolute top-0 left-1 ${s ? "w-3 h-3" : "w-2 h-2"} bg-red-700 rounded-full`} />
          <div className={`absolute bottom-0 right-1 ${s ? "w-2.5 h-2.5" : "w-1.5 h-1.5"} bg-amber-600 rounded-full`} />
        </div>
        <div className={`${s ? "w-1 h-3" : "w-0.5 h-2"} bg-amber-900`} />
      </div>
    ),
    bamboo: (
      // Tall thin stalks with small leaves
      <div className="flex flex-col items-center">
        <div className="flex gap-px items-end">
          <div className={`${s ? "w-1.5 h-8" : "w-0.5 h-5"} bg-lime-700 rounded-t-full`} />
          <div className={`${s ? "w-1.5 h-10" : "w-0.5 h-6"} bg-lime-600 rounded-t-full`} />
          <div className={`${s ? "w-1.5 h-7" : "w-0.5 h-4"} bg-lime-700 rounded-t-full`} />
        </div>
      </div>
    ),
    willow: (
      // Drooping canopy
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-8 h-4" : "w-5 h-2.5"} bg-teal-800 rounded-t-full relative`}>
          <div className={`absolute -bottom-2 left-0 ${s ? "w-1 h-3" : "w-0.5 h-2"} bg-teal-700 rounded-b-full`} />
          <div className={`absolute -bottom-2.5 left-2 ${s ? "w-1 h-4" : "w-0.5 h-2.5"} bg-teal-600 rounded-b-full`} />
          <div className={`absolute -bottom-2 right-1 ${s ? "w-1 h-3" : "w-0.5 h-2"} bg-teal-700 rounded-b-full`} />
        </div>
        <div className={`${s ? "w-1 h-3 mt-2" : "w-0.5 h-2 mt-1.5"} bg-amber-900`} />
      </div>
    ),
  };

  return (
    <div className={`flex flex-col items-center pixel-art ${animate ? "animate-plant-grow" : ""}`}>
      {treeShapes[type] || treeShapes.mango}
      <div className={`${s ? "w-5 h-0.5" : "w-3 h-px"} bg-amber-800/40 rounded-full mt-px`} />
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
