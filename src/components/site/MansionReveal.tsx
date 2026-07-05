import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import doorLeft from "@/assets/door-left.png";
import doorRight from "@/assets/door-right.png";
import interior from "@/assets/hero-living.jpg";

const MansionReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  const enable = isDesktop && !reduce;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0.2, 0.6], ["0%", enable ? "-120%" : "-100%"]);
  const rightX = useTransform(scrollYProgress, [0.2, 0.6], ["0%", enable ? "120%" : "100%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, enable ? 1.05 : 1]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] overflow-hidden bg-brand-charcoal text-brand-ivory"
    >
      {/* Interior */}
      <motion.img
        src={interior}
        alt="Fully realized luxury interior"
        loading="lazy"
        style={{ scale }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-charcoal/55" />

      {/* Left Door */}
      <motion.img
        src={doorLeft}
        alt=""
        loading="lazy"
        style={{ x: leftX }}
        className="absolute left-0 top-0 h-full w-1/2 object-cover object-right will-change-transform z-10"
      />

      {/* Right Door */}
      <motion.img
        src={doorRight}
        alt=""
        loading="lazy"
        style={{ x: rightX }}
        className="absolute right-0 top-0 h-full w-1/2 object-cover object-left will-change-transform z-10"
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
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