/** SVG luminance masks (white = visible glyph field). Four distinct tree silhouettes. */

function svgMask(pathD: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><path fill="white" d="${pathD}"/></svg>`;
  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;
}

/** Classic conifer — layered triangle crown + trunk. */
const PINE =
  "M50 4 L58 20 L52 24 L66 38 L58 44 L74 54 L64 62 L78 72 L62 80 L74 88 L56 94 L56 116 L44 116 L44 94 L26 88 L38 80 L22 72 L36 62 L26 54 L42 44 L34 38 L48 24 L42 20 Z";

/** Rounded deciduous canopy + short trunk. */
const ROUND =
  "M50 18 C78 18 92 42 88 58 C84 72 72 78 58 82 L58 116 L42 116 L42 82 C28 78 16 70 14 56 C10 38 24 18 50 18 Z";

/** Tall narrow cypress / column silhouette. */
const COLUMN =
  "M50 6 L58 14 L56 22 L62 32 L58 42 L64 54 L60 66 L66 78 L62 90 L58 108 L58 116 L42 116 L42 108 L38 90 L34 78 L40 66 L36 54 L42 42 L38 32 L44 22 L42 14 Z";

/** Windswept asymmetrical profile. */
const WIND =
  "M48 8 L72 22 L68 34 L88 48 L76 58 L84 72 L70 80 L78 92 L62 98 L58 116 L42 116 L38 96 L22 88 L28 74 L18 62 L26 48 L20 34 L32 24 L28 12 Z";

export const TREE_MASK_IMAGES = [svgMask(PINE), svgMask(ROUND), svgMask(COLUMN), svgMask(WIND)] as const;
