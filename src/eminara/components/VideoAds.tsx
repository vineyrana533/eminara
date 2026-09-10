import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { scrollToId } from "../lib/smooth-scroll";
import ThreeDPhotoCarousel from "./ThreeDPhotoCarousel";

const ADS = [
  {
    tag: "UGC-style",
    img: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    title: "Glow Ritual — Skincare",
  },
  {
    tag: "Product Ad",
    img: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    title: "Auralab — Studio Sound",
  },
  {
    tag: "Social Ad",
    img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    title: "Kickstep — Drop 04",
  },
  {
    tag: "Short-form",
    img: "https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    title: "Roastline — Slow Mornings",
  },
  {
    tag: "SaaS Spot",
    img: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    title: "Nodeflow — Product Tour",
  },
  {
    tag: "Brand Film",
    img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    title: "Meridian — Founder Story",
  },
  {
    tag: "Retail",
    img: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800",
    title: "Casa Verde — Spring Set",
  },
];

export default function VideoAds() {
  return (
    <section className="relative overflow-hidden border-t border-line-soft py-24 sm:py-28">
      <div className="container-x">
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
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-dim">
            AI-powered creative that lets you test ideas fast — product ads, SaaS spots, social and
            short-form, all produced in days instead of weeks. Spin the ring to browse the work, tap
            a card to take a closer look.
          </p>
        </Reveal>
      </div>

      {/* 3D carousel — full-bleed */}
      <div className="mt-12">
        <ThreeDPhotoCarousel cards={ADS} />
      </div>

      <div className="container-x">
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
