import { Sparkles } from "lucide-react"

import { APP_NAME, WELCOME_TAGLINE } from "../constants"

export function WelcomeHero() {
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
        <Sparkles className="size-4" />
        Bem-vindo ao
      </div>
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        <span className="bg-gradient-to-br from-primary via-chart-2 to-chart-4 bg-clip-text text-transparent">
          {APP_NAME}
        </span>
      </h1>
      <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
        {WELCOME_TAGLINE}
      </p>
    </div>
  )
}
