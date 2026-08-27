import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "./ui/Reveal";

const STEPS = [
  { num: "01", title: "Discover", desc: "We map how your business actually works and find the opportunities where AI moves the needle most." },
  { num: "02", title: "Design", desc: "We design the system and user experience around your customers — not around a template." },
  { num: "03", title: "Build", desc: "We develop the AI, automation, website or advertising with you in the loop the whole way." },
  { num: "04", title: "Launch", desc: "We deploy, connect everything and make sure it runs smoothly from day one." },
  { num: "05", title: "Optimize", desc: "We measure real usage and keep improving performance over time. Systems get better, not static." },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section id="process" className="relative scroll-mt-20 border-t border-line-soft bg-ink-2/40 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted">
                  <span className="h-px w-8 bg-accent" aria-hidden="true" />
                  How we work
                </span>
                <h2 className="mt-5 max-w-md text-balance text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl">
                  A process that gets <span className="font-serif-italic text-accent">out of your way.</span>
                </h2>
                <p className="mt-6 max-w-sm text-balance leading-relaxed text-cream-dim">
                  No bloated engagements. Five clear stages from first conversation to a system that keeps improving.
                </p>
              </Reveal>
            </div>
          </div>

          {/* steps */}
          <div className="lg:col-span-7">
            <div ref={ref} className="relative">
              <div className="absolute bottom-8 left-[35px] top-2 w-px bg-line-soft" aria-hidden="true" />
              <motion.div style={{ scaleY }} className="absolute bottom-8 left-[35px] top-2 w-px origin-top bg-accent" aria-hidden="true" />

              <div className="flex flex-col gap-5">
                {STEPS.map((s) => (
                  <motion.div
                    key={s.num}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-2xl border border-line bg-panel p-6 pl-16"
                  >
                    <span className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink font-display text-sm font-semibold text-accent">
                      {s.num}
                    </span>
                    <h3 className="text-xl font-medium text-cream sm:text-2xl">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream-dim">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
