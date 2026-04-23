import { buildHeroTreeLines } from "@/components/landing/glyphTrees";

const HERO_LINES = buildHeroTreeLines(37);

function accentClass(i: number): string {
  if (i % 11 === 0) return "digital-glyph-tree__glyph--accent";
  if (i % 7 === 0) return "digital-glyph-tree__glyph--dim";
  return "";
}

export function DigitalGlyphTree() {
  let globalIdx = 0;

  return (
    <div className="digital-glyph-tree" aria-hidden>
      {HERO_LINES.map((line, li) => (
        <div key={li} className="digital-glyph-tree__row">
          {Array.from(line).map((ch, ci) => {
            if (ch === " ") return <span key={ci} className="digital-glyph-tree__sp" />;
            const i = globalIdx++;
            return (
              <span
                key={ci}
                className={`digital-glyph-tree__glyph ${accentClass(i)}`}
                style={{ animationDelay: `${(i % 56) * 0.045}s` }}
              >
                {ch}
              </span>
            );
          })}
        </div>
      ))}
      <p className="digital-glyph-tree__caption">collab nodes · weekly sync · forest state</p>
    </div>
  );
}
