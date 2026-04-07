import { useNavigate } from "react-router-dom";
import type { Topic } from "@/data/topics";

interface TopicCardProps {
  topic: Topic;
  completedCount: number;
}

export function TopicCard({ topic, completedCount }: TopicCardProps) {
  const navigate = useNavigate();
  const isComplete = completedCount === 3;

  return (
    <div
      onClick={() => navigate(`/topic/${topic.id}`)}
      className="module-card surface border border-border rounded-lg p-5 cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors">
            {topic.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{topic.subtitle}</p>
        </div>
        {isComplete && (
          <span className="text-lg ml-2">🌳</span>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors ${
              i < completedCount
                ? i === 0 ? "bg-primary" : i === 1 ? "bg-accent" : "bg-emerald-500"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] text-dim font-mono uppercase tracking-wider">
          {completedCount}/3 modules
        </span>
        <span className="text-[10px] text-dim font-mono">
          {topic.treeType} tree
        </span>
      </div>
    </div>
  );
}
