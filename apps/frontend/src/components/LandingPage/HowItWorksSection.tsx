export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Create Account",
      description: "Sign up in seconds with just your email. No credit card required to get started.",
    },
    {
      step: "02",
      title: "Configure Workspace",
      description: "Customize your workspace to match your team's unique workflow and requirements.",
    },
    {
      step: "03",
      title: "Boost Productivity",
      description: "Start using our powerful features to streamline processes and achieve your goals.",
    },
  ]
  return (
    <section className="w-full py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">Simple Process, Powerful Results</h2>
        <p className="max-w-[800px] text-muted-foreground md:text-lg text-center mx-auto mb-12">
          Get started in minutes and see the difference our platform can make for your business.
        </p>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xl font-bold shadow-lg">
                {step.step}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 