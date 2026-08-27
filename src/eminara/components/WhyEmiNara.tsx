import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { scrollToId } from "../lib/smooth-scroll";

const PILLARS = [
  { num: "01", title: "Strategy", desc: "We don't automate something just because we can. Every system starts with a business question: where does this actually move the needle?" },
  { num: "02", title: "Systems", desc: "We connect AI, automation, websites and your business tools into one coherent system — not a pile of disconnected chatbots." },
  { num: "03", title: "Experience", desc: "Technology is only worth what it feels like to use. We obsess over how your customers and team experience it." },
  { num: "04", title: "Customization", desc: "We build around your business and your customers. No forcing you into a template that almost fits." },
  { num: "05", title: "Continuous improvement", desc: "AI should get better over time. We watch how it performs in the real world and keep tuning it." },
];

export default function WhyEmiNara() {
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-line-soft bg-ink-2/40 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <span className="inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted">
                  <span className="h-px w-8 bg-accent" aria-hidden="true" />
                  Why EmiNara AI
                </span>
                <h2 className="mt-5 max-w-md text-balance text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl">
                  Not another AI agency. <span className="font-serif-italic text-accent">A build partner.</span>
                </h2>
                <p className="mt-6 max-w-sm text-balance leading-relaxed text-cream-dim">
                  Anyone can sell you a chatbot. We build systems that fit the way your business actually works — and keep them improving.
                </p>
                <div className="mt-8">
                  <MagneticButton href="#contact" variant="ghost" onClick={() => scrollToId("#contact")}>
                    See it for yourself →
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>

          {/* pillars */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {PILLARS.map((p, i) => (
                <Reveal key={p.num} delay={i * 0.05}>
                  <div className="group border-b border-line-soft py-7 transition-all duration-300 hover:px-3">
                    <div className="flex items-start gap-6">
                      <span className="font-display text-sm font-semibold text-accent">{p.num}</span>
                      <div>
                        <h3 className="text-2xl font-medium text-cream transition-colors group-hover:text-accent sm:text-3xl">{p.title}</h3>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-cream-dim sm:text-base">{p.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
