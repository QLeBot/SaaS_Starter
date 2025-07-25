"use client"

import { NavBar } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
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
      <NavBar 
        productName="SaaSify"
        links={[
          { label: "Home", href: "/" },
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <main className="flex-1 flex flex-col w-full space-y-0">
        <HeroSection 
          badgeText="Launching Soon"
          badgeVariant="secondary"
          buttons={[
            { text: "Start Free Trial", variant: "default", className: "rounded-full h-12 px-8 text-base" },
            { text: "Book a Demo", variant: "outline", className: "rounded-full h-12 px-8 text-base" },
          ]}
        />
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
