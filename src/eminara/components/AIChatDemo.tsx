import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { scrollToId } from "../lib/smooth-scroll";
import { cn } from "../utils/cn";

interface Msg {
  from: "ai" | "user";
  text: string;
}

const SUGGESTIONS = [
  "What services do you offer?",
  "How does pricing work?",
  "What's your process?",
  "Who do you help?",
  "How do I book a call?",
];

const WELCOME: Msg = {
  from: "ai",
  text: "Hi, I'm Emi from EmiNara AI 👋 Ask me about our services, how we work, who we help, or how to get started.",
};

function reply(input: string): string {
  const t = input.toLowerCase();
  if (/(pricing|price|cost|how much|budget|rate)/.test(t)) {
    return "Every build is scoped to the business, so there's no one-size-fits-all price. Start with a free strategy call — we map where AI actually moves the needle, then quote a clear fixed scope. No surprises, no ongoing mystery fees.";
  }
  if (/(process|how do you work|steps|timeline|how long)/.test(t)) {
    return "Five steps: 01 Discover → 02 Design → 03 Build → 04 Launch → 05 Optimize. We start by understanding your business, design the system around it, build it with you in the loop, launch it live, then keep improving it from real usage. Most first systems go live in weeks, not months.";
  }
  if (/(industr|who do you help|startup|saas|health|real estate|ecommerce|who.*you)/.test(t)) {
    return "We work best with businesses where speed and consistency win: startups, SaaS, service businesses, healthcare, real estate, e-commerce and professional services. If you handle leads, calls or appointments, we can probably help you handle more of them — better.";
  }
  if (/(book|call|talk|contact|start|get started)/.test(t)) {
    return "The fastest way is a free strategy call. Pick a time, tell us what's slowing you down, and we'll show you where AI can make a real difference. I can book you in right now — just hit the button below.";
  }
  if (/(website|site|landing|web app)/.test(t)) {
    return "We design premium, conversion-focused websites — landing pages, booking systems, payment and WhatsApp integrations, even AI-powered sites. The goal is simple: your website becomes your best salesperson.";
  }
  if (/(voice|phone|receptionist|call)/.test(t)) {
    return "Our AI voice agents answer calls, qualify leads, handle FAQs and book appointments — like a receptionist that never sleeps, never gets busy and never drops a call. Try the demo below to meet Emi on a call.";
  }
  if (/(chatbot|chat|bot)/.test(t)) {
    return "We build AI chatbots that turn your website into a 24/7 sales and support assistant — qualifying leads, answering FAQs, booking appointments and handing off to your team when it matters.";
  }
  if (/(automation|automat|workflow|crm|follow)/.test(t)) {
    return "We connect your tools into one automated system — capturing leads, updating your CRM, triggering follow-ups and booking appointments without manual busywork. Scroll down to see the full flow in action.";
  }
  if (/(ad|video|marketing)/.test(t)) {
    return "We produce AI-generated product, SaaS and social video ads — with creative variations you can test across campaigns at a fraction of the usual production time.";
  }
  if (/(hello|hi|hey)/.test(t)) {
    return "Hey there! 👋 I can tell you about our services, pricing, process, who we help, or how to book a call. What would you like to know?";
  }
  return "Great question. I can go deeper on services, pricing, process, who we help, or booking — or you can just tell me what's slowing your business down and we'll point you in the right direction.";
}

export default function AIChatDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMsgs((m) => [...m, { from: "user", text: clean }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "ai", text: reply(clean) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <section id="solutions" className="relative scroll-mt-20 bg-ink-2/40 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                Experience AI
              </span>
              <h2 className="mt-5 max-w-xl text-balance text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl">
                Don't take our word for it. <span className="font-serif-italic text-accent">Ask the AI.</span>
              </h2>
              <p className="mt-6 max-w-lg text-balance leading-relaxed text-cream-dim">
                This is a working demo of the kind of assistant we build. Ask it anything —
                services, pricing, process, industries, booking. It answers like a real teammate.
              </p>

              <div className="mt-8">
                <MagneticButton href="#contact" variant="accent" size="lg" onClick={() => scrollToId("#contact")}>
                  Talk to our AI
                </MagneticButton>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-panel/80 shadow-2xl shadow-black/40">
              {/* header */}
              <div className="flex items-center justify-between border-b border-line-soft px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <span className="text-sm font-medium text-cream">Emi · AI Assistant</span>
                </div>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.65rem] text-muted">demo</span>
              </div>

              {/* messages */}
              <div ref={boxRef} className="flex h-[340px] flex-col gap-3 overflow-y-auto px-5 py-5">
                <AnimatePresence initial={false}>
                  {msgs.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn("max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed", m.from === "ai" ? "self-start bg-panel-2 text-cream-dim" : "self-end bg-accent text-ink")}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                  {typing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 self-start rounded-2xl bg-panel-2 px-4 py-3">
                      {[0, 1, 2].map((d) => (
                        <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-muted" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* suggestions */}
              <div className="scrollbar-hide flex gap-2 overflow-x-auto border-t border-line-soft px-5 py-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="shrink-0 rounded-full border border-line bg-panel px-3 py-1.5 text-xs text-cream-dim transition-colors hover:border-accent hover:text-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* input */}
              <div className="flex items-center gap-2 border-t border-line-soft px-5 py-3.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Ask Emi anything…"
                  className="flex-1 bg-transparent text-sm text-cream outline-none placeholder:text-faint"
                  aria-label="Message the AI"
                />
                <button
                  onClick={() => send(input)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink transition-transform hover:scale-105"
                  aria-label="Send"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
