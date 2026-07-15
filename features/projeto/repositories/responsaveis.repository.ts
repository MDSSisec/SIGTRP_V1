import { getDbPool } from "@/lib/db"
import type { ResponsavelOption } from "@/features/projeto/types/projeto"

type ResponsavelRow = {
  id: string
  nome: string
  email: string
}

export async function listResponsaveisByTipo(
  tipo: "interno" | "externo",
): Promise<ResponsavelOption[]> {
  const pool = getDbPool()

  const result = await pool.query<ResponsavelRow>(
    `
      SELECT id, nome, email
      FROM "SIGTRP_TB_USERS"
      WHERE LOWER(tipo) = $1
        AND ativo = true
      ORDER BY nome ASC
    `,
    [tipo],
  )

  return result.rows
}
