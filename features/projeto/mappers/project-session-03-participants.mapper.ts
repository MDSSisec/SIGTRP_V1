import type {
  ProjectSession03BaseTerritorialLinha,
  ProjectSession03Participants,
} from "../types/project-session-03-participants"

/** Registro bruto da tabela de participantes (snake_case). */
export type ProjectSession03ParticipantsRow = {
  id: string
  projeto_id: string
  historico_situacao_texto: string | null
  base_territorial_linhas: ProjectSession03BaseTerritorialLinha[] | null
  publico_homens_diretos: number | null
  publico_mulheres_diretos: number | null
  povos_selecoes: string[] | null
  povos_outros_especificar: string | null
  perfil_selecoes: string[] | null
  perfil_outros_especificar: string | null
  servicos_selecoes: string[] | null
  servicos_outros_especificar: string | null
  criado_em: string
  atualizado_em: string
}

function asStringArray(value: unknown): string[] | null {
  if (value == null) return null
  if (!Array.isArray(value)) return null
  return value.map((item) => String(item))
}

function asBaseTerritorialLinhas(
  value: unknown,
): ProjectSession03BaseTerritorialLinha[] | null {
  if (value == null) return null
  if (!Array.isArray(value)) return null

  return value.map((item) => {
    const row = item as Record<string, unknown>
    return {
      territorio: String(row.territorio ?? ""),
      municipio: String(row.municipio ?? ""),
    }
  })
}

export function toProjectSession03Participants(
  row: ProjectSession03ParticipantsRow,
): ProjectSession03Participants {
  return {
    id: row.id,
    projetoId: row.projeto_id,
    historicoSituacaoTexto: row.historico_situacao_texto,
    baseTerritorialLinhas: asBaseTerritorialLinhas(row.base_territorial_linhas),
    publicoHomensDiretos: row.publico_homens_diretos,
    publicoMulheresDiretos: row.publico_mulheres_diretos,
    povosSelecoes: asStringArray(row.povos_selecoes),
    povosOutrosEspecificar: row.povos_outros_especificar,
    perfilSelecoes: asStringArray(row.perfil_selecoes),
    perfilOutrosEspecificar: row.perfil_outros_especificar,
    servicosSelecoes: asStringArray(row.servicos_selecoes),
    servicosOutrosEspecificar: row.servicos_outros_especificar,
    criadoEm: row.criado_em,
    atualizadoEm: row.atualizado_em,
  }
}
