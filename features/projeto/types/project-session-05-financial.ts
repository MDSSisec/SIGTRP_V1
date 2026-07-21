/** Parcela persistida do cronograma de desembolso. */
export type ProjectSession05CronogramaParcela = {
  mesAno: string
  mds: number | null
  contrapartida: number | null
}

/** Linha persistida do resumo do plano de aplicação. */
export type ProjectSession05ResumoPlanoLinha = {
  elementoDespesa: string
  codigo: string
  mds: number | null
  contrapartida: number | null
}

export type ProjectSession05Financial = {
  id: string
  projetoId: string
  valorRepasseMdsCusteio: number | null
  valorRepasseMdsInvestimento: number | null
  valorContrapartidaCusteio: number | null
  valorContrapartidaInvestimento: number | null
  cronogramaDesembolsoParcelas: ProjectSession05CronogramaParcela[] | null
  resumoPlanoAplicacaoLinhas: ProjectSession05ResumoPlanoLinha[] | null
  criadoEm: string
  atualizadoEm: string
}

export type ProjectSession05ValorTotalInput = {
  valorRepasseMdsCusteio?: string
  valorRepasseMdsInvestimento?: string
  valorContrapartidaCusteio?: string
  valorContrapartidaInvestimento?: string
}

export type ProjectSession05CronogramaDesembolsoInput = {
  cronogramaDesembolsoParcelas?: ProjectSession05CronogramaParcela[]
}

export type ProjectSession05ResumoPlanoAplicacaoInput = {
  resumoPlanoAplicacaoLinhas?: ProjectSession05ResumoPlanoLinha[]
}
