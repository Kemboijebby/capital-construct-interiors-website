interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}
const SectionHeader = ({ eyebrow, title, description, align = "left" }: Props) => (
  <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground">
      {title}
    </h2>
    {description && (
      <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;