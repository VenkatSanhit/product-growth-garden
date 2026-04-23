import { useSectionInView } from "@/hooks/useSectionInView";
import { TreeGlyphSilhouette } from "@/components/landing/TreeGlyphSilhouette";
import { TrunkFlickerText } from "@/components/landing/TrunkFlickerText";

/** [title, single-line detail] */
type TrunkRow = readonly [string, string];

export function TrunkRevealSection({ trunks }: { trunks: readonly TrunkRow[] }) {
  const { ref, inView } = useSectionInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id="four-trunks"
      className={`landing-trunk-reveal ${inView ? "landing-trunk-reveal--inview" : ""}`}
      aria-labelledby="four-trunks-heading"
    >
      <div className="landing-trunk-reveal__contain">
        <h2 id="four-trunks-heading">Four trunks. Every PM skill you need.</h2>
        <div className="trunk-reveal-grid">
          {trunks.map(([title, detail], idx) => (
            <article key={title} className="trunk-reveal-card">
              <div className={`trunk-reveal-tree-wrap trunk-reveal-tree-wrap--${idx}`}>
                <TreeGlyphSilhouette variant={idx} active={inView} />
              </div>
              <h3 className="trunk-reveal-card__title">
                <TrunkFlickerText text={title} />
              </h3>
              <p className="trunk-reveal-card__detail" title={detail}>
                <TrunkFlickerText text={detail} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
