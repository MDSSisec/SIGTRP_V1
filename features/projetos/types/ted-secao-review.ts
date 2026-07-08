export type TedSecaoRevisaoStatus = "ok" | "precisa_atencao"

export type TedSecaoReviewRow = {
  id: string
  projeto_id: string
  secao_slug: string
  bloqueada: boolean
  status_revisao: TedSecaoRevisaoStatus
  comentario: string | null
  atualizado_por: string | null
  atualizado_em: string
}

export type TedSecaoReview = {
  id: string
  projetoId: string
  secaoSlug: string
  bloqueada: boolean
  statusRevisao: TedSecaoRevisaoStatus
  comentario: string | null
  atualizadoPor: string | null
  atualizadoEm: string
}

export type TedSecaoReviewInput = {
  secaoSlug: string
  bloqueada?: boolean
  statusRevisao?: TedSecaoRevisaoStatus
  comentario?: string | null
}

/** Slugs das seções da identificação que já suportam review. */
export const TED_IDENTIFICACAO_SECAO_SLUGS = [
  "identificacao-projeto",
  "identificacao-proponente",
  "identificacao-representante-legal",
  "identificacao-responsavel-tecnico",
] as const

export type TedIdentificacaoSecaoSlug =
  (typeof TED_IDENTIFICACAO_SECAO_SLUGS)[number]

export function toTedSecaoReview(row: TedSecaoReviewRow): TedSecaoReview {
  return {
    id: row.id,
    projetoId: row.projeto_id,
    secaoSlug: row.secao_slug,
    bloqueada: row.bloqueada,
    statusRevisao: row.status_revisao,
    comentario: row.comentario,
    atualizadoPor: row.atualizado_por,
    atualizadoEm: row.atualizado_em,
  }
}

/** Mapeia chave de SESSOES_VISAO_GERAL_TITLE → slug da seção. */
export const TITLE_KEY_TO_SECAO_SLUG: Record<string, string> = {
  TITLE_SESSAO_IDENTIFICACAO_PROJETO: "identificacao-projeto",
  TITLE_SESSAO_IDENTIFICACAO_PROPOSTA: "identificacao-proponente",
  TITLE_SESSAO_IDENTIFICACAO_REPRESENTANTE_LEGAL: "identificacao-representante-legal",
  TITLE_SESSAO_IDENTIFICACAO_RESPONSAVEL_TECNICO: "identificacao-responsavel-tecnico",
  TITLE_SESSAO_JUSTIFICATIVA_MOTIVACAO: "justificativa",
  TITLE_SESSAO_OBJETIVOS: "objetivos",
  TITLE_SESSAO_METAS: "metas",
  TITLE_SESSAO_ETAPAS_CRONOGRAMA: "etapas-cronograma",
  TITLE_SESSAO_METODOLOGIA: "metodologia",
  TITLE_SESSAO_RESULTADOS_ESPERADOS: "resultados-esperados",
  TITLE_SESSAO_GESTAO_PROJETO: "gestao-projeto",
  TITLE_SESSAO_HISTORICO_SITUACAO_TERRITORIO: "historico-situacao-territorio",
  TITLE_SESSAO_BASE_TERRITORIAL: "base-territorial",
  TITLE_SESSAO_PUBLICO_BENEFICIARIO: "publico-beneficiario",
  TITLE_SESSAO_POVOS_COMUNIDADES_TRADICIONAIS: "povos-comunidades-tradicionais",
  TITLE_SESSAO_PERFIL_SOCIO_OCUPACIONAL: "perfil-socio-ocupacional",
  TITLE_SESSAO_SERVICOS_ACESSADOS: "servicos-acessados",
  TITLE_SESSAO_OUTRAS_INFORMACOES_PROPOSTA: "outras-informacoes-proponente",
  TITLE_SESSAO_VALOR_TOTAL: "valor-total",
  TITLE_SESSAO_CRONOGRAMA_DESENBOLSO: "cronograma-desembolso",
  TITLE_SESSAO_DETALHAMENTO_ORCAMENTO: "detalhamento-orcamento",
  TITLE_SESSAO_RESUMO_PLANO_APLICACAO: "resumo-plano-aplicacao",
  TITLE_SESSAO_PROCEDIMENTOS_MONITORAMENTO: "procedimentos-monitoramento",
  TITLE_SESSAO_INDICADORES_EFICIENCIA: "indicadores-eficiencia",
}

/** Mapeia bloco PATCH identificação → slug de review. */
export const IDENTIFICACAO_BLOCO_TO_SECAO_SLUG: Record<string, string> = {
  projeto: "identificacao-projeto",
  proponente: "identificacao-proponente",
  representante: "identificacao-representante-legal",
  "responsavel-tecnico": "identificacao-responsavel-tecnico",
}
