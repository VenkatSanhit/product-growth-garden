import { motion } from "framer-motion";
import { useSectionInView } from "@/hooks/useSectionInView";
import { TreeGlyphSilhouette } from "@/components/landing/TreeGlyphSilhouette";
import { TrunkFlickerText } from "@/components/landing/TrunkFlickerText";
import { LandingAnimatedHeading } from "@/components/landing/LandingAnimatedHeading";

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
        <LandingAnimatedHeading level={2} id="four-trunks-heading">
          Every PM skill you need.
        </LandingAnimatedHeading>
        <div className="trunk-reveal-grid">
          {trunks.map(([title, detail], idx) => (
            <article key={title} className="trunk-reveal-card">
              <div className={`trunk-reveal-tree-wrap trunk-reveal-tree-wrap--${idx}`}>
                <TreeGlyphSilhouette variant={idx} active={inView} />
              </div>
              <motion.h3
                className="trunk-reveal-card__title"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: 0.06 + idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <TrunkFlickerText text={title} />
              </motion.h3>
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
