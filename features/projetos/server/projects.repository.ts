import { randomUUID } from "node:crypto"

import { getDbPool } from "@/lib/db"
import { toProjeto, type Projeto, type ProjetoRow } from "../types/projeto"

export type CreateProjetoData = {
  nome: string
  valorTotal: number
  responsavelInternoId: string
  responsavelExternoId: string
  criadoPorId: string
}

const PROJECT_SELECT = `
  SELECT
    p.id,
    p.nome,
    p.valor_total,
    p.responsavel_interno_id,
    p.responsavel_externo_id,
    p.criado_por_id,
    p.criado_em,
    p.atualizado_em,
    ui.nome AS responsavel_interno_nome,
    ue.nome AS responsavel_externo_nome,
    uc.nome AS criado_por_nome
  FROM "SIGTRP_TB_PROJECTS" p
  LEFT JOIN "SIGTRP_TB_USERS" ui ON ui.id = p.responsavel_interno_id
  LEFT JOIN "SIGTRP_TB_USERS" ue ON ue.id = p.responsavel_externo_id
  LEFT JOIN "SIGTRP_TB_USERS" uc ON uc.id = p.criado_por_id
`

export async function listProjetos(): Promise<Projeto[]> {
  const pool = getDbPool()

  const result = await pool.query<ProjetoRow>(
    `
      ${PROJECT_SELECT}
      ORDER BY p.criado_em DESC
    `,
  )

  return result.rows.map(toProjeto)
}

export async function createProjeto(data: CreateProjetoData): Promise<Projeto> {
  const pool = getDbPool()
  const id = randomUUID()

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_PROJECTS" (
        id,
        nome,
        valor_total,
        responsavel_interno_id,
        responsavel_externo_id,
        criado_por_id,
        criado_em,
        atualizado_em
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
    `,
    [
      id,
      data.nome,
      data.valorTotal,
      data.responsavelInternoId,
      data.responsavelExternoId,
      data.criadoPorId,
    ],
  )

  const result = await pool.query<ProjetoRow>(
    `
      ${PROJECT_SELECT}
      WHERE p.id = $1
      LIMIT 1
    `,
    [id],
  )

  const row = result.rows[0]

  if (!row) {
    throw new Error("Não foi possível criar o projeto.")
  }

  return toProjeto(row)
}
