import HeroSection, { FiturSection } from '../components/landing/HeroSection'
import SolusiSection, { TrustSection } from '../components/landing/SolusiSection'
import StatistikSection from '../components/landing/StatistikSection'
import FeatureShowcase from '../components/landing/FeatureShowcase'
import LayananSection from '../components/landing/LayananSection'
import TestimoniSection from '../components/landing/TestimoniSection'
import LandingFooter, { CtaAkhirSection } from '../components/landing/LandingFooter'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SolusiSection />
      <TrustSection />
      <StatistikSection />
      <FiturSection />
      <FeatureShowcase />
      <LayananSection />
      <TestimoniSection />
      <CtaAkhirSection />
      <LandingFooter />
    </>
  )
}
