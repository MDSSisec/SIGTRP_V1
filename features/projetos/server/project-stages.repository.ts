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
