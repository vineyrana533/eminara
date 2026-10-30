import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import HeroCore, { type MobileCore, type Tone } from "./HeroCore";
import { scrollToId } from "../lib/smooth-scroll";
import { cn } from "../utils/cn";

export const INDUSTRIES = [
  "Startups",
  "SaaS",
  "Healthcare",
  "Dental clinics",
  "Real estate",
  "E-commerce",
  "Travel agencies",
  "Law firms",
  "Home services",
  "Fitness & wellness",
  "Salons & spas",
  "Restaurants",
  "Hospitality",
  "Education",
  "Insurance",
  "Auto dealerships",
  "Agencies",
  "Professional services",
];

function Words({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        // The tight line height would clip descenders (the g in "bookings"), so the
        // mask reaches a little below the line without changing the spacing.
        <span key={i} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
          {/* The start state must match the server's HTML, so reduced motion
              only changes the timing: the words appear in place at once. */}
          <motion.span
            className="inline-block"
            initial={{ y: "125%" }}
            animate={{ y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: 0.9,
                    delay: 0.1 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
          >
            {w}
          </motion.span>
          {i < text.split(" ").length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

/** The hero's wording; the home page uses the defaults below. */
export type HeroText = {
  badge: string;
  title: string;
  accent: string;
  intro: string;
};

const DEFAULT_TEXT: HeroText = {
  badge: "AI systems for growing businesses",
  title: "Win more customers.",
  accent: "Let AI do the busywork.",
  intro:
    "Any repetitive task, in any part of your business. We build custom AI automation that connects your tools, runs around the clock and gets better every month, so your team only does the work that needs a person.",
};

// Classes per tone. Dark is the original look; light matches the soft grey
// of the sections below it.
const TONES = {
  dark: {
    section: "bg-[#0b0b0d] text-white",
    stage: "bg-gradient-to-b from-[#0b0b0d]/65 via-[#0b0b0d]/40 via-55% to-transparent to-80%",
    dim: "bg-[#0b0b0d]/30",
    shade: "from-[#0b0b0d]/85 via-[#0b0b0d]/45",
    badge: "border-white/15 bg-white/5 text-white/70",
    body: "text-white/70",
    primary: "hover:bg-white hover:text-[#0b0b0d]",
    ghost: "border-white/20 bg-transparent text-white/85 hover:border-white/40 hover:bg-white/10",
    ticker: "border-white/10 bg-[#0b0b0d]/60",
    industry: "text-white/55",
  },
  light: {
    section: "bg-ink text-cream",
    stage: "bg-gradient-to-b from-ink/80 via-ink/50 via-55% to-transparent to-80%",
    dim: "bg-ink/40",
    shade: "from-ink/90 via-ink/55",
    badge: "border-line bg-panel/70 text-cream-dim",
    body: "text-cream-dim",
    primary: "hover:bg-cream hover:text-white",
    ghost: "border-cream/15 bg-panel/60 text-cream hover:border-cream/30 hover:bg-panel",
    ticker: "border-line bg-ink/70",
    industry: "text-muted",
  },
} satisfies Record<Tone, Record<string, string>>;

export default function Hero({
  mobileCore = "below",
  tone = "dark",
  text,
}: {
  mobileCore?: MobileCore;
  tone?: Tone;
  text?: Partial<HeroText>;
}) {
  const copy = useRef<HTMLDivElement>(null);
  const c = TONES[tone];
  const t = { ...DEFAULT_TEXT, ...text };
  // With the core in the background, the hero is one phone screen tall.
  const background = mobileCore !== "below";

  return (
    // data-nav-dark tells the navbar to switch to its dark style while over this section.
    <section
      id="top"
      data-nav-dark={tone === "dark" || undefined}
      className={cn(
        "relative overflow-hidden lg:flex lg:min-h-[max(100svh,760px)] lg:flex-col",
        c.section,
        background ? "min-h-[100svh]" : "min-h-[1060px]",
      )}
    >
      <HeroCore copy={copy} mobile={mobileCore} tone={tone} />
      {/* On phones the motion runs behind the words, so dim it where they sit. */}
      {background && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 lg:hidden",
            mobileCore === "stage" ? c.stage : c.dim,
          )}
        />
      )}
      {/* A soft shade behind the copy so the motion never fights the words. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r to-transparent lg:block",
          c.shade,
        )}
      />

      {/* Phones get tighter spacing so the copy leaves room for the motion. On
          laptops the copy keeps clear of the floating navbar, and on short
          screens the section grows rather than pushing the copy up behind it. */}
      <div
        data-depth="copy"
        className={cn(
          "container-x relative flex h-full flex-col justify-start pt-32 pb-24 lg:flex-1 lg:justify-center lg:py-28",
          background && "pt-28 pb-20 sm:pt-32 sm:pb-24",
        )}
      >
        <div ref={copy} className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs backdrop-blur",
              c.badge,
              background && "mb-5 sm:mb-6",
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {t.badge}
          </motion.p>

          <h1
            className={cn(
              "text-[2.9rem] font-medium leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-[5rem]",
              // A font size resets line height in the class merge, so restate it.
              background && "text-[2.6rem] leading-[0.95]",
            )}
          >
            <Words text={t.title} />
            <br />
            <Words text={t.accent} className="font-serif-italic text-accent" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "mt-6 max-w-md text-base leading-relaxed sm:text-lg",
              c.body,
              background && "mt-5 text-[0.95rem] leading-relaxed sm:mt-6",
            )}
          >
            {t.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={cn("mt-8 flex flex-col gap-3 sm:flex-row", background && "mt-7 sm:mt-8")}
          >
            <MagneticButton
              href="#contact"
              size="lg"
              variant="accent"
              className={cn(
                "bg-accent text-white shadow-[0_14px_36px_-18px_rgba(255,47,146,0.9)]",
                c.primary,
                background && "py-3.5 sm:py-4",
              )}
              onClick={() => scrollToId("#contact")}
            >
              Book a Strategy Call
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
            <MagneticButton
              href="#work"
              size="lg"
              variant="ghost"
              className={cn(
                c.ghost,
                background && "py-3.5 sm:py-4",
              )}
              onClick={() => scrollToId("#work")}
            >
              Explore Our Work
            </MagneticButton>
          </motion.div>

        </div>
      </div>

      {/* Industries we work with, running along the bottom edge. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className={cn(
          "absolute inset-x-0 bottom-0 overflow-hidden border-t py-4 backdrop-blur-sm [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
          c.ticker,
        )}
      >
        {/* Two copies side by side; the ticker keyframe slides by half, so the loop is seamless. */}
        <div className="flex w-max animate-[ticker_40s_linear_infinite] whitespace-nowrap">
          {[0, 1].map((n) => (
            <ul key={n} className="flex shrink-0 items-center" aria-hidden={n === 1 || undefined}>
              {INDUSTRIES.map((x) => (
                <li
                  key={x}
                  className={cn(
                    "flex items-center gap-8 pr-8 text-xs uppercase tracking-[0.22em]",
                    c.industry,
                  )}
                >
                  {x}
                  <span className="text-accent" aria-hidden="true">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
