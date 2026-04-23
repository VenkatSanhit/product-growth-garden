/** Shared monospace “trees”: symbols mixed in canopy, silhouette reads as pine + trunk. */

const MIX = "@#%&*·0123456789+=~$";

function padRow(inner: string, width: number): string {
  const p = Math.max(0, Math.floor((width - inner.length) / 2));
  return " ".repeat(p) + inner + " ".repeat(Math.max(0, width - p - inner.length));
}

/** Hero: wide pine canopy → narrow trunk (reads as a tree on your forest photo). */
export function buildHeroTreeLines(width = 37): string[] {
  const lines: string[] = [];
  const canopyRows = 9;
  for (let i = 0; i < canopyRows; i++) {
    const innerLen = Math.min(width - 4, 5 + i * 2);
    let inner = "";
    for (let j = 0; j < innerLen; j++) {
      inner += MIX[(i * 13 + j * 5) % MIX.length];
    }
    lines.push(padRow(inner, width));
  }
  lines.push(padRow("|||", width));
  lines.push(padRow("|||||", width));
  lines.push(padRow("{PM·}", width));
  lines.push(padRow("─+─+─", width));
  lines.push(padRow("\\_|_/", width));
  return lines;
}

/** Three small trees for trunk cards (different silhouettes) + hover swap frame. */
export const TRUNK_CLUSTER_TREES: readonly {
  base: readonly string[];
  alt: readonly string[];
}[] = [
  {
    base: ["  @  ", " %@% ", "%###%", " |#| ", " ||| ", " _|_ "],
    alt: ["  #  ", " @#@ ", "@%%%@", " |@| ", " ||| ", " /_\\ "],
  },
  {
    base: ["   *   ", "  ***  ", " ***** ", "*******", "  |||  ", "  |||  ", "  <=>  "],
    alt: ["   +   ", "  +++  ", " +++++ ", "+++++++", "  |||  ", "  |||  ", "  >?<  "],
  },
  {
    base: ["  ·0·  ", " #···# ", "<~~~~~>", "  |||  ", " /|||\\ ", "  vvv  "],
    alt: ["  $1$  ", " @···@ ", "{=====}", "  |||  ", " \\|||/ ", "  ^^^  "],
  },
] as const;

/** Eight micro species for forest grid hover swap (A vs B). */
export const FOREST_SPECIES: readonly { a: readonly string[]; b: readonly string[] }[] = [
  { a: [" @ ", "%#%", "|||", "_|_"], b: [" * ", "***", "|||", "\\_/"] },
  { a: [" · ", "~+~", "|||", "─+─"], b: [" $ ", "@$@", "|||", "|_|"] },
  { a: [" 1 ", "010", "|||", "T|T"], b: [" 0 ", "000", "|||", "H|H"] },
  { a: [" ⟨⟩ ", "{###}", " ||| ", " /_\\ "], b: [" <> ", "[===]", " ||| ", " |_| "] },
  { a: ["  %  ", " %@% ", " ||| ", " / \\ "], b: ["  #  ", " ### ", " ||| ", " VVV "] },
  { a: [" * ", "***", "*|*", " | "], b: [" + ", "+++", "+|+", " | "] },
  { a: [" @@@ ", "@...@", " ||| ", " /_\\ "], b: [" ### ", "#...#", " ||| ", " \\_/ "] },
  { a: [" 7 ", "777", "|||", "|#|"], b: [" 3 ", "333", "|||", "|3|"] },
] as const;
