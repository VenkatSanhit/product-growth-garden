import { useEffect, useState } from "react";

interface Leaf {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  type: "leaf" | "twig" | "petal";
  opacity: number;
}

function generateLeaves(count: number, types: Leaf["type"][] = ["leaf"]): Leaf[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 8 + Math.random() * 12,
    size: 6 + Math.random() * 10,
    rotation: Math.random() * 360,
    type: types[Math.floor(Math.random() * types.length)],
    opacity: 0.08 + Math.random() * 0.15,
  }));
}

const LeafSVG = ({ size, type }: { size: number; type: Leaf["type"] }) => {
  if (type === "twig") {
    return (
      <svg width={size} height={size * 0.4} viewBox="0 0 20 8" fill="none">
        <path
          d="M1 6C4 4 8 3 12 4C16 5 19 3 19 3"
          stroke="hsl(var(--primary) / 0.6)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M6 4L5 1.5"
          stroke="hsl(var(--primary) / 0.4)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        <path
          d="M12 4L13 1"
          stroke="hsl(var(--primary) / 0.4)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "petal") {
    return (
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 10 10" fill="none">
        <ellipse
          cx="5"
          cy="5"
          rx="3"
          ry="4.5"
          fill="hsl(var(--accent) / 0.3)"
          transform="rotate(15 5 5)"
        />
      </svg>
    );
  }

  // Default leaf
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1C4 3 2 7 3 11C4 13 6 14 8 15C10 14 12 13 13 11C14 7 12 3 8 1Z"
        fill="hsl(var(--primary) / 0.25)"
      />
      <path
        d="M8 3V13"
        stroke="hsl(var(--primary) / 0.15)"
        strokeWidth="0.4"
      />
      <path
        d="M8 6L5.5 8M8 8L10.5 10"
        stroke="hsl(var(--primary) / 0.1)"
        strokeWidth="0.3"
      />
    </svg>
  );
};

interface FallingLeavesProps {
  density?: number;
  types?: Leaf["type"][];
}

export function FallingLeaves({ density = 12, types = ["leaf"] }: FallingLeavesProps) {
  const [leaves] = useState(() => generateLeaves(density, types));

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute animate-leaf-fall"
          style={{
            left: `${leaf.x}%`,
            top: "-20px",
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            opacity: leaf.opacity,
          }}
        >
          <div
            className="animate-leaf-sway"
            style={{
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${leaf.delay * 0.5}s`,
            }}
          >
            <div
              style={{ transform: `rotate(${leaf.rotation}deg)` }}
            >
              <LeafSVG size={leaf.size} type={leaf.type} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
