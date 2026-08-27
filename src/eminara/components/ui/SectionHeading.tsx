import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { cn } from "../../utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered ? "items-center text-center" : "items-start",
        className
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted">
          {index && <span className="text-accent">{index}</span>}
          <span
            className={cn("h-px w-8", centered ? "bg-line" : "bg-accent")}
            aria-hidden="true"
          />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="max-w-3xl text-balance text-4xl font-medium leading-[1.02] tracking-tight text-cream sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.12}>
          <p className="max-w-xl text-balance text-base leading-relaxed text-cream-dim sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
