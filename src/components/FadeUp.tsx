import { motion } from "framer-motion";

type FadeUpProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
};

// Refined reveal: softer distance, gentle blur clear, custom cubic-bezier
// for a slow-in / smooth-out feel closer to editorial motion.
export const FadeUp = ({
  children,
  delay = 0,
  y = 28,
  duration = 1.1,
}: FadeUpProps) => (
  <motion.div
    initial={{ opacity: 0, y, filter: "blur(6px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }}
    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
  >
    {children}
  </motion.div>
);