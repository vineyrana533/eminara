import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { scrollToId } from "../lib/smooth-scroll";
import { cn } from "../utils/cn";

interface Project {
  id: string;
  name: string;
  industry: string;
  accent: string;
  image: string;
  domain: string;
  tagline: string;
  services: string[];
  desc: string;
}

const PROJECTS: Project[] = [
  {
    id: "realestate",
    name: "Meridian Estates",
    industry: "Real Estate",
    accent: "#d9a26b",
    image: "https://images.pexels.com/photos/7031604/pexels-photo-7031604.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000",
    domain: "meridianestates.com",
    tagline: "Find your next home",
    services: ["Custom website", "AI chatbot", "Voice agent"],
    desc: "Premium listings, instant tours and an AI assistant that qualifies buyers and books viewings.",
  },
  {
    id: "health",
    name: "Northgate Clinic",
    industry: "Healthcare",
    accent: "#6fd3b0",
    image: "https://images.pexels.com/photos/6627929/pexels-photo-6627929.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000",
    domain: "northgateclinic.health",
    tagline: "Care, on your schedule",
    services: ["Booking system", "WhatsApp", "Automation"],
    desc: "24/7 appointment booking with automated reminders and a WhatsApp assistant for patients.",
  },
  {
    id: "saas",
    name: "Flowtrack",
    industry: "SaaS",
    accent: "#8fb2ff",
    image: "https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000",
    domain: "flowtrack.io",
    tagline: "Analytics that move you",
    services: ["Web app", "Marketing site", "AI chatbot"],
    desc: "A conversion-focused marketing site plus a product tour that turns trial users into customers.",
  },
  {
    id: "ecom",
    name: "Vessel Supply",
    industry: "E-commerce",
    accent: "#f07a5a",
    image: "https://images.pexels.com/photos/28645957/pexels-photo-28645957.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000",
    domain: "vesselsupply.co",
    tagline: "Gear that lasts",
    services: ["Store", "Payments", "AI follow-up"],
    desc: "A fast storefront with Stripe payments, abandoned-cart follow-up and an AI sales assistant.",
  },
  {
    id: "services",
    name: "Andersen & Co",
    industry: "Professional Services",
    accent: "#e6c06a",
    image: "https://images.pexels.com/photos/20752572/pexels-photo-20752572.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1000",
    domain: "andersen.co",
    tagline: "Advice you can trust",
    services: ["Booking", "Voice agent", "CRM"],
    desc: "An elegant site where prospects book consultations and Emi answers every incoming call.",
  },
];

function SiteMockup({ p }: { p: Project }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl shadow-black/50">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-line-soft bg-panel-2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex flex-1 items-center gap-1.5 rounded-md bg-ink px-3 py-1 text-[0.65rem] text-muted">
          <span className="text-accent">🔒</span> {p.domain}
        </div>
        <span className="rounded-full border border-line px-2 py-0.5 text-[0.55rem] text-muted">sample</span>
      </div>
      {/* site preview */}
      <div className="relative aspect-[16/11] overflow-hidden bg-panel">
        <img src={p.image} alt={`${p.name} — ${p.industry} website design concept`} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        {/* fake nav */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4">
          <span className="font-display text-sm font-semibold text-white drop-shadow">{p.name}</span>
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1.5 w-8 rounded bg-white/60" />
            ))}
            <span className="ml-1 rounded-full bg-white/90 px-2.5 py-0.5 text-[0.6rem] font-medium text-black">Book</span>
          </div>
        </div>
        {/* headline */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
          <span className="mb-2 inline-block rounded-full px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-wide text-black" style={{ background: p.accent }}>
            {p.industry}
          </span>
          <h4 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">{p.tagline}</h4>
          <div className="mt-2 h-1.5 w-24 rounded" style={{ background: p.accent }} />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active]!;

  return (
    <section id="work" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Custom websites"
          title={
            <>
              Your website should be your <span className="font-serif-italic text-accent">best salesperson.</span>
            </>
          }
          description="Every project is built around one job: turning attention into booked, qualified conversations. These are concept builds shown as placeholders."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* selector list */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2">
              {PROJECTS.map((proj, i) => {
                const on = active === i;
                return (
                  <Reveal key={proj.id} delay={i * 0.05}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={cn(
                        "group w-full rounded-2xl border p-5 text-left transition-all duration-300",
                        on ? "border-accent/60 bg-accent-soft" : "border-line bg-panel hover:border-line"
                      )}
                      aria-pressed={on}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className={cn("text-lg font-medium", on ? "text-cream" : "text-cream-dim")}>{proj.name}</h3>
                        <span className="text-xs text-muted">{proj.industry}</span>
                      </div>
                      <div className={cn("mt-2 flex flex-wrap gap-1.5 transition-all", on ? "opacity-100" : "opacity-60")}>
                        {proj.services.map((s) => (
                          <span key={s} className="rounded-full border border-line bg-ink/40 px-2 py-0.5 text-[0.62rem] text-cream-dim">{s}</span>
                        ))}
                      </div>
                    </button>
                  </Reveal>
                );
              })}

              <Reveal delay={0.2}>
                <div className="mt-2">
                  <MagneticButton href="#contact" variant="ghost" onClick={() => scrollToId("#contact")}>
                    Build mine →
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>

          {/* featured mockup */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SiteMockup p={p} />
                  <div className="mt-4 flex items-start justify-between gap-4 rounded-2xl border border-line bg-panel px-5 py-4">
                    <p className="text-sm leading-relaxed text-cream-dim">{p.desc}</p>
                    <span className="shrink-0 rounded-full border border-dashed border-line px-3 py-1 text-[0.6rem] uppercase tracking-wide text-faint">Concept</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
