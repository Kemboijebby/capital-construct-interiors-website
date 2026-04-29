import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowUpRight, Lock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

const Auth = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Studio Access · Capital Construct CRM";
  }, []);

  if (!loading && session) return <Navigate to="/crm" replace />;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      email: fd.get("email"),
      password: fd.get("password"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/crm` },
        });
        if (error) throw error;
        toast.success("Account created. Check your inbox to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast.success("Welcome back.");
        navigate("/crm");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex lg:w-1/2 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-bronze opacity-20" />
        <div className="relative z-10 p-16 flex flex-col justify-between w-full">
          <Link to="/" className="font-display text-2xl tracking-tight">
            Capital Construct<span className="text-accent">.</span>
          </Link>
          <div className="space-y-6">
            <p className="eyebrow text-background/60">Studio CRM</p>
            <h1 className="font-display text-5xl leading-[1.05]">
              The pipeline behind every<br />
              <em className="text-accent not-italic">considered</em> project.
            </h1>
            <p className="text-background/70 max-w-md leading-relaxed">
              Track high-ticket inquiries, score intent, and orchestrate follow-ups
              with the discipline our craft demands.
            </p>
          </div>
          <p className="text-xs text-background/50 tracking-[0.2em] uppercase">
            Internal access — Senior designers & studio team
          </p>
        </div>
      </aside>

      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm space-y-10 animate-fade-in">
          <div className="space-y-3">
            <p className="eyebrow flex items-center gap-2">
              <Lock className="h-3 w-3" /> Studio Access
            </p>
            <h2 className="font-display text-4xl">
              {mode === "signin" ? "Sign in" : "Create account"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === "signin"
                ? "Continue to the client pipeline."
                : "Provision a new team workspace login."}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="eyebrow block mb-3">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-foreground transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="eyebrow block mb-3">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-foreground transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex w-full items-center justify-center gap-3 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.28em] text-background transition-all duration-500 hover:bg-accent disabled:opacity-60"
            >
              {submitting ? "Working…" : mode === "signin" ? "Enter Studio" : "Create Account"}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </form>

          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-muted-foreground link-underline"
            >
              {mode === "signin" ? "Need an account? Create one" : "Already have access? Sign in"}
            </button>
            <Link to="/" className="text-muted-foreground link-underline">
              ← Public site
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;