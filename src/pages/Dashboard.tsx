import CRMBoard from "@/components/CRMBoard";
import { leads } from "@/data/leads";

export default function Dashboard() {
  const totalRevenue = leads.reduce((acc, l) => acc + l.value, 0);

  return (
    <div className="p-8 space-y-6">
      <h1 className="font-display text-3xl">Capital Construct CRM</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 border border-border bg-card rounded">Total Leads: {leads.length}</div>
        <div className="p-4 border border-border bg-card rounded">
          Pipeline Value: KES {totalRevenue.toLocaleString()}
        </div>
        <div className="p-4 border border-accent bg-accent/10 text-accent rounded">
          High Ticket Mode: ACTIVE
        </div>
      </div>
      <CRMBoard leads={leads} />
    </div>
  );
}
