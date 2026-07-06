import { randomUUID } from "node:crypto"

import { getDbPool } from "@/lib/db"
import { toUsuario, type Usuario, type UsuarioRow } from "../types/usuario"

export type CreateUsuarioData = {
  nome: string
  email: string
  tipo: string
  perfilId: number
  roles: number[]
  senha: string
  ativo: boolean
}

export async function listUsuarios(): Promise<Usuario[]> {
  const pool = getDbPool()

  const result = await pool.query<UsuarioRow>(
    `
      SELECT
        id,
        nome,
        email,
        tipo,
        perfil_id,
        senha,
        roles,
        ativo,
        criado_em,
        atualizado_em
      FROM "SIGTRP_TB_USERS"
      ORDER BY nome ASC
    `,
  )

  return result.rows.map(toUsuario)
}

export async function createUsuario(data: CreateUsuarioData): Promise<Usuario> {
  const pool = getDbPool()

  const result = await pool.query<UsuarioRow>(
    `
      INSERT INTO "SIGTRP_TB_USERS" (
        id,
        nome,
        email,
        tipo,
        perfil_id,
        senha,
        roles,
        ativo,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
      RETURNING
        id,
        nome,
        email,
        tipo,
        perfil_id,
        senha,
        roles,
        ativo,
        criado_em,
        atualizado_em
    `,
    [
      randomUUID(),
      data.nome,
      data.email,
      data.tipo,
      data.perfilId,
      data.senha,
      JSON.stringify(data.roles),
      data.ativo,
    ],
  )

  const row = result.rows[0]

  if (!row) {
    throw new Error("Não foi possível criar o usuário.")
  }

  return toUsuario(row)
}
