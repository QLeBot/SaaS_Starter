import { Badge } from "@/components/ui/badge"
import GenerateDemo from "@/components/DemoPage/StockPickerDemo"

export function DemoSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Badge className="rounded-full px-4 py-1.5 text-sm font-medium mb-4" variant="secondary">
          Demo
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
          See SaaSify in Action
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-center">
          Experience a live demo of our platform. Explore the intuitive interface and powerful features designed to boost your productivity.
        </p>
        <div className="flex flex-col items-center justify-center bg-background mt-8">
            <GenerateDemo />
        </div>
      </div>
    </section>
  )
}