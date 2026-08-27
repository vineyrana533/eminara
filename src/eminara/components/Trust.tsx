import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const TESTIMONIALS = [
  {
    quote: "Our AI receptionist books more appointments than we ever answered manually — and it never gets busy or takes a day off.",
    name: "Operations lead",
    org: "Home services",
  },
  {
    quote: "The site makes us look like a much bigger company. And the AI follows up with leads better than our old process ever did.",
    name: "Founder",
    org: "B2B SaaS",
  },
];

const INTEGRATIONS = [
  { name: "OpenAI", icon: "◉" },
  { name: "n8n", icon: "⧉" },
  { name: "Vapi", icon: "☏" },
  { name: "Google Calendar", icon: "▣" },
  { name: "WhatsApp", icon: "◈" },
  { name: "Stripe", icon: "◫" },
  { name: "Your CRM", icon: "▤" },
];

const LOGOS = ["Meridian", "Flowtrack", "Northgate", "Vessel", "Andersen", "Roastline"];

export default function Trust() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        {/* client wordmarks */}
        <Reveal>
          <div className="mb-16 text-center">
            <p className="mb-6 text-[0.65rem] uppercase tracking-[0.3em] text-faint">Trusted by teams that move fast</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {LOGOS.map((l) => (
                <span key={l} className="font-display text-xl font-medium text-cream-dim/70">{l}</span>
              ))}
            </div>
            <p className="mt-4 text-[0.6rem] uppercase tracking-wide text-faint">Concept client wordmarks</p>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* testimonials */}
          <div>
            <SectionHeading
              eyebrow="What clients say"
              title={
                <>
                  Systems they <span className="font-serif-italic text-accent">rely on.</span>
                </>
              }
            />
            <div className="mt-10 flex flex-col gap-4">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <figure className="rounded-3xl border border-line bg-panel/70 p-7">
                    <div className="mb-4 flex gap-1 text-accent" aria-hidden="true">
                      {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
                    </div>
                    <blockquote className="text-lg leading-relaxed text-cream">“{t.quote}”</blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft font-display text-sm text-accent">
                        {t.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-cream-dim">{t.name}</p>
                        <p className="text-xs text-muted">{t.org}</p>
                      </div>
                      <span className="ml-auto text-[0.6rem] uppercase tracking-wide text-faint">sample</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>

          {/* integrations */}
          <div>
            <SectionHeading
              eyebrow="Built on proven tech"
              title={
                <>
                  Fits your <span className="font-serif-italic text-accent">existing stack.</span>
                </>
              }
              description="We connect your AI into the tools you already use — so it works with your workflow, not against it."
            />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {INTEGRATIONS.map((int, i) => (
                <Reveal key={int.name} delay={(i % 3) * 0.06}>
                  <div className="flex items-center gap-3 rounded-2xl border border-line bg-panel/60 p-4 transition-colors hover:border-accent/40">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-accent">{int.icon}</span>
                    <span className="text-sm font-medium text-cream-dim">{int.name}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 text-xs text-faint">Integrations we commonly connect to. Availability depends on your plan and region.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
