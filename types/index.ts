// =============================================
// SHARED TYPE DEFINITIONS
// =============================================

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
  separator?: boolean;
  decimal?: number;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface TradingInstrument {
  icon: string;
  title: string;
  description: string;
  pairs: string;
  leverage: string;
  spread: string;
  color: string;
}

export interface Platform {
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  downloads: { label: string; href: string }[];
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  rating: number;
  content: string;
  avatar: string;
}

export interface AccountType {
  name: string;
  minDeposit: string;
  spread: string;
  commission: string;
  leverage: string;
  execution: string;
  platforms: string[];
  popular: boolean;
}

export interface TradingStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface IBBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export type PartnerType = "ib" | "affiliate" | "institutional" | "other";
