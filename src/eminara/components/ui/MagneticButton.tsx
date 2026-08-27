import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "../../utils/cn";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "accent";
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
}

/**
 * Magnetic pill button with subtle pull-towards-cursor behaviour.
 * Falls back gracefully for reduced motion.
 */
export default function MagneticButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 will-change-transform",
    size === "lg" ? "px-7 py-4 text-[0.95rem]" : "px-5 py-2.5 text-sm",
    variant === "primary" &&
      "bg-cream text-ink hover:bg-white",
    variant === "accent" &&
      "bg-accent text-ink hover:bg-accent-dim",
    variant === "ghost" &&
      "border border-line text-cream hover:border-cream/40 hover:bg-white/5",
    className
  );

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={(e) => {
        // Avoid a native hash jump when a smooth-scroll handler is provided
        if (href?.startsWith("#")) e.preventDefault();
        onClick?.();
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className={base}
    >
      {children}
    </motion.a>
  );
}
