import { MessageCircle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP = "15550102200"; // digits only
const MESSAGE = encodeURIComponent(
  "Hi Capital Construct Interiors, I'm interested in a premium interior design project. I'd like a quote and consultation for my space."
);

const FloatingActions = () => (
  <>
    {/* WhatsApp */}
    <a
      href={`https://wa.me/${WHATSAPP}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-luxe transition-transform duration-500 hover:scale-110"
      style={{ animation: "floatSoft 4s ease-in-out infinite" }}
    >
      <MessageCircle className="h-6 w-6" />
    </a>

    {/* Sticky Mobile CTA */}
    <Link
      to="/quote"
      className="md:hidden fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 bg-foreground px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-background shadow-luxe"
    >
      Get Free Design Quote <ArrowUpRight className="h-3.5 w-3.5" />
    </Link>
  </>
);

export default FloatingActions;