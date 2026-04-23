/** Per-character flicker + occasional accent (orange “glyph lighting”). */

export function TrunkFlickerText({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) => {
        if (ch === " ") return <span key={i}> </span>;
        const accent = (i * 5 + text.length * 3) % 9 === 0 || (i * 7) % 13 === 1;
        return (
          <span
            key={i}
            className={`trunk-flicker-char${accent ? " trunk-flicker-char--accent" : ""}`}
            style={{ animationDelay: `${(i % 24) * 0.055}s` }}
          >
            {ch}
          </span>
        );
      })}
    </>
  );
}
