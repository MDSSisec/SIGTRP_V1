import {
  Building2,
  ChartColumnIncreasing,
  FileText,
  Landmark,
} from "lucide-react"

import { APP_NAME } from "../constants"

const HERO_FEATURES = [
  {
    icon: FileText,
    title: "Gestao de Processos",
    description: "Acompanhe todas as etapas das transferencias.",
  },
  {
    icon: Landmark,
    title: "Controle Financeiro",
    description: "Monitore a execucao orcamentaria e financeira.",
  },
  {
    icon: Building2,
    title: "Documentos e Anexos",
    description: "Centralize e organize documentos importantes.",
  },
  {
    icon: ChartColumnIncreasing,
    title: "Relatorios Gerenciais",
    description: "Gere relatorios e tenha visao estrategica.",
  },
] as const

export function WelcomeHero() {
  return (
    <div className="relative z-10 w-full max-w-[560px] space-y-5 sm:space-y-6 md:space-y-8">
      <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
        <div className="shrink-0 pt-0.5 text-[#032a59] sm:pt-1">
          <Landmark
            className="size-12 sm:size-16 md:size-20 lg:size-24"
            strokeWidth={1.8}
          />
          <div className="mt-1 ml-1 h-0.5 w-10 rounded-full bg-[#2e7d32] sm:ml-2 sm:h-1 sm:w-14" />
          <div className="mt-1 ml-2 h-0.5 w-8 rounded-full bg-[#f3b21b] sm:ml-4 sm:h-1 sm:w-12" />
        </div>

        <div className="min-w-0 pt-1 sm:pt-2 md:pt-3">
          <h1 className="text-3xl font-bold tracking-tight text-[#032a59] sm:text-4xl md:text-5xl lg:text-7xl">
            {APP_NAME}
          </h1>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <p className="text-lg leading-snug font-medium text-slate-700 sm:text-xl md:text-2xl lg:text-[32px] lg:leading-tight">
          Sistema Interno de Gestao de
          <br />
          <span className="font-semibold text-[#1c56a6] lg:whitespace-nowrap">
            TEDs, Convênios e Emendas Parlamentares
          </span>
        </p>

        <div className="h-0.5 w-10 rounded-full bg-[#3b82f6] sm:w-14" />

        <p className="max-w-lg text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 md:text-lg lg:text-[20px] lg:leading-9">
          Controle, acompanhe e gerencie todo o ciclo de execução de TEDs,
          Convênios e Emendas em um único ambiente.
        </p>
      </div>

      <div className="grid max-w-xl gap-3 pt-1 sm:gap-4 sm:pt-2">
        {HERO_FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-2.5 sm:gap-3">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#032a59]/15 bg-white/80 text-[#032a59] shadow-sm sm:size-10 sm:rounded-xl">
              <Icon className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs font-semibold text-[#032a59] sm:text-sm md:text-base">
                {title}
              </h2>
              <p className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6 md:text-[15px]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
