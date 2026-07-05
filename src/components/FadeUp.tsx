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
  y = 16,
  duration = 0.5,
}: FadeUpProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
  >
    {children}
  </motion.div>
);