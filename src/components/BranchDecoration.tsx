/**
 * Decorative SVG branch/trunk elements for section backgrounds.
 * Uses semantic tokens for color consistency.
 */

interface BranchProps {
  className?: string;
}

/** A large trunk silhouette — use behind the header / main section */
export function TrunkSilhouette({ className = "" }: BranchProps) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      width="280"
      height="600"
      viewBox="0 0 280 600"
      fill="none"
      preserveAspectRatio="none"
    >
      {/* Main trunk */}
      <path
        d="M140 600C140 600 135 450 138 350C141 250 130 180 125 120C120 60 128 0 128 0
           L152 0C152 0 160 60 155 120C150 180 139 250 142 350C145 450 140 600 140 600Z"
        fill="hsl(var(--border) / 0.3)"
      />
      {/* Bark texture lines */}
      <path
        d="M136 500C137 420 134 340 136 260C138 180 133 100 135 30"
        stroke="hsl(var(--border) / 0.15)"
        strokeWidth="1"
      />
      <path
        d="M144 500C143 420 146 340 144 260C142 180 147 100 145 30"
        stroke="hsl(var(--border) / 0.15)"
        strokeWidth="1"
      />
      {/* Small branch stubs */}
      <path
        d="M125 120C110 100 85 85 60 80"
        stroke="hsl(var(--border) / 0.25)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M155 160C170 140 200 130 230 135"
        stroke="hsl(var(--border) / 0.25)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M130 250C115 235 90 230 65 238"
        stroke="hsl(var(--border) / 0.2)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M150 320C168 308 195 305 220 312"
        stroke="hsl(var(--border) / 0.2)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M124 205C104 188 78 178 48 182"
        stroke="hsl(var(--border) / 0.16)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M156 228C176 213 202 206 234 210"
        stroke="hsl(var(--border) / 0.16)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M128 390C112 374 90 366 66 371"
        stroke="hsl(var(--border) / 0.14)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M152 430C171 418 196 413 222 420"
        stroke="hsl(var(--border) / 0.14)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Spreading branches — use behind category/topic grid areas */
export function BranchNetwork({ className = "" }: BranchProps) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      width="100%"
      height="300"
      viewBox="0 0 800 300"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Central branch going left */}
      <path
        d="M400 280C380 240 340 200 280 180C220 160 160 170 100 150C60 136 30 110 10 90"
        stroke="hsl(var(--border) / 0.2)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Central branch going right */}
      <path
        d="M400 280C420 240 460 200 520 180C580 160 640 170 700 150C740 136 770 110 790 90"
        stroke="hsl(var(--border) / 0.2)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Sub-branches left */}
      <path
        d="M280 180C270 160 250 130 220 110"
        stroke="hsl(var(--border) / 0.15)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M180 165C170 140 145 120 110 105"
        stroke="hsl(var(--border) / 0.12)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M340 195C330 170 310 155 285 140"
        stroke="hsl(var(--border) / 0.12)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Sub-branches right */}
      <path
        d="M520 180C530 160 550 130 580 110"
        stroke="hsl(var(--border) / 0.15)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M620 165C630 140 655 120 690 105"
        stroke="hsl(var(--border) / 0.12)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M460 195C470 170 490 155 515 140"
        stroke="hsl(var(--border) / 0.12)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Extra canopy branches */}
      <path
        d="M235 155C220 134 196 120 166 112"
        stroke="hsl(var(--border) / 0.1)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M565 155C580 134 604 120 634 112"
        stroke="hsl(var(--border) / 0.1)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M320 170C308 150 286 134 258 126"
        stroke="hsl(var(--border) / 0.09)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M480 170C492 150 514 134 542 126"
        stroke="hsl(var(--border) / 0.09)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Tiny leaf clusters at branch tips */}
      <circle cx="220" cy="108" r="3" fill="hsl(var(--primary) / 0.08)" />
      <circle cx="110" cy="103" r="4" fill="hsl(var(--primary) / 0.06)" />
      <circle cx="285" cy="138" r="2.5" fill="hsl(var(--primary) / 0.07)" />
      <circle cx="580" cy="108" r="3" fill="hsl(var(--primary) / 0.08)" />
      <circle cx="690" cy="103" r="4" fill="hsl(var(--primary) / 0.06)" />
      <circle cx="515" cy="138" r="2.5" fill="hsl(var(--primary) / 0.07)" />
      <circle cx="10" cy="88" r="3" fill="hsl(var(--accent) / 0.06)" />
      <circle cx="790" cy="88" r="3" fill="hsl(var(--accent) / 0.06)" />
      <circle cx="166" cy="110" r="2.4" fill="hsl(var(--primary) / 0.07)" />
      <circle cx="258" cy="124" r="2.2" fill="hsl(var(--accent) / 0.06)" />
      <circle cx="634" cy="110" r="2.4" fill="hsl(var(--primary) / 0.07)" />
      <circle cx="542" cy="124" r="2.2" fill="hsl(var(--accent) / 0.06)" />
    </svg>
  );
}

/** Small twig with a leaf — use as scattered decorations */
export function SmallTwig({ className = "" }: BranchProps) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      width="40"
      height="30"
      viewBox="0 0 40 30"
      fill="none"
    >
      <path
        d="M5 25C10 20 18 15 30 10C34 8 38 5 38 5"
        stroke="hsl(var(--border) / 0.3)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18 15C16 10 18 6 22 5C20 8 20 12 18 15Z"
        fill="hsl(var(--primary) / 0.1)"
      />
      <path
        d="M30 10C32 6 36 4 38 5C35 6 32 8 30 10Z"
        fill="hsl(var(--primary) / 0.08)"
      />
    </svg>
  );
}
