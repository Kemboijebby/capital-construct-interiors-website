import { NavLink, Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { LayoutGrid, Users, LogOut, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { to: "/crm", label: "Pipeline", icon: LayoutGrid, end: true },
  { to: "/crm/leads", label: "Leads", icon: Users, end: false },
];

const CrmLayout = () => {
  const { session, loading, user, signOut } = useAuth();
  const { pathname } = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <p className="eyebrow animate-pulse">Loading studio…</p>
      </div>
    );
  }
  if (!session) return <Navigate to="/auth" replace state={{ from: pathname }} />;

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border/60 bg-foreground text-background">
        <div className="p-8 border-b border-background/10">
          <Link to="/" className="font-display text-xl tracking-tight block">
            Capital Construct<span className="text-accent">.</span>
          </Link>
          <p className="eyebrow text-background/50 mt-2">Studio CRM</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.22em] transition-colors ${
                  isActive
                    ? "bg-background/10 text-accent"
                    : "text-background/70 hover:text-background hover:bg-background/5"
                }`
              }
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-background/10 space-y-3">
          <p className="text-xs text-background/50 truncate">{user?.email}</p>
          <button
            onClick={signOut}
            className="w-full inline-flex items-center justify-center gap-2 border border-background/20 px-4 py-3 text-[10px] uppercase tracking-[0.22em] hover:bg-background/10 transition-colors"
          >
            <LogOut className="h-3 w-3" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-foreground text-background px-5 py-4 border-b border-background/10">
        <Link to="/crm" className="font-display text-lg">
          Capital Construct<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-3">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `text-[10px] uppercase tracking-[0.22em] ${
                  isActive ? "text-accent" : "text-background/70"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <button onClick={signOut} aria-label="Sign out" className="text-background/70">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      <main className="flex-1 lg:pl-0 pt-16 lg:pt-0 overflow-x-hidden">
        <div className="px-6 md:px-10 py-8 md:py-12">
          <div className="hidden lg:flex justify-end mb-6">
            <Link
              to="/"
              target="_blank"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-accent transition-colors"
            >
              View public site
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CrmLayout;