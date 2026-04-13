/**
 * PM Grove content catalog — Track → Series → Volume → Format (read / listen / visual).
 * Add tracks/series/volumes here; assets live under public/topics/<contentFolder>/.
 */
import type { TopicFormat } from "@/data/topics";

/** Reserved for future library navigation (case files, playbooks, …). */
export type ContentLibraryId =
  | "concepts"
  | "case-studies"
  | "case-files"
  | "blueprints"
  | "deep-dives"
  | "playbooks";

export type SeriesContentType =
  | "concept-series"
  | "case-study-series"
  | "playbook-series"
  | "blueprint-series"
  | "deep-dive-series";

export type VolumeStatus = "available" | "draft" | "coming-soon";

export interface VolumeMedia {
  read: string;
  audio: string;
  visual: string;
  deck?: string;
}

export interface Volume {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  volumeNumber: number;
  status: VolumeStatus;
  /** Folder under public/topics/ */
  contentFolder: string;
  treeType: string;
  media: VolumeMedia;
  visualCaption?: string;
  visualMoreUrl?: string;
  visualMoreLabel?: string;
  formats: TopicFormat[];
}

export interface Series {
  id: string;
  slug: string;
  title: string;
  description: string;
  trackId: string;
  contentType: SeriesContentType;
  /** Optional — for future filtering by library */
  library?: ContentLibraryId;
  volumes: Volume[];
}

export interface Track {
  id: string;
  slug: string;
  title: string;
  description: string;
  series: Series[];
}

const threeFormats = (readDesc: string, listenDesc: string, visualDesc: string): TopicFormat[] => [
  {
    type: "read",
    title: "Read",
    description: readDesc,
    duration: "Long read",
  },
  {
    type: "listen",
    title: "Listen",
    description: listenDesc,
    duration: "Audio",
  },
  {
    type: "revise",
    title: "Visual",
    description: visualDesc,
    duration: "Visual",
  },
];

const visionNorthStarSeries: Series = {
  id: "vision-north-star",
  slug: "vision-north-star",
  title: "Vision & North Star Metrics",
  description:
    "A structured path from why the product exists to how you measure success—foundations, metric trees & OKRs, then real patterns you can steal.",
  trackId: "strategy-discovery",
  contentType: "concept-series",
  library: "concepts",
  volumes: [
    {
      id: "vision-north-star--v1",
      slug: "volume-1",
      title: "Stem 1 – Foundations",
      subtitle: "Vision, North Star, and the language of outcomes",
      description:
        "Why vision matters, how a North Star differs from vanity metrics, and how to talk about direction without drowning in OKR theater.",
      volumeNumber: 1,
      status: "available",
      contentFolder: "vision-north-star",
      treeType: "mango",
      media: {
        read: "read.txt",
        audio: "How_North_Star_Metrics_Guide_Product_Vision.m4a",
        visual: "visual.png",
        deck: "Vision_North_Star.pptx",
      },
      visualCaption: "Vision + North Star at a glance—pin this before your next roadmap chat.",
      formats: threeFormats(
        "The playbook PMs quietly wish they had sooner—vision, North Star, and what actually moves the needle. Open the reader and go deep.",
        "Same story, different channel. Earbuds in, world out—commute-length clarity you’ll actually remember Monday morning.",
        "One glance that locks the framework in memory—before your next exec review or interview curveball.",
      ),
    },
    {
      id: "vision-north-star--v2",
      slug: "volume-2",
      title: "Stem 2 – Strategy, Metric Trees, OKRs, Experiments",
      subtitle: "From one metric to a system you can execute",
      description:
        "Connect strategy to measurable trees, run disciplined experiments, and avoid the trap of metrics that look smart but change nothing.",
      volumeNumber: 2,
      status: "available",
      contentFolder: "vision-north-star-vol-2",
      treeType: "pine",
      media: {
        read: "read.txt",
        audio: "vision-north-star-vol-2.m4a",
        visual: "visual.png",
      },
      visualCaption: "North Star → inputs → experiments—how the system fits together.",
      formats: threeFormats(
        "Metric trees without the MBA fog—how inputs roll up to a North Star and where OKRs actually fit.",
        "Listen on the go—the same arc as Read, tuned for earbuds.",
        "Diagram or deck for revision—open full screen when you’re ready to skim visually.",
      ),
    },
    {
      id: "vision-north-star--v3",
      slug: "volume-3",
      title: "Stem 3 – Case Files & Patterns",
      subtitle: "How great teams wire vision to reality",
      description:
        "Annotated patterns from products that got North Stars right (and wrong)—revision fuel for interviews and roadmap reviews.",
      volumeNumber: 3,
      status: "available",
      contentFolder: "vision-north-star-vol-3",
      treeType: "cherry",
      media: { read: "read.txt", audio: "", visual: "" },
      formats: threeFormats(
        "Case-style breakdowns you can skim before a staff meeting or deep-read before a strategy offsite.",
        "Podcast-style walkthroughs will join each case file—placeholder until the mix is mastered.",
        "Diagrams and slide stacks for each pattern—add to your personal revision library when files ship.",
      ),
    },
  ],
};

export const tracks: Track[] = [
  {
    id: "strategy-discovery",
    slug: "strategy-discovery",
    title: "Strategy & Discovery",
    description: "Where the product faces reality—vision, markets, users, and the story you take to leadership.",
    series: [visionNorthStarSeries],
  },
  {
    id: "foundations-pm-thinking",
    slug: "foundations-pm-thinking",
    title: "Foundations & PM Thinking",
    description: "Mental models, craft, and judgment that underpin everything else.",
    series: [],
  },
  {
    id: "planning-roadmapping",
    slug: "planning-roadmapping",
    title: "Planning & Roadmapping",
    description: "Roadmaps, backlogs, prioritization, and communicating timelines without lying.",
    series: [],
  },
  {
    id: "delivery-agile",
    slug: "delivery-agile",
    title: "Delivery & Agile Execution",
    description: "Shipping value in slices—agile fluency, rituals, and cross-functional rhythm.",
    series: [],
  },
  {
    id: "metrics-analytics-growth",
    slug: "metrics-analytics-growth",
    title: "Metrics, Analytics & Growth",
    description: "Measurement, funnels, retention, and growth loops with intellectual honesty.",
    series: [],
  },
  {
    id: "ai-product-management",
    slug: "ai-product-management",
    title: "AI Product Management",
    description: "Shipping AI-native products—data, evaluation, UX, and responsible velocity.",
    series: [],
  },
  {
    id: "gtm-lifecycle",
    slug: "gtm-lifecycle",
    title: "GTM & Lifecycle",
    description: "Launches, lifecycle messaging, and what happens after day one.",
    series: [],
  },
];

export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}

export function getSeriesBySlug(trackSlug: string, seriesSlug: string): Series | undefined {
  const track = getTrackBySlug(trackSlug);
  return track?.series.find((s) => s.slug === seriesSlug);
}

export function getVolumeBySlug(
  trackSlug: string,
  seriesSlug: string,
  volumeSlug: string,
): Volume | undefined {
  const series = getSeriesBySlug(trackSlug, seriesSlug);
  return series?.volumes.find((v) => v.slug === volumeSlug);
}

export function getVolumeById(volumeId: string): Volume | undefined {
  for (const track of tracks) {
    for (const series of track.series) {
      const v = series.volumes.find((vol) => vol.id === volumeId);
      if (v) return v;
    }
  }
  return undefined;
}

export function getSeriesForVolume(volumeId: string): { track: Track; series: Series; volume: Volume } | undefined {
  for (const track of tracks) {
    for (const series of track.series) {
      const volume = series.volumes.find((v) => v.id === volumeId);
      if (volume) return { track, series, volume };
    }
  }
  return undefined;
}

export function volumePath(trackSlug: string, seriesSlug: string, volumeSlug: string): string {
  return `/t/${trackSlug}/${seriesSlug}/v/${volumeSlug}`;
}

export function volumeReadPath(trackSlug: string, seriesSlug: string, volumeSlug: string): string {
  return `${volumePath(trackSlug, seriesSlug, volumeSlug)}/read`;
}

export function volumeVisualPath(trackSlug: string, seriesSlug: string, volumeSlug: string): string {
  return `${volumePath(trackSlug, seriesSlug, volumeSlug)}/visual`;
}

/** Labels for forest / widgets — primary line is volume, secondary is series · track */
export function gardenLabelsForVolume(volumeId: string): { primary: string; secondary: string } {
  const ctx = getSeriesForVolume(volumeId);
  if (!ctx) return { primary: volumeId, secondary: "" };
  return {
    primary: ctx.volume.title,
    secondary: `${ctx.series.title} · ${ctx.track.title}`,
  };
}

export const LEGACY_TOPIC_ID = "vision-north-star";
export const LEGACY_VOLUME_MIGRATION: Record<string, string> = {
  [LEGACY_TOPIC_ID]: "vision-north-star--v1",
};
