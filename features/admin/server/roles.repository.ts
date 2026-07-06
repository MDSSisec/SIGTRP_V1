import { getDbPool } from "@/lib/db"
import { toRole, type Role, type RoleRow } from "../types/role"

export async function listRoles(): Promise<Role[]> {
  const pool = getDbPool()

  const result = await pool.query<RoleRow>(
    `
      SELECT id, nome, descricao
      FROM "SIGTRP_TB_ROLES"
      ORDER BY nome ASC
    `,
  )

  return result.rows.map(toRole)
}
