import { useState, useCallback } from "react";
import { LEGACY_VOLUME_MIGRATION } from "@/data/catalog";

export interface VolumeProgress {
  read: boolean;
  listen: boolean;
  revise: boolean;
}

/** @deprecated Prefer VolumeProgress — kept for existing components. */
export type TopicProgress = VolumeProgress;

export interface GardenTree {
  volumeId: string;
  treeType: string;
  completedAt: string;
}

interface ProgressStateV1 {
  topicProgress?: Record<string, VolumeProgress>;
  garden?: Array<{ topicId: string; treeType: string; completedAt: string }>;
}

interface ProgressState {
  volumeProgress: Record<string, VolumeProgress>;
  garden: GardenTree[];
  version: number;
}

const STORAGE_KEY = "pm-grove-progress";

function migrateFromV1(raw: ProgressStateV1): ProgressState {
  const topicProgress = raw.topicProgress ?? {};
  const volumeProgress: Record<string, VolumeProgress> = {};

  for (const [key, prog] of Object.entries(topicProgress)) {
    const nextKey = LEGACY_VOLUME_MIGRATION[key] ?? key;
    volumeProgress[nextKey] = { ...prog };
  }

  const garden: GardenTree[] = (raw.garden ?? []).map((g) => ({
    volumeId: LEGACY_VOLUME_MIGRATION[g.topicId] ?? g.topicId,
    treeType: g.treeType,
    completedAt: g.completedAt,
  }));

  return { volumeProgress, garden, version: 2 };
}

function loadProgress(): ProgressState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { volumeProgress: {}, garden: [], version: 2 };
    const parsed = JSON.parse(saved) as ProgressState & ProgressStateV1;
    if (parsed.version === 2 && parsed.volumeProgress) {
      return {
        volumeProgress: parsed.volumeProgress,
        garden: parsed.garden ?? [],
        version: 2,
      };
    }
    const migrated = migrateFromV1(parsed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch {
    return { volumeProgress: {}, garden: [], version: 2 };
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => loadProgress());

  const save = useCallback((newState: ProgressState) => {
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, []);

  const getVolumeProgress = useCallback(
    (volumeId: string): VolumeProgress => {
      return state.volumeProgress[volumeId] || { read: false, listen: false, revise: false };
    },
    [state],
  );

  /** @deprecated use getVolumeProgress */
  const getTopicProgress = getVolumeProgress;

  const completeFormat = useCallback(
    (volumeId: string, formatType: "read" | "listen" | "revise", treeType: string) => {
      const current = state.volumeProgress[volumeId] || { read: false, listen: false, revise: false };
      const updated = { ...current, [formatType]: true };
      const newVolumeProgress = { ...state.volumeProgress, [volumeId]: updated };

      const newGarden = [...state.garden];
      if (updated.read && updated.listen && updated.revise) {
        if (!newGarden.find((t) => t.volumeId === volumeId)) {
          newGarden.push({ volumeId, treeType, completedAt: new Date().toISOString() });
        }
      }

      save({ volumeProgress: newVolumeProgress, garden: newGarden, version: 2 });
      return updated;
    },
    [state, save],
  );

  const getCompletedCount = useCallback(
    (volumeId: string): number => {
      const p = state.volumeProgress[volumeId];
      if (!p) return 0;
      return [p.read, p.listen, p.revise].filter(Boolean).length;
    },
    [state],
  );

  /** Volumes in a series with at least one format touched */
  const getSeriesExploredCount = useCallback(
    (volumeIds: string[]): number => {
      return volumeIds.filter((id) => getCompletedCount(id) > 0).length;
    },
    [getCompletedCount],
  );

  return {
    volumeProgress: state.volumeProgress,
    garden: state.garden,
    getVolumeProgress,
    getTopicProgress,
    completeFormat,
    getCompletedCount,
    getSeriesExploredCount,
  };
}
