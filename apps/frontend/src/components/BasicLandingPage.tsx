"use client"

import { NavBar } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/LandingPage/HeroSection"
import { FeaturesSection } from "@/components/LandingPage/FeaturesSection"
import { HowItWorksSection } from "@/components/LandingPage/HowItWorksSection"

export default function BasicLandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <NavBar 
        productName="SaaSify"
        links={[
          { label: "Home", href: "/" },
          { label: "Features", href: "#features" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <main className="flex-1 flex flex-col w-full space-y-0">
        <HeroSection 
          badgeText="Launching Soon"
          badgeVariant="secondary"
          showEmailInput={true}
          onEmailSubmit={(email) => {
            console.log("Email submitted:", email);
          }}
          buttons={[]}
        />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer productName="SaaSify" />
    </div>
  )
} 