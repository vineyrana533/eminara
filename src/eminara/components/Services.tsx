import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { cn } from "../utils/cn";

interface Service {
  id: string;
  num: string;
  name: string;
  tag: string;
  desc: string;
  points: string[];
}

const SERVICES: Service[] = [
  {
    id: "automation",
    num: "01",
    name: "AI Automation",
    tag: "Systems that run themselves",
    desc: "Turn repetitive work into automated systems.",
    points: ["Process automation", "Tool & system connections", "Lead management", "CRM workflows", "Follow-ups"],
  },
  {
    id: "voice",
    num: "02",
    name: "AI Voice Agents",
    tag: "A receptionist that never sleeps",
    desc: "Give your business an AI employee that can answer, qualify and book.",
    points: ["AI phone receptionist", "Answers calls instantly", "Qualifies leads", "Books appointments", "Handles FAQs"],
  },
  {
    id: "chatbot",
    num: "03",
    name: "AI Chatbots",
    tag: "Your website, on the job 24/7",
    desc: "Turn your website into an intelligent sales and support assistant.",
    points: ["Website AI assistant", "Customer support", "Lead qualification", "FAQ handling", "Appointment booking"],
  },
  {
    id: "web",
    num: "04",
    name: "Custom Websites",
    tag: "Websites that close deals",
    desc: "Web experiences designed to make your business look as good as it performs.",
    points: ["Premium business sites", "Conversion landing pages", "Web applications", "Booking & payments", "WhatsApp integration"],
  },
  {
    id: "video",
    num: "05",
    name: "AI Video Ads",
    tag: "Advertising made at AI speed",
    desc: "Create attention-grabbing product and software advertisements using AI.",
    points: ["Product & SaaS ads", "Social media ads", "Short-form video", "Creative variations", "Campaign-ready assets"],
  },
];

function VisualAutomation() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      {[
        { t: "Trigger", s: "New inquiry received", on: true },
        { t: "AI triage", s: "Intent detected & routed", on: true },
        { t: "Action", s: "CRM + calendar updated", on: true },
      ].map((n, i) => (
        <motion.div
          key={n.t}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.5 }}
          className="relative rounded-xl border border-line bg-panel p-4"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
              {["⚡", "◉", "▣"][i]}
            </span>
            <div>
              <p className="text-sm font-medium text-cream">{n.t}</p>
              <p className="text-xs text-muted">{n.s}</p>
            </div>
            {n.on && <span className="ml-auto flex items-center gap-1.5 text-[0.65rem] text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" />auto</span>}
          </div>
          {i < 2 && (
            <div className="absolute -bottom-3 left-8 h-3 w-px bg-line" aria-hidden="true" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function VisualVoice() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-line bg-panel">
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/10" />
        <svg className="h-11 w-11 text-accent" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 10v4M8 7v10M11 4v16M14 7v10M17 9v6M20 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <div className="w-full space-y-2">
        {["Call from: new lead", "Emi: “Hi! Thanks for calling…”", "Qualified · booked 3pm Tue"].map((t, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i, duration: 0.4 }}
            className={cn(
              "rounded-lg px-3 py-2 text-xs",
              i === 0 ? "bg-panel text-muted" : i === 1 ? "bg-accent-soft text-cream" : "border border-line bg-panel text-accent"
            )}
          >
            {t}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

function VisualChat() {
  const msgs = ["👋 How can we help today?", "I need a new website", "Great — you've come to the right place.", "Can we book a call?"];
  return (
    <div className="flex h-full flex-col justify-end gap-3 p-6">
      {msgs.map((m, i) => {
        const bot = i % 2 === 0;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.4 }}
            className={cn("max-w-[80%] rounded-2xl px-4 py-2.5 text-sm", bot ? "self-start bg-panel text-cream-dim" : "self-end bg-accent text-ink")}
          >
            {m}
          </motion.div>
        );
      })}
      <div className="flex items-center gap-1.5 self-start rounded-2xl bg-panel px-4 py-3">
        {[0, 1, 2].map((d) => (
          <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-muted" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }} />
        ))}
      </div>
    </div>
  );
}

function VisualWeb() {
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="rounded-xl border border-line bg-panel p-3">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-faint" />
          <span className="h-2 w-2 rounded-full bg-faint" />
          <span className="h-2 w-2 rounded-full bg-accent/60" />
          <span className="ml-3 h-2 flex-1 rounded-full bg-panel-2" />
        </div>
        <div className="mb-3 flex items-center justify-between">
          <span className="h-2.5 w-16 rounded bg-cream/80" />
          <div className="flex gap-1.5">
            <span className="h-2 w-8 rounded bg-line" />
            <span className="h-2 w-8 rounded bg-line" />
            <span className="h-2 w-6 rounded bg-accent" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="h-10 rounded-lg bg-gradient-to-br from-accent/25 to-accent-soft" />
          <span className="h-10 rounded-lg bg-gradient-to-br from-accent/15 to-transparent" />
        </div>
      </div>
      <div className="rounded-xl border border-line bg-accent p-3 text-center text-sm font-medium text-ink">Conversion-ready · built to perform</div>
    </div>
  );
}

function VisualVideo() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-6">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-gradient-to-br from-panel-2 via-panel to-ink">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-ink"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg className="ml-1 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
          </motion.span>
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <span className="h-4 w-1/4 rounded bg-accent/40" />
          <span className="h-4 w-1/4 rounded bg-accent/40" />
          <span className="h-4 w-1/4 rounded bg-accent/40" />
        </div>
      </div>
      <p className="text-xs text-muted">AI-generated · rendered in hours, not weeks</p>
    </div>
  );
}

const VISUALS = [VisualAutomation, VisualVoice, VisualChat, VisualWeb, VisualVideo];

export default function Services() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ActiveVisual = VISUALS[active];

  const select = (i: number) => {
    setActive(i);
    // restart the gentle auto-advance after manual interaction
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive((a) => (a + 1) % SERVICES.length), 7000);
  };

  useEffect(() => {
    timer.current = setTimeout(() => setActive((a) => (a + 1) % SERVICES.length), 7000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <section id="services" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="What we build"
          title={
            <>
              Five ways we turn <span className="font-serif-italic text-accent">AI into outcomes.</span>
            </>
          }
          description="Every engagement is built around your business. Here's the toolkit we use to attract, convert and serve more customers."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Selector */}
          <div className="lg:col-span-6">
            <div className="flex flex-col">
              {SERVICES.map((s, i) => {
                const on = active === i;
                return (
                  <Reveal key={s.id} delay={i * 0.04}>
                    <button
                      onMouseEnter={() => select(i)}
                      onFocus={() => select(i)}
                      onClick={() => select(i)}
                      className={cn(
                        "group w-full border-b border-line-soft py-5 text-left transition-all duration-300",
                        on ? "px-3" : "px-0"
                      )}
                      aria-pressed={on}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-baseline gap-5">
                          <span className={cn("text-xs tracking-widest", on ? "text-accent" : "text-faint")}>{s.num}</span>
                          <h3 className={cn("text-2xl font-medium transition-colors duration-300 sm:text-[1.7rem]", on ? "text-cream" : "text-cream-dim group-hover:text-cream")}>
                            {s.name}
                          </h3>
                        </div>
                        <span className={cn("h-8 w-8 shrink-0 rounded-full border flex items-center justify-center text-sm transition-all duration-300", on ? "border-accent bg-accent text-ink rotate-0" : "border-line text-faint rotate-45 group-hover:border-cream/40")}>
                          {on ? "↓" : "+"}
                        </span>
                      </div>
                      <div className={cn("grid transition-all duration-500", on ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0")}>
                        <div className="overflow-hidden">
                          <div className="flex flex-col gap-3 pl-8">
                            <p className="text-sm text-muted">{s.desc}</p>
                            <div className="flex flex-wrap gap-2">
                              {s.points.map((p) => (
                                <span key={p} className="rounded-full border border-line bg-panel px-3 py-1 text-[0.7rem] text-cream-dim">{p}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Visual panel */}
          <div className="lg:col-span-6">
            <div className="sticky top-24 min-h-[420px] overflow-hidden rounded-3xl border border-line bg-panel/60 lg:h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full min-h-[420px]"
                >
                  <ActiveVisual />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
