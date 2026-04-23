import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PixelTree } from "@/components/pixelTrees";
import { treeTypes } from "@/data/topics";

type Slot = { id: number; type: string } | null;

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function shuffleIndices(len: number): number[] {
  const a = Array.from({ length: len }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function ForestRandomPixelTrees() {
  const [slots, setSlots] = useState<Slot[]>(() => Array.from({ length: 8 }, () => null));
  const [reduced, setReduced] = useState(false);
  const idRef = useRef(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const tick = useCallback(() => {
    setSlots((prev) => {
      const next: Slot[] = [...prev];
      for (let i = 0; i < 8; i++) {
        if (next[i] && Math.random() < 0.45) next[i] = null;
      }
      const empty = next.map((s, i) => (s === null ? i : -1)).filter((i) => i >= 0);
      if (empty.length === 0) return next;
      let spawnCount = Math.min(empty.length, 1 + Math.floor(Math.random() * 4));
      if (spawnCount < 1) spawnCount = 1;
      const picks = shuffleIndices(empty.length).slice(0, spawnCount);
      for (const p of picks) {
        const idx = empty[p]!;
        next[idx] = { id: ++idRef.current, type: pickRandom(treeTypes) };
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (reduced) {
      setSlots(
        Array.from({ length: 8 }, (_, i) =>
          i % 2 === 0 ? { id: i + 1, type: pickRandom(treeTypes) } : null,
        ),
      );
      return;
    }
    const t0 = window.setTimeout(() => tick(), 600);
    const intervalId = window.setInterval(() => tick(), 2400);
    return () => {
      window.clearTimeout(t0);
      window.clearInterval(intervalId);
    };
  }, [reduced, tick]);

  return (
    <div className="forest-grid">
      {slots.map((slot, i) => (
        <div key={i} className="forest-tree forest-tree-pixel-slot" aria-hidden>
          <AnimatePresence mode="wait">
            {slot ? (
              <motion.div
                key={slot.id}
                className="forest-tree-pixel-slot__inner"
                initial={{ opacity: 0, scale: 0.45, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <PixelTree type={slot.type} size="sm" animate />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
