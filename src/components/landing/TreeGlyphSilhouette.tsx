import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { TREE_MASK_IMAGES } from "@/components/landing/treeMasks";

const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*[]{}()/<>+=_^~ÖÄÉ§·…░▒▓│";

const COLS = 26;
const ROWS = 32;

function randomGrid(): string[] {
  const out: string[] = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    out.push(CHARSET[Math.floor(Math.random() * CHARSET.length)]!);
  }
  return out;
}

type Props = {
  variant: number;
  /** Section has scrolled into view — start reveal + glyph churn */
  active: boolean;
};

export function TreeGlyphSilhouette({ variant, active }: Props) {
  const mask = TREE_MASK_IMAGES[variant % TREE_MASK_IMAGES.length]!;
  const [grid, setGrid] = useState(() => randomGrid());

  const tick = useCallback(() => {
    setGrid(randomGrid());
  }, []);

  useEffect(() => {
    if (!active) return;
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = window.setInterval(tick, 88);
    return () => window.clearInterval(id);
  }, [active, tick]);

  return (
    <div
      className="tree-glyph-silhouette"
      style={
        {
          WebkitMaskImage: mask,
          maskImage: mask,
        } as CSSProperties
      }
    >
      <div
        className="tree-glyph-silhouette__grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((ch, i) => (
          <span key={i} className="tree-glyph-silhouette__cell">
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}
