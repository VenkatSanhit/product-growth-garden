import { Link } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  academyRoot,
  academyTrunks,
  evergreenOutcome,
  productionWorkflow,
  seriesCompleteMilestone,
  volumePillars,
  type AcademyBranch,
} from "@/data/academyMap";
import { GroveAmbience } from "@/components/GroveAmbience";
import { BrandMark } from "@/components/BrandMark";
import { cn } from "@/lib/utils";

function BranchBlock({ branch }: { branch: AcademyBranch }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 overflow-hidden">
      <div className="px-3 py-2.5 border-b border-border/40 bg-muted/20">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-[11px] font-mono font-semibold text-foreground leading-snug">{branch.title}</h4>
          {branch.seriesComplete ? (
            <span
              className="shrink-0 text-[9px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400"
              title="Series milestone on the map"
            >
              Complete
            </span>
          ) : null}
        </div>
        {branch.summary ? (
          <p className="text-[10px] font-mono text-dim mt-1 leading-relaxed">{branch.summary}</p>
        ) : null}
      </div>
      <ul className="divide-y divide-border/30">
        {branch.stems.map((stem) => (
          <li key={stem.title} className="px-3 py-2.5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-mono text-foreground/95 leading-snug">{stem.title}</p>
              {stem.detail ? (
                <p className="text-[10px] font-mono text-muted-foreground mt-1 leading-relaxed">{stem.detail}</p>
              ) : null}
            </div>
            {stem.link ? (
              <Link
                to={stem.link.to}
                className="shrink-0 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
              >
                {stem.link.label ?? "Open"}
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AcademyPlaybookPage() {
  return (
    <AppShell>
      <div className="relative min-h-screen pb-20">
        <GroveAmbience variant="trunk" />
        <header className="border-b border-border">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-4">
              <BrandMark size={32} />
              <span className="font-mono text-xs font-semibold text-foreground tracking-tight">PM Grove</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-dim">
              <span>{academyRoot.title}</span>
              <span className="text-border">·</span>
              <span>{academyRoot.subtitle}</span>
            </div>
            <h1 className="font-mono text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Academy map & playbook index
            </h1>
            <p className="text-xs text-muted-foreground max-w-xl mt-3 leading-relaxed">
              Intuition-first view of the full curriculum: seven trunks, branches, and stems. Expand a trunk to see what
              each branch covers; open linked stems when they exist in the grove.
            </p>
            <p className="text-[11px] font-mono text-primary/90 mt-4">{academyRoot.prompt}</p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
          <section aria-labelledby="trunks-heading">
            <h2 id="trunks-heading" className="sr-only">
              Trunks and branches
            </h2>
            <Accordion type="multiple" className="w-full border border-border/60 rounded-lg bg-background/30 overflow-hidden">
              {academyTrunks.map((trunk, ti) => (
                <AccordionItem key={trunk.id} value={trunk.id} className="border-border/50 px-1">
                  <AccordionTrigger className="px-3 py-3 hover:no-underline text-left [&[data-state=open]]:bg-muted/15">
                    <span className="flex items-start gap-3 w-full min-w-0">
                      <span
                        className="shrink-0 w-7 h-7 rounded-md border border-border/60 bg-muted/20 flex items-center justify-center text-[10px] font-mono text-dim tabular-nums"
                        aria-hidden
                      >
                        {ti + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-sm font-semibold text-foreground">{trunk.title}</span>
                        <span className="block text-[10px] font-mono text-muted-foreground mt-0.5 leading-relaxed">
                          {trunk.tagline}
                        </span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-4 pt-0">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {trunk.catalogTrackSlug ? (
                        <Link
                          to={`/t/${trunk.catalogTrackSlug}`}
                          className="text-[10px] font-mono uppercase tracking-wider text-primary border border-primary/25 rounded-md px-2.5 py-1 hover:bg-primary/10 transition-colors"
                        >
                          Open trunk in grove →
                        </Link>
                      ) : null}
                      <span className="text-[9px] font-mono text-dim uppercase tracking-wider">
                        {trunk.branches.length} branch{trunk.branches.length === 1 ? "" : "es"}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {trunk.branches.map((b) => (
                        <BranchBlock key={b.id} branch={b} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section
            aria-labelledby="workflow-heading"
            className="rounded-xl border border-border/50 bg-background/25 p-5 space-y-4"
          >
            <h2 id="workflow-heading" className="text-[10px] font-mono uppercase tracking-[0.22em] text-dim">
              How each volume is built
            </h2>
            <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
              Every stem follows the same production rhythm — this is the engine behind read, listen, and visual.
            </p>
            <ol className="space-y-3">
              {productionWorkflow.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span
                    className="shrink-0 w-7 h-7 rounded-md border border-border/60 bg-muted/20 flex items-center justify-center text-[10px] font-mono text-dim tabular-nums"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[11px] font-mono font-semibold text-foreground">{step.title}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-1 leading-relaxed">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="pt-2 border-t border-border/40">
              <p className="text-[10px] font-mono uppercase tracking-wider text-dim mb-2">Volume pillars (collect)</p>
              <ul className="flex flex-wrap gap-2">
                {volumePillars.map((p) => (
                  <li
                    key={p}
                    className={cn(
                      "text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-md",
                      "border border-border/50 bg-muted/15 text-muted-foreground",
                    )}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 mb-2">
                {seriesCompleteMilestone.title}
              </h2>
              <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">{seriesCompleteMilestone.detail}</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-4">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-2">
                {evergreenOutcome.title}
              </h2>
              <ul className="text-[11px] font-mono text-muted-foreground space-y-1.5 leading-relaxed">
                {evergreenOutcome.lines.map((line) => (
                  <li key={line}>· {line}</li>
                ))}
              </ul>
            </div>
          </section>

          <p className="text-center">
            <Link
              to="/"
              className="text-[10px] font-mono uppercase tracking-wider text-dim hover:text-foreground transition-colors"
            >
              ← Back to grove home
            </Link>
          </p>
        </div>
      </div>
    </AppShell>
  );
}
