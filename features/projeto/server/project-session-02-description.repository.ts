import { getDbPool } from "@/lib/db"
import {
  toProjectSession02Description,
  type ProjectSession02DescriptionRow,
} from "../mappers/project-session-02-description.mapper"
import type {
  ProjectSession02Description,
  ProjectSession02DescriptionJustificativaInput,
  ProjectSession02DescriptionMetodologiaInput,
} from "../types/project-session-02-description"

const DESCRICAO_SELECT = `
  SELECT *
  FROM "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION"
`

function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? ""
  return trimmed ? trimmed : null
}

export async function getProjectSession02DescriptionByProjetoId(
  projetoId: string,
): Promise<ProjectSession02Description | null> {
  const pool = getDbPool()

  const result = await pool.query<ProjectSession02DescriptionRow>(
    `
      ${DESCRICAO_SELECT}
      WHERE projeto_id = $1
      LIMIT 1
    `,
    [projetoId],
  )

  const row = result.rows[0]
  return row ? toProjectSession02Description(row) : null
}

export async function upsertProjectSession02DescriptionJustificativa(
  projetoId: string,
  data: ProjectSession02DescriptionJustificativaInput,
): Promise<ProjectSession02Description> {
  const pool = getDbPool()

  const caracterizacao = emptyToNull(
    data.justificativaCaracterizacaoInteresses,
  )
  const publicoAlvo = emptyToNull(data.justificativaPublicoAlvo)
  const problema = emptyToNull(data.justificativaProblema)
  const resultados = emptyToNull(data.justificativaResultadosEsperados)
  const relacao = emptyToNull(data.justificativaRelacaoPrograma)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION" (
        projeto_id,
        justificativa_caracterizacao_interesses,
        justificativa_publico_alvo,
        justificativa_problema,
        justificativa_resultados_esperados,
        justificativa_relacao_programa,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        justificativa_caracterizacao_interesses = EXCLUDED.justificativa_caracterizacao_interesses,
        justificativa_publico_alvo = EXCLUDED.justificativa_publico_alvo,
        justificativa_problema = EXCLUDED.justificativa_problema,
        justificativa_resultados_esperados = EXCLUDED.justificativa_resultados_esperados,
        justificativa_relacao_programa = EXCLUDED.justificativa_relacao_programa,
        atualizado_em = NOW()
    `,
    [projetoId, caracterizacao, publicoAlvo, problema, resultados, relacao],
  )

  const descricao = await getProjectSession02DescriptionByProjetoId(projetoId)

  if (!descricao) {
    throw new Error("Não foi possível salvar a justificativa do projeto.")
  }

  return descricao
}

export async function upsertProjectSession02DescriptionMetodologia(
  projetoId: string,
  data: ProjectSession02DescriptionMetodologiaInput,
): Promise<ProjectSession02Description> {
  const pool = getDbPool()

  const meta = emptyToNull(data.metodologiaMeta)
  const etapa11 = emptyToNull(data.metodologiaEtapa11)
  const etapa12 = emptyToNull(data.metodologiaEtapa12)
  const etapa13 = emptyToNull(data.metodologiaEtapa13)
  const etapa14 = emptyToNull(data.metodologiaEtapa14)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECT_SESSION_02_DESCRIPTION" (
        projeto_id,
        metodologia_meta,
        metodologia_etapa_1_1,
        metodologia_etapa_1_2,
        metodologia_etapa_1_3,
        metodologia_etapa_1_4,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      ON CONFLICT (projeto_id) DO UPDATE SET
        metodologia_meta = EXCLUDED.metodologia_meta,
        metodologia_etapa_1_1 = EXCLUDED.metodologia_etapa_1_1,
        metodologia_etapa_1_2 = EXCLUDED.metodologia_etapa_1_2,
        metodologia_etapa_1_3 = EXCLUDED.metodologia_etapa_1_3,
        metodologia_etapa_1_4 = EXCLUDED.metodologia_etapa_1_4,
        atualizado_em = NOW()
    `,
    [projetoId, meta, etapa11, etapa12, etapa13, etapa14],
  )

  const descricao = await getProjectSession02DescriptionByProjetoId(projetoId)

  if (!descricao) {
    throw new Error("Não foi possível salvar a metodologia do projeto.")
  }

  return descricao
}
