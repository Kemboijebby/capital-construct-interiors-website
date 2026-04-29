import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/site";

const filters = ["All", "Residential", "Office", "Commercial"] as const;

const Projects = () => {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <section className="pt-40 pb-12 md:pt-48 md:pb-16">
        <div className="container-luxe">
          <p className="eyebrow mb-6 animate-fade-in">Portfolio</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-4xl animate-fade-in" style={{ animationDelay: "0.15s" }}>
            A quiet portfolio of considered work.
          </h1>
        </div>
      </section>

      <section className="container-luxe pb-24 md:pb-32">
        <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-border pb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 ${
                active === f
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {visible.map((p, i) => (
            <Link
              to="/quote"
              key={p.id}
              className="group block"
              style={{ animation: `revealUp 0.7s ${i * 60}ms cubic-bezier(0.22,1,0.36,1) both` }}
            >
              <div className="img-zoom aspect-[4/5] overflow-hidden bg-muted">
                <img src={p.image} alt={p.title} loading="lazy" width={1280} height={1600} className="h-full w-full object-cover" />
              </div>
              <div className="flex items-end justify-between pt-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{p.category} · {p.location}</p>
                  <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;