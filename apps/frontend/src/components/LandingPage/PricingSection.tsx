import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small teams and startups.",
    features: ["Up to 5 team members", "Basic analytics", "5GB storage", "Email support"],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    price: "$79",
    description: "Ideal for growing businesses.",
    features: [
      "Up to 20 team members",
      "Advanced analytics",
      "25GB storage",
      "Priority email support",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "For large organizations with complex needs.",
    features: [
      "Unlimited team members",
      "Custom analytics",
      "Unlimited storage",
      "24/7 phone & email support",
      "Advanced API access",
      "Custom integrations",
    ],
    cta: "Contact Sales",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="w-full py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <Badge className="rounded-full px-4 py-1.5 text-sm font-medium mb-4" variant="secondary">
          Pricing
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="max-w-[800px] text-muted-foreground md:text-lg text-center mx-auto mb-12">
          Choose the plan that's right for your business. All plans include a 14-day free trial.
        </p>
        <div className="mx-auto max-w-5xl grid gap-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, i) => (
            <Card
              key={i}
              className={`relative overflow-hidden h-full ${plan.popular ? "border-primary shadow-lg" : "border-custom/40 shadow-md"} bg-gradient-to-b from-background to-muted/10 backdrop-blur`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
                <ul className="space-y-3 my-6 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center">
                      <span className="mr-2 text-primary">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-auto rounded-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/80"}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 