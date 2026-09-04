import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS = [
  { value: "24/7", label: "AI coverage, no shifts" },
  { value: "<60s", label: "Average lead response" },
  { value: "5x", label: "More qualified bookings" },
];

/**
 * Layered parallax banner. Each layer moves at a different rate as the
 * section scrolls through the viewport, driven by GSAP ScrollTrigger and
 * synced with the app-wide Lenis instance.
 */
export default function ParallaxShowcase() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = rootRef.current?.querySelector<HTMLElement>(
      "[data-parallax-layers]"
    );
    if (!trigger) return;

    // Keep ScrollTrigger in sync with the shared Lenis instance.
    const lenis = (document as unknown as { __lenis?: { on: (e: string, cb: () => void) => void; off?: (e: string, cb: () => void) => void } }).__lenis;
    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onLenisScroll);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      const layers = [
        { layer: "1", yPercent: 26 },
        { layer: "2", yPercent: 16 },
        { layer: "3", yPercent: 8 },
        { layer: "4", yPercent: -10 },
      ];

      layers.forEach((l, idx) => {
        tl.to(
          trigger.querySelectorAll(`[data-parallax-layer="${l.layer}"]`),
          { yPercent: l.yPercent, ease: "none" },
          idx === 0 ? undefined : "<"
        );
      });
    }, rootRef);

    return () => {
      lenis?.off?.("scroll", onLenisScroll);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-y border-line-soft bg-ink-2/40 py-28 sm:py-36"
    >
      <div data-parallax-layers className="relative">
        {/* layer 1 — grid backdrop */}
        <div
          data-parallax-layer="1"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-32 -bottom-32 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--color-line-soft) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
          }}
        />

        {/* layer 2 — accent glow */}
        <div
          data-parallax-layer="2"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.10] blur-[130px]"
        />

        {/* layer 3 — floating stat cards */}
        <div
          data-parallax-layer="3"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
        >
          <div className="glass-pill absolute left-[6%] top-6 px-5 py-3 text-xs uppercase tracking-[0.2em] text-cream-dim">
            Always on
          </div>
          <div className="glass-pill absolute right-[7%] top-24 px-5 py-3 text-xs uppercase tracking-[0.2em] text-cream-dim">
            Built to your workflow
          </div>
          <div className="glass-pill absolute bottom-4 left-[14%] px-5 py-3 text-xs uppercase tracking-[0.2em] text-cream-dim">
            Measured, then tuned
          </div>
        </div>

        {/* layer 4 — foreground content */}
        <div
          data-parallax-layer="4"
          className="container-x relative flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Systems in motion
          </span>

          <h2 className="mt-6 max-w-4xl text-balance text-4xl font-medium leading-[1.02] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            Every layer working{" "}
            <span className="font-serif-italic text-accent">together</span>.
          </h2>

          <p className="mt-6 max-w-xl text-balance leading-relaxed text-cream-dim">
            Your website, AI agents, automations and CRM shouldn't be separate
            tools bolted together. We build them as one system that captures,
            qualifies and books — while you sleep.
          </p>

          <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.value}
                className="gloss-card rounded-2xl px-6 py-7 text-left"
              >
                <div className="text-4xl font-medium tracking-tight text-cream">
                  {s.value}
                </div>
                <div className="mt-2 text-sm leading-snug text-cream-dim">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
