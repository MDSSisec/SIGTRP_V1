import { getDbPool } from "@/lib/db"
import { toProfile, type Profile, type ProfileRow } from "../types/profile"

export async function listProfiles(): Promise<Profile[]> {
  const pool = getDbPool()

  const result = await pool.query<ProfileRow>(
    `
      SELECT id, nome, descricao
      FROM "SIGTRP_TB_PROFILES"
      ORDER BY nome ASC
    `,
  )

  return result.rows.map(toProfile)
}
