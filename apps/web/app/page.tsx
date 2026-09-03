"use client";

import LandingLayout from "@/components/layout/LandingLayout";
import HeroDualEntrySection from "@/components/landing/HeroDualEntrySection";
import StatsBandSection from "@/components/landing/StatsBandSection";
import FiturGridSection from "@/components/landing/FiturGridSection";
import CaraBergabungSection from "@/components/landing/CaraBergabungSection";
import MarketplacePreviewSection from "@/components/landing/MarketplacePreviewSection";
import TestimoniSection from "@/components/landing/TestimoniSection";
import CtaBergabungSection from "@/components/landing/CtaBergabungSection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <LandingLayout>
      <HeroDualEntrySection />
      <StatsBandSection />
      <FiturGridSection />
      <CaraBergabungSection />
      <MarketplacePreviewSection />
      <TestimoniSection />
      <CtaBergabungSection />
      <LandingFooter />
    </LandingLayout>
  );
}
