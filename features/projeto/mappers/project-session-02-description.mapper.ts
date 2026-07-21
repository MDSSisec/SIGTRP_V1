import type { ProjectSession02Description } from "../types/project-session-02-description"

/** Registro bruto da tabela de descrição (snake_case). */
export type ProjectSession02DescriptionRow = {
  id: string
  projeto_id: string
  justificativa_caracterizacao_interesses: string | null
  justificativa_publico_alvo: string | null
  justificativa_problema: string | null
  justificativa_resultados_esperados: string | null
  justificativa_relacao_programa: string | null
  metodologia_meta: string | null
  metodologia_etapa_1_1: string | null
  metodologia_etapa_1_2: string | null
  metodologia_etapa_1_3: string | null
  metodologia_etapa_1_4: string | null
  criado_em: string
  atualizado_em: string
}

export function toProjectSession02Description(
  row: ProjectSession02DescriptionRow,
): ProjectSession02Description {
  return {
    id: row.id,
    projetoId: row.projeto_id,
    justificativaCaracterizacaoInteresses:
      row.justificativa_caracterizacao_interesses,
    justificativaPublicoAlvo: row.justificativa_publico_alvo,
    justificativaProblema: row.justificativa_problema,
    justificativaResultadosEsperados: row.justificativa_resultados_esperados,
    justificativaRelacaoPrograma: row.justificativa_relacao_programa,
    metodologiaMeta: row.metodologia_meta,
    metodologiaEtapa11: row.metodologia_etapa_1_1,
    metodologiaEtapa12: row.metodologia_etapa_1_2,
    metodologiaEtapa13: row.metodologia_etapa_1_3,
    metodologiaEtapa14: row.metodologia_etapa_1_4,
    criadoEm: row.criado_em,
    atualizadoEm: row.atualizado_em,
  }
}
