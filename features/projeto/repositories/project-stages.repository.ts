import { getDbPool } from "@/lib/db"

export type ProjectStageRow = {
  id: string
  ordem: number
  nome: string
}

export async function listProjectStages(): Promise<ProjectStageRow[]> {
  const pool = getDbPool()

  const result = await pool.query<ProjectStageRow>(
    `
      SELECT id, ordem, nome
      FROM "SIGTRP_TB_PROJECT_STAGES"
      ORDER BY ordem ASC
    `,
  )

  return result.rows
}

export async function findProjectStageById(
  id: string,
): Promise<ProjectStageRow | null> {
  const pool = getDbPool()

  const result = await pool.query<ProjectStageRow>(
    `
      SELECT id, ordem, nome
      FROM "SIGTRP_TB_PROJECT_STAGES"
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  )

  return result.rows[0] ?? null
}

/** Etapa inicial ao criar projeto (SIGTRP_TB_PROJECT_STAGES.ordem = 1). */
export async function findProjectStageByOrdem(
  ordem: number,
): Promise<ProjectStageRow | null> {
  const pool = getDbPool()

  const result = await pool.query<ProjectStageRow>(
    `
      SELECT id, ordem, nome
      FROM "SIGTRP_TB_PROJECT_STAGES"
      WHERE ordem = $1
      LIMIT 1
    `,
    [ordem],
  )

  return result.rows[0] ?? null
}
