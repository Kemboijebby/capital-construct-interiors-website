export type Lead = {
  name: string;
  budget?: string;
  projectType?: string;
  timeline?: string;
  referred?: boolean;
  responsive?: boolean;
};

export const calculateLeadScore = (lead: Lead): number => {
  let score = 30; // base score
  if (lead.budget) score += 20;
  if (lead.projectType === "Full Renovation") score += 30;
  if (lead.timeline === "Urgent" || lead.timeline === "1-2 months") score += 20;
  if (lead.referred) score += 10;
  if (lead.responsive) score += 10;
  // penalties
  if (!lead.budget) score -= 10;
  return Math.max(0, Math.min(100, score));
};