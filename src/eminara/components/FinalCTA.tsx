import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import { scrollToId } from "../lib/smooth-scroll";

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? { opacity: 0 } : { y: "110%" }}
        animate={inView ? (reduce ? { opacity: 1 } : { y: 0 }) : (reduce ? { opacity: 0 } : { y: "110%" })}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function FinalCTA() {
  return (
    <section id="contact" className="relative min-h-screen scroll-mt-20 overflow-hidden py-28 sm:py-36">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[130px]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, var(--color-line-soft) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent 80%)",
          }}
        />
      </div>

      <div className="container-x flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/60 px-4 py-1.5 text-xs text-cream-dim backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          Free 30-minute strategy call · No obligation
        </motion.div>

        <h2 className="max-w-4xl text-balance text-5xl font-medium leading-[1.02] tracking-tight text-cream sm:text-6xl lg:text-8xl">
          <Line delay={0.05}>Ready to put</Line>
          <Line delay={0.15}>AI to <span className="font-serif-italic text-accent">work?</span></Line>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-w-xl text-balance text-base leading-relaxed text-cream-dim sm:text-lg"
        >
          Tell us what is slowing your business down. We'll show you exactly where AI can
          make a real difference — and what it would take to build it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagneticButton href="#contact" size="lg" variant="accent" onClick={() => scrollToId("#contact")}>
            Book a Strategy Call
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#solutions" size="lg" variant="ghost" onClick={() => scrollToId("#solutions")}>
            Talk to Our AI
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
