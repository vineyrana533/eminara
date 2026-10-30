// Temporary page for choosing a phone hero. Not linked anywhere; delete it
// once a design is picked. Pick with ?v=top|conveyor|radar. Phone sizes only.
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../eminara/components/Navbar";
import HeroCore, { useCanvas } from "../eminara/components/HeroCore";
import { INDUSTRIES } from "../eminara/components/Hero";
import MagneticButton from "../eminara/components/ui/MagneticButton";
import { cn } from "../eminara/utils/cn";

const DESIGNS = ["top", "conveyor", "radar"] as const;
type Design = (typeof DESIGNS)[number];

export const Route = createFileRoute("/preview-mobile-hero")({
  validateSearch: (s: Record<string, unknown>) => ({
    v: DESIGNS.includes(s["v"] as Design) ? (s["v"] as Design) : "top",
  }),
  head: () => ({
    meta: [{ title: "Mobile hero — preview" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PreviewPage,
});

const PINK = "255,47,146";
const FONT = "500 11px Inter, ui-sans-serif, system-ui, sans-serif";

/* ── Shared pieces ──────────────────────────────────────────────── */

function useTaskCount() {
  const [n, setN] = useState(2_481_093);
  useEffect(() => {
    const t = setInterval(() => setN((v) => v + 30 + (v % 23)), 120);
    return () => clearInterval(t);
  }, []);
  return n;
}

const Arrow = () => (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Copy({ center, pill = true, copyRef }: { center?: boolean; pill?: boolean; copyRef?: RefObject<HTMLDivElement | null> }) {
  const tasks = useTaskCount();
  return (
    <div ref={copyRef} className={cn("flex flex-col", center ? "items-center text-center" : "items-start")}>
      {pill && (
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> One AI core · 1,000 agents
        </p>
      )}
      <h1 className="text-[2.55rem] font-medium leading-[0.95] tracking-[-0.05em]">
        Everything your business does.
        <br />
        <span className="font-serif-italic text-accent">Done by one AI.</span>
      </h1>
      <p className={cn("mt-5 text-[0.95rem] leading-relaxed text-white/70", center && "max-w-[22rem]")}>
        Calls, emails, invoices, leads and tickets pour in. EmiNara's AI handles every one — the work of a thousand people, around the clock.
      </p>
      <div className="mt-7 flex w-full flex-col gap-3">
        <MagneticButton
          href="#contact"
          size="lg"
          variant="accent"
          className="bg-accent py-3.5 text-white shadow-[0_14px_36px_-18px_rgba(255,47,146,0.9)] hover:bg-white hover:text-[#0b0b0d]"
        >
          Book a Strategy Call <Arrow />
        </MagneticButton>
        <MagneticButton href="#work" size="lg" variant="ghost" className="border-white/20 bg-transparent py-3.5 text-white/85 hover:bg-white/10">
          Explore Our Work
        </MagneticButton>
      </div>
      <p className="mt-6 text-xs text-white/50">
        <span className="text-base font-medium tabular-nums text-white">{tasks.toLocaleString("en-US")}</span> tasks handled today
        <span className="ml-2 text-white/30">· illustrative</span>
      </p>
    </div>
  );
}

function Ticker() {
  return (
    <div className="overflow-hidden border-t border-white/10 bg-[#0b0b0d]/60 py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex w-max animate-[ticker_40s_linear_infinite] whitespace-nowrap">
        {[0, 1].map((n) => (
          <ul key={n} className="flex shrink-0 items-center" aria-hidden={n === 1 || undefined}>
            {INDUSTRIES.map((x) => (
              <li key={x} className="flex items-center gap-8 pr-8 text-xs uppercase tracking-[0.22em] text-white/55">
                {x}
                <span className="text-accent">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <section id="top" data-nav-dark className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0b0b0d] text-white">
      {children}
    </section>
  );
}

function drawCore(ctx: CanvasRenderingContext2D, cx: number, cy: number, t: number, size: number) {
  const pulse = 1 + Math.sin(t * 3) * 0.06;
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * pulse);
  g.addColorStop(0, `rgba(${PINK},0.85)`);
  g.addColorStop(0.28, `rgba(${PINK},0.26)`);
  g.addColorStop(1, `rgba(${PINK},0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, size * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(cx, cy, 7 * pulse, 0, Math.PI * 2);
  ctx.fill();
}

/* ── 1. The animation on top, the words below ───────────────────── */

function HeroTop() {
  const copy = useRef<HTMLDivElement>(null);
  return (
    <Shell>
      <HeroCore copy={copy} mobile="top" />
      {/* A solid sheet under the words, fading in just above them. */}
      <div className="pointer-events-none absolute inset-x-0 top-[calc(40svh-70px)] bottom-0 bg-gradient-to-b from-transparent via-[#0b0b0d] via-[70px] to-[#0b0b0d]" />
      <div className="container-x relative flex-1 pt-[40svh] pb-10">
        <Copy copyRef={copy} pill={false} />
      </div>
      <div className="relative">
        <Ticker />
      </div>
    </Shell>
  );
}

/* ── 2. A conveyor: work goes in, finished work comes out ────────── */

const INPUTS = ["call", "email", "invoice", "new lead", "ticket", "booking", "refund", "quote"];
const OUTPUTS = ["✓ booked", "✓ paid", "✓ replied", "✓ resolved", "✓ sent", "✓ qualified"];

type Mover = { x: number; y0: number; v: number; out: boolean };
type Chip = Mover & { label: string };
type Belt = { dots: Mover[]; chips: Chip[]; nextIn: number; nextOut: number; k: number; ripples: number[] };

function pill(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, out: boolean, alpha: number) {
  const tw = ctx.measureText(label).width;
  const w = tw + 16;
  const h = 20;
  ctx.globalAlpha = alpha;
  ctx.fillStyle = out ? `rgba(${PINK},0.95)` : "rgba(255,255,255,0.08)";
  ctx.strokeStyle = out ? `rgba(${PINK},1)` : "rgba(255,255,255,0.18)";
  ctx.beginPath();
  ctx.roundRect(x - w / 2, y - h / 2, w, h, 10);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = out ? "#fff" : "rgba(255,255,255,0.85)";
  ctx.fillText(label, x, y + 4);
  ctx.globalAlpha = 1;
}

function Conveyor() {
  const belt = useRef<Belt | null>(null);

  // y for something at x: inputs funnel into the core, outputs fan back out.
  const yAt = (m: Mover, cx: number, cy: number, w: number) => {
    const p = m.out ? Math.min(1, (m.x - cx) / (w - cx)) : Math.min(1, m.x / cx);
    return m.out ? cy + (m.y0 - cy) * Math.pow(p, 1.1) : cy + (m.y0 - cy) * Math.pow(1 - p, 1.4);
  };

  const trails = useCanvas((ctx, w, h) => {
    const b = (belt.current ??= { dots: [], chips: [], nextIn: 0, nextOut: 40, k: 0, ripples: [] });
    const cx = w / 2;
    const cy = h / 2;
    ctx.fillStyle = "rgba(11,11,13,0.3)";
    ctx.fillRect(0, 0, w, h);
    if (b.dots.length < 110) b.dots.push({ x: -4, y0: 8 + Math.random() * (h - 16), v: 1.1 + Math.random() * 1.3, out: false });
    for (let i = b.dots.length - 1; i >= 0; i--) {
      const d = b.dots[i]!;
      d.x += d.out ? d.v * 1.5 : d.v * (1 + (d.x / cx) * 0.8);
      if (!d.out && d.x >= cx - 4) {
        d.out = true;
        d.x = cx + 4;
        d.y0 = 8 + Math.random() * (h - 16);
      }
      if (d.out && d.x > w + 4) {
        b.dots.splice(i, 1);
        continue;
      }
      const y = yAt(d, cx, cy, w);
      if (d.out) {
        ctx.fillStyle = `rgba(${PINK},${(0.9 * (1 - (d.x - cx) / (w - cx))).toFixed(3)})`;
        ctx.fillRect(d.x - 1, y - 1, 2.2, 2.2);
      } else {
        ctx.fillStyle = `rgba(255,255,255,${(0.25 + 0.5 * (d.x / cx)).toFixed(3)})`;
        ctx.fillRect(d.x - 0.8, y - 0.8, 1.6, 1.6);
      }
    }
  }, 4);

  const crisp = useCanvas((ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h);
    const b = belt.current;
    if (!b) return;
    const cx = w / 2;
    const cy = h / 2;
    ctx.font = FONT;
    ctx.textAlign = "center";
    ctx.lineWidth = 1;

    if (--b.nextIn <= 0) {
      b.chips.push({ x: -40, y0: h * 0.25 + Math.random() * h * 0.5, v: 1.3, out: false, label: INPUTS[b.k++ % INPUTS.length]! });
      b.nextIn = 70;
    }
    for (let i = b.chips.length - 1; i >= 0; i--) {
      const c = b.chips[i]!;
      c.x += c.v;
      if (!c.out && c.x >= cx - 18) {
        // Swallowed by the core; a finished version comes out the other side.
        c.out = true;
        c.x = cx + 18;
        c.y0 = h * 0.25 + Math.random() * h * 0.5;
        c.label = OUTPUTS[b.k % OUTPUTS.length]!;
        c.v = 1.5;
        b.ripples.push(0);
      }
      if (c.out && c.x > w + 50) {
        b.chips.splice(i, 1);
        continue;
      }
      const y = yAt(c, cx, cy, w);
      // Inputs fade before they bunch up at the core; outputs fade in once clear of it.
      const alpha = c.out ? Math.min(1, (c.x - cx - 40) / 30) * Math.min(1, (w + 30 - c.x) / 60) : Math.min(1, (cx - 60 - c.x) / 40);
      pill(ctx, c.x, y, c.label, c.out, Math.max(0, alpha));
    }

    drawCore(ctx, cx, cy, t, 64);
    for (let k = b.ripples.length - 1; k >= 0; k--) {
      const q = (b.ripples[k] = b.ripples[k]! + 0.03);
      if (q >= 1) {
        b.ripples.splice(k, 1);
        continue;
      }
      ctx.strokeStyle = `rgba(${PINK},${((1 - q) * 0.6).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 12 + q * 46, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, 4);

  return (
    // Soft top and bottom edges, so the strip melts into the page.
    <div className="relative h-[clamp(140px,22svh,190px)] w-full [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]">
      <canvas ref={trails} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <canvas ref={crisp} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}

function HeroConveyor() {
  return (
    <Shell>
      <div className="relative pt-24">
        <Conveyor />
      </div>
      <div className="container-x relative flex-1 pt-6 pb-10">
        <Copy pill={false} />
      </div>
      <Ticker />
    </Shell>
  );
}

/* ── 3. A calm radar pulse, words centred ───────────────────────── */

type Blip = { x: number; y: number; v: number; spin: number };
type Radar = { blips: Blip[]; rings: number[]; since: number; flash: number };

function RadarField() {
  const radar = useRef<Radar | null>(null);
  const CORE_Y = 150;

  const spawn = (w: number, h: number): Blip => ({
    x: Math.random() * w,
    y: CORE_Y + 40 + Math.random() * (h - CORE_Y - 40),
    v: 0.6 + Math.random() * 0.8,
    spin: (Math.random() < 0.5 ? -1 : 1) * (0.004 + Math.random() * 0.006),
  });

  const trails = useCanvas((ctx, w, h) => {
    const r = (radar.current ??= { blips: [], rings: [0, 0.33, 0.66], since: 0, flash: 0 });
    const cx = w / 2;
    ctx.fillStyle = "rgba(11,11,13,0.22)";
    ctx.fillRect(0, 0, w, h);
    while (r.blips.length < 46) r.blips.push(spawn(w, h));
    for (let i = r.blips.length - 1; i >= 0; i--) {
      const b = r.blips[i]!;
      const dx = b.x - cx;
      const dy = b.y - CORE_Y;
      const d = Math.hypot(dx, dy);
      if (d < 10) {
        r.blips[i] = spawn(w, h);
        r.flash = 1;
        continue;
      }
      // Drawn in along a gentle curve, faster as it gets close.
      const a = Math.atan2(dy, dx) + b.spin * (300 / (d + 60));
      const nd = d - b.v * (1 + 120 / (d + 40));
      b.x = cx + Math.cos(a) * nd;
      b.y = CORE_Y + Math.sin(a) * nd;
      ctx.fillStyle = `rgba(255,255,255,${(0.25 + 0.55 * Math.max(0, 1 - nd / 500)).toFixed(3)})`;
      ctx.fillRect(b.x - 1, b.y - 1, 2, 2);
    }
  }, 4);

  const crisp = useCanvas((ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h);
    const r = radar.current;
    if (!r) return;
    const cx = w / 2;
    const reach = Math.hypot(Math.max(cx, w - cx), h - CORE_Y);
    ctx.lineWidth = 1;
    for (let k = 0; k < r.rings.length; k++) {
      const q = (r.rings[k] = (r.rings[k]! + 0.0035) % 1);
      ctx.strokeStyle = `rgba(${PINK},${(0.4 * Math.pow(1 - q, 1.6)).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(cx, CORE_Y, 20 + q * reach, 0, Math.PI * 2);
      ctx.stroke();
    }
    drawCore(ctx, cx, CORE_Y, t, 90 + r.flash * 20);
    r.flash *= 0.92;
  }, 4);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <canvas ref={trails} className="absolute inset-0 h-full w-full" />
      <canvas ref={crisp} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

function HeroRadar() {
  return (
    <Shell>
      <RadarField />
      {/* Darker where the words sit, so the rings stay a soft backdrop. */}
      <div className="pointer-events-none absolute inset-x-0 top-[230px] bottom-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(11,11,13,0.75),rgba(11,11,13,0.2)_70%)]" />
      <div className="container-x relative flex-1 pt-[236px] pb-10">
        <Copy center pill={false} />
      </div>
      <div className="relative">
        <Ticker />
      </div>
    </Shell>
  );
}

const HEROES: Record<Design, () => ReactNode> = { top: HeroTop, conveyor: HeroConveyor, radar: HeroRadar };

function PreviewPage() {
  const { v } = Route.useSearch();
  const Hero = HEROES[v];
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero key={v} />
      </main>
    </div>
  );
}
