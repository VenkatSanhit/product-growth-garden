import { FOREST_SPECIES } from "@/components/landing/glyphTrees";

export function ForestTreeCell({ species }: { species: number }) {
  const spec = FOREST_SPECIES[species % FOREST_SPECIES.length];

  return (
    <div className={`forest-tree forest-tree-cell t${(species % 4) + 1}`} aria-hidden>
      <div className="forest-tree-cell__pixel-wrap">
        <pre className="forest-tree-cell__layer forest-tree-cell__layer--a">{spec.a.join("\n")}</pre>
        <pre className="forest-tree-cell__layer forest-tree-cell__layer--b">{spec.b.join("\n")}</pre>
      </div>
    </div>
  );
}
