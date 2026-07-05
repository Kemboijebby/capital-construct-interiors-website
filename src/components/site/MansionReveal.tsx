import { motion, useReducedMotion } from "framer-motion";

import doorLeft from "@/assets/door-left.png";
import doorRight from "@/assets/door-right.png";
import interior from "@/assets/hero-living.jpg";

const MansionReveal = () => {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <section className="relative h-[100svh] overflow-hidden bg-brand-charcoal text-brand-ivory">
      <img
        src={interior}
        alt="Fully realized luxury interior"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-brand-charcoal/55" />

      <motion.img
        src={doorLeft}
        alt=""
        loading="lazy"
        decoding="async"
        initial={{ x: reduce ? "-100%" : "0%" }}
        whileInView={{ x: "-100%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduce ? 0 : 0.9, ease }}
        className="absolute left-0 top-0 h-full w-1/2 object-cover object-right z-10 will-change-transform"
      />
      <motion.img
        src={doorRight}
        alt=""
        loading="lazy"
        decoding="async"
        initial={{ x: reduce ? "100%" : "0%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduce ? 0 : 0.9, ease }}
        className="absolute right-0 top-0 h-full w-1/2 object-cover object-left z-10 will-change-transform"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: reduce ? 0 : 0.5, ease }}
        className="relative z-20 h-full flex items-center justify-center"
      >
        <div className="container-luxe text-center">
          <p className="eyebrow !text-brand-ivory/60 mb-6">Arrival</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto">
            Step Into a <em className="not-italic text-accent">Fully Realized</em> Space
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-brand-ivory/80 leading-relaxed">
            From bare structure to refined interior — every element designed,
            executed and delivered with precision.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default MansionReveal;