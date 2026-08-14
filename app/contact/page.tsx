import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import {
  ContactSection,
  MapSection,
  ContactFAQ,
} from "@/components/contact/ContactSections";

export const metadata: Metadata = {
  title: "Contact Us — 24/5 Support",
  description:
    "Get in touch with PulzeTrend Capital. Contact our support team via phone, email, or live chat. Office locations in New York, London, Dubai, and Singapore.",
  alternates: { canonical: "https://pulzetrendcapital.com/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact PulzeTrend Capital",
  url: "https://pulzetrendcapital.com/contact",
  description:
    "Reach our 24/5 support team by email or the contact form.",
  mainEntity: {
    "@type": "Organization",
    name: "PulzeTrend Capital",
    email: "support@pulzetrendcapital.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ground Floor, The Sotheby Building, Rodney Village, Rodney Bay",
      addressLocality: "Gros-Islet",
      addressCountry: "LC",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Contact Us"
        title="We're Always Here for You"
        subtitle="Our multilingual support team is available 24/5 during Forex market hours to assist with account queries, technical support, and anything else you need."
      />
      <ContactSection />
      <MapSection />
      <ContactFAQ />
    </>
  );
}
