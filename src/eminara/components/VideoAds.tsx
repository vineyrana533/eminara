import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { scrollToId } from "../lib/smooth-scroll";

const PIPELINE = ["Product", "AI Creative", "Video Ad", "Customer"];

const ADS = [
  { tag: "UGC-style", dur: "30s", img: "https://images.pexels.com/photos/13516791/pexels-photo-13516791.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=760", brand: "Glow & Co", cap: "Authentic-feel skincare spot" },
  { tag: "Product Ad", dur: "15s", img: "https://images.pexels.com/photos/10292805/pexels-photo-10292805.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=760", brand: "Auralab", cap: "Headphones, hero lighting" },
  { tag: "Social Ad", dur: "9:16", img: "https://images.pexels.com/photos/28645957/pexels-photo-28645957.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=760", brand: "Kickstep", cap: "Sneaker drop, bold color" },
  { tag: "Short-form", dur: "30s", img: "https://images.pexels.com/photos/10060584/pexels-photo-10060584.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=760", brand: "Roastline", cap: "Cozy lifestyle reels" },
  { tag: "Product Ad", dur: "15s", img: "https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=760", brand: "Auralab", cap: "Minimal studio product" },
];

export default function VideoAds() {
  return (
    <section className="relative overflow-hidden border-t border-line-soft bg-ink-2/60 py-24 sm:py-32">
      {/* cinematic glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[140px]" />
      </div>

      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="AI video ads"
          title={
            <>
              From product to <span className="font-serif-italic text-accent">pixel</span> in days.
            </>
          }
          description="AI-powered creative that lets you test ideas fast — product ads, SaaS spots, social and short-form, all produced at a fraction of the usual time."
        />

        {/* pipeline */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-2">
            {PIPELINE.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-line bg-panel px-4 py-2 text-sm text-cream-dim">{step}</span>
                {i < PIPELINE.length - 1 && (
                  <motion.span
                    className="text-accent"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                  >
                    →
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* ad cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {ADS.map((ad, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-panel">
                <img src={ad.img} alt={`${ad.brand} ${ad.tag} concept ad`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-90" />
                {/* tag */}
                <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-wide text-accent backdrop-blur">{ad.tag}</span>
                {/* play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-ink/50 text-cream backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-ink">
                    <svg className="ml-0.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
                  </span>
                </div>
                {/* bottom */}
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-sm font-medium text-white">{ad.brand}</p>
                  <p className="text-[0.65rem] text-white/60">{ad.cap}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded bg-white/20">
                      <motion.div className="h-full rounded bg-accent" initial={{ width: "0%" }} whileInView={{ width: `${[70, 40, 55, 80, 60][i]}%` }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }} />
                    </div>
                    <span className="text-[0.55rem] text-white/50">{ad.dur}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-panel/70 px-6 py-5">
            <p className="text-sm text-cream-dim">
              <span className="text-muted">Note:</span> placeholders shown — each spot is delivered ready for
              paid social, TikTok, Reels and YouTube.
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
