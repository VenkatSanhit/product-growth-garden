export type ModuleType = "read" | "listen" | "revise";

export interface TopicModule {
  type: ModuleType;
  title: string;
  description: string;
  duration: string;
  // content will be loaded dynamically later
}

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  modules: TopicModule[];
  treeType: string; // mango, neem, date, banyan, etc.
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "frameworks", name: "Frameworks", description: "Core PM concepts & mental models", icon: "◈" },
  { id: "case-files", name: "Case Files", description: "Real-world product case studies", icon: "◎" },
  { id: "blueprints", name: "Blueprints", description: "How systems work under the hood", icon: "▣" },
  { id: "deep-dives", name: "Deep Dives", description: "Advanced strategy & AI-PM topics", icon: "◉" },
  { id: "playbooks", name: "Playbooks", description: "Step-by-step tactical guides", icon: "▤" },
];

export const topics: Topic[] = [
  {
    id: "vision-north-star",
    title: "Vision & North Star Metrics",
    subtitle: "Define where you're going and how you'll know you're getting there",
    category: "frameworks",
    treeType: "mango",
    modules: [
      {
        type: "read",
        title: "The Raw Read",
        description: "Deep-dive text covering vision crafting, North Star framework, metric hierarchies, and real-world examples from top PMs.",
        duration: "18 min read",
      },
      {
        type: "listen",
        title: "The Pod Brief",
        description: "Audio summary covering all key concepts — perfect for commutes or walks.",
        duration: "12 min listen",
      },
      {
        type: "revise",
        title: "The Mind Map",
        description: "Visual revision with mind maps, infographics, and quick-reference cards.",
        duration: "8 min revise",
      },
    ],
  },
];

// Tree types for gamification
export const treeTypes = [
  "mango", "neem", "date", "banyan", "cherry", "oak", "pine", "maple", "bamboo", "willow"
];
