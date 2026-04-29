import { useState } from "react";
import { z } from "zod";
import { ArrowUpRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(30),
  email: z.string().trim().email("Please enter a valid email").max(255),
  location: z.string().trim().min(2, "Please share a location").max(120),
  projectType: z.string().min(1, "Select a project type"),
  service: z.string().min(1, "Select a service"),
  budget: z.string().min(1, "Select a budget range"),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

const projectTypes = ["Residential", "Office", "Commercial", "Hospitality", "Other"];
const budgets = ["Under $10k", "$10k – $25k", "$25k – $75k", "$75k – $200k", "$200k+"];
const servicesList = [
  "Interior Finishing", "Office Fit-Out", "Gypsum Ceiling", "Curtains & Sheers",
  "Office Blinds", "Wallpapers", "Renovation", "Space Planning", "Lighting", "Other",
];

const WHATSAPP = "15550102200";

const fieldClass =
  "w-full bg-transparent border-b border-border focus:border-accent outline-none py-3 text-foreground placeholder:text-muted-foreground/70 transition-colors";

const Quote = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      toast.error("Please review the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Quote request sent. We'll be in touch within 1 business day.");
  };

  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="container-luxe grid lg:grid-cols-12 gap-16">
        {/* Intro */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start space-y-8">
          <p className="eyebrow animate-fade-in">Request a Quote</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.02] animate-fade-in" style={{ animationDelay: "0.15s" }}>
            Tell us about your <em className="not-italic text-accent">project</em>.
          </h1>
          <p className="text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Share a few details and a senior designer will respond within one business day with
            considered next steps and a tailored proposal.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Capital Construct Interiors, I'm interested in a premium interior design project. I'd like a quote and consultation for my space.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-border px-6 py-4 text-xs uppercase tracking-[0.22em] hover:border-accent hover:text-accent transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> Quick chat on WhatsApp
          </a>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="border border-border p-12 text-center animate-fade-in">
              <CheckCircle2 className="h-12 w-12 text-accent mx-auto" />
              <h2 className="font-display text-4xl mt-6">Request received.</h2>
              <p className="mt-4 text-muted-foreground">
                A senior designer will review your project and respond within <strong>24 hours</strong> with a tailored direction and estimate.
              </p>
              <div className="mt-8 space-y-3 text-sm text-muted-foreground">
                <p>✔ Expect a WhatsApp or email response</p>
                <p>✔ You may be asked for a site visit</p>
                <p>✔ We only take a limited number of active projects</p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-3 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.22em] text-background hover:bg-accent transition-colors"
              >
                Follow up on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10" noValidate>
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Full Name" name="name" error={errors.name} />
                <Field label="Phone Number" name="phone" type="tel" error={errors.phone} />
                <Field label="Email" name="email" type="email" error={errors.email} />
                <Field label="Location" name="location" error={errors.location} />

                <SelectField label="Type of Project" name="projectType" options={projectTypes} error={errors.projectType} />
                <SelectField label="Service Needed" name="service" options={servicesList} error={errors.service} />
                <SelectField label="Budget Range" name="budget" options={budgets} error={errors.budget} className="md:col-span-2" />
              </div>

              <div>
                <label className="eyebrow block mb-3">Additional Notes</label>
                <textarea
                  name="notes"
                  rows={4}
                  maxLength={1000}
                  placeholder="Tell us about the space, timeline or inspiration…"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-3 bg-foreground px-10 py-5 text-xs uppercase tracking-[0.28em] text-background transition-all duration-500 hover:bg-accent"
              >
                Request Design Consultation
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <p className="text-xs text-muted-foreground">
                We typically respond only to serious inquiries with clear project scope.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) => (
  <div>
    <label className="eyebrow block mb-3" htmlFor={name}>{label}</label>
    <input id={name} name={name} type={type} maxLength={255} className={fieldClass} />
    {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
  </div>
);

const SelectField = ({ label, name, options, error, className = "" }: { label: string; name: string; options: string[]; error?: string; className?: string }) => (
  <div className={className}>
    <label className="eyebrow block mb-3" htmlFor={name}>{label}</label>
    <select id={name} name={name} defaultValue="" className={fieldClass}>
      <option value="" disabled>Select…</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
    {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
  </div>
);

export default Quote;