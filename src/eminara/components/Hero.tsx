import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import HeroCore, { type MobileCore } from "./HeroCore";
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
        <span key={i} className="inline-block overflow-hidden align-bottom">
          {/* The start state must match the server's HTML, so reduced motion
              only changes the timing: the words appear in place at once. */}
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
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

// An illustrative running total. Starts from a fixed value so the server and
// browser render the same number.
function useTaskCount() {
  const [n, setN] = useState(2_481_093);
  useEffect(() => {
    const t = setInterval(() => setN((v) => v + 30 + (v % 23)), 120);
    return () => clearInterval(t);
  }, []);
  return n;
}

export default function Hero({ mobileCore = "below" }: { mobileCore?: MobileCore }) {
  const copy = useRef<HTMLDivElement>(null);
  const tasks = useTaskCount();
  // With the core in the background, the hero is one phone screen tall.
  const background = mobileCore !== "below";

  return (
    // data-nav-dark tells the navbar to switch to its dark style while over this section.
    <section
      id="top"
      data-nav-dark
      className={cn(
        "relative overflow-hidden bg-[#0b0b0d] text-white lg:h-[100svh] lg:min-h-[760px]",
        background ? "min-h-[100svh]" : "min-h-[1060px]",
      )}
    >
      <HeroCore copy={copy} mobile={mobileCore} />
      {/* On phones the motion runs behind the words, so dim it where they sit. */}
      {background && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 lg:hidden",
            mobileCore === "stage"
              ? "bg-gradient-to-b from-[#0b0b0d]/65 via-[#0b0b0d]/40 via-55% to-transparent to-80%"
              : "bg-[#0b0b0d]/30",
          )}
        />
      )}
      {/* A soft shade behind the copy so the motion never fights the words. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-[#0b0b0d]/85 via-[#0b0b0d]/45 to-transparent lg:block" />

      {/* Phones get tighter spacing so the copy leaves room for the motion. */}
      <div
        data-depth="copy"
        className={cn(
          "container-x relative flex h-full flex-col justify-start pt-32 pb-24 lg:justify-center lg:pt-16",
          background && "pt-28 pb-20 sm:pt-32 sm:pb-24",
        )}
      >
        <div ref={copy} className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur",
              background && "mb-5 sm:mb-6",
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            One AI core · 1,000 agents
          </motion.p>

          <h1
            className={cn(
              "text-[2.9rem] font-medium leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-[5rem]",
              // A font size resets line height in the class merge, so restate it.
              background && "text-[2.6rem] leading-[0.95]",
            )}
          >
            <Words text="Everything your business does." />
            <br />
            <Words text="Done by one AI." className="font-serif-italic text-accent" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg",
              background && "mt-5 text-[0.95rem] leading-relaxed sm:mt-6",
            )}
          >
            Calls, emails, invoices, leads and tickets pour in. EmiNara's AI handles every one — the
            work of a thousand people, around the clock.
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
                "bg-accent text-white shadow-[0_14px_36px_-18px_rgba(255,47,146,0.9)] hover:bg-white hover:text-[#0b0b0d]",
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
                "border-white/20 bg-transparent text-white/85 hover:border-white/40 hover:bg-white/10",
                background && "py-3.5 sm:py-4",
              )}
              onClick={() => scrollToId("#work")}
            >
              Explore Our Work
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className={cn("mt-10 text-xs text-white/50", background && "mt-6 sm:mt-10")}
          >
            <span className="text-base font-medium tabular-nums text-white">
              {tasks.toLocaleString("en-US")}
            </span>{" "}
            tasks handled today
            <span className="ml-2 text-white/30">· illustrative</span>
          </motion.p>
        </div>
      </div>

      {/* Industries we work with, running along the bottom edge. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-[#0b0b0d]/60 py-4 backdrop-blur-sm [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      >
        {/* Two copies side by side; the ticker keyframe slides by half, so the loop is seamless. */}
        <div className="flex w-max animate-[ticker_40s_linear_infinite] whitespace-nowrap">
          {[0, 1].map((n) => (
            <ul key={n} className="flex shrink-0 items-center" aria-hidden={n === 1 || undefined}>
              {INDUSTRIES.map((x) => (
                <li
                  key={x}
                  className="flex items-center gap-8 pr-8 text-xs uppercase tracking-[0.22em] text-white/55"
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
