import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import about from "@/assets/about-studio.jpg";
import detail from "@/assets/detail-curtains.jpg";
import SectionHeader from "@/components/site/SectionHeader";

const About = () => (
  <>
    <section className="pt-40 pb-20 md:pt-48 md:pb-28">
      <div className="container-luxe grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 animate-fade-in">About the Studio</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] animate-fade-in" style={{ animationDelay: "0.15s" }}>
            A studio devoted to <em className="not-italic text-accent">quiet luxury</em> and uncompromising craft.
          </h1>
        </div>
        <p className="lg:col-span-4 text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Founded on a belief that space shapes the way we live and work, Capital Construct Interiors is
          a multidisciplinary practice spanning design, finishing and fit-out.
        </p>
      </div>
    </section>

    <section className="container-luxe pb-24">
      <div className="img-zoom aspect-[16/8] overflow-hidden">
        <img src={about} alt="Designer reviewing plans in studio" className="h-full w-full object-cover" loading="lazy" width={1600} height={1280} />
      </div>
    </section>

    <section className="container-luxe py-24 md:py-32 grid lg:grid-cols-2 gap-16">
      <div>
        <p className="eyebrow mb-5">Our Story</p>
        <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">From a single villa to a hundred signatures.</h2>
      </div>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          What began as a small atelier in 2013 has grown into a trusted name for premium interiors
          across residential, office and commercial sectors. The principles, however, remain the
          same — listen carefully, design intentionally, build beautifully.
        </p>
        <p>
          We collaborate with architects, developers and discerning private clients who value the
          difference between decoration and design — between a finish and a finished space.
        </p>
      </div>
    </section>

    <section className="bg-brand-cream/60 py-24 md:py-32">
      <div className="container-luxe grid md:grid-cols-2 gap-px bg-border">
        {[
          { title: "Our Mission", text: "To create interiors that endure — designed with intention, executed with precision, and lived in with pride." },
          { title: "Our Vision", text: "To be the studio of choice for clients who refuse compromise, and to set the standard for premium fit-out in every space we touch." },
        ].map((b) => (
          <div key={b.title} className="bg-background p-12 md:p-16">
            <p className="eyebrow mb-5">{b.title.split(" ")[1]}</p>
            <h3 className="font-display text-3xl md:text-4xl mb-6">{b.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{b.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-24 md:py-32">
      <div className="container-luxe grid lg:grid-cols-2 gap-16 items-center">
        <div className="img-zoom aspect-[4/5] overflow-hidden order-2 lg:order-1">
          <img src={detail} alt="Curtain detail" loading="lazy" className="h-full w-full object-cover" width={1280} height={1600} />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeader eyebrow="Why clients trust us" title="Reputation built one detail at a time." />
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {[
              "A senior designer assigned to every project — start to finish.",
              "In-house workshop for joinery, drapery and bespoke finishings.",
              "Transparent fixed-scope quotations with no hidden costs.",
              "Five-year quality guarantee on all major fit-out work.",
              "Discretion and confidentiality for private and corporate clients.",
            ].map((t, i) => (
              <li key={i} className="py-5 flex gap-6 items-start">
                <span className="font-display text-accent text-lg w-8">0{i + 1}</span>
                <p className="text-foreground/90">{t}</p>
              </li>
            ))}
          </ul>
          <Link to="/quote" className="mt-10 inline-flex items-center gap-3 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.28em] text-background transition-all duration-500 hover:bg-accent">
            Request Quote <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default About;