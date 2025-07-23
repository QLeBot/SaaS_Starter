import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-muted/20 text-center">
      <div className="container mx-auto px-4 md:px-6">
        <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
          Launching Soon
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Elevate Your Workflow with SaaSify
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The all-in-one platform that helps teams collaborate, automate, and deliver exceptional results. Streamline your processes and focus on what matters most.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full h-12 px-8 text-base">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  )
} 