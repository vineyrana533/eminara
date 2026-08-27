const ITEMS = [
  "AI Automation",
  "AI Voice Agents",
  "AI Chatbots",
  "Custom Websites",
  "AI Video Ads",
  "CRM Workflows",
  "Lead Systems",
  "Appointment Booking",
];

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-line-soft py-5" aria-hidden="true">
      <div className="flex w-max animate-[ticker_28s_linear_infinite] gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-sm uppercase tracking-[0.22em] text-cream-dim">
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
