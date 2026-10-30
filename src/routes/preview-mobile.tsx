// Temporary page for phone-only home screens; laptops keep the current hero
// and the rest of the site stays as it is. Not linked anywhere; delete it
// once a concept is picked. Pick with ?v=app|stories|chat. View at phone width.
import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Clapperboard, Cog, Globe, MessageSquare, PhoneCall, Sparkles } from "lucide-react";
import { useLenis } from "../eminara/lib/smooth-scroll";
import Navbar from "../eminara/components/Navbar";
import HeroCore from "../eminara/components/HeroCore";
import Ticker from "../eminara/components/Ticker";
import Services from "../eminara/components/Services";
import AIChatDemo from "../eminara/components/AIChatDemo";
import VoiceAgentDemo from "../eminara/components/VoiceAgentDemo";
import AutomationFlow from "../eminara/components/AutomationFlow";
import Portfolio from "../eminara/components/Portfolio";
import VideoAds from "../eminara/components/VideoAds";
import CaseStudies from "../eminara/components/CaseStudies";
import Process from "../eminara/components/Process";
import WhoWeHelp from "../eminara/components/WhoWeHelp";
import WhyEmiNara from "../eminara/components/WhyEmiNara";
import Trust from "../eminara/components/Trust";
import FinalCTA from "../eminara/components/FinalCTA";
import Footer from "../eminara/components/Footer";
import { scrollToId } from "../eminara/lib/smooth-scroll";
import { cn } from "../eminara/utils/cn";
import faresmatchHero from "../assets/faresmatch-hero.webp";

const CONCEPTS = ["app", "stories", "chat"] as const;
type Concept = (typeof CONCEPTS)[number];

export const Route = createFileRoute("/preview-mobile")({
  validateSearch: (s: Record<string, unknown>) => ({
    v: CONCEPTS.includes(s["v"] as Concept) ? (s["v"] as Concept) : "app",
  }),
  head: () => ({
    meta: [{ title: "Phone home screen — preview" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PreviewPage,
});

type Icon = ComponentType<{ className?: string }>;

const SERVICES: { num: string; name: string; line: string; Icon: Icon; chips: string[]; image?: string; video?: string }[] = [
  {
    num: "01",
    name: "AI Automation",
    line: "Your back office, run by AI — invoices, data entry, reports and follow-ups.",
    Icon: Cog,
    chips: ["214 invoices matched", "Leads routed to CRM", "Weekly report sent"],
  },
  {
    num: "02",
    name: "AI Voice Agents",
    line: "Every call answered in one ring, qualified and booked — day or night.",
    Icon: PhoneCall,
    chips: ["Call answered · 11:42 pm", "New patient qualified", "Booked · Tue 3pm"],
  },
  {
    num: "03",
    name: "AI Chatbots",
    line: "One AI replying on your website, WhatsApp, Instagram and Messenger.",
    Icon: MessageSquare,
    chips: ["WhatsApp · rescheduled", "Instagram · facial booked", "Website · order placed"],
  },
  {
    num: "04",
    name: "Custom Websites",
    line: "Fast, beautiful sites that book, sell and take payments.",
    Icon: Globe,
    chips: ["Book online 24/7", "Perfect on phones", "Loads in under 1s"],
    image: faresmatchHero,
  },
  {
    num: "05",
    name: "AI Video Ads",
    line: "Scroll-stopping product and UGC ads, made in days, not weeks.",
    Icon: Clapperboard,
    chips: ["Ready for Reels & TikTok", "3 hooks tested", "Shot, voiced & edited with AI"],
    video: "/videos/blender-ugc.mp4",
  },
];

/** A muted, inline, looping video; `muted` must be set in the browser for autoplay. */
function LoopVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
  }, [src]);
  return <video ref={ref} src={src} muted loop playsInline preload="auto" className={className} />;
}

/** The home screen's two actions, stacked for thumbs. */
function Actions({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("#contact");
        }}
        className="flex h-[3.25rem] items-center justify-center gap-2 rounded-full bg-accent text-[0.95rem] font-medium text-white shadow-[0_14px_36px_-18px_rgba(255,47,146,0.9)]"
      >
        Book a Strategy Call <ArrowRight className="h-4 w-4" />
      </a>
      <a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          scrollToId("#work");
        }}
        className="flex h-[3.25rem] items-center justify-center rounded-full border border-white/20 text-[0.95rem] text-white/85"
      >
        Explore Our Work
      </a>
    </div>
  );
}

/* ── 1. App-style: the visual up top, words and buttons in thumb reach ── */

function AppHome() {
  const copy = useRef<HTMLDivElement>(null);
  return (
    <section id="top" data-nav-dark className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0b0b0d] pb-8 text-white">
      <HeroCore copy={copy} mobile="top" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-b from-transparent via-[#0b0b0d]/90 via-25% to-[#0b0b0d]" />
      <div ref={copy} className="container-x relative">
        <h1 className="text-[2.6rem] font-medium leading-[0.95] tracking-[-0.05em]">
          Everything your business does.
          <br />
          <span className="font-serif-italic text-accent">Done by one AI.</span>
        </h1>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-white/65">The work of a thousand people, around the clock.</p>
        <Actions className="mt-6" />
      </div>
    </section>
  );
}

/* ── 2. Stories: tap through the services like Instagram stories ── */

const STORY_SECONDS = 6;

function StoryVisual({ i }: { i: number }) {
  const s = SERVICES[i - 1];
  if (!s) return null;
  if (s.video) return <LoopVideo src={s.video} className="absolute inset-0 h-full w-full object-cover opacity-70" />;
  if (s.image)
    return (
      <div className="absolute inset-x-6 top-[17%] overflow-hidden rounded-2xl border border-white/10 shadow-2xl" style={{ transform: "rotate(-4deg)" }}>
        <img src={s.image} alt="" className="aspect-[16/11] w-full object-cover object-left-top" />
      </div>
    );
  return (
    <div className="absolute inset-x-0 top-[15%] flex flex-col items-center">
      <span className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-accent/30 blur-2xl" />
        <span className="absolute inset-3 animate-ping rounded-full bg-accent/15" />
        <span className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-accent text-white shadow-[0_0_60px_rgba(255,47,146,0.6)]">
          <s.Icon className="h-7 w-7" />
        </span>
      </span>
      <div className="mt-5 flex flex-col items-center gap-2">
        {s.chips.map((c, k) => (
          <span
            key={c}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-1.5 text-xs text-white/85 backdrop-blur"
            style={{ animation: `chat-in .5s ${0.3 + k * 0.35}s both, story-float 4s ${k * 0.6}s ease-in-out infinite` }}
          >
            <Check className="h-3 w-3 text-accent" /> {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function StoriesHome() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const copy = useRef<HTMLDivElement>(null);
  const total = SERVICES.length + 1;
  const s = SERVICES[i - 1];

  // With reduced motion the stories don't advance on their own.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
  }, []);

  const go = (d: number) => setI((v) => Math.min(total - 1, Math.max(0, v + d)));

  return (
    <section id="top" data-nav-dark className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#0b0b0d] text-white">
      <style>{`@keyframes story-bar{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes story-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
      <div key={i} className="absolute inset-0" style={{ animation: "chat-in .45s ease-out both" }}>
        {i === 0 ? <HeroCore copy={copy} mobile="top" /> : <StoryVisual i={i} />}
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-b from-transparent via-[#0b0b0d]/90 via-30% to-[#0b0b0d]" />
      </div>

      {/* Progress bars, one per story. */}
      <div className="absolute inset-x-4 top-[88px] z-10 flex gap-1.5">
        {Array.from({ length: total }, (_, k) => (
          <span key={k} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/20">
            <span
              key={`${k}-${i}`}
              className="block h-full origin-left rounded-full bg-white"
              style={
                k < i
                  ? undefined
                  : k === i && auto
                    ? { animation: `story-bar ${STORY_SECONDS}s linear forwards` }
                    : { transform: k === i ? "scaleX(0.15)" : "scaleX(0)" }
              }
              onAnimationEnd={() => k === i && setI((v) => (v + 1) % total)}
            />
          </span>
        ))}
      </div>

      {/* Tap the left or right of the screen to go back or forward. */}
      <button type="button" aria-label="Previous" className="absolute inset-y-0 left-0 z-10 w-1/3" onClick={() => go(-1)} />
      <button type="button" aria-label="Next" className="absolute inset-y-0 right-0 z-10 w-2/3" onClick={() => go(1)} />

      <div ref={copy} className="container-x pointer-events-none absolute inset-x-0 bottom-8 z-20">
        <div key={`c${i}`} style={{ animation: "chat-in .5s .1s ease-out both" }}>
          <p className="text-[0.65rem] tracking-[0.2em] text-accent">{s ? `${s.num} · ${s.name.toUpperCase()}` : "EMINARA AI"}</p>
          <h1 className="mt-3 text-[2.5rem] font-medium leading-[0.95] tracking-[-0.05em]">
            {s ? (
              s.name
            ) : (
              <>
                Everything your business does.
                <br />
                <span className="font-serif-italic text-accent">Done by one AI.</span>
              </>
            )}
          </h1>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-white/70">
            {s ? s.line : "Five AI services that run the work of a whole team. Tap to see each one."}
          </p>
        </div>
        <Actions className="pointer-events-auto mt-5" />
      </div>
    </section>
  );
}

/* ── 3. Chat-first: the home screen is a conversation with Emi ──── */

type Msg = { from: "emi" | "you"; text: ReactNode };

const INTRO: Msg[] = [
  { from: "emi", text: "Hi 👋 I'm Emi, EmiNara's AI." },
  { from: "emi", text: "I do the work of a whole team — answering calls and chats, running admin, building websites and making ads." },
  { from: "emi", text: "What would you like to fix first?" },
];

const CHOICES = [
  { label: "Never miss a call", s: 1, reply: "I'll answer every call in one ring, 24/7, ask the right questions and book them straight into your calendar." },
  { label: "Automate my admin", s: 0, reply: "I'll match invoices, update your CRM, chase follow-ups and send your reports — no more copy-paste." },
  { label: "Reply on WhatsApp & Instagram", s: 2, reply: "I'll reply on your website, WhatsApp, Instagram and Messenger in 2 seconds — and turn chats into bookings." },
  { label: "Get a new website", s: 3, reply: "We'll build you a fast, beautiful site that books, sells and takes payments — like FaresMatch.com." },
  { label: "Make video ads", s: 4, reply: "We'll make scroll-stopping product and UGC ads with AI — ready for Reels, TikTok and YouTube." },
];

function Bubble({ m }: { m: Msg }) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.92rem] leading-snug",
        m.from === "emi" ? "self-start rounded-bl-md bg-white/[0.08] text-white/90" : "self-end rounded-br-md bg-accent text-white",
      )}
      style={{ animation: "chat-in .35s cubic-bezier(.16,1,.3,1) both" }}
    >
      {m.text}
    </div>
  );
}

function Typing() {
  return (
    <div className="flex gap-1 self-start rounded-2xl rounded-bl-md bg-white/[0.08] px-4 py-3.5" aria-hidden="true">
      {[0, 1, 2].map((d) => (
        <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" style={{ animationDelay: `${d * 0.2}s` }} />
      ))}
    </div>
  );
}

function ChatHome() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<number[]>([]);

  // Emi introduces herself, one message at a time.
  useEffect(() => {
    let k = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const next = () => {
      if (k >= INTRO.length) return;
      setTyping(true);
      timers.push(
        setTimeout(() => {
          setTyping(false);
          // Read the message out first: React may run the update twice.
          const msg = INTRO[k++]!;
          setMsgs((m) => [...m, msg]);
          timers.push(setTimeout(next, 350));
        }, 700),
      );
    };
    timers.push(setTimeout(next, 400));
    return () => timers.forEach(clearTimeout);
  }, []);

  const choose = (c: number) => {
    const choice = CHOICES[c]!;
    const s = SERVICES[choice.s]!;
    setAsked((a) => [...a, c]);
    setMsgs((m) => [...m, { from: "you", text: choice.label }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [
        ...m,
        { from: "emi", text: choice.reply },
        {
          from: "emi",
          text: (
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <s.Icon className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-medium text-white">{s.name}</span>
                <span className="text-xs text-accent">See how it works →</span>
              </span>
            </span>
          ),
        },
      ]);
    }, 1100);
  };

  const ready = msgs.length >= INTRO.length && !typing;
  const left = CHOICES.map((c, k) => ({ ...c, k })).filter((c) => !asked.includes(c.k));

  return (
    <section id="top" data-nav-dark className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0b0b0d] pt-24 pb-8 text-white">
      <div className="pointer-events-none absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
      <div className="container-x relative">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white">
            <Sparkles className="h-5 w-5" />
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-[#0b0b0d] bg-[#22c55e]" />
          </span>
          <span className="leading-tight">
            <span className="block font-medium">Emi</span>
            <span className="text-xs text-white/50">EmiNara's AI · replies instantly</span>
          </span>
        </div>
      </div>

      <div className="container-x relative flex flex-1 flex-col gap-2 pt-5">
        {msgs.map((m, k) => (
          <Bubble key={k} m={m} />
        ))}
        {typing && <Typing />}
        {ready && left.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-end gap-2" style={{ animation: "chat-in .4s ease-out both" }}>
            {asked.length > 0 && <p className="w-full text-right text-xs text-white/40">Anything else?</p>}
            {left.map((c) => (
              <button
                key={c.k}
                type="button"
                onClick={() => choose(c.k)}
                className="rounded-full border border-accent/60 px-3.5 py-2 text-sm text-white transition-colors hover:bg-accent"
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
        <Actions className="mt-auto pt-6" />
      </div>
    </section>
  );
}

const HOME_SCREENS: Record<Concept, () => ReactNode> = { app: AppHome, stories: StoriesHome, chat: ChatHome };

function PreviewPage() {
  useLenis();
  const { v } = Route.useSearch();
  const HomeScreen = HOME_SCREENS[v];
  // Only the first screen changes; everything below it is the normal home page.
  return (
    <div className="relative min-h-screen bg-ink text-cream">
      <Navbar />
      <main className="overflow-x-clip">
        <HomeScreen key={v} />
        <Ticker />
        <Services />
        <AIChatDemo />
        <VoiceAgentDemo />
        <AutomationFlow />
        <Portfolio />
        <VideoAds />
        <CaseStudies />
        <Process />
        <WhoWeHelp />
        <WhyEmiNara />
        <Trust />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
