/** Structured segments for premium read layout (Word / plain-text dumps). */
export type ReadSegment =
  | { kind: "divider" }
  | { kind: "section"; title: string }
  | { kind: "heading"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] };

const RULE_LINE = /^[_─\-═=\s·]{14,}$/;
const PART_LINE = /^PART\s+\d+/i;
const ENUM_HEAD = /^\d+\.\s+\S/;
const BULLET = /^[•▪▸◦·\-*]\s*/;

function isUnderscoreRule(t: string): boolean {
  const compact = t.replace(/\s/g, "");
  return compact.length >= 10 && /^_+$|^─+$|^=+$/.test(compact);
}

/**
 * Turn flat paste-from-Word text into sections, headings, lists, and dividers.
 */
export function parseReadDocument(raw: string): ReadSegment[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const segments: ReadSegment[] = [];
  let paraBuf: string[] = [];
  let listBuf: string[] = [];

  const flushPara = () => {
    const t = paraBuf.join("\n").trim();
    if (t) segments.push({ kind: "paragraph", text: t });
    paraBuf = [];
  };

  const flushList = () => {
    if (listBuf.length) segments.push({ kind: "list", items: [...listBuf] });
    listBuf = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();

    if (!t) {
      flushList();
      flushPara();
      continue;
    }

    if (isUnderscoreRule(t) || RULE_LINE.test(t)) {
      flushList();
      flushPara();
      segments.push({ kind: "divider" });
      continue;
    }

    if (PART_LINE.test(t) && t.length < 160) {
      flushList();
      flushPara();
      segments.push({ kind: "section", title: t });
      continue;
    }

    if (ENUM_HEAD.test(t) && t.length < 220) {
      flushList();
      flushPara();
      segments.push({ kind: "heading", text: t.replace(/^\d+\.\s+/, "").trim() });
      continue;
    }

    const letters = t.replace(/[^a-zA-Z]/g, "");
    const upperLetters = t.replace(/[^A-Z]/g, "");
    if (
      letters.length >= 6 &&
      upperLetters.length / letters.length > 0.85 &&
      t.length >= 6 &&
      t.length < 90 &&
      !PART_LINE.test(t) &&
      !ENUM_HEAD.test(t)
    ) {
      flushList();
      flushPara();
      segments.push({ kind: "subheading", text: t });
      continue;
    }

    if (BULLET.test(t) || /^\u2022\s/.test(t)) {
      flushPara();
      listBuf.push(t.replace(BULLET, "").replace(/^\u2022\s*/, "").trim());
      continue;
    }

    flushList();
    paraBuf.push(line);
  }

  flushList();
  flushPara();
  return segments;
}
