import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import img1 from "@/assets/hero-living.jpg";
import img2 from "@/assets/project-office.jpg";
import img3 from "@/assets/project-bedroom.jpg";

const LusionSection = () => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative bg-brand-charcoal text-brand-ivory overflow-hidden py-32 md:py-48"
    >
      {/* IMAGES (LAYERED) */}
      <motion.img
        src={img1}
        alt=""
        loading="lazy"
        style={{ y: y1 }}
        className="absolute left-[6%] top-[8%] w-[28%] aspect-[3/4] object-cover opacity-70 will-change-transform hidden md:block"
      />
      <motion.img
        src={img2}
        alt=""
        loading="lazy"
        style={{ y: y2 }}
        className="absolute right-[8%] top-[20%] w-[24%] aspect-[4/5] object-cover opacity-60 will-change-transform hidden md:block"
      />
      <motion.img
        src={img3}
        alt=""
        loading="lazy"
        style={{ y: y3 }}
        className="absolute left-[18%] bottom-[6%] w-[22%] aspect-[4/5] object-cover opacity-50 will-change-transform hidden lg:block"
      />

      <div className="absolute inset-0 bg-brand-charcoal/40" />

      {/* TEXT OVERLAY */}
      <motion.div style={{ opacity }} className="relative container-luxe text-center">
        <p className="eyebrow !text-brand-ivory/60 mb-6">Craft in Motion</p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto">
          Spaces don't just appear —
          <br />
          <em className="not-italic text-accent">they are engineered into existence.</em>
        </h2>
        <p className="mt-8 max-w-xl mx-auto text-brand-ivory/75 leading-relaxed">
          Every surface, every line, every detail — designed, refined, and
          executed with discipline.
        </p>
      </motion.div>
    </section>
  );
};

export default LusionSection;