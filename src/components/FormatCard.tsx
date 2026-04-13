import { useState } from "react";
import { BookOpen, Headphones, ImageIcon, Check } from "lucide-react";
import type { TopicFormat } from "@/data/topics";

const formatIcons: Record<string, React.ReactNode> = {
  read: <BookOpen className="w-4 h-4" />,
  listen: <Headphones className="w-4 h-4" />,
  revise: <ImageIcon className="w-4 h-4" />,
};

const formatColors: Record<string, string> = {
  read: "border-primary/20 hover:border-primary/40",
  listen: "border-accent/20 hover:border-accent/40",
  revise: "border-emerald-500/20 hover:border-emerald-500/40",
};

const formatAccent: Record<string, string> = {
  read: "text-primary",
  listen: "text-accent",
  revise: "text-emerald-500",
};

interface FormatCardProps {
  format: TopicFormat;
  completed: boolean;
  expanded: boolean;
  onComplete: () => void;
  onToggleOpen: () => void;
  /** Shown below the header row when `expanded` (e.g. audio player). */
  expandedSlot?: React.ReactNode;
  /** Always visible under description (e.g. deck thumbnail). */
  secondarySlot?: React.ReactNode;
  /** If set, clicking the card calls this instead of toggling expand (e.g. open read / deck route). */
  onActivate?: () => void;
  /** Right-side hint; default "Open content" / "Hide". */
  actionHint?: string;
}

export function FormatCard({
  format,
  completed,
  expanded,
  onComplete,
  onToggleOpen,
  expandedSlot,
  secondarySlot,
  onActivate,
  actionHint,
}: FormatCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCardClick = () => {
    if (onActivate) onActivate();
    else onToggleOpen();
  };

  const hint =
    actionHint ??
    (expandedSlot && expanded ? "Hide" : expandedSlot ? "Expand" : expanded ? "Hide" : "Open");

  return (
    <div
      className={`content-card surface border ${formatColors[format.type]} rounded-lg p-5 cursor-pointer relative overflow-hidden ${
        expanded && !onActivate ? "ring-1 ring-primary/30" : ""
      }`}
      onClick={handleCardClick}
    >
      {completed && (
        <div className="absolute top-3 right-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check className="w-3 h-3 text-emerald-500" />
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${formatAccent[format.type]}`}>{formatIcons[format.type]}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-sm font-bold text-foreground tracking-tight">{format.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{format.description}</p>
          {secondarySlot ? <div className="mt-3 pointer-events-none">{secondarySlot}</div> : null}
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] text-dim font-mono uppercase tracking-widest">{format.duration}</span>
            <span className="text-[10px] font-mono text-primary/80 tracking-wide">
              {onActivate ? actionHint ?? "Open →" : hint}
            </span>
          </div>
          {!completed && (
            <div className="mt-3 flex justify-end" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => {
                  if (showConfirm) {
                    onComplete();
                    setShowConfirm(false);
                  } else {
                    setShowConfirm(true);
                  }
                }}
                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded ${
                  showConfirm ? "bg-primary/20 text-primary" : "text-dim hover:text-muted-foreground"
                } transition-colors`}
              >
                {showConfirm ? "Confirm done?" : "Mark done"}
              </button>
            </div>
          )}
        </div>
      </div>

      {expanded && expandedSlot ? (
        <div className="mt-4 pt-4 border-t border-border/80" onClick={(e) => e.stopPropagation()}>
          {expandedSlot}
        </div>
      ) : null}
    </div>
  );
}
