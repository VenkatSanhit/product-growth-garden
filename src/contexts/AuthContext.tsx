import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type GroveUser = {
  email: string;
  name: string;
};

const PROFILES_KEY = "pm-grove-profiles-v1";
const SESSION_KEY = "pm-grove-session-v1";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function loadProfiles(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) return {};
    const o = JSON.parse(raw) as unknown;
    if (!o || typeof o !== "object") return {};
    return o as Record<string, string>;
  } catch {
    return {};
  }
}

function saveProfiles(map: Record<string, string>) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(map));
}

function readSessionUser(): GroveUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { email?: string };
    if (!data?.email || typeof data.email !== "string") return null;
    const email = normalizeEmail(data.email);
    const profiles = loadProfiles();
    const name = profiles[email];
    if (!name) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return { email, name };
  } catch {
    return null;
  }
}

type AuthContextValue = {
  user: GroveUser | null;
  signUp: (email: string, name: string) => void;
  signIn: (email: string) => { ok: true } | { ok: false; message: string };
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GroveUser | null>(() =>
    typeof window !== "undefined" ? readSessionUser() : null,
  );

  const signUp = useCallback((email: string, name: string) => {
    const e = normalizeEmail(email);
    const n = name.trim();
    if (!e || !n) return;
    const profiles = loadProfiles();
    profiles[e] = n;
    saveProfiles(profiles);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: e }));
    setUser({ email: e, name: n });
  }, []);

  const signIn = useCallback((email: string) => {
    const e = normalizeEmail(email);
    if (!e) return { ok: false as const, message: "Email is required." };
    const profiles = loadProfiles();
    const name = profiles[e];
    if (!name) {
      return {
        ok: false as const,
        message: "No free account for this email yet. Create one on the sign-up page.",
      };
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: e }));
    setUser({ email: e, name });
    return { ok: true as const };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, signUp, signIn, signOut }),
    [user, signUp, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
