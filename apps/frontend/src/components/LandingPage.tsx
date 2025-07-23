"use client"

import { NavBar } from "@/components/ui/NavBar"
import { Footer } from "@/components/ui/Footer"
import { HeroSection } from "@/components/LandingPage/HeroSection"
import { FeaturesSection } from "@/components/LandingPage/FeaturesSection"
import { HowItWorksSection } from "@/components/LandingPage/HowItWorksSection"
import { TestimonialsSection } from "@/components/LandingPage/TestimonialsSection"
import { PricingSection } from "@/components/LandingPage/PricingSection"
import { FAQSection } from "@/components/LandingPage/FAQSection"
import { CTASection } from "@/components/LandingPage/CTASection"
import { DemoSection } from "@/components/LandingPage/DemoSection"

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <NavBar productName="SaaSify" />
      <main className="flex-1 space-y-0">
        <HeroSection />
        <DemoSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer productName="SaaSify" />
    </div>
  )
}
