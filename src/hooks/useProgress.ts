import { useState, useCallback } from "react";

export interface TopicProgress {
  read: boolean;
  listen: boolean;
  revise: boolean;
}

export interface GardenTree {
  topicId: string;
  treeType: string;
  completedAt: string;
}

interface ProgressState {
  topicProgress: Record<string, TopicProgress>;
  garden: GardenTree[];
}

const STORAGE_KEY = "pm-grove-progress";

const loadProgress = (): ProgressState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { topicProgress: {}, garden: [] };
  } catch {
    return { topicProgress: {}, garden: [] };
  }
};

export function useProgress() {
  const [state, setState] = useState<ProgressState>(loadProgress);

  const save = useCallback((newState: ProgressState) => {
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, []);

  const getTopicProgress = useCallback(
    (topicId: string): TopicProgress => {
      return state.topicProgress[topicId] || { read: false, listen: false, revise: false };
    },
    [state]
  );

  const completeModule = useCallback(
    (topicId: string, moduleType: "read" | "listen" | "revise", treeType: string) => {
      const current = state.topicProgress[topicId] || { read: false, listen: false, revise: false };
      const updated = { ...current, [moduleType]: true };
      const newTopicProgress = { ...state.topicProgress, [topicId]: updated };

      let newGarden = [...state.garden];
      // Check if all 3 complete and tree not yet in garden
      if (updated.read && updated.listen && updated.revise) {
        if (!newGarden.find((t) => t.topicId === topicId)) {
          newGarden.push({ topicId, treeType, completedAt: new Date().toISOString() });
        }
      }

      save({ topicProgress: newTopicProgress, garden: newGarden });
      return updated;
    },
    [state, save]
  );

  const getCompletedCount = useCallback(
    (topicId: string): number => {
      const p = state.topicProgress[topicId];
      if (!p) return 0;
      return [p.read, p.listen, p.revise].filter(Boolean).length;
    },
    [state]
  );

  return {
    topicProgress: state.topicProgress,
    garden: state.garden,
    getTopicProgress,
    completeModule,
    getCompletedCount,
  };
}
