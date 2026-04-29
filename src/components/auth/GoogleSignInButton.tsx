import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";

type Props = {
  className?: string;
  onSuccess?: () => void;
};

export function GoogleSignInButton({ className, onSuccess }: Props) {
  const { signInWithGoogle, firebaseMode } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!firebaseMode) return null;

  const click = async () => {
    // Start Firebase auth immediately from the direct click gesture.
    const signInPromise = signInWithGoogle();
    setError("");
    setBusy(true);
    try {
      const res = await signInPromise;
      if (res.ok) onSuccess?.();
      else setError(res.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        className={className ?? "w-full font-mono text-xs uppercase tracking-wider"}
        disabled={busy}
        onClick={() => void click()}
      >
        {busy ? "Redirecting to Google…" : "Continue with Google"}
      </Button>
      {error ? <p className="text-[11px] font-mono text-amber-600 dark:text-amber-400">{error}</p> : null}
    </div>
  );
}
