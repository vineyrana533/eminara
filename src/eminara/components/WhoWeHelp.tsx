import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const GROUPS = [
  { icon: "▲", title: "Startups", desc: "Ship AI systems that act like a much bigger team while you find product-market fit." },
  { icon: "◱", title: "SaaS", desc: "Turn trials into demos and demos into customers with AI lead qualification and follow-up." },
  { icon: "◉", title: "Service businesses", desc: "Never miss another lead — answer, qualify and book around the clock." },
  { icon: "+", title: "Healthcare", desc: "Book patients 24/7, answer questions instantly and cut no-shows with reminders." },
  { icon: "▢", title: "Real estate", desc: "Qualify buyers and schedule viewings automatically — day or night." },
  { icon: "◒", title: "E-commerce", desc: "Recover abandoned carts and keep customers coming back with AI follow-up and ads." },
  { icon: "◆", title: "Professional services", desc: "A polished website and an AI receptionist that keeps your calendar full." },
];

export default function WhoWeHelp() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Who we help"
          title={
            <>
              Built for businesses where <span className="font-serif-italic text-accent">speed & consistency</span> win.
            </>
          }
          description="We focus on the businesses where answering fast and following up reliably makes the biggest difference."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-2xl border border-line bg-panel/60 p-6 transition-all duration-300 hover:border-accent/40 hover:bg-panel">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-lg text-accent transition-transform duration-300 group-hover:scale-110">
                  {g.icon}
                </span>
                <h3 className="text-lg font-medium text-cream">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-dim">{g.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
