import { useState } from "react";
import { categories, topics } from "@/data/topics";
import { TopicCard } from "@/components/TopicCard";
import { GardenWidget } from "@/components/GardenWidget";
import { useProgress } from "@/hooks/useProgress";
import { FallingLeaves } from "@/components/FallingLeaves";
import { TrunkSilhouette, BranchNetwork } from "@/components/BranchDecoration";

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { garden, getCompletedCount } = useProgress();

  const filteredTopics = activeCategory === "all"
    ? topics
    : topics.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      {/* Falling leaves — subtle ambient animation */}
      <FallingLeaves density={10} types={["leaf", "petal"]} />

      {/* Trunk silhouette behind header */}
      <TrunkSilhouette className="left-1/2 -translate-x-1/2 top-0 opacity-40" />

      {/* Header */}
      <header className="border-b border-border relative z-10">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-primary text-lg">◈</span>
            <h1 className="font-mono text-lg font-bold text-foreground tracking-tight">PM Grove</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Master product management. One tree at a time.
          </p>

          {/* Subtle root line decoration */}
          <div className="mt-6 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-dim">
              <path
                d="M8 0C6 3 4 5 2 6C0 7 0 9 1 10C2 11 4 11 5 10C6 9 7 7 8 5C9 7 10 9 11 10C12 11 14 11 15 10C16 9 16 7 14 6C12 5 10 3 8 0Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>
      </header>

      {/* Branch network behind categories */}
      <div className="relative">
        <BranchNetwork className="top-0 left-0 opacity-50" />

        {/* Categories */}
        <div className="max-w-3xl mx-auto px-4 py-6 relative z-10">
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
      </div>

      {/* Topics grid */}
      <div className="max-w-3xl mx-auto px-4 relative z-10">
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

      {/* Bottom forest floor line */}
      <div className="max-w-3xl mx-auto px-4 mt-12 relative z-10">
        <div className="flex items-end justify-center gap-1 opacity-20">
          <div className="w-8 h-px bg-border" />
          <div className="w-1 h-2 bg-border rounded-t-full" />
          <div className="w-12 h-px bg-border" />
          <div className="w-0.5 h-3 bg-border rounded-t-full" />
          <div className="w-6 h-px bg-border" />
          <div className="w-1 h-1.5 bg-border rounded-t-full" />
          <div className="w-10 h-px bg-border" />
          <div className="w-0.5 h-2 bg-border rounded-t-full" />
          <div className="w-8 h-px bg-border" />
        </div>
      </div>

      <GardenWidget garden={garden} />
    </div>
  );
}
