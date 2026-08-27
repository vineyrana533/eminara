import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const CASES = [
  {
    industry: "Dental Clinic",
    challenge: "Leads were lost because calls went unanswered after hours and on weekends.",
    solution: "AI voice agent + website chatbot + automated follow-up.",
    result: "Every inquiry now gets an instant answer and a booked consultation.",
    metric: "2.4×",
    metricLabel: "more booked consultations",
    bar: 78,
  },
  {
    industry: "B2B SaaS",
    challenge: "High traffic, but few visitors ever requested a product demo.",
    solution: "Conversion-focused site + AI lead qualification + CRM routing.",
    result: "Only qualified buyers reach the sales team, ready to talk.",
    metric: "+38%",
    metricLabel: "qualified demo requests",
    bar: 64,
  },
  {
    industry: "Home Services",
    challenge: "Manual follow-up meant too many quotes went cold and jobs were lost.",
    solution: "End-to-end automation + CRM + live calendar.",
    result: "Quotes go out instantly and appointments land on the calendar.",
    metric: "3×",
    metricLabel: "faster follow-up",
    bar: 90,
  },
];

export default function CaseStudies() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Case studies"
          title={
            <>
              Real problems. <span className="font-serif-italic text-accent">Built</span> solutions.
            </>
          }
          description="Illustrative examples of the patterns we use again and again. Metrics are shown as samples — we'll share real numbers for your industry on a call."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.industry} delay={i * 0.08}>
              <article className="group flex h-full flex-col rounded-3xl border border-line bg-panel/70 p-7 transition-colors duration-300 hover:border-cream/20">
                <span className="mb-5 inline-block w-fit rounded-full border border-line bg-ink px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-cream-dim">
                  {c.industry}
                </span>

                <div className="flex flex-1 flex-col gap-6">
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-faint">
                      <span className="h-px w-4 bg-faint" /> Challenge
                    </p>
                    <p className="text-sm leading-relaxed text-cream-dim">{c.challenge}</p>
                  </div>

                  <div>
                    <p className="mb-2 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-accent">
                      <span className="h-px w-4 bg-accent" /> Solution
                    </p>
                    <p className="text-sm leading-relaxed text-cream">{c.solution}</p>
                  </div>

                  <div className="mt-auto border-t border-line-soft pt-6">
                    <div className="mb-3 flex items-end gap-3">
                      <span className="font-display text-4xl font-semibold text-accent">{c.metric}</span>
                      <span className="text-xs leading-tight text-muted">{c.metricLabel}</span>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-cream-dim">{c.result}</p>
                    <div className="h-1 overflow-hidden rounded bg-line">
                      <div className="h-full rounded bg-accent" style={{ width: `${c.bar}%` }} />
                    </div>
                    <span className="mt-2 block text-[0.6rem] uppercase tracking-wide text-faint">Illustrative sample</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
