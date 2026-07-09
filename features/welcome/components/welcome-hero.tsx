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
    <div className="relative z-10 max-w-[560px] space-y-8">
      <div className="flex items-start gap-5">
        <div className="shrink-0 pt-1 text-[#032a59]">
          <Landmark className="size-20 md:size-24" strokeWidth={1.8} />
          <div className="mt-1 ml-2 h-1 w-14 rounded-full bg-[#2e7d32]" />
          <div className="mt-1 ml-4 h-1 w-12 rounded-full bg-[#f3b21b]" />
        </div>

        <div className="pt-3">
          <h1 className="text-6xl font-bold tracking-tight text-[#032a59] md:text-7xl">
            {APP_NAME}
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-[26px] leading-tight font-medium text-slate-700 md:text-[32px]">
          Sistema Interno de Gestao de
          <br />
          <span className="font-semibold whitespace-nowrap text-[#1c56a6]">
            TEDs, Convênios e Emendas Parlamentares
          </span>
        </p>

        <div className="h-0.5 w-14 rounded-full bg-[#3b82f6]" />

        <p className="max-w-lg text-[18px] leading-9 text-slate-600 md:text-[20px]">
          Controle, acompanhe e gerencie todo o ciclo de execução de TEDs,
          Convênios e Emendas em um único ambiente.
        </p>
      </div>

      <div className="grid max-w-xl gap-4 pt-2">
        {HERO_FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#032a59]/15 bg-white/80 text-[#032a59] shadow-sm">
              <Icon className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#032a59] md:text-base">
                {title}
              </h2>
              <p className="text-sm leading-6 text-slate-600 md:text-[15px]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
