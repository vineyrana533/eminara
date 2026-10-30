import { useEffect, useRef, type RefObject } from "react";

/*
 * The hero's "one AI core": particles spiral in from every side (incoming
 * calls, emails, invoices…), reach the glowing core, and stream out to the
 * right as pink finished work. Two canvases: one fades between frames so the
 * particles leave trails, the other is cleared each frame so the floating
 * words and the core stay sharp.
 */

// The site's accent as an rgb triple, for canvas colours.
const PINK = "255,47,146";

export type Tone = "dark" | "light";

/**
 * Canvas colours per tone: what each frame fades towards (the section's
 * background, so trails melt into it), and the colour and strength of the
 * incoming particles and words.
 */
const TONES = {
  dark: { fade: "rgba(11,11,13,0.26)", ink: "255,255,255", inkAlpha: 1 },
  light: { fade: "rgba(236,236,235,0.26)", ink: "11,11,13", inkAlpha: 0.62 },
} satisfies Record<Tone, { fade: string; ink: string; inkAlpha: number }>;

const INBOX = [
  "call",
  "email",
  "invoice",
  "new lead",
  "ticket",
  "booking",
  "refund",
  "quote",
  "order",
  "claim",
  "review",
  "chat",
];

type Swarm = {
  r: Float32Array;
  a: Float32Array;
  s: Float32Array;
  out: Uint8Array;
  words: { r: number; a: number; s: number; w: string }[];
  ripples: number[];
};

function makeSwarm(n: number, rmax: number): Swarm {
  const s: Swarm = {
    r: new Float32Array(n),
    a: new Float32Array(n),
    s: new Float32Array(n),
    out: new Uint8Array(n),
    words: [],
    ripples: [],
  };
  for (let i = 0; i < n; i++) {
    s.r[i] = 40 + Math.random() * rmax;
    s.a[i] = Math.random() * Math.PI * 2;
    s.s[i] = 0.5 + Math.random() * 1.3;
  }
  s.words = INBOX.map((w) => ({
    w,
    r: 120 + Math.random() * rmax,
    a: Math.random() * Math.PI * 2,
    s: 0.35 + Math.random() * 0.4,
  }));
  return s;
}

/**
 * Calls `frame` every animation frame with the canvas size in CSS pixels and
 * the seconds since start; frames clear (or fade) the canvas themselves.
 * Visitors who ask for less motion get a single frame drawn at `stillAt`.
 */
export function useCanvas(
  frame: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void,
  stillAt = 0,
) {
  const ref = useRef<HTMLCanvasElement>(null);
  const draw = useRef(frame);
  draw.current = frame;

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    let w = 0;
    let h = 0;
    let raf = 0;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    const paint = (now: number) => draw.current(ctx, w, h, still ? stillAt : (now - t0) / 1000);
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      w = r.width;
      h = r.height;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (still) paint(performance.now());
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(c);
    const loop = (now: number) => {
      paint(now);
      raf = requestAnimationFrame(loop);
    };
    if (!still) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [stillAt]);

  return ref;
}

/**
 * Where the core sits on phones and small tablets: under the copy, in the
 * empty band between the copy and the bottom of the first screen, or in the
 * first screen's top corner. The last two keep the motion on the first screen.
 */
export type MobileCore = "below" | "stage" | "corner" | "top";

/** Space the industries ticker takes along the bottom of the hero. */
const TICKER = 52;

/**
 * How the core is placed and drawn. It sits right of the copy on wide
 * screens; on narrow ones `mobile` decides. `out` and `spread` aim the
 * finished work; `faint` dims the particles that drift behind the copy.
 */
function coreAt(ctx: CanvasRenderingContext2D, w: number, h: number, copy: HTMLElement | null, mobile: MobileCore) {
  const wide = w > 900;
  const base = { wide, out: 0, spread: 1.1, glow: 150, words: true, faint: 1, count: wide ? 1600 : 900 };
  if (wide) return { ...base, cx: w * 0.66, cy: h * 0.52 };

  const copyBottom =
    (copy?.getBoundingClientRect().bottom ?? h * 0.6) - ctx.canvas.getBoundingClientRect().top;
  if (mobile === "below") return { ...base, cx: w * 0.5, cy: Math.min(copyBottom + 170, h - 140) };
  if (mobile === "top") {
    // The core gets the space above the copy to itself; the copy sits on a
    // solid sheet, so nothing moves behind the words.
    const copyTop = (copy?.getBoundingClientRect().top ?? h * 0.45) - ctx.canvas.getBoundingClientRect().top;
    return { ...base, cx: w * 0.5, cy: Math.max(150, (76 + copyTop) / 2 + 4), glow: 120, spread: 0.8 };
  }

  // Phones keep the motion calm behind the words: fewer, fainter particles,
  // no floating labels, and finished work aimed away from the text.
  const calm = { ...base, words: false, faint: 0.55, count: 600, glow: 100 };
  // The first screen, not the whole section, which can run taller than the phone.
  const screen = Math.min(h, window.innerHeight);
  if (mobile === "corner") return { ...calm, cx: w * 0.86, cy: Math.max(screen * 0.14, 110), out: -0.7, spread: 0.6 };
  // Centred in the band, but never pushed under the ticker on short phones.
  const room = screen - TICKER - copyBottom;
  const cy = Math.min(copyBottom + Math.max(60, room / 2), screen - TICKER - 30);
  return { ...calm, cx: w * 0.5, cy, spread: 0.5 };
}

/** How far a particle can be from the core and still be on screen. */
const reach = (w: number, h: number, cx: number, cy: number) =>
  Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) * 1.05;

export default function HeroCore({
  copy,
  mobile = "below",
  tone = "dark",
}: {
  copy: RefObject<HTMLElement | null>;
  mobile?: MobileCore;
  tone?: Tone;
}) {
  const swarm = useRef<Swarm | null>(null);
  const { fade, ink, inkAlpha } = TONES[tone];

  const trails = useCanvas((ctx, w, h) => {
    const { cx, cy, out, spread, faint, count } = coreAt(ctx, w, h, copy.current, mobile);
    const rmax = reach(w, h, cx, cy);
    const s = (swarm.current ??= makeSwarm(count, rmax));
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < s.r.length; i++) {
      const r = s.r[i]!;
      const ang = s.a[i]!;
      if (!s.out[i]) {
        // Inbound: spiral in, faster near the core.
        const nr = r - s.s[i]! * (1 + 140 / (r + 30));
        const na = ang + 2.4 / (r + 70);
        s.r[i] = nr;
        s.a[i] = na;
        const alpha = Math.min(1, (rmax - nr) / 160) * (0.2 + 0.65 * (1 - nr / rmax)) * faint * inkAlpha;
        ctx.fillStyle = `rgba(${ink},${alpha.toFixed(3)})`;
        ctx.fillRect(cx + Math.cos(na) * nr - 0.8, cy + Math.sin(na) * nr * 0.55 - 0.8, 1.6, 1.6);
        if (nr < 24) {
          // Done: leave as a pink result, streaming out in one direction.
          s.out[i] = 1;
          s.r[i] = 24;
          s.a[i] = out + (Math.random() - 0.5) * spread;
          s.s[i] = 4 + Math.random() * 5;
          if (s.ripples.length < 6 && Math.random() < 0.04) s.ripples.push(0);
        }
      } else {
        const nr = r + s.s[i]!;
        s.r[i] = nr;
        s.s[i] = s.s[i]! * 1.015;
        ctx.strokeStyle = `rgba(${PINK},${Math.max(0, 1 - nr / rmax).toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
        ctx.lineTo(cx + Math.cos(ang) * nr, cy + Math.sin(ang) * nr);
        ctx.stroke();
        if (nr > rmax) {
          s.out[i] = 0;
          s.r[i] = rmax * (0.75 + Math.random() * 0.3);
          s.a[i] = Math.random() * Math.PI * 2;
          s.s[i] = 0.5 + Math.random() * 1.3;
        }
      }
    }
  }, 6);

  const crisp = useCanvas((ctx, w, h, t) => {
    ctx.clearRect(0, 0, w, h);
    const s = swarm.current;
    if (!s) return;
    const { cx, cy, glow: size, words } = coreAt(ctx, w, h, copy.current, mobile);
    const rmax = reach(w, h, cx, cy);

    ctx.font = "500 12px Inter, ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    for (const wd of words ? s.words : []) {
      wd.r -= wd.s * (1 + 90 / (wd.r + 30));
      wd.a += 1.6 / (wd.r + 90);
      if (wd.r < 50) {
        wd.r = rmax * (0.7 + Math.random() * 0.3);
        wd.a = Math.random() * Math.PI * 2;
      }
      ctx.fillStyle = `rgba(${ink},${(Math.min(1, (wd.r - 50) / 80) * 0.75 * inkAlpha).toFixed(3)})`;
      ctx.fillText(wd.w, cx + Math.cos(wd.a) * wd.r, cy + Math.sin(wd.a) * wd.r * 0.55);
    }

    const pulse = 1 + Math.sin(t * 3) * 0.06;
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * pulse);
    glow.addColorStop(0, `rgba(${PINK},0.85)`);
    glow.addColorStop(0.25, `rgba(${PINK},0.28)`);
    glow.addColorStop(1, `rgba(${PINK},0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, size * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx, cy, 9 * pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 1.5;
    for (let k = s.ripples.length - 1; k >= 0; k--) {
      const q = (s.ripples[k] = s.ripples[k]! + 0.02);
      if (q >= 1) {
        s.ripples.splice(k, 1);
        continue;
      }
      ctx.strokeStyle = `rgba(${PINK},${((1 - q) * 0.6).toFixed(3)})`;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 20 + q * 160, (20 + q * 160) * 0.55, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, 6);

  return (
    <div data-depth="core" className="pointer-events-none absolute inset-0" aria-hidden="true">
      <canvas ref={trails} className="absolute inset-0 h-full w-full" />
      <canvas ref={crisp} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
