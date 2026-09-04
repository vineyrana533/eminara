import { motion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import HeroWorkflow from "./HeroWorkflow";
import { WordsPullUpMultiStyle } from "./ui/WordsPullUp";
import { scrollToId } from "../lib/smooth-scroll";


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

      <div className="container-x flex flex-col items-center gap-14 text-center">
        <div className="flex max-w-4xl flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/60 px-4 py-1.5 text-xs text-cream-dim backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            EmiNara AI · Intelligent systems for modern businesses
          </motion.div>

          <h1 className="text-balance text-[2.9rem] font-medium leading-[0.95] tracking-[-0.05em] text-cream sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
            <WordsPullUpMultiStyle
              className="justify-center"
              delay={0.1}
              segments={[
                { text: "We build AI systems that move your" },
                { text: "business", className: "font-serif-italic text-accent" },
                { text: "forward.", className: "font-serif-italic" },
              ]}
            />
          </h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-balance text-base leading-relaxed text-cream-dim sm:text-xl"
          >
            From AI employees and intelligent automation to high-converting websites and
            AI-powered advertising — we build the digital systems that help businesses
            attract, convert, and serve customers better.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
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
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted"
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
          className="w-full max-w-3xl"
        >
          <HeroWorkflow />
        </motion.div>
      </div>
    </section>
  );
}
