import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Mail } from "lucide-react"
import React, { useState } from "react"

export type HeroButton = {
  text: string
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
  className?: string
  onClick?: () => void
  href?: string
}

export type HeroSectionProps = {
  badgeText?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  buttons?: HeroButton[]
  showEmailInput?: boolean
  onEmailSubmit?: (email: string) => void
}

export function HeroSection({
  badgeText = "Launching Soon",
  badgeVariant = "secondary",
  buttons = [
    { text: "Start Free Trial", variant: "default", className: "rounded-full h-12 px-8 text-base" },
    { text: "Book a Demo", variant: "outline", className: "rounded-full h-12 px-8 text-base" },
  ],
  showEmailInput = false,
  onEmailSubmit,
}: HeroSectionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onEmailSubmit && email) {
      onEmailSubmit(email);
    }
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-muted/20 text-center">
      <div className="container mx-auto px-4 md:px-6">
        <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant={badgeVariant}>
          {badgeText}
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Elevate Your Workflow with SaaSify
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The all-in-one platform that helps teams collaborate, automate, and deliver exceptional results. Streamline your processes and focus on what matters most.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          {buttons.map((btn, i) =>
            btn.href ? (
              <Button
                key={i}
                size="lg"
                variant={btn.variant}
                className={btn.className}
                asChild
              >
                <a href={btn.href}>{btn.text}</a>
              </Button>
            ) : (
              <Button
                key={i}
                size="lg"
                variant={btn.variant}
                className={btn.className}
                onClick={btn.onClick}
              >
                {btn.text}
              </Button>
            )
          )}
        </div>
        {showEmailInput && (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-md mx-auto mt-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Stay Updated</h2>
              <p className="text-gray-600">Get notified about our latest updates and features</p>
            </div>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="email"
                required
                placeholder="Enter your email address"
                className="pl-12 pr-4 py-3 h-12 text-base border border-gray-200 rounded-xl bg-white shadow-sm focus:border-gray-300 focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitted}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              variant={(!email || submitted) ? "outline" : "default"}
              className={`w-full h-12 text-base font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                submitted
                  ? "bg-gray-800 hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  : email
                    ? "bg-gray-900 hover:bg-black text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100"
              }`}
              disabled={submitted || !email}  
            >
              {submitted ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Successfully Submitted!
                </div>
              ) : (
                "Notify Me"
              )}
            </Button>
          </form>
        )}
        {showEmailInput && submitted && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-gray-800 text-sm text-center">Thank you! We'll keep you updated with our latest news.</p>
          </div>
        )}
      </div>
    </section>
  )
} 