import { LoginForm } from "@/features/login"
import { Landmark, Lock, ShieldCheck } from "lucide-react"

import { WelcomeHero } from "../components"

export function WelcomeScreen() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[linear-gradient(135deg,#f7f9fc_0%,#edf4ff_38%,#f7f9fc_100%)] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,rgba(3,42,89,0.10)_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="absolute top-8 left-4 size-24 rounded-full bg-[#032a59]/8 blur-3xl sm:top-12 sm:left-8 sm:size-40" />
        <div className="absolute top-16 left-1/4 h-48 w-48 rounded-full bg-[#032a59]/6 blur-3xl sm:top-24 sm:left-1/3 sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute -right-16 top-12 h-48 w-48 rounded-full bg-[#032a59]/10 blur-3xl sm:-right-24 sm:top-16 sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#032a59]/8 blur-3xl sm:-bottom-24 sm:-left-24 sm:h-72 sm:w-72" />
      </div>

      <div className="relative flex min-h-svh flex-col">
        <main className="mx-auto flex w-full max-w-7xl flex-1 items-start px-4 py-6 sm:px-6 sm:py-8 md:items-center md:px-10 md:py-10 lg:px-16">
          <div className="grid w-full gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,440px)] lg:items-center lg:gap-16">
            <WelcomeHero />
            <LoginForm className="w-full max-w-md lg:max-w-none lg:justify-self-end" />
          </div>
        </main>

        <footer className="relative border-t border-[#032a59]/10 bg-[#032a59] px-4 py-4 text-white sm:px-6 sm:py-5 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-4 text-xs sm:text-sm md:grid-cols-3 md:items-center">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 sm:size-10">
                <Landmark className="size-4 sm:size-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium leading-snug">
                  Ministerio do Desenvolvimento e Assistencia Social, Familia e
                  Combate a Fome
                </p>
                <p className="text-white/75">
                  Secretaria de Inclusao Socioeconomica
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 md:justify-center">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 sm:size-10">
                <ShieldCheck className="size-4 sm:size-5" />
              </div>
              <div>
                <p className="font-medium">Ambiente Seguro</p>
                <p className="text-white/75">
                  Acesso restrito a usuarios autorizados.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 md:justify-end">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 sm:size-10">
                <Lock className="size-4 sm:size-5" />
              </div>
              <div>
                <p className="font-medium">SIGTRP v1.0.0</p>
                <p className="text-white/75">
                  © 2026 - Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
