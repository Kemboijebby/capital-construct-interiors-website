import { Briefcase, Building2, Hotel, Home, Sparkles } from "lucide-react";

export const STAGES = [
  { key: "new", label: "New", hint: "Just arrived" },
  { key: "qualified", label: "Qualified", hint: "Worth pursuing" },
  { key: "consultation", label: "Consultation", hint: "Discovery booked" },
  { key: "proposal", label: "Proposal", hint: "Numbers shared" },
  { key: "won", label: "Won", hint: "Closed — engaged" },
  { key: "lost", label: "Lost", hint: "Did not proceed" },
] as const;

export type Stage = (typeof STAGES)[number]["key"];

export const stageAccent: Record<Stage, string> = {
  new: "bg-muted text-muted-foreground border-border",
  qualified: "bg-secondary text-secondary-foreground border-border",
  consultation: "bg-accent/15 text-accent border-accent/30",
  proposal: "bg-foreground text-background border-foreground",
  won: "bg-emerald-600/15 text-emerald-700 border-emerald-700/30",
  lost: "bg-destructive/10 text-destructive border-destructive/30",
};

export const projectIcon: Record<string, typeof Home> = {
  Residential: Home,
  Office: Briefcase,
  Commercial: Building2,
  Hospitality: Hotel,
  Other: Sparkles,
};

export const formatCurrency = (n: number | null | undefined) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(n || 0));

export const scoreTone = (score: number) => {
  if (score >= 75) return "text-emerald-700";
  if (score >= 50) return "text-accent";
  if (score >= 30) return "text-foreground/70";
  return "text-muted-foreground";
};

export const buildWhatsAppLink = (phone: string | null | undefined, message: string) => {
  const digits = (phone || "").replace(/[^\d]/g, "");
  const target = digits || "15550102200";
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`;
};

export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

export const relativeFromNow = (iso: string | null | undefined) => {
  if (!iso) return "—";
  const target = new Date(iso).getTime();
  const diffMs = target - Date.now();
  const dayMs = 86_400_000;
  const days = Math.round(diffMs / dayMs);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  if (days > 0) return `In ${days} days`;
  return `${Math.abs(days)}d overdue`;
};

export const isOverdue = (iso: string | null | undefined) => {
  if (!iso) return false;
  return new Date(iso).getTime() < Date.now();
};