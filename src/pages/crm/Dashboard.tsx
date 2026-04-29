import { useEffect, useMemo, useState } from "react";
import { TrendingUp, Users, Target, Hourglass } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import LeadCard from "@/components/crm/LeadCard";
import { STAGES, formatCurrency, isOverdue } from "@/lib/crm";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Pipeline · Capital Construct CRM";
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      else setLeads(data ?? []);
      setLoading(false);
    };
    fetchLeads();

    const channel = supabase
      .channel("leads-board")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        () => fetchLeads(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const stats = useMemo(() => {
    const open = leads.filter((l) => l.stage !== "won" && l.stage !== "lost");
    const won = leads.filter((l) => l.stage === "won");
    const forecast = open
      .filter((l) => l.stage !== "new")
      .reduce((sum, l) => sum + Number(l.estimated_revenue), 0);
    const wonRevenue = won.reduce((sum, l) => sum + Number(l.estimated_revenue), 0);
    const overdue = open.filter((l) => isOverdue(l.follow_up_at)).length;
    const avgScore = open.length
      ? Math.round(open.reduce((s, l) => s + l.score, 0) / open.length)
      : 0;
    return { open: open.length, forecast, wonRevenue, overdue, avgScore };
  }, [leads]);

  return (
    <div className="space-y-10 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="eyebrow">Studio Pipeline</p>
          <h1 className="font-display text-4xl md:text-5xl mt-2">
            Today's <em className="not-italic text-accent">orchestration</em>.
          </h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm">
          Live pipeline of qualified inquiries. Click any card to open the lead and continue the conversation.
        </p>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={Users} label="Open leads" value={String(stats.open)} sub={`${stats.avgScore} avg score`} />
        <Stat icon={TrendingUp} label="Forecast" value={formatCurrency(stats.forecast)} sub="Qualified+ stages" />
        <Stat icon={Target} label="Closed revenue" value={formatCurrency(stats.wonRevenue)} sub="All-time wins" highlight />
        <Stat icon={Hourglass} label="Overdue" value={String(stats.overdue)} sub="Follow-ups owed" danger={stats.overdue > 0} />
      </section>

      <section>
        <div className="overflow-x-auto -mx-6 md:-mx-10 px-6 md:px-10 pb-4">
          <div className="flex gap-5 min-w-max">
            {STAGES.map((s) => {
              const list = leads.filter((l) => l.stage === s.key);
              const value = list.reduce((sum, l) => sum + Number(l.estimated_revenue), 0);
              return (
                <div key={s.key} className="w-[300px] shrink-0">
                  <div className="flex items-baseline justify-between mb-4 px-1">
                    <div>
                      <p className="font-display text-xl">{s.label}</p>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-0.5">
                        {list.length} · {formatCurrency(value)}
                      </p>
                    </div>
                    <span className="h-1.5 w-1.5 bg-accent rounded-full" />
                  </div>
                  <div className="space-y-3 min-h-[200px]">
                    {loading ? (
                      <div className="bg-card border border-border/60 p-5 h-32 animate-pulse" />
                    ) : list.length === 0 ? (
                      <div className="border border-dashed border-border p-5 text-center text-xs text-muted-foreground">
                        No leads in this stage
                      </div>
                    ) : (
                      list.map((l) => <LeadCard key={l.id} lead={l} />)
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

const Stat = ({
  icon: Icon,
  label,
  value,
  sub,
  highlight,
  danger,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
  danger?: boolean;
}) => (
  <div
    className={`p-6 border ${
      highlight
        ? "bg-foreground text-background border-foreground"
        : danger
        ? "border-destructive/40"
        : "border-border bg-card"
    }`}
  >
    <div className="flex items-center justify-between">
      <p className={`text-[10px] uppercase tracking-[0.24em] ${highlight ? "text-background/60" : "text-muted-foreground"}`}>
        {label}
      </p>
      <Icon className={`h-4 w-4 ${highlight ? "text-accent" : danger ? "text-destructive" : "text-muted-foreground"}`} />
    </div>
    <p className="font-display text-3xl mt-3">{value}</p>
    <p className={`text-xs mt-1 ${highlight ? "text-background/60" : "text-muted-foreground"}`}>{sub}</p>
  </div>
);

export default Dashboard;