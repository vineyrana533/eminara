import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarCheck,
  Check,
  Cpu,
  Heart,
  MessageCircle,
  PhoneMissed,
  Send,
  Smartphone,
  Sparkles,
  Voicemail,
  Zap,
} from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { cn } from "../utils/cn";
import { scrollToId } from "../lib/smooth-scroll";

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
    desc: "AI systems that do the work of entire departments, around the clock.",
    points: ["AI agent teams", "Back-office operations", "Document processing", "Data & reporting", "Ops at scale"],
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

// Departments around one AI core. Positions are in a 1000 × 700 box; the map
// keeps that aspect so the SVG links and the HTML cards line up.
const UNITS = [
  { name: "Sales", agents: 180, tasks: "41k", x: 500, y: 85 },
  { name: "Support", agents: 260, tasks: "63k", x: 155, y: 255 },
  { name: "Finance", agents: 150, tasks: "38k", x: 845, y: 255 },
  { name: "Operations", agents: 290, tasks: "52k", x: 240, y: 600 },
  { name: "HR & admin", agents: 120, tasks: "18k", x: 760, y: 600 },
];

function VisualAutomation() {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-cream">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" />
          Company-wide automation
        </span>
        <span className="rounded-full border border-line bg-panel px-2.5 py-0.5 text-[0.65rem] text-muted">212k tasks a day</span>
      </div>

      <div className="relative my-auto aspect-[10/7] w-full">
        <svg viewBox="0 0 1000 700" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {UNITS.map((u, i) => {
            const d = `M 500 360 L ${u.x} ${u.y}`;
            return (
              <g key={u.name}>
                <path d={d} stroke="var(--color-line)" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
                {[0, 0.7].map((b) => (
                  <circle key={b} r="7" fill="var(--color-accent)">
                    <animateMotion dur="1.4s" begin={`${b + i * 0.15}s`} repeatCount="indefinite" path={d} />
                  </circle>
                ))}
              </g>
            );
          })}
        </svg>

        <div className="absolute left-1/2 top-[51.4%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="absolute h-20 w-20 animate-ping rounded-full bg-accent/10 sm:h-28 sm:w-28" />
          <span className="relative flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full bg-accent text-white shadow-lg sm:h-24 sm:w-24">
            <Cpu className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="mt-1 text-[0.6rem] font-medium sm:text-[0.65rem]">Emi core</span>
            <span className="text-[0.5rem] opacity-80 sm:text-[0.55rem]">1,000 agents</span>
          </span>
        </div>

        {UNITS.map((u) => (
          <div
            key={u.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-panel px-2 py-1.5 text-center shadow-sm sm:px-3 sm:py-2"
            style={{ left: `${u.x / 10}%`, top: `${(u.y / 700) * 100}%` }}
          >
            <p className="whitespace-nowrap text-[0.7rem] font-medium text-cream sm:text-xs">{u.name}</p>
            <p className="whitespace-nowrap text-[0.55rem] text-muted sm:text-[0.6rem]">
              {u.agents} agents · <span className="text-accent">{u.tasks}/day</span>
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-[0.6rem] text-faint">Illustrative example</p>
    </div>
  );
}

/**
 * Two versions of the same thing, split by a divider that sweeps across on its
 * own (web-wipe / web-bar in styles.css) and follows the pointer when there is one.
 * Children are drawn on top, for labels.
 */
function BeforeAfter({
  before,
  after,
  label,
  className,
  dark,
  children,
}: {
  before: ReactNode;
  after: ReactNode;
  label: string;
  className?: string;
  /** A dark divider, for light content. */
  dark?: boolean;
  children?: ReactNode;
}) {
  const [pos, setPos] = useState<number | null>(null);
  const area = useRef<HTMLDivElement>(null);
  const follow = (e: PointerEvent) => {
    const r = area.current?.getBoundingClientRect();
    if (r) setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={area}
      className={cn("relative cursor-ew-resize touch-pan-y select-none overflow-hidden", className)}
      onPointerMove={follow}
      onPointerLeave={() => setPos(null)}
      role="img"
      aria-label={label}
    >
      {after}
      {/* The resting values are the 50/50 split shown when motion is reduced. */}
      <div
        className="absolute inset-0"
        style={
          pos === null
            ? { clipPath: "inset(0 50% 0 0)", animation: "web-wipe 7s ease-in-out infinite" }
            : { clipPath: `inset(0 ${100 - pos}% 0 0)` }
        }
      >
        {before}
      </div>
      <div
        className={cn("absolute inset-y-0 w-0.5 -translate-x-1/2", dark ? "bg-cream/80" : "bg-white shadow")}
        style={pos === null ? { left: "50%", animation: "web-bar 7s ease-in-out infinite" } : { left: `${pos}%` }}
      >
        <span
          className={cn(
            "absolute top-1/2 left-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[0.6rem] shadow-md",
            dark ? "bg-cream text-white" : "bg-white text-black",
          )}
        >
          ⇆
        </span>
      </div>
      {children}
    </div>
  );
}

// A day of calls, first unanswered and then with Emi picking up.
const CALLS = [
  { time: "7:42 pm", who: "New caller", before: "Missed", after: "Booked · Tue 3pm" },
  { time: "8:05 pm", who: "Sarah M.", before: "Missed", after: "Quote sent" },
  { time: "9:15 pm", who: "Unknown", before: "Voicemail", after: "Booked · Thu 10am" },
  { time: "12:30 am", who: "New caller", before: "Missed", after: "Question answered" },
  { time: "10:02 am", who: "Dave R.", before: "Hung up on hold", after: "Transferred to you" },
  { time: "1:15 pm", who: "New caller", before: "Missed", after: "Booked · Fri 2pm" },
];

/** The answered log is mirrored, so its outcomes sit on the side that shows. */
function CallLog({ answered }: { answered?: boolean }) {
  return (
    <div className={cn("absolute inset-0 flex flex-col p-3 sm:p-4", answered ? "bg-panel" : "bg-[#f3eded]")}>
      <div className={cn("mb-1 flex items-center gap-2 text-[0.6rem] sm:mb-2 sm:text-[0.65rem]", answered && "flex-row-reverse")}>
        <span className="font-medium text-cream">{answered ? "With Emi answering" : "Your phone, last 24 hours"}</span>
        <span className={cn("rounded-full px-2 py-0.5 font-medium", answered ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#fee2e2] text-[#b91c1c]")}>
          {answered ? "6 answered · 3 booked" : "5 missed"}
        </span>
      </div>
      <ul className="flex flex-1 flex-col justify-between">
        {CALLS.map((c) => (
          <li
            key={c.time}
            className={cn(
              "flex items-center gap-2 border-b border-line-soft py-1 text-[0.6rem] last:border-0 sm:py-1.5 sm:text-[0.65rem]",
              answered && "flex-row-reverse text-right",
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full sm:h-6 sm:w-6",
                answered ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#fee2e2] text-[#dc2626]",
              )}
            >
              {answered ? <Check className="h-3 w-3" /> : c.before === "Voicemail" ? <Voicemail className="h-3 w-3" /> : <PhoneMissed className="h-3 w-3" />}
            </span>
            <span className={cn("font-medium", answered ? "text-[#15803d]" : "text-[#b91c1c]")}>{answered ? c.after : c.before}</span>
            <span className={cn("hidden text-muted sm:inline", answered ? "mr-auto" : "ml-auto")}>
              {c.who} · {c.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VisualVoice() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <BeforeAfter
        dark
        className="aspect-square rounded-xl border border-line shadow-sm sm:aspect-[16/11]"
        label="A call log of missed calls beside the same calls answered by an AI receptionist"
        before={<CallLog />}
        after={<CallLog answered />}
      />
      <p className="text-center text-xs text-muted">Every call that used to go to voicemail, answered and turned into business.</p>
    </div>
  );
}

// One AI answering four inboxes at once. Every card is in the site's own
// neutrals with Emi's replies in pink; only the avatar carries the app's colour.
type ChatLine = { from: "them" | "emi" | "done"; text: string };

const INBOXES: { name: string; handle: string; avatar: string; ticks?: boolean; script: ChatLine[] }[] = [
  {
    name: "Website chat",
    handle: "blendr.co",
    avatar: "bg-cream text-white",
    script: [
      { from: "them", text: "Do you deliver on Sundays?" },
      { from: "emi", text: "Yes — free over $50. Add the blender to your cart?" },
      { from: "them", text: "Yes please" },
      { from: "done", text: "Order placed · $64" },
    ],
  },
  {
    name: "WhatsApp",
    handle: "Bright Smile Dental",
    avatar: "bg-[#25D366] text-white",
    ticks: true,
    script: [
      { from: "them", text: "Can I move my cleaning to Friday?" },
      { from: "emi", text: "Done ✓ Friday at 2pm. See you then!" },
      { from: "them", text: "Thanks 🙏" },
      { from: "done", text: "Rescheduled · Fri 2pm" },
    ],
  },
  {
    name: "Instagram DM",
    handle: "glow.studio",
    avatar: "bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white",
    script: [
      { from: "them", text: "How much is the facial?" },
      { from: "emi", text: "$65 for 60 min. 4pm is free today — book it?" },
      { from: "them", text: "Book it!" },
      { from: "done", text: "Booked · today 4pm" },
    ],
  },
  {
    name: "Messenger",
    handle: "Meridian Estates",
    avatar: "bg-gradient-to-br from-[#00B2FF] to-[#006AFF] text-white",
    script: [
      { from: "them", text: "Is the 2-bed on Elm St available?" },
      { from: "emi", text: "It is! Viewings Tue or Thu — which suits you?" },
      { from: "them", text: "Thursday" },
      { from: "done", text: "Viewing booked · Thu 11am" },
    ],
  },
];

// Each inbox runs the same 14-beat loop, started at a different beat so
// there's always something happening somewhere.
const CHAT_LOOP = 14;
const CHAT_BEATS = [0, 1, 3, 5, 6, 8]; // them, typing, emi, them, typing, done
const CHAT_OFFSETS = [0, 7, 3, 10];
const chatIn = { animation: "chat-in .35s cubic-bezier(.16,1,.3,1) both" };

function Inbox({ inbox, beat }: { inbox: (typeof INBOXES)[number]; beat: number }) {
  const [them, emi, reply, done] = inbox.script as [ChatLine, ChatLine, ChatLine, ChatLine];
  const [b0, b1, b2, b3, b4, b5] = CHAT_BEATS as [number, number, number, number, number, number];
  const shown: (ChatLine | "typing")[] = [];
  if (beat >= b0) shown.push(them);
  if (beat === b1 || beat === b1 + 1) shown.push("typing");
  if (beat >= b2) shown.push(emi);
  if (beat >= b3) shown.push(reply);
  if (beat >= b4 && beat < b5) shown.push("typing");
  if (beat >= b5) shown.push(done);
  // The card lights up the moment Emi replies.
  const flash = beat === b2 || beat === b5;

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-sm transition-[box-shadow,border-color] duration-500",
        flash && "border-accent shadow-[0_0_0_3px_rgba(255,47,146,0.18),0_10px_30px_-12px_rgba(255,47,146,0.5)]",
      )}
    >
      <div className="flex items-center gap-2 border-b border-line-soft bg-panel px-3 py-2 text-cream">
        <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-semibold", inbox.avatar)}>
          {inbox.handle[0]}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[0.65rem] font-semibold">{inbox.handle}</span>
          <span className="flex items-center gap-1 text-[0.52rem] text-muted">
            <MessageCircle className="h-2.5 w-2.5" /> {inbox.name}
          </span>
        </span>
        <span className="hidden items-center gap-1 text-[0.52rem] opacity-70 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" /> Emi
        </span>
      </div>
      <div className="flex h-[12rem] flex-col justify-end gap-1.5 overflow-hidden bg-panel-2 p-2 sm:h-[9.5rem] sm:p-2.5">
        {shown.map((l, i) =>
          l === "typing" ? (
            <span key={`t${i}`} className="flex gap-1 self-end rounded-xl bg-accent px-2.5 py-2 text-white" style={chatIn} aria-hidden="true">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1 w-1 animate-pulse rounded-full bg-current opacity-70" style={{ animationDelay: `${d * 0.2}s` }} />
              ))}
            </span>
          ) : l.from === "done" ? (
            <span
              key={i}
              className="inline-flex items-center gap-1 self-center rounded-full bg-[#dcfce7] px-2.5 py-1 text-[0.58rem] font-semibold text-[#15803d] shadow-sm"
              style={chatIn}
            >
              <Check className="h-3 w-3" /> {l.text}
            </span>
          ) : (
            <span
              key={i}
              className={cn(
                "max-w-[88%] rounded-xl px-2.5 py-1.5 text-[0.6rem] leading-snug shadow-[0_1px_0_rgba(0,0,0,0.04)]",
                l.from === "them"
                  ? "self-start rounded-bl-sm bg-panel text-cream-dim ring-1 ring-line-soft"
                  : "self-end rounded-br-sm bg-accent text-white",
              )}
              style={chatIn}
            >
              {l.text}
              {l.from === "emi" && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 align-bottom text-[0.5rem] opacity-70">
                  2s{inbox.ticks && <span>✓✓</span>}
                </span>
              )}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

function VisualChat() {
  const [tick, setTick] = useState(0);
  // Visitors who ask for less motion get every conversation finished and still.
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const t = setInterval(() => setTick((v) => v + 1), 650);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-cream">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" /> One AI, every inbox
        </span>
        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.65rem] font-medium tabular-nums text-accent">
          {(1284 + tick).toLocaleString("en-US")} chats today
        </span>
      </div>

      <div className="relative grid grid-cols-2 gap-2.5 sm:gap-4">
        {INBOXES.map((inbox, i) => (
          <Inbox key={inbox.name} inbox={inbox} beat={still ? CHAT_BEATS[5]! + 1 : (tick + CHAT_OFFSETS[i]!) % CHAT_LOOP} />
        ))}
        {/* The one AI behind all four inboxes. */}
        <span className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="absolute h-14 w-14 animate-ping rounded-full bg-accent/10 sm:h-16 sm:w-16" />
          <span className="relative flex h-11 w-11 flex-col items-center justify-center rounded-full border-4 border-ink bg-accent text-[0.55rem] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(255,47,146,0.6)] sm:h-16 sm:w-16 sm:text-[0.6rem]">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" /> Emi
          </span>
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[0.62rem] text-muted">
        <span className="flex items-center gap-1.5">
          Also on
          {["SMS", "Email", "Google Business", "Telegram"].map((x) => (
            <span key={x} className="rounded-full border border-line bg-panel px-2 py-0.5 text-cream-dim">
              {x}
            </span>
          ))}
        </span>
        <span>Replies in 2 sec · 24/7</span>
      </div>
    </div>
  );
}

// The same estate agent before and after. A divider sweeps across on its own
// (web-wipe / web-bar in styles.css); under the pointer it follows the pointer.
function OldEstateSite() {
  return (
    <div className="h-full w-full bg-[#dcdcdc] p-[4%] text-black" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      <div className="bg-[#000080] px-2 py-1.5 text-sm font-bold text-[#ffff00]">MERIDIAN ESTATES</div>
      <p className="mt-1 text-[0.6rem] text-[#0000ee] underline">Home | About Us | Listings | Contact</p>
      <p className="mt-2 text-[0.7rem] font-bold text-[#cc0000]">*** Welcome to our website!!! ***</p>
      <div className="mt-2 flex gap-2">
        <div className="flex h-16 w-20 shrink-0 items-center justify-center border border-black bg-[#bdbdbd] text-[0.5rem]">[image]</div>
        <table className="border-collapse text-[0.55rem]">
          <tbody>
            {["3 bed house - $450,000", "2 bed flat - $310,000", "Land for sale - call"].map((r) => (
              <tr key={r}>
                <td className="border border-black px-1">{r}</td>
                <td className="border border-black px-1 text-[#0000ee] underline">click here</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[0.55rem]">Call us Mon-Fri 9-5. Fax available.</p>
      <p className="mt-1 text-[0.5rem] text-[#555]">Best viewed in Internet Explorer 6 · Visitors: 000417</p>
    </div>
  );
}

const WEB_WINS = [
  { Icon: CalendarCheck, label: "Book online 24/7", top: "30%" },
  { Icon: Smartphone, label: "Perfect on phones", top: "46%" },
  { Icon: Zap, label: "Loads in under 1s", top: "62%" },
];

function NewEstateSite() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src="https://images.pexels.com/photos/7031604/pexels-photo-7031604.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
      {/* Content sits on the right, the side that is showing while the divider rests mid-way. */}
      <div className="relative flex h-full flex-col p-[5%] text-white">
        <div className="flex items-center justify-between">
          <span className="text-[0.7rem] font-semibold tracking-tight">Meridian Estates</span>
          <span className="flex items-center gap-3 text-[0.55rem] text-white/80">
            <span className="hidden sm:inline">Buy</span>
            <span className="hidden sm:inline">Sell</span>
            <span className="hidden sm:inline">Rent</span>
            <span className="rounded-full bg-accent px-2.5 py-1 font-medium text-white">Book a viewing</span>
          </span>
        </div>
        <div className="mt-auto ml-auto max-w-[48%] text-right">
          <p className="text-base font-medium leading-[1.05] tracking-[-0.03em] sm:text-2xl">Find your next home.</p>
          <span className="mt-2 inline-block rounded-full bg-accent px-3 py-1.5 text-[0.55rem] font-medium sm:mt-3 sm:text-[0.6rem]">Book a viewing →</span>
        </div>
      </div>
      {/* Too crowded at phone width, where the headline needs the room. */}
      {WEB_WINS.map(({ Icon, label, top }) => (
        <span
          key={label}
          className="absolute right-[5%] hidden items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.6rem] font-medium text-cream shadow sm:inline-flex"
          style={{ top }}
        >
          <Icon className="h-3 w-3 text-accent" /> {label}
        </span>
      ))}
    </div>
  );
}

function VisualWeb() {
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-line-soft bg-panel-2 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 flex-1 truncate rounded bg-ink px-2 py-0.5 text-[0.55rem] text-muted">🔒 meridianestates.com</span>
        </div>
        <BeforeAfter
          className="aspect-[16/10]"
          label="An outdated estate agent website beside the modern redesign of the same business"
          before={<OldEstateSite />}
          after={<NewEstateSite />}
        >
          <span className="absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wide text-white">Before</span>
          <span className="absolute top-2 right-2 rounded-full bg-accent px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wide text-white">After</span>
        </BeforeAfter>
      </div>
      <p className="text-center text-xs text-muted">Same business. A site that finally looks as good as it performs.</p>
    </div>
  );
}

// Real spots from public/videos, played in turn inside a social feed.
const REELS = [
  { slug: "blender-ugc", brand: "blendr.co", caption: "Smoothies in 30 seconds. No mess. 🍓", likes: "12.4k" },
  { slug: "toothbrush-ugc", brand: "sonicsmile", caption: "The 2-minute upgrade to your morning.", likes: "8.9k" },
  { slug: "skincare-ugc", brand: "rosehip.lab", caption: "One oil. Glow by Friday.", likes: "21.7k" },
];

function VisualVideo() {
  const [i, setI] = useState(0);
  const [progress, setProgress] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const reel = REELS[i]!;

  // React leaves `muted` out of server HTML, and autoplay needs it, so set it
  // here and start playback. Visitors who ask for less motion get a still.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
  }, [i]);

  return (
    <div className="flex h-full items-center justify-center gap-6 p-6">
      <div className="hidden flex-col gap-2.5 sm:flex">
        {["Shot, voiced & edited with AI", "Ready for Reels, TikTok & Shorts", "Delivered in days, not weeks"].map((t) => (
          <span key={t} className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-[0.65rem] text-cream-dim shadow-sm">
            <Sparkles className="h-3 w-3 text-accent" /> {t}
          </span>
        ))}
        <div className="mt-2 flex gap-1.5 pl-1">
          {REELS.map((r, k) => (
            <button
              key={r.slug}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Play the ${r.brand} ad`}
              className={cn("h-1.5 rounded-full transition-all", k === i ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-faint")}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollToId("#video-ads")}
          className="mt-1 self-start pl-1 text-[0.65rem] font-medium text-cream underline-offset-4 hover:text-accent hover:underline"
        >
          Watch all our spots ↓
        </button>
      </div>

      <div className="w-[210px] shrink-0 rounded-[2rem] border-[6px] border-cream bg-cream shadow-2xl">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-black">
          <video
            key={reel.slug}
            ref={video}
            src={`/videos/${reel.slug}.mp4`}
            muted
            playsInline
            preload="auto"
            aria-label={`${reel.brand} video ad`}
            className="absolute inset-0 h-full w-full object-cover"
            onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
            onEnded={() => setI((k) => (k + 1) % REELS.length)}
          />
          <div className="absolute inset-x-2 top-2 h-0.5 overflow-hidden rounded-full bg-white/30">
            <div className="h-full bg-white transition-[width] duration-200 ease-linear" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <div className="absolute top-5 left-3 flex items-center gap-1.5 text-white">
            <span className="h-6 w-6 rounded-full bg-gradient-to-br from-accent to-[#ff9a3c]" />
            <span className="text-[0.6rem] font-semibold leading-tight">
              {reel.brand}
              <span className="block text-[0.5rem] font-normal text-white/70">Sponsored</span>
            </span>
          </div>
          <div className="absolute right-2 bottom-20 flex flex-col items-center gap-3 text-white" aria-hidden="true">
            <span className="flex flex-col items-center text-[0.5rem]">
              <Heart className="h-5 w-5 fill-white" />
              {reel.likes}
            </span>
            <span className="flex flex-col items-center text-[0.5rem]">
              <MessageCircle className="h-5 w-5" />
              318
            </span>
            <Send className="h-5 w-5" />
          </div>
          <div className="absolute inset-x-3 bottom-3 text-white">
            <p className="pr-8 text-[0.6rem] leading-snug">{reel.caption}</p>
            <span className="mt-2 block rounded-md bg-accent py-1.5 text-center text-[0.6rem] font-semibold">Shop now</span>
          </div>
        </div>
      </div>
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

  // allow other sections (e.g. footer links) to jump to a specific service
  useEffect(() => {
    const onSelect = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      if (typeof i === "number" && i >= 0 && i < SERVICES.length) select(i);
    };
    window.addEventListener("eminara:select-service", onSelect);
    return () => window.removeEventListener("eminara:select-service", onSelect);
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
            {/* Hold the auto-advance while the pointer is here, so a panel being
                played with (the website slider) doesn't switch away. */}
            <div
              className="sticky top-24 min-h-[420px] overflow-hidden rounded-3xl border border-line bg-panel/60 lg:h-full"
              onMouseEnter={() => timer.current && clearTimeout(timer.current)}
              onMouseLeave={() => select(active)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full min-h-[420px] flex-col [&>*]:flex-1"
                >
                  {ActiveVisual ? <ActiveVisual /> : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
