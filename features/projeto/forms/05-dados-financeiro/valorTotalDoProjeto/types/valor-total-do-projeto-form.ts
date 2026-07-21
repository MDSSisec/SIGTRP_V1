import type { ProjectSession05Financial } from "@/features/projeto/types/project-session-05-financial"
import { formatCurrencyInput } from "@/features/projeto/utils/currency"

/** Valores editáveis da tabela de valor total. */
export type DadosValorTotalDoProjeto = {
  repasseMdsCusteio: string
  repasseMdsInvestimento: string
  contrapartidaCusteio: string
  contrapartidaInvestimento: string
}

/** Totais derivados dos campos editáveis. */
export type ValoresValorTotalDoProjeto = {
  repasseMdsTotal: number
  contrapartidaTotal: number
  totalCusteio: number
  totalInvestimento: number
  totalGeral: number
}

export const VAZIO_VALOR_TOTAL_DO_PROJETO: DadosValorTotalDoProjeto = {
  repasseMdsCusteio: "",
  repasseMdsInvestimento: "",
  contrapartidaCusteio: "",
  contrapartidaInvestimento: "",
}

function moedaFromDb(value: number | null | undefined): string {
  if (value == null) return ""
  return formatCurrencyInput(String(Math.round(value * 100)))
}

export function toValorTotalDoProjetoForm(
  financeiro: ProjectSession05Financial | null,
): DadosValorTotalDoProjeto {
  if (!financeiro) {
    return { ...VAZIO_VALOR_TOTAL_DO_PROJETO }
  }

  return {
    repasseMdsCusteio: moedaFromDb(financeiro.valorRepasseMdsCusteio),
    repasseMdsInvestimento: moedaFromDb(financeiro.valorRepasseMdsInvestimento),
    contrapartidaCusteio: moedaFromDb(financeiro.valorContrapartidaCusteio),
    contrapartidaInvestimento: moedaFromDb(
      financeiro.valorContrapartidaInvestimento,
    ),
  }
}

export function toValorTotalDoProjetoInput(dados: DadosValorTotalDoProjeto) {
  return {
    valorRepasseMdsCusteio: dados.repasseMdsCusteio,
    valorRepasseMdsInvestimento: dados.repasseMdsInvestimento,
    valorContrapartidaCusteio: dados.contrapartidaCusteio,
    valorContrapartidaInvestimento: dados.contrapartidaInvestimento,
  }
}
