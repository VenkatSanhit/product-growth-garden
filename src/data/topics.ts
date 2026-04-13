/**
 * Shared format types + static media URL helpers.
 * Canonical content hierarchy lives in `catalog.ts` (Track → Series → Volume).
 *
 * Assets: public/topics/<contentFolder>/ — see each Volume’s `contentFolder` in the catalog.
 */
const TOPICS_BASE = "/topics";

/** Build URL for a file in public/topics/<folder>/, or pass through if already http(s). */
export function topicMediaUrl(contentFolder: string, filename: string): string {
  const f = filename.trim();
  if (!f) return "";
  if (/^https?:\/\//i.test(f)) return f;
  return `${TOPICS_BASE}/${contentFolder}/${f}`;
}

/** Absolute URL for embedding (Office viewer, etc.). Safe in browser only. */
export function topicMediaAbsoluteUrl(contentFolder: string, filename: string): string {
  const path = topicMediaUrl(contentFolder, filename);
  if (/^https?:\/\//i.test(path)) return path;
  if (typeof window !== "undefined") return `${window.location.origin}${path}`;
  return path;
}

export function isPowerPointMediaRef(ref: string): boolean {
  const base = ref.split("?")[0].split("/").pop() ?? ref;
  return /\.(pptx?|ppt)$/i.test(base);
}

export function isRasterImageMediaRef(ref: string): boolean {
  const base = ref.split("?")[0].split("/").pop() ?? ref;
  return /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(base);
}

/** MIME for <audio><source type="…"> when the URL is a static file path. */
export function audioMimeTypeForUrl(url: string): string | undefined {
  const path = url.split("?")[0].toLowerCase();
  if (path.endsWith(".m4a")) return "audio/mp4";
  if (path.endsWith(".mp3")) return "audio/mpeg";
  if (path.endsWith(".wav")) return "audio/wav";
  if (path.endsWith(".ogg") || path.endsWith(".oga")) return "audio/ogg";
  return undefined;
}

export function officeOnlineEmbedUrl(fileAbsoluteHttpsUrl: string): string {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileAbsoluteHttpsUrl)}`;
}

export function googleViewerEmbedUrl(fileAbsoluteUrl: string): string {
  return `https://docs.google.com/gview?url=${encodeURIComponent(fileAbsoluteUrl)}&embedded=true`;
}

export type FormatType = "read" | "listen" | "revise";

export interface TopicFormat {
  type: FormatType;
  title: string;
  description: string;
  duration: string;
}

/** Minimal media shape for PowerPoint resolution (Volumes use the same fields). */
export interface MediaBundle {
  read: string;
  audio: string;
  visual: string;
  deck?: string;
}

export function getPowerPointMediaRef(entity: { media: MediaBundle }): string {
  const deck = entity.media.deck?.trim();
  if (deck && isPowerPointMediaRef(deck)) return deck;
  if (isPowerPointMediaRef(entity.media.visual)) return entity.media.visual;
  return "";
}

export const treeTypes = [
  "mango",
  "neem",
  "date",
  "banyan",
  "cherry",
  "oak",
  "pine",
  "maple",
  "bamboo",
  "willow",
];

const TREE_LABELS: Record<string, string> = {
  mango: "Mango",
  neem: "Neem",
  date: "Date palm",
  banyan: "Banyan",
  cherry: "Cherry blossom",
  oak: "Oak",
  pine: "Pine",
  maple: "Maple",
  bamboo: "Bamboo",
  willow: "Weeping willow",
};

export function formatTreeLabel(treeType: string): string {
  const k = treeType.toLowerCase();
  return TREE_LABELS[k] ?? treeType.charAt(0).toUpperCase() + treeType.slice(1).toLowerCase();
}
