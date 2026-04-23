import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import { BrandMark } from "@/components/BrandMark";

/** Visible on small screens where the left rail (with Sign out) is hidden. */
export function MobileSignOutBar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const onAuthPage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  if (!user || onAuthPage) return null;

  return (
    <div className="lg:hidden fixed top-3 right-3 z-[60] flex items-center gap-2">
      <BrandMark size={22} />
      <span className="max-w-[32vw] truncate text-[9px] font-mono text-muted-foreground" title={user.email}>
        {user.name}
      </span>
      <button
        type="button"
        onClick={() => {
          void signOut().then(() => navigate("/login"));
        }}
        className="rounded-md border border-border/60 bg-background/90 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-dim backdrop-blur-sm hover:text-foreground"
      >
        Out
      </button>
    </div>
  );
}
