import type { ReactNode } from "react";

/** Pixel silhouettes inspired by real tree forms — used across forest, cards, and overlays. */

export const PixelSeed = ({ animate }: { animate?: boolean }) => (
  <div className={`flex flex-col items-center ${animate ? "animate-seed-drop" : ""}`}>
    <div className="w-2 h-2 rounded-full bg-accent" />
    <div className="w-1 h-1 bg-accent/60 mt-px" />
  </div>
);

export const PixelSprout = ({ animate }: { animate?: boolean }) => (
  <div className={`flex flex-col items-center ${animate ? "animate-plant-grow" : ""}`}>
    <div className="flex gap-px">
      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-sm -rotate-45" />
      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm rotate-45" />
    </div>
    <div className="w-0.5 h-3 bg-emerald-700" />
    <div className="w-3 h-0.5 bg-amber-800" />
  </div>
);

export const PixelTree = ({
  type,
  animate,
  size = "sm",
}: {
  type: string;
  animate?: boolean;
  size?: "sm" | "lg";
}) => {
  const s = size === "lg";

  const treeShapes: Record<string, ReactNode> = {
    mango: (
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-8 h-3" : "w-5 h-2"} bg-emerald-600 rounded-full relative z-10`} />
        <div className={`${s ? "w-12 h-5 -mt-1.5" : "w-7 h-3 -mt-1"} bg-emerald-700 rounded-full relative z-20`}>
          <div className={`absolute ${s ? "top-0.5 left-2 w-3 h-2" : "top-0 left-1 w-2 h-1.5"} bg-emerald-600 rounded-full`} />
          <div className={`absolute ${s ? "top-1 right-1.5 w-2.5 h-2" : "top-0.5 right-1 w-1.5 h-1"} bg-green-700 rounded-full`} />
          <div className={`absolute ${s ? "-bottom-1 left-2 w-2 h-2.5" : "-bottom-0.5 left-1 w-1 h-1.5"} bg-amber-400 rounded-full`} />
          <div className={`absolute ${s ? "-bottom-1.5 right-3 w-2 h-2.5" : "-bottom-1 right-1.5 w-1 h-1.5"} bg-yellow-500 rounded-full`} />
          <div className={`absolute ${s ? "-bottom-0.5 left-5 w-1.5 h-2" : "-bottom-0.5 left-3 w-1 h-1"} bg-amber-500 rounded-full`} />
        </div>
        <div className={`${s ? "w-2 h-5" : "w-1 h-3"} bg-amber-900 rounded-sm relative`}>
          <div className={`absolute ${s ? "top-0.5 -left-1.5 w-2 h-0.5" : "top-0 -left-1 w-1.5 h-px"} bg-amber-800 rounded-full -rotate-12`} />
          <div className={`absolute ${s ? "top-1.5 -right-1 w-1.5 h-0.5" : "top-1 -right-0.5 w-1 h-px"} bg-amber-800 rounded-full rotate-12`} />
        </div>
      </div>
    ),
    neem: (
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-7 h-7" : "w-4 h-4"} bg-green-800 rounded-full relative`}>
          <div className={`absolute top-1 left-1 ${s ? "w-2 h-2" : "w-1.5 h-1.5"} bg-green-700 rounded-full`} />
        </div>
        <div className={`${s ? "w-1 h-3" : "w-0.5 h-2"} bg-amber-900`} />
      </div>
    ),
    date: (
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
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-8 h-6" : "w-5 h-3.5"} bg-pink-900/90 rounded-[40%] relative ring-1 ring-pink-400/20`}>
          <div className={`absolute top-1 left-2 ${s ? "w-2 h-2" : "w-1.5 h-1.5"} rounded-full bg-pink-300/95 shadow-[0_0_6px_rgba(251,182,200,0.5)]`} />
          <div className={`absolute top-2 right-2 ${s ? "w-1.5 h-1.5" : "w-1 h-1"} rounded-full bg-pink-200/90`} />
          <div className={`absolute bottom-2 left-3 ${s ? "w-1.5 h-1.5" : "w-1 h-1"} rounded-full bg-pink-400/80`} />
          <div className={`absolute top-3 left-4 ${s ? "w-1 h-1" : "w-0.5 h-0.5"} rounded-full bg-white/50`} />
        </div>
        <div className={`${s ? "w-1 h-3" : "w-0.5 h-2"} bg-amber-900`} />
      </div>
    ),
    oak: (
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-9 h-7" : "w-5 h-4"} bg-green-800 rounded-full relative`}>
          <div className={`absolute top-0.5 right-1 ${s ? "w-3 h-3" : "w-2 h-2"} bg-green-700 rounded-full`} />
        </div>
        <div className={`${s ? "w-2 h-3" : "w-1 h-2"} bg-amber-900 rounded-sm`} />
      </div>
    ),
    pine: (
      <div className="flex flex-col items-center">
        <div
          className={`${s ? "w-0 h-0 border-l-[14px] border-r-[14px] border-b-[20px]" : "w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px]"} border-l-transparent border-r-transparent border-b-emerald-950`}
        />
        <div
          className={`${s ? "w-0 h-0 border-l-[16px] border-r-[16px] border-b-[14px] -mt-2" : "w-0 h-0 border-l-[10px] border-r-[10px] border-b-[8px] -mt-1"} border-l-transparent border-r-transparent border-b-emerald-800`}
        />
        <div className={`${s ? "w-1.5 h-3" : "w-0.5 h-2"} bg-amber-950`} />
      </div>
    ),
    maple: (
      <div className="flex flex-col items-center">
        <div className={`${s ? "w-9 h-6" : "w-5 h-3.5"} bg-orange-700 rounded-full relative`}>
          <div className={`absolute top-0 left-1 ${s ? "w-3 h-3" : "w-2 h-2"} bg-red-700 rounded-full`} />
          <div className={`absolute bottom-0 right-1 ${s ? "w-2.5 h-2.5" : "w-1.5 h-1.5"} bg-amber-600 rounded-full`} />
        </div>
        <div className={`${s ? "w-1 h-3" : "w-0.5 h-2"} bg-amber-900`} />
      </div>
    ),
    bamboo: (
      <div className="flex flex-col items-center">
        <div className="flex gap-px items-end">
          <div className={`${s ? "w-1.5 h-8" : "w-0.5 h-5"} bg-lime-700 rounded-t-full`} />
          <div className={`${s ? "w-1.5 h-10" : "w-0.5 h-6"} bg-lime-600 rounded-t-full`} />
          <div className={`${s ? "w-1.5 h-7" : "w-0.5 h-4"} bg-lime-700 rounded-t-full`} />
        </div>
      </div>
    ),
    willow: (
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
