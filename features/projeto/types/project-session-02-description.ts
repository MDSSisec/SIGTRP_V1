export type ProjectSession02Description = {
  id: string
  projetoId: string
  justificativaCaracterizacaoInteresses: string | null
  justificativaPublicoAlvo: string | null
  justificativaProblema: string | null
  justificativaResultadosEsperados: string | null
  justificativaRelacaoPrograma: string | null
  metodologiaMeta: string | null
  metodologiaEtapa11: string | null
  metodologiaEtapa12: string | null
  metodologiaEtapa13: string | null
  metodologiaEtapa14: string | null
  criadoEm: string
  atualizadoEm: string
}

export type ProjectSession02DescriptionJustificativaInput = {
  justificativaCaracterizacaoInteresses?: string
  justificativaPublicoAlvo?: string
  justificativaProblema?: string
  justificativaResultadosEsperados?: string
  justificativaRelacaoPrograma?: string
}

export type ProjectSession02DescriptionMetodologiaInput = {
  metodologiaMeta?: string
  metodologiaEtapa11?: string
  metodologiaEtapa12?: string
  metodologiaEtapa13?: string
  metodologiaEtapa14?: string
}
