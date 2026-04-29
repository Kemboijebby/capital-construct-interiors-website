import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/site";
import SectionHeader from "@/components/site/SectionHeader";

const Services = () => (
  <>
    <section className="pt-40 pb-20 md:pt-48 md:pb-24">
      <div className="container-luxe">
        <p className="eyebrow mb-6 animate-fade-in">Services</p>
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-4xl animate-fade-in" style={{ animationDelay: "0.15s" }}>
          A full-service studio for every layer of the interior.
        </h1>
        <p className="mt-8 max-w-2xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
          From space planning and architectural finishing to soft furnishings and lighting — every
          discipline is delivered under one roof, by one team.
        </p>
      </div>
    </section>

    <section className="container-luxe pb-24 md:pb-32">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
        {services.map((s, i) => (
          <article key={s.slug} className="group bg-background p-10 flex flex-col transition-colors duration-500 hover:bg-foreground hover:text-background">
            <p className="eyebrow group-hover:text-background/60 transition-colors">{(i + 1).toString().padStart(2, "0")}</p>
            <h3 className="mt-6 font-display text-3xl">{s.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-background/75 transition-colors flex-1">
              {s.summary}
            </p>
            <Link to="/quote" className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] group-hover:text-accent transition-colors">
              Request Quote <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-brand-charcoal text-brand-ivory py-24 md:py-32">
      <div className="container-luxe text-center">
        <SectionHeader eyebrow="Bespoke" title="Don't see your project? We design for it." align="center" />
        <Link to="/quote" className="mt-12 inline-flex items-center gap-3 bg-brand-ivory px-10 py-5 text-xs uppercase tracking-[0.28em] text-brand-charcoal transition-all duration-500 hover:bg-accent hover:text-accent-foreground">
          Start a conversation <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  </>
);

export default Services;