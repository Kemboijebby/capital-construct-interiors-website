import { motion, useReducedMotion } from "framer-motion";

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
  y = 12,
  duration = 0.5,
}: FadeUpProps) => {
  const reduce = useReducedMotion();
  if (reduce) return <div>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};