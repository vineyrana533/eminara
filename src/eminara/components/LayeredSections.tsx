import type { ReactNode } from "react";

/**
 * One "page" of the home page. Every layer but the first slides up over the
 * one before it with a rounded top edge; useLayeredSections in
 * lib/layered-sections makes the one underneath drift down and dim as it's
 * covered.
 */
export function Layer({ children, first }: { children: ReactNode; first?: boolean }) {
  return (
    <div
      data-layer
      className={
        first
          ? "relative"
          : "relative -mt-10 overflow-hidden rounded-t-[2.5rem] bg-ink shadow-[0_-24px_60px_-28px_rgba(0,0,0,0.45)] sm:-mt-14 sm:rounded-t-[3.5rem]"
      }
    >
      <div data-layer-inner>{children}</div>
      <div data-layer-shade className="pointer-events-none absolute inset-0 bg-black opacity-0" />
    </div>
  );
}
