/** Monospace “tree” built from digits, letters, and symbols — minimal / digital lab aesthetic. */
const TREE_LINES = [
  "            ·0·@#%&*·G·R·0·V·3·E·            ",
  "           ╱·1·2·3·4·5·6·7·8·9·0·╲           ",
  "          ⟨ P M · G R 0 W T H · ⟩          ",
  "         { r e a d │ l i s t e n }         ",
  "        [ v 1 s u 4 l · n 0 d 3 s ]        ",
  "       ╱─────────────────────────────╲       ",
  "      │ · · · t r u n k · · · · · · · │      ",
  "     ╱ s t e m → b r a n c h → l e a f ╲     ",
  "    └─────────────┬─────────────────────┘    ",
  "         $ync │ c0llab │ r3nd3r          ",
  "              ║ │ │ │ │               ",
  "             ⟨∴∴∴∴∴∴∴∴∴⟩              ",
] as const;

function accentClass(i: number): string {
  if (i % 11 === 0) return "digital-glyph-tree__glyph--accent";
  if (i % 7 === 0) return "digital-glyph-tree__glyph--dim";
  return "";
}

export function DigitalGlyphTree() {
  let globalIdx = 0;

  return (
    <div className="digital-glyph-tree" aria-hidden>
      {TREE_LINES.map((line, li) => (
        <div key={li} className="digital-glyph-tree__row">
          {Array.from(line).map((ch, ci) => {
            if (ch === " ") return <span key={ci} className="digital-glyph-tree__sp" />;
            const i = globalIdx++;
            return (
              <span
                key={ci}
                className={`digital-glyph-tree__glyph ${accentClass(i)}`}
                style={{ animationDelay: `${(i % 48) * 0.06}s` }}
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
