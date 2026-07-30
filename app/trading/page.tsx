import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import {
  TradingInstrumentsFull,
  TradingConditions,
  AccountTypesSection,
  TradingPlatformsFull,
  TradingProcess,
  TradingFAQ,
} from "@/components/trading/TradingSections";

export const metadata: Metadata = {
  title: "Trading — Instruments, Accounts & Platforms",
  description:
    "Explore PulzeTrend Capital's full range of trading instruments — Forex, Gold, Indices, Oil, Crypto CFDs, and Shares. Compare Standard, Pro, and ECN account types. nTrader, WebTrader, Mobile.",
  alternates: { canonical: "https://pulzetrendcapital.com/trading" },
};

export default function TradingPage() {
  return (
    <>
      <PageHero
        eyebrow="Trading"
        title="Access Global Markets from One Account"
        subtitle="Trade Forex, Gold, Indices, Commodities, Crypto CFDs, and Shares with institutional-grade conditions, ultra-fast execution, and spreads from 0.0 pips."
        primaryCta={{ label: "Open Live Account", href: "#" }}
        secondaryCta={{ label: "Open Demo Account", href: "#" }}
      />
      <TradingInstrumentsFull />
      <TradingConditions />
      <AccountTypesSection />
      <TradingPlatformsFull />
      <TradingProcess />
      <TradingFAQ />
      <CTABanner
        title="Open Your Trading Account Today"
        subtitle="Get started with a live or demo account in under 2 minutes. No hidden fees, no complex setup."
        primaryLabel="Open Live Account"
        primaryHref="#"
        secondaryLabel="Compare Accounts"
        secondaryHref="/trading#accounts"
      />
    </>
  );
}
