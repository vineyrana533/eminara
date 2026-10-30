import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { MoltenRingCarousel, type MoltenRingItem } from "@/components/ui/molten-ring-carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { scrollToId } from "../lib/smooth-scroll";

type Ad = {
  src: string;
  alt: string;
  title: string;
  tag: string;
  dur: string;
  video: string;
  portrait?: boolean;
};

// Files live in public/videos. Posters are 16:9 stills cut from each video;
// portrait spots sit on a blurred copy of themselves so the whole frame shows.
const ad = (slug: string, rest: Omit<Ad, "src" | "video">): Ad => ({
  src: `/videos/posters/${slug}.jpg`,
  video: `/videos/${slug}.mp4`,
  ...rest,
});

const ADS: Ad[] = [
  ad("faresmatch-ugc", {
    title: "FaresMatch — Deal Found",
    tag: "UGC-style",
    dur: "0:15",
    alt: "FaresMatch UGC travel ad where two creators pick a destination and find a deal",
  }),
  ad("blender-ugc", {
    title: "Smoothie Blender",
    tag: "Product ad",
    dur: "0:15",
    portrait: true,
    alt: "Kitchen product ad for a countertop smoothie blender",
  }),
  ad("faresmatch-spot", {
    title: "FaresMatch — Say Less",
    tag: "Brand spot",
    dur: "0:15",
    alt: "Cinematic FaresMatch spot showing travel credit and price protection",
  }),
  ad("toothbrush-ugc", {
    title: "Sonic Toothbrush",
    tag: "Social ad",
    dur: "0:10",
    portrait: true,
    alt: "Morning-routine social ad for an electric toothbrush",
  }),
  ad("skincare-ugc", {
    title: "Rosehip Face Oil",
    tag: "Skincare UGC",
    dur: "0:12",
    portrait: true,
    alt: "Creator-led skincare ad for a rosehip seed face oil",
  }),
];

const RING: MoltenRingItem[] = ADS.map((a) => ({
  image: a.src,
  title: a.title,
  meta: `${a.tag} · ${a.dur}`,
}));

export default function VideoAds() {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : ADS[active];
  const open = current !== null;
  // Phones get bigger cards on a flatter arc, with room for one at a time.
  const phone = useIsMobile();

  // Lenis drives page scrolling from its own wheel handler, so hold it while
  // the player is up or the page would scroll behind the dialog.
  useEffect(() => {
    const lenis = (document as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (!lenis || !open) return;
    lenis.stop();
    return () => lenis.start();
  }, [open]);

  return (
    <section
      id="video-ads"
      className="relative scroll-mt-20 overflow-hidden border-t border-line-soft py-24 sm:py-28"
    >
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
            AI-powered creative that lets you test ideas fast — product ads, UGC, social and brand
            spots, all produced in days instead of weeks. Drag or swipe the reel to browse, and tap
            the front spot to watch it.
          </p>
        </Reveal>
      </div>

      {/* The real spots on a liquid ring. The page keeps the wheel and vertical
          swipes; dragging or swiping sideways turns it, and the front spot plays. */}
      <Reveal delay={0.1}>
        <MoltenRingCarousel
          items={RING}
          aria-label="AI video ads"
          scrollTurns={false}
          // Held while the player is open, so the reel waits where the visitor left it.
          autoplay={open ? 0 : 3800}
          cardRatio={16 / 9}
          cardSize={phone ? 0.74 : 0.3}
          arc={phone ? 1.6 : 1}
          onSelect={setActive}
          renderCentre={() => (
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-cream shadow-lg backdrop-blur sm:h-14 sm:w-14">
              <Play className="ml-0.5 h-4 w-4 fill-current sm:h-5 sm:w-5" aria-hidden="true" />
            </span>
          )}
          className="mt-10 h-[500px] bg-transparent text-cream [--color-muted-foreground:#6e6e6a] sm:h-[600px] lg:h-[680px]"
        />

        {/* Every spot is also a plain button here, for anyone who would rather not drag. */}
        <ul className="no-scrollbar mt-6 flex gap-2 overflow-x-auto px-6 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {ADS.map((a, i) => (
            <li key={a.video} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/85 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-cream backdrop-blur transition-colors hover:bg-cream hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Play className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                {a.title}
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="container-x">
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-line bg-white/70 px-6 py-5 backdrop-blur">
            <p className="text-sm text-cream-dim">
              <span className="text-muted">Note:</span> every spot is delivered ready for paid
              social, TikTok, Reels and YouTube.
            </p>
            <MagneticButton href="#contact" variant="accent" onClick={() => scrollToId("#contact")}>
              Make my ad →
            </MagneticButton>
          </div>
        </Reveal>
      </div>

      <Dialog open={open} onOpenChange={(next) => !next && setActive(null)}>
        <DialogContent
          className={cn(
            "w-[92vw] gap-0 overflow-hidden rounded-2xl border-0 bg-black p-0 sm:rounded-2xl",
            "[&>button]:z-10 [&>button]:rounded-full [&>button]:bg-white/90! [&>button]:p-2 [&>button]:text-cream! [&>button]:opacity-100",
            current?.portrait ? "max-w-[min(92vw,30rem)]" : "max-w-5xl",
          )}
        >
          {current ? (
            <>
              <video
                key={current.video}
                src={current.video}
                poster={current.src}
                controls
                autoPlay
                playsInline
                className="block max-h-[78vh] w-full bg-black object-contain"
              />
              <div className="flex items-center justify-between gap-4 bg-white px-5 py-4">
                <div>
                  <DialogTitle className="text-base font-medium tracking-[-0.02em] text-cream">
                    {current.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-muted">
                    {current.tag} · {current.dur}
                  </DialogDescription>
                </div>
                <MagneticButton
                  href="#contact"
                  variant="accent"
                  onClick={() => {
                    setActive(null);
                    // Wait for the dialog to close and release its scroll lock.
                    window.setTimeout(() => scrollToId("#contact"), 250);
                  }}
                >
                  Make one like this →
                </MagneticButton>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
