import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

const Footer = () => (
  <footer className="bg-brand-charcoal text-brand-ivory">
    <div className="container-luxe py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-2 space-y-6">
        <Logo light />
        <p className="max-w-md text-sm leading-relaxed text-brand-ivory/70">
          Capital Construct Interiors crafts timeless, considered spaces — from refined residences
          to executive workplaces and commercial environments.
        </p>
        <Link
          to="/quote"
          className="inline-flex items-center bg-brand-ivory px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-brand-charcoal transition-all duration-500 hover:bg-accent hover:text-accent-foreground"
        >
          Get Free Design Quote
        </Link>
      </div>

      <div>
        <h4 className="eyebrow !text-brand-ivory/60 mb-5">Studio</h4>
        <ul className="space-y-3 text-sm text-brand-ivory/80">
          <li><Link to="/about" className="link-underline">About</Link></li>
          <li><Link to="/services" className="link-underline">Services</Link></li>
          <li><Link to="/projects" className="link-underline">Projects</Link></li>
          <li><Link to="/contact" className="link-underline">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="eyebrow !text-brand-ivory/60 mb-5">Contact</h4>
        <ul className="space-y-3 text-sm text-brand-ivory/80">
          <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 text-accent" /> +1 (555) 010 2200</li>
          <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-accent" /> hello@capitalconstruct.co</li>
          <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-accent" /> Studio 14, Design District</li>
        </ul>
        <div className="mt-6 flex items-center gap-4 text-brand-ivory/70">
          <a aria-label="Instagram" href="#" className="hover:text-accent transition-colors"><Instagram className="h-4 w-4" /></a>
          <a aria-label="Facebook" href="#" className="hover:text-accent transition-colors"><Facebook className="h-4 w-4" /></a>
          <a aria-label="LinkedIn" href="#" className="hover:text-accent transition-colors"><Linkedin className="h-4 w-4" /></a>
        </div>
      </div>
    </div>
    <div className="border-t border-brand-ivory/10">
      <div className="container-luxe py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-brand-ivory/50">
        <p>© {new Date().getFullYear()} Capital Construct Interiors. All rights reserved.</p>
        <p className="tracking-[0.2em] uppercase">Designed in-house</p>
      </div>
    </div>
  </footer>
);

export default Footer;