import { sendWhatsApp, templates } from "@/lib/whatsapp";
import { calculateLeadScore } from "@/lib/leadScore";

export default function CRMBoard({ leads }: any) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {leads.map((lead: any, i: number) => {
        const score = calculateLeadScore(lead);
        return (
          <div key={i} className="border border-border bg-card p-5 rounded">
            <h3 className="font-display text-lg">{lead.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">Stage: {lead.stage}</p>
            <p className="text-xs text-muted-foreground">Lead Score: {score}/100</p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <button
                onClick={() => sendWhatsApp(templates.followUp)}
                className="text-xs px-3 py-2 border border-border rounded"
              >
                Follow Up
              </button>
              <button
                onClick={() => sendWhatsApp(templates.qualification)}
                className="text-xs px-3 py-2 border border-border rounded"
              >
                Qualify
              </button>
              <button
                onClick={() => sendWhatsApp(templates.urgency)}
                className="text-xs px-3 py-2 bg-accent text-accent-foreground rounded"
              >
                Push Close
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}