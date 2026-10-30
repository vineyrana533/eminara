// Temporary page for choosing new hero wording. Not linked anywhere; delete it
// once an option is picked. Pick with ?v=1..4 (headline) and ?i=a|b|c (intro),
// or the switcher at the bottom.
import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useLenis } from "../eminara/lib/smooth-scroll";
import { useLayeredSections } from "../eminara/lib/layered-sections";
import { Layer } from "../eminara/components/LayeredSections";
import Navbar from "../eminara/components/Navbar";
import Hero from "../eminara/components/Hero";
import Ticker from "../eminara/components/Ticker";
import Services from "../eminara/components/Services";
import { cn } from "../eminara/utils/cn";

const HEADLINES = {
  "1": { title: "Win more customers.", accent: "Let AI do the busywork." },
  "2": { title: "The work that piles up.", accent: "Handled by AI." },
  "3": { title: "Calls, leads and bookings.", accent: "Answered by AI, 24/7." },
  "4": { title: "If it can be automated,", accent: "we'll build it." },
};

const INTROS = {
  a: "If it can be automated, we build it. From support and sales to finance, operations and HR, EmiNara designs custom AI that plugs into the tools you already use and keeps working around the clock.",
  b: "Any repetitive task, in any part of your business. We build custom AI automation that connects your tools, runs around the clock and gets better every month, so your team only does the work that needs a person.",
  c: "Answering customers, chasing leads, sending invoices, updating your CRM, onboarding staff: whatever your team does on repeat, we automate with custom AI built around your tools. Tested until it's reliable, then tuned as it runs.",
};

type Headline = keyof typeof HEADLINES;
type Intro = keyof typeof INTROS;

export const Route = createFileRoute("/preview-hero-copy")({
  validateSearch: (s: Record<string, unknown>) => ({
    v: (String(s["v"]) in HEADLINES ? String(s["v"]) : "1") as Headline,
    i: (String(s["i"]) in INTROS ? String(s["i"]) : "a") as Intro,
  }),
  head: () => ({
    meta: [{ title: "Hero wording — preview" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PreviewPage,
});

function Switch<K extends string>({
  label,
  keys,
  current,
  search,
}: {
  label: string;
  keys: K[];
  current: K;
  search: (k: K) => { v: Headline; i: Intro };
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="w-16 px-2 text-muted">{label}</span>
      {keys.map((k) => (
        <Link
          key={k}
          to="/preview-hero-copy"
          search={search(k)}
          className={cn(
            "grid h-7 w-7 place-items-center rounded-full font-medium uppercase",
            k === current ? "bg-cream text-white" : "text-cream hover:bg-ink",
          )}
        >
          {k}
        </Link>
      ))}
    </div>
  );
}

function PreviewPage() {
  const main = useRef<HTMLElement>(null);
  const { v, i } = Route.useSearch();
  useLenis();
  useLayeredSections(main);

  return (
    <div className="relative min-h-screen bg-ink text-cream">
      <Navbar />
      <main ref={main} className="overflow-x-clip">
        <Layer first>
          {/* Remount per option so the headline animates in again. */}
          <Hero
            key={`${v}${i}`}
            tone="light"
            text={{
              ...HEADLINES[v],
              intro: INTROS[i],
            }}
          />
        </Layer>
        <Layer>
          <Ticker />
          <Services />
        </Layer>
      </main>

      <nav
        aria-label="Wording options"
        className="fixed bottom-4 left-4 z-[60] flex flex-col gap-1 rounded-2xl border border-line bg-panel/90 p-1.5 text-xs shadow-lg backdrop-blur"
      >
        <Switch
          label="Headline"
          keys={Object.keys(HEADLINES) as Headline[]}
          current={v}
          search={(k) => ({ v: k, i })}
        />
        <Switch
          label="Intro"
          keys={Object.keys(INTROS) as Intro[]}
          current={i}
          search={(k) => ({ v, i: k })}
        />
      </nav>
    </div>
  );
}
