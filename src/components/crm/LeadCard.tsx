import { Link } from "react-router-dom";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import {
  buildWhatsAppLink,
  formatCurrency,
  initials,
  isOverdue,
  projectIcon,
  relativeFromNow,
  scoreTone,
} from "@/lib/crm";
import type { Database } from "@/integrations/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const LeadCard = ({ lead }: { lead: Lead }) => {
  const Icon = projectIcon[lead.project_type ?? "Other"] ?? projectIcon.Other;
  const overdue = isOverdue(lead.follow_up_at) && lead.stage !== "won" && lead.stage !== "lost";
  return (
    <Link
      to={`/crm/leads/${lead.id}`}
      className="group block bg-card border border-border p-5 hover:border-accent transition-all hover:shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 grid place-items-center bg-secondary text-secondary-foreground text-xs tracking-wider shrink-0">
            {initials(lead.name)}
          </div>
          <div className="min-w-0">
            <p className="font-display text-lg leading-tight truncate">{lead.name}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground truncate">
              {lead.service ?? lead.project_type ?? "Inquiry"}
            </p>
          </div>
        </div>
        <div className={`text-right ${scoreTone(lead.score)}`}>
          <p className="font-display text-2xl leading-none">{lead.score}</p>
          <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Score</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Icon className="h-3.5 w-3.5" />
          {lead.project_type ?? "—"}
        </span>
        <span className="font-display text-base text-foreground">
          {formatCurrency(Number(lead.estimated_revenue))}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-[11px]">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground truncate max-w-[120px]">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{lead.location ?? "—"}</span>
        </span>
        <span
          className={`inline-flex items-center gap-1.5 ${
            overdue ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          <Clock className="h-3 w-3" />
          {relativeFromNow(lead.follow_up_at)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <a
          href={buildWhatsAppLink(
            lead.phone,
            `Hi ${lead.name.split(" ")[0]}, this is Capital Construct Interiors regarding your ${lead.service ?? "project"} inquiry.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-accent hover:text-foreground transition-colors"
        >
          <MessageCircle className="h-3 w-3" /> WhatsApp
        </a>
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground group-hover:text-accent transition-colors">
          View →
        </span>
      </div>
    </Link>
  );
};

export default LeadCard;