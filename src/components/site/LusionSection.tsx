import { motion } from "framer-motion";

import img1 from "@/assets/hero-living.jpg";
import img2 from "@/assets/project-office.jpg";
import img3 from "@/assets/project-bedroom.jpg";

const LusionSection = () => {
  return (
    <section className="relative bg-brand-charcoal text-brand-ivory overflow-hidden py-32 md:py-48">
      {/* IMAGES (STATIC) */}
      <img
        src={img1}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute left-[6%] top-[8%] w-[28%] aspect-[3/4] object-cover opacity-70 hidden md:block"
      />
      <img
        src={img2}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute right-[8%] top-[20%] w-[24%] aspect-[4/5] object-cover opacity-60 hidden md:block"
      />
      <img
        src={img3}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute left-[18%] bottom-[6%] w-[22%] aspect-[4/5] object-cover opacity-50 hidden lg:block"
      />

      <div className="absolute inset-0 bg-brand-charcoal/40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative container-luxe text-center"
      >
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