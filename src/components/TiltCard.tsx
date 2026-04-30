import { motion } from "framer-motion";

export const TiltCard = ({ children }: any) => {
  return (
    <motion.div
      whileHover={{ rotateY: 6, rotateX: 4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="bg-black/40 backdrop-blur p-8 border border-white/10 rounded-xl"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};
