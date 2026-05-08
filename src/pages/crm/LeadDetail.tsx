import { useEffect, useState, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Trash2,
  Save,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  STAGES,
  buildWhatsAppLink,
  formatCurrency,
  initials,
  isOverdue,
  relativeFromNow,
  scoreTone,
  stageAccent,
} from "@/lib/crm";
import { salesSequence } from "@/lib/whatsapp";
import type { Database } from "@/integrations/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];
type Activity = Database["public"]["Tables"]["lead_activities"]["Row"];

const toLocalInput = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 16);
};

const LeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    document.title = "Lead · Capital Construct CRM";
    const load = async () => {
      const [{ data: leadData, error: leadErr }, { data: actData }] = await Promise.all([
        supabase.from("leads").select("*").eq("id", id).maybeSingle(),
        supabase
          .from("lead_activities")
          .select("*")
          .eq("lead_id", id)
          .order("created_at", { ascending: false }),
      ]);
      if (leadErr) toast.error(leadErr.message);
      setLead(leadData ?? null);
      setActivities(actData ?? []);
      setLoading(false);
    };
    load();
  }, [id]);

  const update = async (patch: Partial<Lead>) => {
    if (!lead) return;
    setSaving(true);
    const { data, error } = await supabase
      .from("leads")
      .update(patch)
      .eq("id", lead.id)
      .select()
      .maybeSingle();
    if (error) toast.error(error.message);
    else if (data) {
      setLead(data);
      toast.success("Updated");
    }
    setSaving(false);
  };

  const addNote = async (e: FormEvent) => {
    e.preventDefault();
    if (!lead || !note.trim()) return;
    const { data, error } = await supabase
      .from("lead_activities")
      .insert({
        lead_id: lead.id,
        body: note.trim(),
        author_id: user?.id ?? null,
        kind: "note",
      })
      .select()
      .maybeSingle();
    if (error) toast.error(error.message);
    else if (data) {
      setActivities([data, ...activities]);
      setNote("");
    }
  };

  const removeLead = async () => {
    if (!lead) return;
    if (!confirm(`Delete lead "${lead.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("leads").delete().eq("id", lead.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Lead deleted");
      navigate("/crm/leads");
    }
  };

  if (loading) {
    return <p className="eyebrow animate-pulse">Loading lead…</p>;
  }
  if (!lead) {
    return (
      <div className="text-center py-20">
        <p className="font-display text-3xl">Lead not found.</p>
        <Link to="/crm/leads" className="link-underline text-sm mt-4 inline-block">
          ← Back to leads
        </Link>
      </div>
    );
  }

  const overdue = isOverdue(lead.follow_up_at) && lead.stage !== "won" && lead.stage !== "lost";
  const wa = buildWhatsAppLink(
    lead.phone,
    `Hi ${lead.name.split(" ")[0]}, this is Capital Construct Interiors regarding your ${lead.service ?? "project"} inquiry.`,
  );

  return (
    <div className="space-y-10 animate-fade-in max-w-6xl">
      <Link
        to="/crm/leads"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-3 w-3" /> All leads
      </Link>

      <header className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:items-center">
        <div className="h-20 w-20 grid place-items-center bg-foreground text-background font-display text-2xl">
          {initials(lead.name)}
        </div>
        <div>
          <p className="eyebrow">{lead.source.replace("_", " ")}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-1">{lead.name}</h1>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{lead.email}</span>
            {lead.phone && <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{lead.phone}</span>}
            {lead.location && <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{lead.location}</span>}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-xs uppercase tracking-[0.22em] text-accent-foreground hover:bg-foreground transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center gap-2 border border-border px-5 py-3 text-xs uppercase tracking-[0.22em] hover:border-accent hover:text-accent transition-colors"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <Tile label="Stage">
          <span className={`inline-flex items-center px-3 py-1.5 text-xs uppercase tracking-[0.22em] border ${stageAccent[lead.stage]}`}>
            {lead.stage}
          </span>
          <select
            value={lead.stage}
            onChange={(e) => update({ stage: e.target.value as Lead["stage"] })}
            className="mt-4 w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent"
          >
            {STAGES.map((s) => (
              <option key={s.key} value={s.key}>{s.label} — {s.hint}</option>
            ))}
          </select>
        </Tile>

        <Tile label="Lead score">
          <p className={`font-display text-5xl ${scoreTone(lead.score)}`}>{lead.score}</p>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={lead.score}
            onMouseUp={(e) => update({ score: Number((e.target as HTMLInputElement).value) })}
            onTouchEnd={(e) => update({ score: Number((e.target as HTMLInputElement).value) })}
            className="w-full mt-3 accent-foreground"
          />
          <div className="h-1 w-full bg-border mt-2 overflow-hidden">
            <div className="h-full bg-accent" style={{ width: `${lead.score}%` }} />
          </div>
        </Tile>

        <Tile label="Estimated revenue">
          <p className="font-display text-4xl">{formatCurrency(Number(lead.estimated_revenue))}</p>
          <input
            type="number"
            min={0}
            step={500}
            defaultValue={Number(lead.estimated_revenue)}
            onBlur={(e) => {
              const v = Number(e.target.value);
              if (v !== Number(lead.estimated_revenue)) update({ estimated_revenue: v });
            }}
            className="mt-4 w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent"
          />
        </Tile>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="border border-border bg-card p-6 md:p-8">
            <p className="eyebrow">Project brief</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <Field label="Type">{lead.project_type ?? "—"}</Field>
              <Field label="Service">{lead.service ?? "—"}</Field>
              <Field label="Budget">{lead.budget ?? "—"}</Field>
              <Field label="Submitted">
                {new Date(lead.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Field>
            </div>
            {lead.notes && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="eyebrow mb-2">Client notes</p>
                <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
                  {lead.notes}
                </p>
              </div>
            )}
          </section>

          <section className="border border-border bg-card p-6 md:p-8">
            <p className="eyebrow">Internal log</p>
            <form onSubmit={addNote} className="mt-4 flex gap-3">
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add an internal note…"
                maxLength={500}
                className="flex-1 bg-transparent border-b border-border focus:border-accent outline-none py-2 text-sm"
              />
              <button
                type="submit"
                disabled={!note.trim()}
                className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-background hover:bg-accent transition-colors disabled:opacity-50"
              >
                <Send className="h-3 w-3" /> Log
              </button>
            </form>
            <ul className="mt-6 space-y-4">
              {activities.length === 0 && (
                <li className="text-xs text-muted-foreground">No notes yet.</li>
              )}
              {activities.map((a) => (
                <li key={a.id} className="border-l-2 border-accent/40 pl-4">
                  <p className="text-sm text-foreground/90">{a.body}</p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-1">
                    {new Date(a.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="border border-border bg-card p-6">
            <p className="eyebrow">Next follow-up</p>
            <p className={`font-display text-2xl mt-2 ${overdue ? "text-destructive" : "text-foreground"}`}>
              {relativeFromNow(lead.follow_up_at)}
            </p>
            <input
              type="datetime-local"
              defaultValue={toLocalInput(lead.follow_up_at)}
              onBlur={(e) => {
                const v = e.target.value;
                update({ follow_up_at: v ? new Date(v).toISOString() : null });
              }}
              className="mt-4 w-full bg-transparent border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </section>

          <section className="border border-border bg-card p-6 space-y-3">
            <p className="eyebrow">Quick actions</p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-sm py-2 border-b border-border hover:text-accent transition-colors"
            >
              <span>Send WhatsApp intro</span>
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={buildWhatsAppLink(
                lead.phone,
                `Hi ${lead.name.split(" ")[0]}, would you be available for a brief consultation this week to discuss your ${lead.service ?? "project"}? — Capital Construct Interiors`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-sm py-2 border-b border-border hover:text-accent transition-colors"
            >
              <span>Book consultation</span>
              <MessageCircle className="h-4 w-4" />
            </a>
            <button
              onClick={removeLead}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 border border-destructive/40 text-destructive px-4 py-3 text-[10px] uppercase tracking-[0.22em] hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <Trash2 className="h-3 w-3" /> Delete lead
            </button>
          </section>

          <section className="border border-border bg-card p-6">
            <p className="eyebrow">Sales sequence</p>
            <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
              5-stage follow-up cadence. Tap a stage to open WhatsApp with the message ready.
            </p>
            <ul className="mt-4 space-y-2">
              {salesSequence.map((s) => {
                const firstName = lead.name.split(" ")[0];
                const link = buildWhatsAppLink(lead.phone, s.message(firstName));
                return (
                  <li key={s.key}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block border border-border/60 p-3 hover:border-accent transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-foreground group-hover:text-accent transition-colors">
                          {s.label}
                        </span>
                        <MessageCircle className="h-3 w-3 text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-1">
                        {s.timing} · {s.hint}
                      </p>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          {saving && (
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground inline-flex items-center gap-2">
              <Save className="h-3 w-3 animate-pulse" /> Saving…
            </p>
          )}
        </aside>
      </div>
    </div>
  );
};

const Tile = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border border-border bg-card p-6">
    <p className="eyebrow mb-3">{label}</p>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
    <p className="mt-1">{children}</p>
  </div>
);

export default LeadDetail;