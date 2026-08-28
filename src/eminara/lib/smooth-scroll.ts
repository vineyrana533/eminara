import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis smooth scrolling.
 * Respects prefers-reduced-motion so users who prefer reduced motion
 * get native scrolling without any smoothing.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });
    // Expose for programmatic smooth scrolling from scrollToId
    (document as any).__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      delete (document as any).__lenis;
      lenis.destroy();
    };
  }, []);
}

/** Smooth-scroll to an element id from anywhere (e.g. button handlers). */
export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  // Land the contact CTA at the top of the viewport so its badge, heading,
  // paragraph, and actions compose as one focused screen.
  const offset = id === "#contact" ? -370 : -72;
  const lenis = (document as any).__lenis;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
}
