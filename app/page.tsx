import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TradingInstrumentsHome from "@/components/home/TradingInstrumentsHome";
import TradingPlatformsHome from "@/components/home/TradingPlatformsHome";
import MarketSection from "@/components/home/MarketSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Trade Global Markets with Confidence | PulzeTrend Capital",
  description:
    "Professional Forex & CFD Trading Platform. Ultra-fast execution, raw spreads from 0.0 pips, 250,000+ clients in 150+ countries. Open your live or demo account today.",
  alternates: {
    canonical: "https://pulzetrendcapital.com",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <WhyChooseUs />
      <TradingInstrumentsHome />
      <TradingPlatformsHome />
      <MarketSection />
      <TestimonialsSection />
      <CTABanner
        title="Ready to Start Trading?"
        subtitle="Join 250,000+ traders who trust PulzeTrend Capital. Open your account in minutes — no hidden fees, no minimum commitment."
        primaryLabel="Open Live Account"
        primaryHref="#"
        secondaryLabel="Try Demo Account"
        secondaryHref="#"
      />
    </>
  );
}
