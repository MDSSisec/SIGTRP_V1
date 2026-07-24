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

export type UpdateUsuarioData = {
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

export async function getUsuarioById(id: string): Promise<Usuario | null> {
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
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  )

  const row = result.rows[0]
  return row ? toUsuario(row) : null
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

export async function updateUsuario(
  id: string,
  data: UpdateUsuarioData,
): Promise<Usuario> {
  const pool = getDbPool()

  const result = await pool.query<UsuarioRow>(
    `
      UPDATE "SIGTRP_TB_USERS"
      SET
        nome = $2,
        email = $3,
        tipo = $4,
        perfil_id = $5,
        senha = $6,
        roles = $7,
        ativo = $8,
        atualizado_em = NOW()
      WHERE id = $1
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
      id,
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
    throw new Error("Usuário não encontrado.")
  }

  return toUsuario(row)
}

export async function deleteUsuario(id: string): Promise<void> {
  const pool = getDbPool()

  const result = await pool.query(
    `
      DELETE FROM "SIGTRP_TB_USERS"
      WHERE id = $1
    `,
    [id],
  )

  if (result.rowCount === 0) {
    throw new Error("Usuário não encontrado.")
  }
}
