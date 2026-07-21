import { getDbPool } from "@/lib/db"
import {
  toProjectSession04Characterization,
  type ProjectSession04CharacterizationRow,
} from "../mappers/project-session-04-characterization.mapper"
import type {
  ProjectSession04Characterization,
  ProjectSession04OutrasInformacoesInput,
} from "../types/project-session-04-characterization"

const CHARACTERIZATION_SELECT = `
  SELECT *
  FROM "SIGTRP_TB_PROJECT_SESSION_04_CHARACTERIZATION"
`

function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? ""
  return trimmed ? trimmed : null
}

export async function getProjectSession04CharacterizationByProjetoId(
  projetoId: string,
): Promise<ProjectSession04Characterization | null> {
  const pool = getDbPool()

  const result = await pool.query<ProjectSession04CharacterizationRow>(
    `
      ${CHARACTERIZATION_SELECT}
      WHERE projeto_id = $1
      LIMIT 1
    `,
    [projetoId],
  )

  const row = result.rows[0]
  return row ? toProjectSession04Characterization(row) : null
}

async function reloadCharacterizationOrThrow(
  projetoId: string,
  errorMessage: string,
): Promise<ProjectSession04Characterization> {
  const caracterizacao =
    await getProjectSession04CharacterizationByProjetoId(projetoId)

  if (!caracterizacao) {
    throw new Error(errorMessage)
  }

  return caracterizacao
}

export async function upsertProjectSession04OutrasInformacoes(
  projetoId: string,
  data: ProjectSession04OutrasInformacoesInput,
): Promise<ProjectSession04Characterization> {
  const pool = getDbPool()

  const texto = emptyToNull(data.outrasInformacoesTexto)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_04_CHARACTERIZATION" (
        projeto_id,
        outras_informacoes_texto,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        outras_informacoes_texto = EXCLUDED.outras_informacoes_texto,
        atualizado_em = NOW()
    `,
    [projetoId, texto],
  )

  return reloadCharacterizationOrThrow(
    projetoId,
    "Não foi possível salvar as outras informações do proponente.",
  )
}
