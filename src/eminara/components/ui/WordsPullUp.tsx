import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { CSSProperties } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
  style?: CSSProperties;
}

/** Word-by-word pull-up reveal (Prisma-style). */
export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  delay = 0,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={reduce ? { opacity: 0 } : { y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: reduce ? 0 : 20, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative inline-block"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

/** Same reveal, but each segment can carry its own styling. */
export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  delay = 0,
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (!w) return;
      const item: { word: string; className?: string } = { word: w };
      if (seg.className) item.className = seg.className;
      words.push(item);
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={reduce ? { opacity: 0 } : { y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: reduce ? 0 : 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

export default WordsPullUp;
