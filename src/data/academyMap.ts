/**
 * PM Academy course-flow index — mirrors the playbook map (trunks → branches → stems).
 * Optional `link` points at live catalog routes when stems ship in the app.
 */

export interface AcademyStem {
  title: string;
  detail?: string;
  /** In-app route when this stem exists in the catalog */
  link?: { to: string; label?: string };
}

export interface AcademyBranch {
  id: string;
  title: string;
  summary?: string;
  /** Matches “✅” on the diagram — curriculum milestone */
  seriesComplete?: boolean;
  stems: AcademyStem[];
}

export interface AcademyTrunk {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  /** Catalog track slug — “Open trunk” jumps to real branches */
  catalogTrackSlug?: string;
  branches: AcademyBranch[];
}

export interface WorkflowStep {
  icon: string;
  title: string;
  detail: string;
}

export const academyRoot = {
  title: "PM Academy",
  subtitle: "Tracks → Series → Volumes",
  prompt: "Which trunk?",
};

export const academyTrunks: AcademyTrunk[] = [
  {
    id: "foundations",
    icon: "🏛️",
    title: "Foundations & Mindset",
    tagline: "PM role, flavours, 0→1 vs 1→N",
    catalogTrackSlug: "foundations-pm-thinking",
    branches: [
      {
        id: "foundations-pm-role",
        title: "PM Role & Flavours",
        stems: [
          { title: "Stem 1 – The PM Role" },
          { title: "Stem 2 – Flavours of PM" },
          { title: "Stem 3 – Contexts: 0→1, 1→N, Maintenance" },
        ],
      },
    ],
  },
  {
    id: "strategy",
    icon: "🎯",
    title: "Strategy & Discovery",
    tagline: "Vision, market, value prop, AI shifts",
    catalogTrackSlug: "strategy-discovery",
    branches: [
      {
        id: "strategy-s1",
        title: "Branch S1: Vision & North Star",
        summary: "Conceptual context → application & metrics → case files",
        seriesComplete: true,
        stems: [
          {
            title: "Stem 1 – Conceptual + context",
            detail: "Vision, North Star, language of outcomes",
            link: {
              to: "/t/strategy-discovery/vision-north-star/v/volume-1",
              label: "Open stem",
            },
          },
          {
            title: "Stem 2 – Application + metrics",
            detail: "Metric trees, OKRs, experiments",
            link: {
              to: "/t/strategy-discovery/vision-north-star/v/volume-2",
              label: "Open stem",
            },
          },
          {
            title: "Stem 3 – Case files & exercises",
            detail: "Patterns, revision fuel",
            link: {
              to: "/t/strategy-discovery/vision-north-star/v/volume-3",
              label: "Open stem",
            },
          },
        ],
      },
      {
        id: "strategy-s2",
        title: "Branch S2: Market & Competitive Analysis",
        stems: [
          { title: "TAM / SAM" },
          { title: "Benchmarking" },
        ],
      },
      {
        id: "strategy-s3",
        title: "Branch S3: User Research & Segmentation",
        stems: [
          { title: "Methods" },
          { title: "Personas" },
          { title: "JTBD" },
        ],
      },
      {
        id: "strategy-s4",
        title: "Branch S4: Value Prop & Positioning",
        stems: [
          { title: "Crafting" },
          { title: "Messaging" },
          { title: "B2B vs B2C" },
        ],
      },
    ],
  },
  {
    id: "planning",
    icon: "📋",
    title: "Planning & Roadmapping",
    tagline: "Roadmaps, backlog, prioritization",
    catalogTrackSlug: "planning-roadmapping",
    branches: [
      {
        id: "planning-a",
        title: "Branch A: Product Roadmaps",
        stems: [
          { title: "Stem A1: What they are / aren’t" },
          { title: "Stem A2: 0→1 vs 1→N vs FAANG" },
          { title: "Stem A3: Roadmaps by stakeholder" },
          { title: "Stem A4: Process & cadence" },
          { title: "Stem A5: Case files" },
        ],
      },
      {
        id: "planning-b",
        title: "Branch B: Product Backlog & PBIs",
        stems: [
          { title: "Stem B1: Fundamentals & ownership" },
          { title: "Stem B2: Slicing, quality, INVEST" },
          { title: "Stem B3: Roadmap → backlog flow" },
          { title: "Stem B4: 0→1 vs 1→N patterns" },
        ],
      },
      {
        id: "planning-c",
        title: "Branch C: Prioritization Frameworks",
        stems: [
          { title: "Stem C1: Foundations & links to strategy" },
          { title: "Stem C2: RICE, MoSCoW, WSJF in practice" },
          { title: "Stem C3: Portfolio & AI-era prioritization" },
        ],
      },
    ],
  },
  {
    id: "delivery",
    icon: "⚙️",
    title: "Delivery & Agile Ops",
    tagline: "Scrum, Kanban, PI/ART, ceremonies",
    catalogTrackSlug: "delivery-agile",
    branches: [
      {
        id: "delivery-d",
        title: "Branch D: Agile & Scrum for PMs",
        stems: [
          { title: "Stem D1: Roles & boundaries" },
          { title: "Stem D2: Scrum events through PM lens" },
          { title: "Stem D3: PI planning & ART" },
        ],
      },
      {
        id: "delivery-e",
        title: "Branch E: Execution & Flow",
        stems: [
          { title: "Anti-patterns" },
          { title: "WIP" },
          { title: "Ceremonies" },
        ],
      },
    ],
  },
  {
    id: "metrics",
    icon: "📊",
    title: "Metrics, Analytics & Experimentation",
    tagline: "Dashboards, AARRR, A/B testing",
    catalogTrackSlug: "metrics-analytics-growth",
    branches: [
      {
        id: "metrics-m1",
        title: "Branch M1: Metric Systems & Taxonomy",
        stems: [
          { title: "Types" },
          { title: "Leading vs lagging" },
          { title: "Trees" },
        ],
      },
      {
        id: "metrics-m2",
        title: "Branch M2: Growth & Pirate Metrics",
        stems: [
          { title: "AARRR / AARRRGE" },
          { title: "Cohorts" },
        ],
      },
      {
        id: "metrics-m3",
        title: "Branch M3: Experimentation & Causality",
        stems: [
          { title: "A/B tests" },
          { title: "Guardrails" },
          { title: "AI nuances" },
        ],
      },
    ],
  },
  {
    id: "ai",
    icon: "🤖",
    title: "AI-Native Product Management",
    tagline: "LLM integration, evaluation, ethics",
    catalogTrackSlug: "ai-product-management",
    branches: [
      {
        id: "ai-discovery",
        title: "Branch: AI Problem Discovery",
        summary: "When/why to use AI · finding AI-shaped problems",
        stems: [
          { title: "When/why to use AI" },
          { title: "Finding AI-shaped problems" },
        ],
      },
      {
        id: "ai-every-track",
        title: "Stems: AI in Every Track",
        stems: [
          { title: "🎯 Strategy: AI-shaped problems" },
          { title: "📋 Planning: Roadmapping AI bets" },
          { title: "⚙️ Delivery: Working with ML teams" },
          { title: "📊 Metrics: Evaluating AI models" },
        ],
      },
    ],
  },
  {
    id: "gtm",
    icon: "🚀",
    title: "GTM, Growth & Lifecycle",
    tagline: "Launch, pricing, retention, sunsetting",
    catalogTrackSlug: "gtm-lifecycle",
    branches: [
      {
        id: "gtm-g1",
        title: "Stems G1: GTM Strategy & Launches",
        stems: [
          { title: "Volumes: Tiers, messaging, channels" },
        ],
      },
      {
        id: "gtm-g2",
        title: "Stems G2: Growth Loops & Retention",
        stems: [
          { title: "Onboarding" },
          { title: "Habits" },
          { title: "Network effects" },
        ],
      },
      {
        id: "gtm-g3",
        title: "Stems G3: Lifecycle Management",
        stems: [
          { title: "Migrations" },
          { title: "Sunsetting" },
          { title: "Pricing" },
        ],
      },
    ],
  },
];

export const volumePillars = [
  "Conceptual clarity",
  "Context variations",
  "Failure patterns",
  "Application & templates",
];

export const productionWorkflow: WorkflowStep[] = [
  {
    icon: "🎯",
    title: "Define learning objectives",
    detail: "What should a PM know after?",
  },
  {
    icon: "📦",
    title: "Collect: volumes",
    detail: "2–5 weekly units = one volume. Organized by pillar: conceptual clarity, context variations, failure patterns, application & templates.",
  },
  {
    icon: "✍️",
    title: "Write: longform read",
    detail: "Concept + context + mistakes + 1–2 caselets.",
  },
  {
    icon: "🎧",
    title: "Create: listen version",
    detail: "Script (e.g. via Notebook LM), polish for spoken clarity.",
  },
  {
    icon: "🎨",
    title: "Design: visual",
    detail: "Key diagram or comparison table — e.g. Vision → Strategy → Roadmap flow.",
  },
  {
    icon: "📤",
    title: "Publish: weekly",
    detail: "Read + listen + visual as one integrated unit.",
  },
  {
    icon: "🔄",
    title: "Repeat: next series",
    detail: "Same read/listen/visual flow; feeds the content roadmap.",
  },
  {
    icon: "🔗",
    title: "Cross-link",
    detail: "Back to related volumes; forward to the next logical topic.",
  },
];

export const seriesCompleteMilestone = {
  title: "Series complete",
  detail:
    "When four pillars + capstone case files are delivered, move to the next topic. All stems follow the same read / listen / visual flow.",
};

export const evergreenOutcome = {
  icon: "🌳",
  title: "Result: Evergreen Academy",
  lines: [
    "Tracks stay stable",
    "Series build coherently",
    "Weekly cadence stays sustainable",
    "AI lens integrated throughout",
  ],
};
