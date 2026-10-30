import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useAnimationFrame, useInView, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/*
 * A ring of cards spinning in 3D. Drag it sideways to spin it; it carries on
 * with the flick, then settles back into a slow idle spin. Hovering pauses
 * the idle spin. Cards on the far side show a dimmed copy of their image.
 * Based on the 21st.dev "3D photo carousel", reworked to follow the pointer
 * exactly and to leave vertical page scrolling alone on touch screens.
 */

export type CarouselItem = { src: string; alt?: string };

/** Degrees per second of the idle spin. */
const SPIN = 6;

function useIsSmall() {
  // Starts false on the server and in the first browser render, so both match.
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return small;
}

export function ThreeDCarousel<T extends CarouselItem>({
  items,
  onSelect,
  renderFace,
  className,
}: {
  items: T[];
  /** Called with the card's index when it's clicked (not when it's dragged). */
  onSelect?: (index: number) => void;
  /** Drawn over the front of each card, such as a play button. */
  renderFace?: (item: T, index: number) => ReactNode;
  className?: string;
}) {
  const small = useIsSmall();
  // The ring's circumference in px decides the card size.
  const ring = small ? 1500 : 2600;
  const count = items.length;
  const faceWidth = ring / count;
  const radius = ring / (2 * Math.PI);
  const perPx = 360 / ring; // degrees of spin per px dragged, so the front follows the pointer

  const rotation = useMotionValue(0);
  // Pushed back by the radius, so the front card sits at its natural size.
  const transform = useTransform(rotation, (deg) => `translateZ(${-radius}px) rotateY(${deg}deg)`);

  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  const dragging = useRef(false);
  const moved = useRef(false);
  const velocity = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useAnimationFrame((_, ms) => {
    if (dragging.current || !inView) return;
    const s = Math.min(ms, 64) / 1000;
    velocity.current *= Math.pow(0.04, s); // a flick dies out over about a second
    const idle = hovered || still ? 0 : -SPIN;
    rotation.set(rotation.get() + (velocity.current + idle) * s);
  });

  return (
    <div
      ref={root}
      className={cn(
        "relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <motion.div
        className="flex h-full cursor-grab touch-pan-y items-center justify-center select-none active:cursor-grabbing"
        style={{ perspective: "1000px" }}
        onPointerDown={() => (moved.current = false)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onPanStart={() => {
          dragging.current = true;
          moved.current = true;
          velocity.current = 0;
        }}
        onPan={(_, info) => rotation.set(rotation.get() + info.delta.x * perPx)}
        onPanEnd={(_, info) => {
          dragging.current = false;
          velocity.current = info.velocity.x * perPx;
        }}
      >
        <motion.div
          className="relative h-full"
          style={{ width: faceWidth, transform, transformStyle: "preserve-3d" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center"
              style={{
                transform: `rotateY(${(i * 360) / count}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front: the card itself. */}
              <div
                className="group relative w-full p-1.5 sm:p-2"
                style={{ backfaceVisibility: "hidden" }}
                onClick={() => !moved.current && onSelect?.(i)}
              >
                <img
                  src={item.src}
                  alt={item.alt ?? ""}
                  draggable={false}
                  className="pointer-events-none aspect-[3/4] w-full rounded-xl object-cover shadow-lg"
                />
                {renderFace && (
                  <div className="pointer-events-none absolute inset-1.5 flex items-center justify-center sm:inset-2">
                    {renderFace(item, i)}
                  </div>
                )}
              </div>
              {/* Back: what shows while the card is on the far side. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 p-1.5 sm:p-2"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  className="aspect-[3/4] w-full rounded-xl object-cover opacity-40 brightness-75"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
