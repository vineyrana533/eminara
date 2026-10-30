import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useLenis } from "../eminara/lib/smooth-scroll";
import { useLayeredSections } from "../eminara/lib/layered-sections";
import { Layer } from "../eminara/components/LayeredSections";
import Cursor from "../eminara/components/Cursor";
import Navbar from "../eminara/components/Navbar";
import Hero from "../eminara/components/Hero";
import Ticker from "../eminara/components/Ticker";
import Services from "../eminara/components/Services";
import AIChatDemo from "../eminara/components/AIChatDemo";
import VoiceAgentDemo from "../eminara/components/VoiceAgentDemo";
import AutomationFlow from "../eminara/components/AutomationFlow";
import Portfolio from "../eminara/components/Portfolio";
import VideoAds from "../eminara/components/VideoAds";
import CaseStudies from "../eminara/components/CaseStudies";
import Process from "../eminara/components/Process";
import WhoWeHelp from "../eminara/components/WhoWeHelp";
import WhyEmiNara from "../eminara/components/WhyEmiNara";
import Trust from "../eminara/components/Trust";
import FinalCTA from "../eminara/components/FinalCTA";
import Footer from "../eminara/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EmiNara AI — AI Automation, AI Employees & Voice Agents" },
      {
        name: "description",
        content:
          "EmiNara AI builds AI employees, intelligent automation, AI voice agents, chatbots, high-converting websites and AI advertising that help businesses attract, convert and serve customers.",
      },
      {
        name: "keywords",
        content:
          "EmiNara, EmiNara AI, AI automation agency, AI employees, AI voice agents, AI chatbots, AI advertising",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      {
        property: "og:title",
        content: "EmiNara AI — AI Automation, AI Employees & Voice Agents",
      },
      {
        property: "og:description",
        content:
          "From AI employees and intelligent automation to high-converting websites and AI-powered advertising. EmiNara AI builds digital systems designed to help businesses grow.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "EmiNara AI" },
      { property: "og:url", content: "https://lookbook-lens-live.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "EmiNara AI — AI Automation, AI Employees & Voice Agents",
      },
      {
        name: "twitter:description",
        content:
          "AI employees, automation, voice agents and AI advertising systems built for growing businesses.",
      },
    ],
    links: [{ rel: "canonical", href: "https://lookbook-lens-live.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://lookbook-lens-live.lovable.app/#organization",
              name: "EmiNara AI",
              alternateName: ["EmiNara", "Eminara AI"],
              url: "https://lookbook-lens-live.lovable.app/",
              logo: "https://lookbook-lens-live.lovable.app/favicon.png",
              email: "info@eminaraai.com",
              description:
                "EmiNara AI builds AI employees, intelligent automation, AI voice agents, chatbots, websites and AI advertising for growing businesses.",
            },
            {
              "@type": "WebSite",
              "@id": "https://lookbook-lens-live.lovable.app/#website",
              url: "https://lookbook-lens-live.lovable.app/",
              name: "EmiNara AI",
              publisher: { "@id": "https://lookbook-lens-live.lovable.app/#organization" },
            },
            {
              "@type": "ProfessionalService",
              name: "EmiNara AI",
              url: "https://lookbook-lens-live.lovable.app/",
              email: "info@eminaraai.com",
              areaServed: "Worldwide",
              serviceType: [
                "AI automation",
                "AI employees",
                "AI voice agents",
                "AI chatbots",
                "AI advertising",
                "Web design",
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});


function Index() {
  const main = useRef<HTMLElement>(null);
  useLenis();
  useLayeredSections(main);

  return (
    <div className="relative min-h-screen bg-ink text-cream">
      <Cursor />
      <Navbar />

      {/* Sections that slide in from the side would otherwise widen the page on
          phones until they arrive. clip, unlike hidden, keeps sticky panels working.
          Each Layer slides over the one before it as you scroll. */}
      <main ref={main} className="overflow-x-clip">
        <Layer first>
          <Hero />
        </Layer>
        <Layer>
          <Ticker />
          <Services />
        </Layer>
        <Layer>
          <AIChatDemo />
          <VoiceAgentDemo />
        </Layer>
        <Layer>
          <AutomationFlow />
        </Layer>
        <Layer>
          <Portfolio />
        </Layer>
        <Layer>
          <VideoAds />
        </Layer>
        <Layer>
          <CaseStudies />
          <Process />
        </Layer>
        <Layer>
          <WhoWeHelp />
          <WhyEmiNara />
        </Layer>
        <Layer>
          <Trust />
          <FinalCTA />
        </Layer>
      </main>

      <Footer />
    </div>
  );
}
