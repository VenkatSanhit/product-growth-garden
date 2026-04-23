import { useSectionInView } from "@/hooks/useSectionInView";
import { TreeGlyphSilhouette } from "@/components/landing/TreeGlyphSilhouette";

type TrunkRow = readonly [string, string, string];

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
          {trunks.map(([title, body, meta], idx) => (
            <article key={title} className="trunk-reveal-card">
              <div className={`trunk-reveal-tree-wrap trunk-reveal-tree-wrap--${idx}`}>
                <TreeGlyphSilhouette variant={idx} active={inView} />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
              <small>{meta}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
