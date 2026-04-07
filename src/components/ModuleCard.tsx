import { useState } from "react";
import { BookOpen, Headphones, Map, Check } from "lucide-react";
import type { TopicModule } from "@/data/topics";

const moduleIcons: Record<string, React.ReactNode> = {
  read: <BookOpen className="w-4 h-4" />,
  listen: <Headphones className="w-4 h-4" />,
  revise: <Map className="w-4 h-4" />,
};

const moduleColors: Record<string, string> = {
  read: "border-primary/20 hover:border-primary/40",
  listen: "border-accent/20 hover:border-accent/40",
  revise: "border-emerald-500/20 hover:border-emerald-500/40",
};

const moduleAccent: Record<string, string> = {
  read: "text-primary",
  listen: "text-accent",
  revise: "text-emerald-500",
};

interface ModuleCardProps {
  module: TopicModule;
  completed: boolean;
  onComplete: () => void;
  onOpen: () => void;
}

export function ModuleCard({ module, completed, onComplete, onOpen }: ModuleCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className={`module-card surface border ${moduleColors[module.type]} rounded-lg p-5 cursor-pointer relative overflow-hidden`}
      onClick={onOpen}
    >
      {/* Completed overlay */}
      {completed && (
        <div className="absolute top-3 right-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check className="w-3 h-3 text-emerald-500" />
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${moduleAccent[module.type]}`}>
          {moduleIcons[module.type]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-sm font-bold text-foreground">{module.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{module.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] text-dim font-mono uppercase tracking-wider">{module.duration}</span>
            {!completed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (showConfirm) {
                    onComplete();
                    setShowConfirm(false);
                  } else {
                    setShowConfirm(true);
                  }
                }}
                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded ${
                  showConfirm
                    ? "bg-primary/20 text-primary"
                    : "text-dim hover:text-muted-foreground"
                } transition-colors`}
              >
                {showConfirm ? "Confirm done?" : "Mark done"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
