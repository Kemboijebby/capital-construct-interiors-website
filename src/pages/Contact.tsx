import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP = "15550102200";

const Contact = () => (
  <>
    <section className="pt-40 pb-20 md:pt-48 md:pb-24">
      <div className="container-luxe">
        <p className="eyebrow mb-6 animate-fade-in">Contact</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-4xl animate-fade-in" style={{ animationDelay: "0.15s" }}>
          We'd love to hear about your <em className="not-italic text-accent">project</em>.
        </h1>
      </div>
    </section>

    <section className="container-luxe pb-24 md:pb-32 grid lg:grid-cols-3 gap-px bg-border border border-border">
      {[
        { icon: Phone, label: "Phone", value: "+1 (555) 010 2200", href: "tel:+15550102200" },
        { icon: MessageCircle, label: "WhatsApp", value: "Chat with the studio", href: `https://wa.me/${WHATSAPP}` },
        { icon: Mail, label: "Email", value: "hello@capitalconstruct.co", href: "mailto:hello@capitalconstruct.co" },
      ].map(({ icon: Icon, label, value, href }) => (
        <a key={label} href={href} className="group bg-background p-10 transition-colors duration-500 hover:bg-foreground hover:text-background">
          <Icon className="h-6 w-6 text-accent" />
          <p className="eyebrow mt-8 group-hover:text-background/60 transition-colors">{label}</p>
          <p className="mt-3 font-display text-2xl">{value}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] group-hover:text-accent">
            Open <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </a>
      ))}
    </section>

    <section className="bg-brand-cream/60 py-24 md:py-32">
      <div className="container-luxe grid lg:grid-cols-2 gap-16">
        <div>
          <p className="eyebrow mb-5">Studio</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">Visit by appointment.</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            Studio 14, Design District<br />
            Open Monday – Friday, 9am – 6pm<br />
            Saturday by appointment
          </p>
          <div className="mt-8 flex items-center gap-5 text-foreground/70">
            <a aria-label="Instagram" href="#" className="hover:text-accent"><Instagram className="h-5 w-5" /></a>
            <a aria-label="Facebook" href="#" className="hover:text-accent"><Facebook className="h-5 w-5" /></a>
            <a aria-label="LinkedIn" href="#" className="hover:text-accent"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-5"><MapPin className="h-3.5 w-3.5 inline mr-2" /> Service Coverage</p>
          <h3 className="font-display text-3xl mb-6">Where we work.</h3>
          <ul className="grid grid-cols-2 gap-y-3 text-foreground/85 border-t border-border pt-6">
            {["Capital City", "Greater Metro", "Northern Suburbs", "Coastal Region", "Business District", "Nationwide on request"].map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="h-1 w-1 bg-accent rounded-full" /> {c}
              </li>
            ))}
          </ul>

          <Link to="/quote" className="mt-12 inline-flex items-center gap-3 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.28em] text-background transition-all duration-500 hover:bg-accent">
            Request Quote <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Contact;