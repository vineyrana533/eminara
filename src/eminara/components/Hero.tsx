import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import HeroWorkflow from "./HeroWorkflow";
import { scrollToId } from "../lib/smooth-scroll";

function Words({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1 + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
          </motion.span>
          {i < text.split(" ").length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--color-line-soft) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[130px]" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Left */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/60 px-4 py-1.5 text-xs text-cream-dim backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            EmiNara AI · Intelligent systems for modern businesses
          </motion.div>

          <h1 className="text-balance text-[2.7rem] font-medium leading-[1.02] tracking-tight text-cream sm:text-6xl lg:text-7xl xl:text-[5rem]">
            <Words text="We build AI systems" />
            <br />
            <Words text="that move your" />
            <span className="font-serif-italic text-accent"> business </span>
            <Words text="forward." className="font-serif-italic" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-balance text-base leading-relaxed text-cream-dim sm:text-lg"
          >
            From AI employees and intelligent automation to high-converting websites and
            AI-powered advertising — we build the digital systems that help businesses
            attract, convert, and serve customers better.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton
              href="#contact"
              size="lg"
              variant="accent"
              onClick={() => scrollToId("#contact")}
            >
              Book a Strategy Call
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton
              href="#work"
              size="lg"
              variant="ghost"
              onClick={() => scrollToId("#work")}
            >
              Explore Our Work
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted"
          >
            {["Startups", "SaaS", "Healthcare", "Real estate", "E-commerce"].map((x) => (
              <span key={x} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-faint" aria-hidden="true" />
                {x}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — workflow */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <HeroWorkflow />
        </motion.div>
      </div>
    </section>
  );
}
