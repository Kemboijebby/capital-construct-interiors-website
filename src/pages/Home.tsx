import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Award, Compass, Gem, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero-living.jpg";
import detail from "@/assets/detail-curtains.jpg";
import about from "@/assets/about-studio.jpg";
import { services, projects, testimonials, processSteps } from "@/data/site";
import SectionHeader from "@/components/site/SectionHeader";
import { FadeUp } from "@/components/FadeUp";

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-end overflow-hidden">
        <motion.img
          src={hero}
          alt="Luxurious modern living room with linen curtains and gypsum ceiling"
          width={1920}
          height={1280}
          style={{ scale: heroScale }}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-charcoal/30 to-transparent" />

        <motion.div style={{ opacity: heroOpacity }} className="relative container-luxe pb-20 md:pb-28 pt-32 text-brand-ivory">
          <p className="eyebrow !text-brand-ivory/70 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Interior Design · Finishing · Fit-Out
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] max-w-5xl animate-fade-in" style={{ animationDelay: "0.35s" }}>
            Transforming spaces into <em className="not-italic text-accent">timeless</em> experiences.
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-brand-ivory/80 leading-relaxed animate-fade-in" style={{ animationDelay: "0.55s" }}>
            A boutique studio crafting refined interiors for homes, offices and commercial spaces — where
            quality, elegance and precision meet.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <Link
              to="/quote"
              className="group inline-flex items-center gap-3 bg-brand-ivory px-8 py-4 text-xs uppercase tracking-[0.28em] text-brand-charcoal transition-all duration-500 hover:bg-accent hover:text-accent-foreground"
            >
              Get Free Design Quote
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link to="/projects" className="text-sm tracking-wide text-brand-ivory/90 link-underline">
              View Projects
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl border-t border-brand-ivory/15 pt-8 animate-fade-in-slow" style={{ animationDelay: "1s" }}>
            {[
              { k: "12+", v: "Years of craft" },
              { k: "240+", v: "Spaces delivered" },
              { k: "98%", v: "Client referrals" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-3xl md:text-4xl text-brand-ivory">{s.k}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-brand-ivory/60">{s.v}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* INTRO STRIP */}
      <section className="container-luxe py-24 md:py-32 grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6">The Studio</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            Considered interiors, executed with the discipline of architecture and the soul of craft.
          </h2>
        </div>
        <div className="lg:col-span-5 space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            We design and deliver spaces that feel inevitable — restrained where it should be quiet,
            generous where it should sing. Every project is a partnership built on trust and detail.
          </p>
          <Link to="/about" className="inline-flex text-sm tracking-wide text-foreground link-underline">
            About the studio →
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-brand-cream/60 py-24 md:py-32">
        <div className="container-luxe">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <FadeUp>
              <SectionHeader eyebrow="Services" title="A complete fit-out, from concept to handover." />
            </FadeUp>
            <Link to="/services" className="text-sm link-underline self-start md:self-end">All services →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.slice(0, 6).map((s, i) => (
              <motion.article
                key={s.slug}
                whileHover={{ rotateY: 6, rotateX: 4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 120 }}
                style={{ transformStyle: "preserve-3d", animationDelay: `${i * 60}ms` }}
                className="group bg-background p-10 transition-colors duration-500 hover:bg-foreground hover:text-background"
              >
                <p className="eyebrow group-hover:text-background/60 transition-colors">0{i + 1}</p>
                <h3 className="mt-6 font-display text-3xl">{s.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-background/75 transition-colors">
                  {s.summary}
                </p>
                <Link
                  to="/quote"
                  className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] group-hover:text-accent transition-colors"
                >
                  Get Free Design Quote <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 md:py-32">
        <div className="container-luxe grid lg:grid-cols-2 gap-16 items-center">
          <div className="img-zoom relative aspect-[4/5] overflow-hidden">
            <img src={detail} alt="Detail of luxury linen curtains" loading="lazy" className="h-full w-full object-cover" width={1280} height={1600} />
          </div>
          <div>
            <SectionHeader eyebrow="Why Capital Construct" title="The marks of a project handled with care." />
            <div className="mt-12 space-y-10">
              {[
                { icon: Gem, title: "Premium materials", text: "Sourced from trusted ateliers — natural stone, hardwoods, linen, and bespoke joinery." },
                { icon: Compass, title: "Architectural rigour", text: "Layouts and details are drawn, modelled and engineered before a single wall is touched." },
                { icon: ShieldCheck, title: "On time, on budget", text: "Transparent scopes, milestone reporting and dedicated project leads on every site." },
                { icon: Award, title: "Lasting craftsmanship", text: "We build with longevity in mind — finishings that age beautifully, not quickly." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-6 border-t border-border pt-8">
                  <Icon className="h-6 w-6 text-accent shrink-0" />
                  <div>
                    <h3 className="font-display text-2xl">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT SHOWCASE */}
      <section className="bg-brand-charcoal text-brand-ivory py-24 md:py-32">
        <div className="container-luxe">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <p className="eyebrow !text-brand-ivory/60 mb-5">Selected Work</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
                Recent transformations.
              </h2>
            </div>
            <Link to="/projects" className="text-sm text-brand-ivory/80 link-underline self-start md:self-end">All projects →</Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((p) => (
              <Link
                to="/projects"
                key={p.id}
                className="group block"
              >
                <div className="img-zoom aspect-[4/5] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" width={1280} height={1600} className="h-full w-full object-cover" />
                </div>
                <div className="flex items-end justify-between pt-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{p.category}</p>
                    <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-brand-ivory/60 transition-all duration-500 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeader eyebrow="Process" title="Four chapters, one vision." description="A clear, considered journey from first conversation to final handover." />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {processSteps.map((s) => (
              <div key={s.n} className="bg-background p-10">
                <p className="font-display text-5xl text-accent">{s.n}</p>
                <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-brand-cream/60 py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeader eyebrow="Testimonials" title="Words from clients." align="center" />
          <div className="mt-16 grid md:grid-cols-3 gap-px bg-border">
            {testimonials.map((t) => (
              <figure key={t.author} className="bg-background p-10">
                <p className="font-display text-2xl leading-snug text-foreground">“{t.quote}”</p>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="text-sm font-medium">{t.author}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <img src={about} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-brand-charcoal/85" />
        <div className="relative container-luxe py-28 md:py-40 text-center text-brand-ivory">
          <p className="eyebrow !text-brand-ivory/60 mb-6">Begin</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto">
            Let's design a space worth coming home to.
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-brand-ivory/75">
            Tell us about your project — we typically respond within one business day with a tailored proposal.
          </p>
          <Link
            to="/quote"
            className="mt-12 inline-flex items-center gap-3 bg-brand-ivory px-10 py-5 text-xs uppercase tracking-[0.28em] text-brand-charcoal transition-all duration-500 hover:bg-accent hover:text-accent-foreground"
          >
            Get Free Design Quote <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;