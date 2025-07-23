import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Ready to Transform Your Workflow?
        </h2>
        <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl mb-8">
          Join thousands of satisfied customers who have streamlined their processes and boosted productivity with our platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <Button size="lg" variant="secondary" className="rounded-full h-12 px-8 text-base">
            Start Free Trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
          >
            Schedule a Demo
          </Button>
        </div>
        <p className="text-sm text-primary-foreground/80">
          No credit card required. 14-day free trial. Cancel anytime.
        </p>
      </div>
    </section>
  )
} 