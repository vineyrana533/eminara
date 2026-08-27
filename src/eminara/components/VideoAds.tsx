import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { scrollToId } from "../lib/smooth-scroll";

const ADS = [
  {
    tag: "UGC-style",
    dur: "0:30",
    img: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=900",
    title: "Glow Ritual — Skincare",
    cap: "Creator-led hook, 3 variants tested in 48h",
  },
  {
    tag: "Product Ad",
    dur: "0:15",
    img: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=900",
    title: "Auralab — Studio Sound",
    cap: "Hero lighting, AI-generated set extension",
  },
  {
    tag: "Social Ad",
    dur: "9:16",
    img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=900",
    title: "Kickstep — Drop 04",
    cap: "Bold colour blocking for TikTok & Reels",
  },
  {
    tag: "Short-form",
    dur: "0:22",
    img: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=900",
    title: "Roastline — Slow Mornings",
    cap: "Lifestyle reel cut for organic + paid",
  },
  {
    tag: "SaaS Spot",
    dur: "0:45",
    img: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=900",
    title: "Nodeflow — Product Tour",
    cap: "Explainer with motion UI and VO",
  },
  {
    tag: "Brand Film",
    dur: "1:10",
    img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=900",
    title: "Meridian — Founder Story",
    cap: "Documentary tone, AI-assisted edit",
  },
  {
    tag: "Retail",
    dur: "0:18",
    img: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=900",
    title: "Casa Verde — Spring Set",
    cap: "Catalogue stills turned into motion",
  },
];

export default function VideoAds() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden border-t border-line-soft py-24 sm:py-28">
      <div className="container-x">
        {/* Top bar: pill eyebrow + headline + arrows */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="glass-pill inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-cream">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              AI video ads
            </span>

            <h2 className="flex-1 text-balance text-[2rem] font-medium leading-[1.02] tracking-[-0.045em] text-cream sm:text-5xl lg:text-[3.5rem]">
              The best ads are built{" "}
              <span className="font-serif-italic text-accent">shot by shot.</span>
            </h2>

            <div className="hidden items-center gap-2 sm:flex">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => nudge(dir)}
                  aria-label={dir === -1 ? "Scroll left" : "Scroll right"}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 text-cream backdrop-blur transition-all duration-300 hover:bg-cream hover:text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d={dir === -1 ? "M13 8H3M7 4L3 8l4 4" : "M3 8h10M9 4l4 4-4 4"}
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-dim">
            AI-powered creative that lets you test ideas fast — product ads, SaaS spots, social and
            short-form, all produced in days instead of weeks. Drag the rail to browse the work.
          </p>
        </Reveal>
      </div>

      {/* Horizontal rail — full-bleed, edge padded to the container */}
      <div
        ref={railRef}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 sm:px-10 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2rem))]"
      >
        {ADS.map((ad, i) => (
          <motion.article
            key={ad.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group w-[72vw] shrink-0 snap-start sm:w-[46vw] lg:w-[22rem]"
          >
            <div className="gloss-card relative aspect-[9/13] overflow-hidden rounded-[1.75rem] border border-line">
              <img
                src={ad.img}
                alt={`${ad.title} — ${ad.tag} concept`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-cream backdrop-blur">
                {ad.tag}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-black/45 px-2.5 py-1.5 text-[0.65rem] font-medium text-white backdrop-blur">
                {ad.dur}
              </span>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 translate-y-2 items-center justify-center rounded-full bg-white/90 text-cream opacity-0 shadow-lg backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg className="ml-0.5 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 4l13 8-13 8z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="mt-4 px-1">
              <h3 className="text-lg font-medium tracking-[-0.02em] text-cream">{ad.title}</h3>
              <p className="mt-1 text-sm text-muted">{ad.cap}</p>
            </div>
          </motion.article>
        ))}

        {/* trailing spacer so the last card can rest away from the edge */}
        <div className="w-2 shrink-0 sm:w-8" aria-hidden="true" />
      </div>

      {/* Scroll progress bar */}
      <div className="container-x">
        <div className="mt-4 h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-line bg-white/70 px-6 py-5 backdrop-blur">
            <p className="text-sm text-cream-dim">
              <span className="text-muted">Note:</span> concept frames shown — every spot is delivered
              ready for paid social, TikTok, Reels and YouTube.
            </p>
            <MagneticButton href="#contact" variant="accent" onClick={() => scrollToId("#contact")}>
              Make my ad →
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
