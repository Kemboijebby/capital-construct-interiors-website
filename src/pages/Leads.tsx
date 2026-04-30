import CRMBoard from "@/components/CRMBoard";
import { leads } from "@/data/leads";

export default function Leads() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="font-display text-3xl">Leads</h1>
      <CRMBoard leads={leads} />
    </div>
  );
}