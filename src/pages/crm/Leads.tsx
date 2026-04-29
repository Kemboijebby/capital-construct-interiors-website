import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MessageCircle, ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  STAGES,
  buildWhatsAppLink,
  formatCurrency,
  initials,
  isOverdue,
  relativeFromNow,
  scoreTone,
  stageAccent,
  type Stage,
} from "@/lib/crm";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [stageFilter, setStageFilter] = useState<Stage | "all">("all");
  const [sort, setSort] = useState<"score" | "revenue" | "recent" | "follow">("score");

  useEffect(() => {
    document.title = "Leads · Capital Construct CRM";
    const load = async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      else setLeads(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = [...leads];
    if (stageFilter !== "all") list = list.filter((l) => l.stage === stageFilter);
    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(term) ||
          l.email.toLowerCase().includes(term) ||
          (l.service ?? "").toLowerCase().includes(term) ||
          (l.location ?? "").toLowerCase().includes(term),
      );
    }
    list.sort((a, b) => {
      switch (sort) {
        case "revenue":
          return Number(b.estimated_revenue) - Number(a.estimated_revenue);
        case "recent":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "follow":
          return new Date(a.follow_up_at ?? 0).getTime() - new Date(b.follow_up_at ?? 0).getTime();
        case "score":
        default:
          return b.score - a.score;
      }
    });
    return list;
  }, [leads, q, stageFilter, sort]);

  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <p className="eyebrow">Client Ledger</p>
        <h1 className="font-display text-4xl md:text-5xl mt-2">
          All <em className="not-italic text-accent">leads</em>.
        </h1>
      </header>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative md:w-80">
          <Search className="h-4 w-4 absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, service…"
            className="w-full pl-7 bg-transparent border-b border-border focus:border-accent outline-none py-3 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setStageFilter("all")}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] border transition-colors ${
              stageFilter === "all"
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {STAGES.map((s) => (
            <button
              key={s.key}
              onClick={() => setStageFilter(s.key)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] border transition-colors ${
                stageFilter === s.key
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="ml-2 bg-transparent border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground focus:outline-none focus:border-accent"
          >
            <option value="score">Sort: Score</option>
            <option value="revenue">Sort: Revenue</option>
            <option value="recent">Sort: Recent</option>
            <option value="follow">Sort: Follow-up</option>
          </select>
        </div>
      </div>

      <div className="border border-border bg-card overflow-hidden">
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-border bg-muted/40 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <span>Lead</span>
          <span>Stage</span>
          <span>Score</span>
          <span>Estimate</span>
          <span>Follow-up</span>
          <span className="w-20 text-right">Actions</span>
        </div>
        {loading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">Loading leads…</div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <p className="font-display text-2xl">No leads match.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Try clearing filters — or wait for the next inquiry.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((l) => {
              const overdue = isOverdue(l.follow_up_at) && l.stage !== "won" && l.stage !== "lost";
              return (
                <li
                  key={l.id}
                  className="grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 hover:bg-secondary/40 transition-colors"
                >
                  <Link to={`/crm/leads/${l.id}`} className="flex items-center gap-4 min-w-0">
                    <div className="h-11 w-11 grid place-items-center bg-secondary text-xs tracking-wider shrink-0">
                      {initials(l.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-lg leading-tight truncate">{l.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {l.email} · {l.service ?? "—"}
                      </p>
                    </div>
                  </Link>
                  <span
                    className={`md:justify-self-start justify-self-end inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] border ${stageAccent[l.stage]}`}
                  >
                    {l.stage}
                  </span>
                  <div className="md:block hidden">
                    <p className={`font-display text-2xl leading-none ${scoreTone(l.score)}`}>{l.score}</p>
                    <div className="h-1 w-24 bg-border mt-1.5 overflow-hidden">
                      <div className="h-full bg-accent transition-all" style={{ width: `${l.score}%` }} />
                    </div>
                  </div>
                  <p className="md:block hidden font-display text-base">
                    {formatCurrency(Number(l.estimated_revenue))}
                  </p>
                  <p className={`md:block hidden text-xs ${overdue ? "text-destructive" : "text-muted-foreground"}`}>
                    {relativeFromNow(l.follow_up_at)}
                  </p>
                  <div className="flex items-center gap-3 md:justify-end">
                    <a
                      href={buildWhatsAppLink(
                        l.phone,
                        `Hi ${l.name.split(" ")[0]}, Capital Construct Interiors here regarding your ${l.service ?? "project"} inquiry.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="text-accent hover:text-foreground transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                    <Link
                      to={`/crm/leads/${l.id}`}
                      aria-label="Open"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leads;