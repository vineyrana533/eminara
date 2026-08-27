import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const NODES = [
  { label: "Lead", detail: "Captured from ads, web or calls", icon: "◉" },
  { label: "AI Agent", detail: "Chatbot or voice agent answers instantly", icon: "✦" },
  { label: "Qualification", detail: "Intent & budget scored automatically", icon: "◐" },
  { label: "CRM", detail: "Every conversation logged & organized", icon: "▤" },
  { label: "Follow-up", detail: "Automated outreach, always on time", icon: "↻" },
  { label: "Booking", detail: "Appointment on your calendar", icon: "▣" },
];

export default function HeroWorkflow() {
  const [active, setActive] = useState(1);
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-panel/80 p-1.5 shadow-2xl shadow-black/40">
        <div className="rounded-[20px] bg-gradient-to-b from-panel-2 to-ink-2 p-5">
          {/* header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-medium tracking-wide text-cream-dim">
                AI pipeline · live
              </span>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="h-2 w-2 rounded-full bg-accent/60" />
            </div>
          </div>

          {/* nodes */}
          <div className="relative pl-5">
            {/* vertical line aligned to node circle centres (centre x = 46px) */}
            <div className="absolute bottom-4 left-[45px] top-4 w-px bg-line" aria-hidden="true" />
            {/* travelling pulse */}
            {!reduce && (
              <motion.div
                className="absolute left-[39px] top-0 h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_14px_var(--color-accent)]"
                aria-hidden="true"
                animate={{ top: ["6%", "88%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <div className="flex flex-col gap-2.5">
              {NODES.map((n, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={n.label}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300"
                    style={{
                      borderColor: isActive ? "var(--color-accent)" : "var(--color-line)",
                      background: isActive ? "var(--color-accent-soft)" : "transparent",
                    }}
                    aria-pressed={isActive}
                  >
                    <span
                      className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm transition-colors duration-300"
                      style={{
                        borderColor: isActive ? "var(--color-accent)" : "var(--color-line)",
                        color: isActive ? "var(--color-ink)" : "var(--color-cream-dim)",
                        background: isActive ? "var(--color-accent)" : "var(--color-panel)",
                      }}
                      aria-hidden="true"
                    >
                      {n.icon}
                    </span>
                    <span className="min-w-0">
                      <span
                        className="block text-sm font-medium transition-colors"
                        style={{ color: isActive ? "var(--color-cream)" : "var(--color-cream-dim)" }}
                      >
                        {n.label}
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0.6, height: isActive ? "auto" : 0 }}
                        transition={{ duration: 0.25 }}
                        className="block overflow-hidden text-xs leading-snug text-muted"
                      >
                        {n.detail}
                      </motion.span>
                    </span>
                    <span
                      className="ml-auto text-[0.6rem] font-medium"
                      style={{ color: isActive ? "var(--color-accent)" : "var(--color-faint)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* floating caption */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute -right-3 -top-4 hidden rounded-full border border-line bg-ink/90 px-3.5 py-2 text-xs text-cream-dim backdrop-blur sm:block"
      >
        <span className="text-accent">Lead →</span> Booking in seconds
      </motion.div>
    </div>
  );
}
