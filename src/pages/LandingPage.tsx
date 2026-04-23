import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Leaf, Headphones, PanelsTopLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { BrandMark } from "@/components/BrandMark";
import { useAuth } from "@/contexts/useAuth";
import { isFirebaseConfigured } from "@/lib/firebase";
import { seedGroveDatabase } from "@/lib/groveFirestore";
import { ForestRandomPixelTrees } from "@/components/landing/ForestRandomPixelTrees";
import { LandingAnimatedHeading } from "@/components/landing/LandingAnimatedHeading";
import { TrunkRevealSection } from "@/components/landing/TrunkRevealSection";

const trunks = [
  [
    "Market Sizing & Segmentation",
    "TAM · SAM · JTBD · bottoms-up · wedges · competitive maps · 6 branches · 18 stems",
  ],
  [
    "Discovery & Validation",
    "User interviews · PMF signals · MVP scope · learn fast · 6 branches · 18 stems",
  ],
  ["Metrics & Data", "North star · cohorts · retention · AI-native KPIs · 6 branches · 18 stems"],
  ["AI Product Strategy", "LLMs · AI UX patterns · positioning · moats · 6 branches · 18 stems"],
] as const;

function NothingAccentText({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, idx) => {
        if (ch === " ") return <span key={`${ch}-${idx}`}> </span>;
        const accent = idx % 3 === 1;
        return (
          <span key={`${ch}-${idx}`} className={accent ? "nothing-accent" : undefined}>
            {ch}
          </span>
        );
      })}
    </>
  );
}

export default function LandingPage() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState<null | "signin" | "signup">(null);
  const [seeding, setSeeding] = useState(false);

  const showFirestoreSeed =
    isFirebaseConfigured() &&
    (import.meta.env.DEV || import.meta.env.VITE_ENABLE_FIREBASE_SEED === "true");

  const runFirestoreSeed = async () => {
    if (!showFirestoreSeed) return;
    setSeeding(true);
    try {
      await seedGroveDatabase();
      toast.success("Firestore catalog seeded (trunks, branches, stems).");
    } catch (e) {
      console.error(e);
      toast.error("Seed failed. Sign in and check Firestore rules / console.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="landing-wrap">
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-logo">
            <BrandMark size={20} />
            <span>PM Grove</span>
          </Link>
          <nav className="landing-links">
            <a href="#how">How it works</a>
            <a href="#forest">The Forest</a>
          </nav>
          <div className="landing-actions">
            <Button variant="ghost" className="landing-btn-ghost" onClick={() => setAuthOpen("signin")}>
              Sign in
            </Button>
            <Button className="landing-btn-primary" onClick={() => setAuthOpen("signup")}>
              Start Growing
            </Button>
          </div>
          <button type="button" className="landing-menu" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen ? (
          <div className="landing-mobile-menu">
            <a href="#how">How it works</a>
            <a href="#forest">The Forest</a>
          </div>
        ) : null}
      </header>

      <main>
        <section className="landing-hero">
          <div>
            <p className="landing-eyebrow">Weekly PM Skill Builder</p>
            <LandingAnimatedHeading level={1}>
              <NothingAccentText text="Grow your PM skills." />
              <br />
              <NothingAccentText text="One tree at a time." />
            </LandingAnimatedHeading>
            <p>
              A weekly learning system built on real products. Read. Listen. Visualize. Watch your knowledge become a
              forest.
            </p>
            <div className="landing-hero-cta">
              <Button className="landing-btn-primary" onClick={() => setAuthOpen("signup")}>
                Start Growing - it's free
              </Button>
              <a href="#how" className="landing-btn-link">
                See how it works ↓
              </a>
            </div>
            <p className="landing-stats">Weekly PM skill builder for consistent long-term growth.</p>
          </div>
          <div className="hero-tree">
            <img
              src={`${import.meta.env.BASE_URL}landing-forest-night.png`}
              alt="Night forest — PM Grove"
              className="hero-tree-image"
              onError={(e) => {
                e.currentTarget.src = `${import.meta.env.BASE_URL}landing-hero-tree.png`;
              }}
            />
          </div>
        </section>

        <section id="how" className="landing-section">
          <LandingAnimatedHeading level={2}>From trunk to tree in three steps</LandingAnimatedHeading>
          <div className="how-grid">
            <article className="how-card">
              <Leaf size={18} />
              <LandingAnimatedHeading level={3} className="how-card-heading-motion">
                Read the deep dive
              </LandingAnimatedHeading>
              <p>Each week, one real product case study through discovery, metrics, and market sizing.</p>
              <span>Mark as Done → Earn your Seed 🌱</span>
            </article>
            <article className="how-card">
              <Headphones size={18} />
              <LandingAnimatedHeading level={3} className="how-card-heading-motion">
                Listen on the go
              </LandingAnimatedHeading>
              <p>Each case study ships as a 30+ minute podcast episode for commute, gym, or walk.</p>
              <span>Play episode → Seed sprouts 🪴</span>
            </article>
            <article className="how-card">
              <PanelsTopLeft size={18} />
              <LandingAnimatedHeading level={3} className="how-card-heading-motion">
                Lock it in visually
              </LandingAnimatedHeading>
              <p>Interactive map or infographic to revise frameworks and plant your tree.</p>
              <span>Finish map → Tree planted 🌳</span>
            </article>
          </div>
          <p className="loop-line">Stem → Branch → Trunk → Forest</p>
        </section>

        <TrunkRevealSection trunks={trunks} />

        <section id="forest" className="landing-section forest-section">
          <LandingAnimatedHeading level={2}>Every skill becomes a tree in your forest</LandingAnimatedHeading>
          <div className="forest-feature-image-wrap">
            <img
              src={`${import.meta.env.BASE_URL}landing-forest-desert.png`}
              alt="Tree progress visual in PM Grove"
              className="forest-feature-image"
            />
          </div>
          <ForestRandomPixelTrees />
          <p className="landing-stats">Forest score: 3 trees planted, 1 growing</p>
          <Button className="landing-btn-primary" onClick={() => setAuthOpen("signup")}>
            Claim your forest
          </Button>
        </section>

        <section className="landing-section">
          <LandingAnimatedHeading level={2}>From the community</LandingAnimatedHeading>
          <div className="test-grid">
            <article className="test-card">
              <p>"Day 8 on Perplexity changed how I write PRDs for AI features."</p>
              <small>AS · Senior PM, Series B SaaS</small>
            </article>
            <article className="test-card">
              <p>"I finally understand market sizing for AI products without guessing."</p>
              <small>RK · Product Lead, Fintech</small>
            </article>
            <article className="test-card">
              <p>"The forest model keeps me consistent; I never skip learning now."</p>
              <small>MN · Group PM, Consumer App</small>
            </article>
          </div>
        </section>

        <section className="landing-section cta-end">
          <LandingAnimatedHeading level={2}>Start your first tree today</LandingAnimatedHeading>
          <p>Day 1 is already waiting. No setup. Just open, read, and plant.</p>
          <Button className="landing-btn-primary" onClick={() => setAuthOpen("signup")}>
            Grow your first tree →
          </Button>
          <small>No credit card required · Cancel anytime · Your forest is permanent</small>
        </section>
      </main>

      {showFirestoreSeed ? (
        <div className="mx-auto max-w-6xl px-4 pb-6">
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-[11px] font-mono text-muted-foreground">
            <p className="mb-2 text-amber-600 dark:text-amber-400">
              Dev: with catalog writes locked in Firestore rules, this button will fail unless you temporarily allow writes or
              seed via Firebase Console / Admin SDK. Remove this block or unset VITE_ENABLE_FIREBASE_SEED when done.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={seeding || !user}
              onClick={() => void runFirestoreSeed()}
            >
              {seeding ? "Seeding…" : "Seed Firestore catalog"}
            </Button>
          </div>
        </div>
      ) : null}

      <footer className="landing-footer">
        <p>PM Grove — Built for mid-level PMs ready to level up</p>
      </footer>

      <AuthModal open={authOpen !== null} mode={authOpen ?? "signup"} onOpenChange={(v) => !v && setAuthOpen(null)} />
    </div>
  );
}
