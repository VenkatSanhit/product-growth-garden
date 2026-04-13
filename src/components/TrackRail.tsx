import { Link, useLocation, useNavigate } from "react-router-dom";
import { tracks } from "@/data/catalog";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface TrackRailProps {
  activeTrackSlug?: string;
  className?: string;
}

export function TrackRail({ activeTrackSlug, className }: TrackRailProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const playbookActive = location.pathname === "/playbook";

  return (
    <nav
      className={cn(
        "hidden lg:flex w-[13.25rem] shrink-0 flex-col border-r border-border/50 bg-background/35 min-h-screen py-6 px-3",
        className,
      )}
      aria-label="Trunks"
    >
      <div className="flex flex-col min-h-0 flex-1">
      <Link
        to="/"
        className="mb-4 px-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground hover:text-primary transition-colors"
      >
        PM Grove
      </Link>
      <Link
        to="/playbook"
        className={cn(
          "mb-5 px-2 py-2 rounded-md block text-[10px] font-mono uppercase tracking-[0.15em] border transition-colors",
          playbookActive
            ? "border-primary/35 bg-primary/10 text-primary"
            : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/25",
        )}
      >
        Academy map
      </Link>
      <p className="px-2 mb-2 text-[8px] font-mono uppercase tracking-[0.28em] text-dim">Trunks</p>
      <ul className="flex flex-col gap-0.5 overflow-y-auto">
        {tracks.map((t) => {
          const active = t.slug === activeTrackSlug;
          return (
            <li key={t.id}>
              <Link
                to={`/t/${t.slug}`}
                className={cn(
                  "block rounded-md px-2 py-2 text-[11px] font-mono leading-snug transition-colors border border-transparent",
                  active
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                )}
              >
                {t.title}
              </Link>
            </li>
          );
        })}
      </ul>
      </div>

      <div className="shrink-0 pt-6 px-2 border-t border-border/40">
        <p className="text-[9px] font-mono text-dim uppercase tracking-wider mb-1">Signed in</p>
        <p className="text-[10px] font-mono text-muted-foreground truncate mb-3" title={user?.email}>
          {user?.name ?? "—"}
        </p>
        <button
          type="button"
          onClick={() => {
            signOut();
            navigate("/login");
          }}
          className="w-full text-left text-[10px] font-mono uppercase tracking-wider text-dim hover:text-foreground transition-colors py-1.5"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
