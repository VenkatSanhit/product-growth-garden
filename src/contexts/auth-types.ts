export type GroveUser = {
  email: string;
  name: string;
  /** Present when signed in with Firebase Auth */
  uid?: string;
};

export type AuthResult = { ok: true } | { ok: false; message: string };

export type AuthContextValue = {
  user: GroveUser | null;
  /** True when VITE_FIREBASE_* is set and Firebase Auth drives the session */
  firebaseMode: boolean;
  signUp: (email: string, name: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password?: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};
