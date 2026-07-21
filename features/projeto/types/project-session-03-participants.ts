/** Linha persistida da base territorial (sem id de UI). */
export type ProjectSession03BaseTerritorialLinha = {
  territorio: string
  municipio: string
}

export type ProjectSession03Participants = {
  id: string
  projetoId: string
  historicoSituacaoTexto: string | null
  baseTerritorialLinhas: ProjectSession03BaseTerritorialLinha[] | null
  publicoHomensDiretos: number | null
  publicoMulheresDiretos: number | null
  povosSelecoes: string[] | null
  povosOutrosEspecificar: string | null
  perfilSelecoes: string[] | null
  perfilOutrosEspecificar: string | null
  servicosSelecoes: string[] | null
  servicosOutrosEspecificar: string | null
  criadoEm: string
  atualizadoEm: string
}

export type ProjectSession03HistoricoInput = {
  historicoSituacaoTexto?: string
}

export type ProjectSession03BaseTerritorialInput = {
  baseTerritorialLinhas?: ProjectSession03BaseTerritorialLinha[]
}

export type ProjectSession03PublicoBeneficiarioInput = {
  publicoHomensDiretos?: number | null
  publicoMulheresDiretos?: number | null
}

export type ProjectSession03PovosInput = {
  povosSelecoes?: string[]
  povosOutrosEspecificar?: string
}

export type ProjectSession03PerfilInput = {
  perfilSelecoes?: string[]
  perfilOutrosEspecificar?: string
}

export type ProjectSession03ServicosInput = {
  servicosSelecoes?: string[]
  servicosOutrosEspecificar?: string
}
