import type { ProjectSession04Characterization } from "../types/project-session-04-characterization"

/** Registro bruto da tabela de caracterização (snake_case). */
export type ProjectSession04CharacterizationRow = {
  id: string
  projeto_id: string
  outras_informacoes_texto: string | null
  criado_em: string
  atualizado_em: string
}

export function toProjectSession04Characterization(
  row: ProjectSession04CharacterizationRow,
): ProjectSession04Characterization {
  return {
    id: row.id,
    projetoId: row.projeto_id,
    outrasInformacoesTexto: row.outras_informacoes_texto,
    criadoEm: row.criado_em,
    atualizadoEm: row.atualizado_em,
  }
}
