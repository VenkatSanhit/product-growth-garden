import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { getVolumeById } from "@/data/catalog";
import type { FormatType } from "@/data/topics";

/** Firestore leaf field names — must match `completeLeaf` expectations. */
export type GroveLeafKey = "leaf1_read" | "leaf2_listen" | "leaf3_revise";

export function formatTypeToLeafKey(format: FormatType): GroveLeafKey {
  if (format === "read") return "leaf1_read";
  if (format === "listen") return "leaf2_listen";
  return "leaf3_revise";
}

export interface StemProgressDoc {
  leaf1_read: boolean;
  leaf2_listen: boolean;
  leaf3_revise: boolean;
}

/**
 * One-time catalog seed: trunk, branch, and stems aligned with app `volume.id` values
 * (`vision-north-star--v1` …) so progress keys match Firestore without a mapping table.
 */
export async function seedGroveDatabase(): Promise<void> {
  const db = getDb();
  const batch = writeBatch(db);

  const trunkRef = doc(db, "trunks", "T2_Strategy_Discovery");
  batch.set(trunkRef, {
    title: "Strategy & Discovery",
    displayOrder: 2,
    isPublished: true,
  });

  const branchRef = doc(db, "branches", "B1_Vision_NSM");
  batch.set(branchRef, {
    trunkId: "T2_Strategy_Discovery",
    title: "Vision & North Star Metrics",
    displayOrder: 1,
    isPublished: true,
  });

  const stems: Array<{
    id: string;
    branchId: string;
    stemTitle: string;
    treeSpecies: string;
  }> = [
    {
      id: "vision-north-star--v1",
      branchId: "B1_Vision_NSM",
      stemTitle: "Stem 1 – Foundations",
      treeSpecies: "mango",
    },
    {
      id: "vision-north-star--v2",
      branchId: "B1_Vision_NSM",
      stemTitle: "Stem 2 – Strategy, Metric Trees, OKRs, Experiments",
      treeSpecies: "pine",
    },
    {
      id: "vision-north-star--v3",
      branchId: "B1_Vision_NSM",
      stemTitle: "Stem 3 – Case Files & Patterns",
      treeSpecies: "cherry",
    },
  ];

  for (const stem of stems) {
    const stemRef = doc(db, "content_catalog", stem.id);
    batch.set(stemRef, {
      trunkId: "T2_Strategy_Discovery",
      branchId: stem.branchId,
      stemTitle: stem.stemTitle,
      treeSpecies: stem.treeSpecies,
      isPublished: true,
    });
  }

  await batch.commit();
}

/**
 * Mark one leaf done for a user stem. When all three leaves are true, plants a tree in `forest`.
 */
export async function completeLeaf(userId: string, stemId: string, leafType: GroveLeafKey): Promise<void> {
  const db = getDb();
  const progressRef = doc(db, "users", userId, "stemProgress", stemId);
  const forestRef = doc(db, "users", userId, "forest", stemId);

  const progressSnap = await getDoc(progressRef);
  const currentProgress: StemProgressDoc = progressSnap.exists()
    ? (progressSnap.data() as StemProgressDoc)
    : {
        leaf1_read: false,
        leaf2_listen: false,
        leaf3_revise: false,
      };

  currentProgress[leafType] = true;
  await setDoc(
    progressRef,
    {
      ...currentProgress,
      lastUpdated: serverTimestamp(),
    },
    { merge: true },
  );

  if (currentProgress.leaf1_read && currentProgress.leaf2_listen && currentProgress.leaf3_revise) {
    const forestSnap = await getDoc(forestRef);
    const isNewTree = !forestSnap.exists();

    const catalogSnap = await getDoc(doc(db, "content_catalog", stemId));
    const fromCatalog = catalogSnap.exists() ? (catalogSnap.data() as { treeSpecies?: string }).treeSpecies : undefined;
    const vol = getVolumeById(stemId);
    const treeSpecies = (fromCatalog || vol?.treeType || "mango").toLowerCase();

    await setDoc(
      forestRef,
      {
        stemId,
        treeSpecies,
        completedAt: serverTimestamp(),
      },
      { merge: true },
    );

    if (isNewTree) {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        treeCount: increment(1),
        lastProgressAt: serverTimestamp(),
      }).catch(async () => {
        await setDoc(
          userRef,
          {
            treeCount: 1,
            lastProgressAt: serverTimestamp(),
          },
          { merge: true },
        );
      });
    }
  }
}

/** Fire-and-forget sync from app format completion (uses Firebase Auth uid when signed in). */
export function syncLeafToFirestore(userId: string, stemId: string, format: FormatType): void {
  const leaf = formatTypeToLeafKey(format);
  void completeLeaf(userId, stemId, leaf).catch((err) => {
    console.error("[PM Grove] Firestore sync failed:", err);
  });
}

/** Number of completed trees (documents in `users/{uid}/forest`). */
export async function getUserForestTreeCount(userId: string): Promise<number> {
  const db = getDb();
  const snap = await getDocs(collection(db, "users", userId, "forest"));
  return snap.size;
}
