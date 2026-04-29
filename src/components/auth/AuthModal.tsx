import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

type AuthMode = "signin" | "signup";

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, mode, onOpenChange }: AuthModalProps) {
  const { user, signIn, signUp, sendPasswordReset, firebaseMode } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  useEffect(() => {
    if (!open || !user) return;
    onOpenChange(false);
    navigate("/dashboard");
  }, [open, user, onOpenChange, navigate]);

  const submit = async () => {
    setError("");
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (mode === "signup") {
      if (!name.trim()) {
        setError("Full name is required.");
        return;
      }
      if (firebaseMode && !password.trim()) {
        setError("Password is required.");
        return;
      }
      const res = await signUp(email, name, password);
      if (!res.ok) {
        setError(res.message);
        return;
      }
      onOpenChange(false);
      navigate("/dashboard");
      return;
    }
    if (firebaseMode && !password.trim()) {
      setError("Password is required.");
      return;
    }
    const result = await signIn(email, firebaseMode ? password : password || undefined);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    onOpenChange(false);
    navigate("/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[hsl(0_0%_6%)] border-border">
        <DialogHeader>
          <DialogTitle>{mode === "signup" ? "Plant your first tree" : "Welcome back to your forest"}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {mode === "signup" ? "Create your PM Grove account." : "Sign in to continue growing your forest."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {firebaseMode ? (
            <>
              <GoogleSignInButton
                className="w-full"
                onSuccess={() => {
                  onOpenChange(false);
                  navigate("/dashboard");
                }}
              />
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-wide text-muted-foreground">
                  <span className="bg-[hsl(0_0%_6%)] px-2">or email</span>
                </div>
              </div>
            </>
          ) : null}
          {mode === "signup" ? (
            <div>
              <Label htmlFor="signup-name">Full name</Label>
              <Input id="signup-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          ) : null}
          <div>
            <Label htmlFor="auth-email">Email</Label>
            <Input id="auth-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="auth-password">Password</Label>
              {firebaseMode && mode === "signin" ? (
                <button
                  type="button"
                  className="text-[10px] text-primary hover:underline"
                  onClick={() => {
                    void (async () => {
                      setResetMsg("");
                      setError("");
                      const res = await sendPasswordReset(email);
                      if (res.ok) {
                        setResetMsg("If this email has an account, check your inbox for a reset link.");
                      } else {
                        setError(res.message);
                      }
                    })();
                  }}
                >
                  Forgot password?
                </button>
              ) : null}
            </div>
            <Input id="auth-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {resetMsg ? <p className="text-xs text-emerald-500">{resetMsg}</p> : null}
          {error ? <p className="text-xs text-amber-400">{error}</p> : null}
          <Button className="w-full" type="button" onClick={() => void submit()}>
            {mode === "signup" ? "Create account" : "Sign in"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
