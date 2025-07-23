import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, BarChart, Users, Shield, Layers, Star } from "lucide-react"

const features = [
  {
    title: "Smart Automation",
    description: "Automate repetitive tasks and workflows to save time and reduce errors.",
    icon: <Zap className="size-5" />,
  },
  {
    title: "Advanced Analytics",
    description: "Gain valuable insights with real-time data visualization and reporting.",
    icon: <BarChart className="size-5" />,
  },
  {
    title: "Team Collaboration",
    description: "Work together seamlessly with integrated communication tools.",
    icon: <Users className="size-5" />,
  },
  {
    title: "Enterprise Security",
    description: "Keep your data safe with end-to-end encryption and compliance features.",
    icon: <Shield className="size-5" />,
  },
  {
    title: "Seamless Integration",
    description: "Connect with your favorite tools through our extensive API ecosystem.",
    icon: <Layers className="size-5" />,
  },
  {
    title: "24/7 Support",
    description: "Get help whenever you need it with our dedicated support team.",
    icon: <Star className="size-5" />,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <Badge className="rounded-full px-4 py-1.5 text-sm font-medium mb-4" variant="secondary">
          Features
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">Everything You Need to Succeed</h2>
        <p className="max-w-[800px] text-muted-foreground md:text-lg text-center mx-auto mb-12">
          Our comprehensive platform provides all the tools you need to streamline your workflow, boost productivity, and achieve your goals.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Card key={i} className="h-full overflow-hidden border-custom/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 