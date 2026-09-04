import { createFileRoute } from "@tanstack/react-router";

import { useLenis } from "../eminara/lib/smooth-scroll";
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
import ParallaxShowcase from "../eminara/components/ParallaxShowcase";
import Process from "../eminara/components/Process";
import WhoWeHelp from "../eminara/components/WhoWeHelp";
import WhyEmiNara from "../eminara/components/WhyEmiNara";
import Trust from "../eminara/components/Trust";
import FinalCTA from "../eminara/components/FinalCTA";
import Footer from "../eminara/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EmiNara AI — AI Systems That Move Your Business Forward" },
      {
        name: "description",
        content:
          "EmiNara AI builds AI employees, intelligent automation, high-converting websites, AI voice agents, chatbots and AI advertising for businesses that want to attract, convert and serve customers better.",
      },
      {
        property: "og:title",
        content: "EmiNara AI — AI Systems That Move Your Business Forward",
      },
      {
        property: "og:description",
        content:
          "From AI employees and intelligent automation to high-converting websites and AI-powered advertising. We build digital systems designed to help businesses grow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-ink text-cream">
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <Ticker />
        <Services />
        <AIChatDemo />
        <VoiceAgentDemo />
        <AutomationFlow />
        <Portfolio />
        <VideoAds />
        <CaseStudies />
        <ParallaxShowcase />
        <Process />
        <WhoWeHelp />
        <WhyEmiNara />
        <Trust />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
