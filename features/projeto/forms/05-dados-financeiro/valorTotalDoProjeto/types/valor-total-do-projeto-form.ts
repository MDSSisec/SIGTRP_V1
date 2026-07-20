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
