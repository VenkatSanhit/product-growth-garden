import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { signIn, firebaseMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/app";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await signIn(email, firebaseMode ? password : password || undefined);
    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_4%)] flex flex-col items-center justify-center px-4 text-foreground">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <BrandMark size={48} />
          </div>
          <h1 className="font-mono text-lg font-bold tracking-tight">Log in</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {firebaseMode
              ? "Sign in with your email and password (Firebase Auth)."
              : "Free access on this device. Enter the email you used when you signed up."}
          </p>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-[11px] font-mono uppercase tracking-wider text-dim">
              Email
            </Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="font-mono text-sm bg-background/80"
            />
          </div>
          {firebaseMode ? (
            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-[11px] font-mono uppercase tracking-wider text-dim">
                Password
              </Label>
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-mono text-sm bg-background/80"
              />
            </div>
          ) : null}

          {error ? (
            <p className="text-[11px] font-mono text-amber-600 dark:text-amber-400 leading-relaxed">{error}</p>
          ) : null}

          <Button type="submit" className="w-full font-mono text-xs uppercase tracking-wider">
            Continue
          </Button>
        </form>

        <p className="text-center text-[11px] font-mono text-muted-foreground">
          New here?{" "}
          <Link to="/signup" state={{ from }} className="text-primary hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
