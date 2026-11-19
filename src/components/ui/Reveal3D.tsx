import React from "react";
import { motion } from "motion/react";

/**
 * Scroll-driven 3D reveal: blocks tip in from depth — rotateX flip,
 * translateZ zoom and a staggered rise — as they enter the viewport.
 * Fires once per element; honours prefers-reduced-motion via the
 * global CSS kill-switch and motion's own reduced-motion handling.
 */
export default function Reveal3D({
  children,
  delay = 0,
  className,
  y = 56,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotateX: -16, z: -70, transformPerspective: 1200 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0, transformPerspective: 1200 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 0.9, 0.3, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}
