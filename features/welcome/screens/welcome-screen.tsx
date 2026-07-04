import { LoginForm } from "@/features/login"

import { WelcomeHero } from "../components"

export function WelcomeScreen() {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-background p-6 text-foreground md:p-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-20 -bottom-32 size-[28rem] rounded-full bg-accent/80 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 size-72 -translate-x-1/2 rounded-full bg-chart-2/10 blur-3xl" />
      </div>

      <div className="relative grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <WelcomeHero />
        <LoginForm className="lg:justify-self-end lg:max-w-md lg:w-full" />
      </div>
    </div>
  )
}
