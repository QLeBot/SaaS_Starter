import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "SaaSify has transformed how we manage our projects. The automation features have saved us countless hours of manual work.",
    author: "Sarah Johnson",
    role: "Project Manager, TechCorp",
    rating: 5,
  },
  {
    quote:
      "The analytics dashboard provides insights we never had access to before. It's helped us make data-driven decisions that have improved our ROI.",
    author: "Michael Chen",
    role: "Marketing Director, GrowthLabs",
    rating: 5,
  },
  {
    quote:
      "Customer support is exceptional. Any time we've had an issue, the team has been quick to respond and resolve it. Couldn't ask for better service.",
    author: "Emily Rodriguez",
    role: "Operations Lead, StartupX",
    rating: 5,
  },
  {
    quote:
      "We've tried several similar solutions, but none compare to the ease of use and comprehensive features of SaaSify. It's been a game-changer.",
    author: "David Kim",
    role: "CEO, InnovateNow",
    rating: 5,
  },
  {
    quote:
      "The collaboration tools have made remote work so much easier for our team. We're more productive than ever despite being spread across different time zones.",
    author: "Lisa Patel",
    role: "HR Director, RemoteFirst",
    rating: 5,
  },
  {
    quote:
      "Implementation was seamless, and the ROI was almost immediate. We've reduced our operational costs by 30% since switching to SaaSify.",
    author: "James Wilson",
    role: "COO, ScaleUp Inc",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Badge className="rounded-full px-4 py-1.5 text-sm font-medium mb-4" variant="secondary">
          Testimonials
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">Loved by Teams Worldwide</h2>
        <p className="max-w-[800px] text-muted-foreground md:text-lg text-center mx-auto mb-12">
          Don't just take our word for it. See what our customers have to say about their experience.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="h-full overflow-hidden border-custom/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, j) => (
                      <Star key={j} className="size-4 text-yellow-500 fill-yellow-500" />
                    ))}
                </div>
                <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-custom/40">
                  <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 