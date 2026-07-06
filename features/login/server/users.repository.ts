import { getDbPool } from "@/lib/db"

type AuthUserRow = {
  id: string
  nome: string
  email: string
  senha: string | null
  tipo: string
  perfil_id: number
  perfil_nome: string
  roles: string
  ativo: boolean
}

export async function findUserByEmail(email: string) {
  const pool = getDbPool()

  const result = await pool.query<AuthUserRow>(
    `
      SELECT
        u.id,
        u.nome,
        u.email,
        u.senha,
        u.tipo,
        u.perfil_id,
        p.nome AS perfil_nome,
        u.roles,
        u.ativo
      FROM "SIGTRP_TB_USERS" u
      INNER JOIN "SIGTRP_TB_PROFILES" p ON p.id = u.perfil_id
      WHERE LOWER(u.email) = LOWER($1)
      LIMIT 1
    `,
    [email.trim()],
  )

  return result.rows[0] ?? null
}
