export type CronogramaDataMapped = {
  metas: Array<{
    titulo: string
    etapas: Array<{
      descricao: string
      valor: number
      inicio: string
      termino: string
    }>
    quadrosConteudosProgramaticos: unknown[]
    quadroInsumosPorCurso: unknown[]
  }>
}

// Estrutura flexível do modelo TED — detalhada conforme as seções forem tipadas.
export type ProjectModelData = {
  id?: number
  nome?: string
  responsavel?: string
  status?: string
  tipo?: string
  identificacao?: Record<string, any>
  descricao_projeto?: Record<string, any>
  etapas_cronograma?: Record<string, any>
  planilhas?: Record<string, any>
  participantes?: Record<string, any>
  monitoramento?: Record<string, any>
  [key: string]: any
}
