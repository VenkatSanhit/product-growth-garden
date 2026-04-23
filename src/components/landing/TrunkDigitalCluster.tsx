import { TRUNK_CLUSTER_TREES } from "@/components/landing/glyphTrees";

function MiniTree({
  base,
  alt,
  tilt,
}: {
  base: readonly string[];
  alt: readonly string[];
  tilt: "a" | "b" | "c";
}) {
  return (
    <div className={`trunk-mini-tree trunk-mini-tree--${tilt}`}>
      <div className="trunk-mini-tree__stack">
        <pre className="trunk-mini-tree__frame trunk-mini-tree__frame--a">{base.join("\n")}</pre>
        <pre className="trunk-mini-tree__frame trunk-mini-tree__frame--b">{alt.join("\n")}</pre>
      </div>
    </div>
  );
}

/** White panel with 3 monospace trees + hover pixel swap (trunk cards). */
export function TrunkDigitalCluster({ variant }: { variant: number }) {
  const shift = variant % 3;
  const order =
    shift === 0 ? ([0, 1, 2] as const) : shift === 1 ? ([1, 2, 0] as const) : ([2, 0, 1] as const);
  const tilts: ("a" | "b" | "c")[] = ["a", "b", "c"];

  return (
    <div className="trunk-card__digit-panel" aria-hidden>
      {order.map((idx, i) => (
        <MiniTree key={idx} base={TRUNK_CLUSTER_TREES[idx].base} alt={TRUNK_CLUSTER_TREES[idx].alt} tilt={tilts[i]} />
      ))}
    </div>
  );
}
