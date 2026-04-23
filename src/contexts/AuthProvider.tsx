import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthContext } from "@/contexts/auth-context";
import type { AuthResult, GroveUser } from "@/contexts/auth-types";
import { getDb, getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

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

function userFromFirebase(u: User): GroveUser {
  const email = normalizeEmail(u.email || "");
  const name = u.displayName?.trim() || email.split("@")[0] || "PM";
  return { email, name, uid: u.uid };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GroveUser | null>(() => {
    if (typeof window === "undefined") return null;
    if (isFirebaseConfigured()) {
      try {
        const u = getFirebaseAuth().currentUser;
        if (u) return userFromFirebase(u);
      } catch {
        return null;
      }
      return null;
    }
    return readSessionUser();
  });

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser ? userFromFirebase(fbUser) : null);
    });
    return () => unsub();
  }, []);

  const signUp = useCallback(async (email: string, name: string, password: string): Promise<AuthResult> => {
    const e = normalizeEmail(email);
    const n = name.trim();
    if (!e) return { ok: false, message: "Email is required." };
    if (!n) return { ok: false, message: "Name is required." };

    if (isFirebaseConfigured()) {
      if (!password.trim()) return { ok: false, message: "Password is required." };
      try {
        const auth = getFirebaseAuth();
        const cred = await createUserWithEmailAndPassword(auth, e, password);
        await updateProfile(cred.user, { displayName: n });
        const db = getDb();
        await setDoc(
          doc(db, "users", cred.user.uid),
          {
            email: e,
            name: n,
            treeCount: 0,
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
          },
          { merge: true },
        );
        return { ok: true };
      } catch (err: unknown) {
        const code = err && typeof err === "object" && "code" in err ? String((err as { code: string }).code) : "";
        if (code === "auth/email-already-in-use") {
          return { ok: false, message: "That email is already registered. Try signing in." };
        }
        return { ok: false, message: "Could not create account. Check password length (6+ chars)." };
      }
    }

    const profiles = loadProfiles();
    profiles[e] = n;
    saveProfiles(profiles);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: e }));
    setUser({ email: e, name: n });
    return { ok: true };
  }, []);

  const signIn = useCallback(async (email: string, password?: string): Promise<AuthResult> => {
    const e = normalizeEmail(email);
    if (!e) return { ok: false, message: "Email is required." };

    if (isFirebaseConfigured()) {
      if (!password?.trim()) return { ok: false, message: "Password is required." };
      try {
        const auth = getFirebaseAuth();
        await signInWithEmailAndPassword(auth, e, password);
        const db = getDb();
        const u = getFirebaseAuth().currentUser;
        if (u) {
          await setDoc(
            doc(db, "users", u.uid),
            {
              email: e,
              lastLoginAt: serverTimestamp(),
            },
            { merge: true },
          );
        }
        return { ok: true };
      } catch {
        return { ok: false, message: "Invalid email or password." };
      }
    }

    const profiles = loadProfiles();
    const name = profiles[e];
    if (!name) {
      return {
        ok: false,
        message: "No free account for this email yet. Create one on the sign-up page.",
      };
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: e }));
    setUser({ email: e, name });
    return { ok: true };
  }, []);

  const signOut = useCallback(async () => {
    if (isFirebaseConfigured()) {
      try {
        await firebaseSignOut(getFirebaseAuth());
      } catch {
        /* ignore */
      }
    }
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      firebaseMode: isFirebaseConfigured(),
      signUp,
      signIn,
      signOut,
    }),
    [user, signUp, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
