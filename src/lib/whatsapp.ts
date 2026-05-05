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