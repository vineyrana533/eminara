import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Reveal from "./ui/Reveal";

const STEPS = [
  { icon: "◉", title: "Website Visitor", detail: "A person lands on your site from an ad, search or referral." },
  { icon: "✦", title: "AI Chatbot", detail: "The chatbot greets them, answers questions and captures contact details." },
  { icon: "◐", title: "Lead Qualification", detail: "AI scores intent and budget, routing only qualified leads to you." },
  { icon: "▤", title: "CRM", detail: "Every conversation and detail is logged to your CRM automatically." },
  { icon: "↻", title: "AI Follow-Up", detail: "On-brand, automated follow-up keeps every lead warm around the clock." },
  { icon: "▣", title: "Calendar", detail: "Live availability syncs and is offered in real time." },
  { icon: "✓", title: "Appointment", detail: "A confirmed booking lands on your calendar. You just show up." },
];

export default function AutomationFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.35"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const pulseTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const current = STEPS[active]!;

  return (
    <section className="relative border-y border-line-soft bg-ink-2/40 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Flow visualization */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                Systems, not just chatbots
              </span>
              <h2 className="mt-5 max-w-xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl">
                See the full <span className="font-serif-italic text-accent">lead-to-booking</span> machine.
              </h2>
            </Reveal>

            <div ref={ref} className="relative mt-12 pl-2">
              {/* drawn line */}
              <div className="absolute bottom-6 left-[43px] top-6 w-px bg-line-soft" aria-hidden="true" />
              <motion.div
                style={{ scaleY }}
                className="absolute bottom-6 left-[43px] top-6 w-px origin-top bg-accent"
                aria-hidden="true"
              />
              {/* traveling pulse */}
              <motion.div
                style={{ top: pulseTop }}
                className="absolute left-[39px] z-10 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_var(--color-accent)]"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-3">
                {STEPS.map((s, i) => {
                  const on = active === i;
                  return (
                    <button
                      key={s.title}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group flex items-center gap-5 rounded-2xl border p-4 text-left transition-all duration-300"
                      style={{
                        borderColor: on ? "var(--color-accent)" : "var(--color-line)",
                        background: on ? "var(--color-accent-soft)" : "var(--color-panel)",
                        transform: on ? "translateX(6px)" : "none",
                      }}
                      aria-pressed={on}
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base"
                        style={{
                          color: on ? "var(--color-ink)" : "var(--color-cream-dim)",
                          background: on ? "var(--color-accent)" : "var(--color-panel-2)",
                          border: on ? "1px solid var(--color-accent)" : "1px solid var(--color-line)",
                        }}
                        aria-hidden="true"
                      >
                        {s.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base font-medium" style={{ color: on ? "var(--color-cream)" : "var(--color-cream-dim)" }}>
                          {s.title}
                        </span>
                        <motion.span
                          initial={false}
                          animate={{ opacity: on ? 1 : 0, height: on ? "auto" : 0 }}
                          transition={{ duration: 0.25 }}
                          className="block overflow-hidden text-sm text-muted"
                        >
                          {s.detail}
                        </motion.span>
                      </span>
                      <span className="ml-auto text-[0.6rem]" style={{ color: on ? "var(--color-accent)" : "var(--color-faint)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <Reveal direction="left">
                <div className="overflow-hidden rounded-3xl border border-line bg-panel/70">
                  <div className="border-b border-line-soft px-6 py-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-faint">Stage {String(active + 1).padStart(2, "0")} / 07</p>
                  </div>
                  <div className="p-8">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-4"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-2xl text-ink">
                        {current.icon}
                      </span>
                      <h3 className="text-2xl font-medium text-cream">{current.title}</h3>
                      <p className="leading-relaxed text-cream-dim">{current.detail}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Handled automatically
                      </div>
                    </motion.div>
                  </div>
                  <div className="border-t border-line-soft px-6 py-4 text-xs text-faint">
                    Hover any stage to inspect what it does.
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
