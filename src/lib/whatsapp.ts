const WHATSAPP = "254722460838";

export const sendWhatsApp = (message: string) => {
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

export const templates = {
  newLead:
    "Thanks for reaching out to Capital Construct Interiors. We will review your project and respond within 24 hours.",
  qualification:
    "Could you share your project scope, budget range, and timeline so we can guide you properly?",
  followUp:
    "Just checking in on your project details so we can prepare the right design direction for you.",
  urgency:
    "We are currently scheduling premium design consultations this week. Should we prioritize your project?",
};

// 5-stage sales sequence — used in CRM lead detail Quick Actions
export type SequenceStage = {
  key: string;
  label: string;
  hint: string;
  timing: string;
  message: (firstName: string) => string;
};

export const salesSequence: SequenceStage[] = [
  {
    key: "discovery_recap",
    label: "1 · Discovery recap",
    hint: "After consultation",
    timing: "Same day",
    message: (n) =>
      `Hi ${n}, great speaking with you. We now have a clear understanding of the space and the direction for the project. I'll prepare a structured proposal outlining the recommended approach, scope, and investment range.`,
  },
  {
    key: "send_proposal",
    label: "2 · Send proposal",
    hint: "When proposal is ready",
    timing: "Within 1–2 days",
    message: (n) =>
      `Hi ${n}, I've put together the proposal for your project. It outlines how we would approach the transformation from planning to execution. Take a look when you have time, and we can walk through any questions together.`,
  },
  {
    key: "first_followup",
    label: "3 · First follow-up",
    hint: "If silent after 2 days",
    timing: "48 hours later",
    message: (n) =>
      `Hi ${n}, just checking in to see if you've had a chance to review the proposal. Happy to clarify anything or guide you on the best next step for the space.`,
  },
  {
    key: "reframe_value",
    label: "4 · Reframe value",
    hint: "Reinforce the system",
    timing: "4–5 days later",
    message: (n) =>
      `Hi ${n}, one thing worth mentioning — projects tend to move much smoother when the execution is handled under one coordinated system. That's usually where quality, timelines, and finishing standards are protected properly. Whenever you're ready, we can move to the next step.`,
  },
  {
    key: "final_touch",
    label: "5 · Final follow-up",
    hint: "Last touch",
    timing: "7–10 days later",
    message: (n) =>
      `Hi ${n}, I'll leave the proposal with you for now. If the timing becomes right later on, we'd be glad to guide you through the project properly. Wishing you all the best with the space.`,
  },
];