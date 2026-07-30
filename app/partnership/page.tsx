import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import {
  ProgramsOverview,
  BenefitsGrid,
  PartnerRegistrationForm,
} from "@/components/partnership/PartnershipSections";

export const metadata: Metadata = {
  title: "Partnership — IB, Affiliate & Institutional Programs",
  description:
    "Join PulzeTrend Capital's partner network. Earn up to $15/lot as an Introducing Broker, up to $600 CPA as an Affiliate, or explore institutional partnership solutions.",
  alternates: { canonical: "https://pulzetrendcapital.com/partnership" },
};

export default function PartnershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="Earn More by Partnering with PulzeTrend"
        subtitle="Join thousands of IBs, affiliates, and institutional partners earning competitive commissions by connecting traders with our award-winning platform."
        primaryCta={{ label: "Apply Now", href: "#partner-form" }}
        secondaryCta={{ label: "Learn More", href: "#programs" }}
      />
      <ProgramsOverview />
      <BenefitsGrid />
      <PartnerRegistrationForm />
      <CTABanner
        title="Ready to Start Earning?"
        subtitle="Apply in minutes and get your dedicated partner dashboard and marketing materials."
        primaryLabel="Apply Now"
        primaryHref="#"
        secondaryLabel="Contact Partnership Team"
        secondaryHref="/contact"
      />
    </>
  );
}
