import { LoginForm } from "@/features/login"
import { Landmark, Lock, ShieldCheck } from "lucide-react"

import { WelcomeHero } from "../components"

export function WelcomeScreen() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[linear-gradient(135deg,#f7f9fc_0%,#edf4ff_38%,#f7f9fc_100%)] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,rgba(3,42,89,0.10)_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="absolute top-12 left-8 size-40 rounded-full bg-[#032a59]/8 blur-3xl" />
        <div className="absolute top-24 left-1/3 h-[28rem] w-[28rem] rounded-full bg-[#032a59]/6 blur-3xl" />
        <div className="absolute -right-24 top-16 h-[32rem] w-[32rem] rounded-full bg-[#032a59]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#032a59]/8 blur-3xl" />
      </div>

      <div className="relative flex min-h-svh flex-col">
        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-10 md:px-10 lg:px-16">
          <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1.25fr)_420px] lg:items-center lg:gap-16">
            <WelcomeHero />
            <LoginForm className="w-full lg:justify-self-end" />
          </div>
        </main>

        <footer className="relative border-t border-[#032a59]/10 bg-[#032a59] px-6 py-5 text-white md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-4 text-sm md:grid-cols-3 md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <Landmark className="size-5" />
              </div>
              <div>
                <p className="font-medium">
                  Ministerio do Desenvolvimento e Assistencia Social, Familia e
                  Combate a Fome
                </p>
                <p className="text-white/75">
                  Secretaria de Inclusao Socioeconomica
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-center">
              <div className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="font-medium">Ambiente Seguro</p>
                <p className="text-white/75">
                  Acesso restrito a usuarios autorizados.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:justify-end">
              <div className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <Lock className="size-5" />
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
