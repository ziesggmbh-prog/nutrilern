import { motion } from "framer-motion";

interface OrganicShapeProps {
  className?: string;
  variant?: "default" | "alt";
}

export default function OrganicShape({ className = "", variant = "default" }: OrganicShapeProps) {
  const shapeClass = variant === "alt" ? "organic-shape-alt" : "organic-shape";
  
  return (
    <motion.div
      className={`${shapeClass} ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
}
