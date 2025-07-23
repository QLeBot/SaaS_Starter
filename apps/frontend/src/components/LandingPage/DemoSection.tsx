import { Button } from "@/components/ui/button"

export function DemoSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-background text-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          See SaaSify in Action
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-10">
          Experience a live demo of our platform. Explore the intuitive interface and powerful features designed to boost your productivity.
        </p>
        <div className="flex justify-center mb-8">
          {/* Demo area: Replace this with an actual interactive demo or embed as needed */}
          <div className="w-full max-w-2xl aspect-video bg-muted rounded-xl flex items-center justify-center shadow-md border border-custom/40">
            <span className="text-lg text-muted-foreground">[Demo Preview Here]</span>
          </div>
        </div>
        <Button size="lg" className="rounded-full h-12 px-8 text-base">
          Try the Demo
        </Button>
      </div>
    </section>
  )
} 