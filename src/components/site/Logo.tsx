import { Link } from "react-router-dom";

const Logo = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="group inline-flex items-center gap-3" aria-label="Capital Construct Interiors home">
    <span
      className={`flex h-9 w-9 items-center justify-center border ${
        light ? "border-brand-ivory/40 text-brand-ivory" : "border-foreground/30 text-foreground"
      } font-display text-lg leading-none transition-colors duration-500 group-hover:border-accent group-hover:text-accent`}
    >
      C
    </span>
    <span className={`flex flex-col leading-tight ${light ? "text-brand-ivory" : "text-foreground"}`}>
      <span className="font-display text-base tracking-wide">Capital Construct</span>
      <span className="eyebrow !text-[9px] !tracking-[0.32em] opacity-70">Interiors</span>
    </span>
  </Link>
);

export default Logo;