import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-linked depth for the Layer sections inside `root`, and for the hero's
 * `data-depth` parts. Call it after useLenis in the same component, so the
 * site's smooth scroll already exists to keep ScrollTrigger in step with.
 * Visitors who ask for less motion get the layers without the movement.
 */
export function useLayeredSections(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = (
      document as unknown as { __lenis?: { on(e: "scroll", f: () => void): () => void } }
    ).__lenis;
    const stopSync = lenis?.on("scroll", ScrollTrigger.update);

    // Scoped to root, so cleanup only undoes these animations.
    const ctx = gsap.context(() => {
      // The hero has depth too: the AI core falls away faster than the words.
      const heroOut = { trigger: "#top", start: "top top", end: "bottom top", scrub: true };
      gsap.to('#top [data-depth="core"]', { yPercent: 35, ease: "none", scrollTrigger: heroOut });
      gsap.to('#top [data-depth="copy"]', {
        yPercent: 18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: heroOut,
      });

      // Each layer drifts and dims while the next one comes over it.
      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]");
      layers.slice(0, -1).forEach((layer) => {
        const leave = { trigger: layer, start: "bottom bottom", end: "bottom top", scrub: true };
        gsap.to(layer.querySelector("[data-layer-inner]"), {
          y: () => window.innerHeight * 0.3,
          ease: "none",
          scrollTrigger: leave,
        });
        gsap.to(layer.querySelector("[data-layer-shade]"), {
          opacity: 0.35,
          ease: "none",
          scrollTrigger: leave,
        });
      });
    }, root);

    // Images and fonts change the page height after load.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const late = setTimeout(refresh, 1500);
    return () => {
      ctx.revert();
      stopSync?.();
      window.removeEventListener("load", refresh);
      clearTimeout(late);
    };
  }, [root]);
}
