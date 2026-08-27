import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 34 },
  down: { x: 0, y: -34 },
  left: { x: 44, y: 0 },
  right: { x: -44, y: 0 },
  none: { x: 0, y: 0 },
};

/** Smooth scroll-triggered reveal that respects reduced-motion preferences. */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  direction = "up",
  distance = 34,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const base = offsets[direction];
  const off = reduce
    ? { x: 0, y: 0 }
    : { x: base.x * (distance / 34), y: base.y * (distance / 34) };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: off.x, y: off.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
