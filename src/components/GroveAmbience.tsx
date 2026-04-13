import { cn } from "@/lib/utils";

type GroveAmbienceVariant = "trunk" | "branch" | "stem";

interface GroveAmbienceProps {
  variant: GroveAmbienceVariant;
  className?: string;
}

function BranchSvg({ variant }: { variant: GroveAmbienceVariant }) {
  const bark = "hsl(25 34% 26% / 0.5)";
  const barkDark = "hsl(23 42% 16% / 0.58)";
  const outline = "hsl(22 28% 10% / 0.62)";
  const lichen = "hsl(38 20% 48% / 0.2)";

  // Hand-drawn-ish branch strokes; tuned per page depth.
  const d =
    variant === "trunk"
      ? "M-40,220 C140,80 270,130 420,60 C520,12 610,20 760,90"
      : variant === "branch"
        ? "M-40,140 C120,70 220,80 330,30 C420,-10 510,10 640,80 C720,120 820,110 940,50"
        : "M-40,210 C120,150 230,165 340,115 C430,75 520,90 640,150 C730,205 860,220 980,170";

  const sub =
    variant === "trunk"
      ? [
          "M180,110 C210,90 250,86 280,62",
          "M360,84 C410,75 440,62 470,34",
          "M540,56 C575,70 600,84 640,110",
        ]
      : variant === "branch"
        ? [
            "M140,78 C170,60 200,56 220,40",
            "M420,62 C450,58 470,48 495,30",
            "M700,98 C730,94 760,82 790,60",
          ]
        : [
            "M150,178 C180,165 205,164 230,148",
            "M470,138 C510,138 540,132 568,112",
            "M760,190 C800,186 830,172 860,150",
          ];

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 900 260"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="grove-bark-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={barkDark} />
          <stop offset="0.35" stopColor={bark} />
          <stop offset="0.7" stopColor={barkDark} />
          <stop offset="1" stopColor={bark} />
        </linearGradient>
        <pattern id="grove-bark-scale" width="16" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 9 C4 2, 12 2, 16 9" stroke={lichen} strokeWidth="0.8" fill="none" />
        </pattern>
      </defs>
      <path d={d} stroke="url(#grove-bark-grad)" strokeWidth="18" strokeLinecap="round" fill="none" />
      <path d={d} stroke="url(#grove-bark-scale)" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d={d} stroke={outline} strokeWidth="1.9" strokeLinecap="round" fill="none" />
      {sub.map((sd, i) => (
        <g key={i}>
          <path d={sd} stroke={bark} strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d={sd} stroke="url(#grove-bark-scale)" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.75" />
          <path d={sd} stroke={outline} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </g>
      ))}
    </svg>
  );
}

export function GroveAmbience({ variant, className }: GroveAmbienceProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        // keeps it subtle and behind everything
        "opacity-[0.9]",
        className,
      )}
      aria-hidden
    >
      {/* Large branch silhouette (page-depth dependent) */}
      <div
        className={cn(
          "absolute inset-x-0 -top-8 h-64",
          variant === "trunk" && "grove-branch-float",
          variant === "branch" && "grove-branch-float grove-branch-float--slow",
          variant === "stem" && "grove-branch-float grove-branch-float--slower",
        )}
      >
        <BranchSvg variant={variant} />
      </div>

      {/* drifting leaves / twigs (stem gets more motion; trunk is sparse) */}
      <span className={cn("grove-leaf", variant === "stem" ? "grove-leaf--twig" : "grove-leaf--leaf", "l1")} />
      <span className={cn("grove-leaf", "grove-leaf--leaf", "l2", variant === "trunk" && "hidden")} />
      <span className={cn("grove-leaf", "grove-leaf--leaf", "l3")} />
      <span className={cn("grove-leaf", variant === "stem" ? "grove-leaf--twig" : "grove-leaf--leaf", "l4")} />
      <span className={cn("grove-leaf", "grove-leaf--leaf", "l5", variant !== "branch" && "hidden")} />
      <span className={cn("grove-leaf", "grove-leaf--twig", "l6", variant === "trunk" && "hidden")} />
      <span className={cn("grove-leaf", "grove-leaf--leaf", "l7", variant === "trunk" && "hidden")} />
      <span className={cn("grove-leaf", "grove-leaf--twig", "l8")} />
      <span className={cn("grove-leaf", "grove-leaf--leaf", "l9", variant === "trunk" && "hidden")} />
      <span className={cn("grove-leaf", "grove-leaf--twig", "l10", variant !== "stem" && "hidden")} />

      {/* low grass silhouette at page bottom */}
      <div className="grove-grass-band" />

      {/* vignette to ensure text contrast stays premium */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/25 via-transparent to-background/25" />
    </div>
  );
}

