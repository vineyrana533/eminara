import { cn } from "../../utils/cn";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/**
 * EmiNara AI brand mark — a geometric "E" node built from a vertical stem,
 * three strokes and a signal node. Suggests structure + intelligence.
 */
export default function Logo({ className, onClick }: LogoProps) {
  return (
    <a
      href="#top"
      onClick={onClick}
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="EmiNara AI — home"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-[10px] border border-line bg-panel">
        <svg
          viewBox="0 0 24 24"
          className="h-4.5 w-4.5 text-cream transition-transform duration-500 group-hover:rotate-[8deg]"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 4h12M6 12h9M6 20h12"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="18" cy="12" r="2" fill="var(--color-accent)" />
        </svg>
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className="text-[1.05rem] font-semibold tracking-tight text-cream">
        EmiNara<span className="text-accent"> AI</span>
      </span>
    </a>
  );
}
