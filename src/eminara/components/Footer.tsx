import Logo from "./ui/Logo";
import { scrollToId } from "../lib/smooth-scroll";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = ["AI Automation", "AI Voice Agents", "AI Chatbots", "Custom Websites", "AI Video Ads"];

const SOCIAL = [
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function Footer() {
  const go = (href: string) => {
    scrollToId(href);
  };

  return (
    <footer className="relative border-t border-line-soft bg-ink-2/60">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              EmiNara AI builds the AI employees, automation, websites and advertising that
              help modern businesses attract, convert and serve more customers.
            </p>
            <div className="mt-6 space-y-2 text-sm text-cream-dim">
              <p className="flex items-center gap-2">
                <span className="text-accent">✉</span> hello@eminara.ai
              </p>
              <p className="flex items-center gap-2">
                <span className="text-accent">☏</span> +1 (555) 000-0000
              </p>
            </div>
          </div>

          {/* nav */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-[0.65rem] uppercase tracking-[0.25em] text-faint">Navigate</h4>
            <ul className="flex flex-col gap-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(n.href);
                    }}
                    className="text-sm text-cream-dim transition-colors hover:text-accent"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* services */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-[0.65rem] uppercase tracking-[0.25em] text-faint">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      go("#services");
                    }}
                    className="text-sm text-cream-dim transition-colors hover:text-accent"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* social */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-[0.65rem] uppercase tracking-[0.25em] text-faint">Follow</h4>
            <ul className="flex flex-col gap-2.5">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-sm text-cream-dim transition-colors hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line-soft pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-faint">© {new Date().getFullYear()} EmiNara AI. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy Policy", "Terms"].map((l) => (
              <a key={l} href="#" className="text-xs text-faint transition-colors hover:text-cream-dim">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
