import { useState } from "react";
import { categories, topics } from "@/data/topics";
import { TopicCard } from "@/components/TopicCard";
import { GardenWidget } from "@/components/GardenWidget";
import { useProgress } from "@/hooks/useProgress";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { garden, getCompletedCount } = useProgress();

  const filteredTopics = activeCategory === "all"
    ? topics
    : topics.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-primary text-lg">◈</span>
            <h1 className="font-mono text-lg font-bold text-foreground tracking-tight">PM Grove</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Master product management. One tree at a time.
          </p>
        </div>
      </header>

      {/* Categories */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("all")}
            className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              activeCategory === "all"
                ? "bg-primary/10 text-primary"
                : "text-dim hover:text-muted-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary/10 text-primary"
                  : "text-dim hover:text-muted-foreground"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active category description */}
        {activeCategory !== "all" && (
          <p className="text-xs text-dim mt-2">
            {categories.find((c) => c.id === activeCategory)?.description}
          </p>
        )}
      </div>

      {/* Topics grid */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              completedCount={getCompletedCount(topic.id)}
            />
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-dim font-mono">No topics yet in this category</p>
            <p className="text-xs text-dim mt-1">Coming soon.</p>
          </div>
        )}
      </div>

      <GardenWidget garden={garden} />
    </div>
  );
}
