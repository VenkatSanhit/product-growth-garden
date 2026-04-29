import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const defaultFirebaseConfig = {
  apiKey: "AIzaSyAMiEGZZ6ny5uGyfEUCoI6NkSWh6RumpQw",
  authDomain: "pm-grove.firebaseapp.com",
  projectId: "pm-grove",
  storageBucket: "pm-grove.firebasestorage.app",
  messagingSenderId: "938295907794",
  appId: "1:938295907794:web:1b918ef03dfb80a709640b",
};

const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string | undefined) || defaultFirebaseConfig.apiKey,
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined) || defaultFirebaseConfig.authDomain,
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined) || defaultFirebaseConfig.projectId,
  storageBucket:
    (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined) || defaultFirebaseConfig.storageBucket,
  messagingSenderId:
    (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined) || defaultFirebaseConfig.messagingSenderId,
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string | undefined) || defaultFirebaseConfig.appId,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

let app: FirebaseApp | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase is not configured. Add VITE_FIREBASE_* keys to your .env (see .env.example).",
    );
  }
  if (!app) {
    app =
      getApps().length > 0
        ? getApp()
        : initializeApp({
            apiKey: firebaseConfig.apiKey!,
            authDomain: firebaseConfig.authDomain,
            projectId: firebaseConfig.projectId!,
            storageBucket: firebaseConfig.storageBucket,
            messagingSenderId: firebaseConfig.messagingSenderId,
            appId: firebaseConfig.appId,
          });
  }
  return app;
}

export function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}
