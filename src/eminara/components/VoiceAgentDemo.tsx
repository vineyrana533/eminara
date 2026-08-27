import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { scrollToId } from "../lib/smooth-scroll";
import { cn } from "../utils/cn";

const STAGES = [
  { status: "Incoming call…", actor: null, text: null, ring: true },
  { status: "AI answers", actor: "Emi", text: "Hi, you've reached Meridian Property Co. — this is Emi. How can I help you today?" },
  { status: "Understands the request", actor: "Caller", text: "I'd like to schedule a viewing of the downtown listing." },
  { status: "Qualifies the lead", actor: "Emi", text: "Great — are you looking to rent or buy, and what's a good time this week?" },
  { status: "Books the appointment", actor: "Emi", text: "Perfect. Booked for Wednesday at 2pm. I've just sent you a confirmation." },
];

export default function VoiceAgentDemo() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    setStage(0);
    setPlaying(true);
  };
  const stop = () => {
    setPlaying(false);
    if (timer.current) clearTimeout(timer.current);
  };

  useEffect(() => {
    if (!playing) return;
    if (stage >= STAGES.length - 1) {
      const id = setTimeout(() => setPlaying(false), 1400);
      timer.current = id;
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setStage((s) => s + 1), 2200);
    timer.current = id;
    return () => clearTimeout(id);
  }, [stage, playing]);

  const current = STAGES[stage];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Phone UI */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-accent/[0.05] blur-3xl" />
              <div className="rounded-[2rem] border border-line bg-gradient-to-b from-panel to-ink p-4 shadow-2xl shadow-black/50">
                <div className="rounded-[1.5rem] bg-ink-2 p-5">
                  {/* status bar */}
                  <div className="mb-5 flex items-center justify-between text-[0.65rem] text-faint">
                    <span>9:41</span>
                    <span>●●●</span>
                  </div>

                  {/* avatar + status */}
                  <div className="flex flex-col items-center py-4 text-center">
                    <div className="relative mb-4">
                      {current.ring && (
                        <motion.span
                          className="absolute inset-0 rounded-full border border-accent/60"
                          animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                          transition={{ repeat: Infinity, duration: 1.6 }}
                        />
                      )}
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft text-3xl">
                        <span className={cn("flex items-center justify-center text-accent transition-opacity", current.ring && "animate-pulse")}>
                          {current.ring ? "☎" : "◉"}
                        </span>
                      </div>
                    </div>
                    <p className="font-display text-lg font-medium text-cream">Emi</p>
                    <p className="text-xs text-muted">AI Receptionist</p>
                    <div className="mt-3 flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1">
                      <span className={cn("h-2 w-2 rounded-full", current.ring ? "bg-accent animate-pulse" : "bg-accent")} />
                      <span className="text-xs text-cream-dim">{current.status}</span>
                    </div>
                  </div>

                  {/* waveform */}
                  <div className="mb-5 flex h-10 items-center justify-center gap-1">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="w-[3px] rounded-full bg-accent"
                        animate={{ height: current.ring ? [3, 6, 3] : [8, 22, 8] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.04, ease: "easeInOut" }}
                        style={{ height: 6 }}
                      />
                    ))}
                  </div>

                  {/* transcript */}
                  <div className="min-h-[132px] space-y-2 rounded-2xl border border-line-soft bg-panel/70 p-4">
                    {current.actor && (
                      <motion.div
                        key={stage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-start gap-2"
                      >
                        <span className={cn("mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[0.6rem] font-medium", current.actor === "Emi" ? "bg-accent text-ink" : "bg-panel-2 text-cream-dim")}>
                          {current.actor === "Emi" ? "AI" : "Caller"}
                        </span>
                        <p className="text-xs leading-relaxed text-cream-dim">{current.text}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* controls */}
                  <div className="mt-5 flex items-center justify-center gap-4">
                    <button
                      onClick={start}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink transition-transform hover:scale-105"
                      aria-label="Start demo call"
                    >
                      {playing ? (
                        <span className="flex gap-1"><span className="h-3 w-1 rounded bg-ink" /><span className="h-3 w-1 rounded bg-ink" /></span>
                      ) : (
                        <svg className="ml-0.5 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
                      )}
                    </button>
                    <button onClick={stop} className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-cream-dim transition-colors hover:border-cream/40" aria-label="End call">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 10c-4-3-12-3-16 0M4 10l2 6M20 10l-2 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                AI Voice Agent
              </span>
              <h2 className="mt-5 max-w-xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl">
                Meet <span className="font-serif-italic text-accent">Emi</span> — your AI receptionist.
              </h2>
              <p className="mt-6 max-w-lg text-balance leading-relaxed text-cream-dim">
                Emi answers every call in seconds, understands what the caller needs, qualifies them,
                and books straight into your calendar. No more missed calls. No more busy signals.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Answers instantly", "Qualifies leads", "Books appointments", "Handles FAQs"].map((p) => (
                  <span key={p} className="rounded-full border border-line bg-panel px-3 py-1 text-[0.7rem] text-cream-dim">{p}</span>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <MagneticButton href="#contact" variant="accent" size="lg" onClick={() => scrollToId("#contact")}>
                  Talk to the AI
                </MagneticButton>
              </div>

              {/* integration placeholder */}
              <div className="mt-8 rounded-2xl border border-dashed border-line bg-panel/40 p-4">
                <p className="text-xs text-muted">
                  <span className="font-medium text-cream-dim">Integration layer</span> — this demo plays a
                  scripted call. In production, Emi runs on your voice-agent stack (Vapi, Twilio or n8n) and
                  connects to your CRM & calendar. Connect your API here.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
