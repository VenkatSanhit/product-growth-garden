import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const n = name.trim();
    const em = email.trim();
    if (!n) {
      setError("Name is required.");
      return;
    }
    if (!em) {
      setError("Email is required.");
      return;
    }
    signUp(em, n);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[hsl(0_0%_4%)] flex flex-col items-center justify-center px-4 text-foreground">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <BrandMark size={48} />
          </div>
          <h1 className="font-mono text-lg font-bold tracking-tight">Sign up</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Create a free account on this device. We only store your name and email in your browser—no server, no
            password for now.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name" className="text-[11px] font-mono uppercase tracking-wider text-dim">
              Name
            </Label>
            <Input
              id="signup-name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="How we greet you"
              className="font-mono text-sm bg-background/80"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-[11px] font-mono uppercase tracking-wider text-dim">
              Email
            </Label>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="font-mono text-sm bg-background/80"
            />
          </div>

          {error ? (
            <p className="text-[11px] font-mono text-amber-600 dark:text-amber-400">{error}</p>
          ) : null}

          <Button type="submit" className="w-full font-mono text-xs uppercase tracking-wider">
            Start learning
          </Button>
        </form>

        <p className="text-center text-[11px] font-mono text-muted-foreground">
          Already have access?{" "}
          <Link to="/login" state={{ from }} className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
