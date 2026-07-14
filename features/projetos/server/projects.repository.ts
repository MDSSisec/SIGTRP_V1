import { randomUUID } from "node:crypto"

import { getDbPool } from "@/lib/db"
import type { ProjetoTipo } from "../constants/project-types"
import { toProjeto, type Projeto, type ProjetoRow } from "../types/projeto"

export type CreateProjetoData = {
  tipoProjeto: ProjetoTipo
  nome: string
  responsavelInternoId: string
  responsavelExternoId: string
  criadoPorId: string
}

const PROJECT_SELECT = `
  SELECT
    p.id,
    p.tipo_projeto,
    p.nome,
    p.responsavel_interno_id,
    p.responsavel_externo_id,
    p.criado_por_id,
    p.etapa_id,
    p.criado_em,
    p.atualizado_em,
    ui.nome AS responsavel_interno_nome,
    ue.nome AS responsavel_externo_nome,
    uc.nome AS criado_por_nome,
    et.nome AS etapa_nome,
    et.ordem AS etapa_ordem
  FROM "SIGTRP_TB_PROJECTS" p
  LEFT JOIN "SIGTRP_TB_USERS" ui ON ui.id = p.responsavel_interno_id
  LEFT JOIN "SIGTRP_TB_USERS" ue ON ue.id = p.responsavel_externo_id
  LEFT JOIN "SIGTRP_TB_USERS" uc ON uc.id = p.criado_por_id
  LEFT JOIN "SIGTRP_TB_PROJECT_STAGES" et ON et.id = p.etapa_id
`

export async function listProjetos(
  options?: { responsavelExternoId?: string },
): Promise<Projeto[]> {
  const pool = getDbPool()
  const responsavelExternoId = options?.responsavelExternoId?.trim()

  const result = await pool.query<ProjetoRow>(
    `
      ${PROJECT_SELECT}
      ${responsavelExternoId ? "WHERE p.responsavel_externo_id = $1" : ""}
      ORDER BY p.criado_em DESC
    `,
    responsavelExternoId ? [responsavelExternoId] : [],
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
        tipo_projeto,
        nome,
        responsavel_interno_id,
        responsavel_externo_id,
        criado_por_id,
        etapa_id,
        criado_em,
        atualizado_em
      )
      VALUES (
        $1, $2, $3, $4, $5, $6,
        (SELECT id FROM "SIGTRP_TB_PROJECT_STAGES" ORDER BY ordem ASC LIMIT 1),
        NOW(), NOW()
      )
    `,
    [
      id,
      data.tipoProjeto,
      data.nome,
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

export type UpdateProjetoInformacoesData = {
  etapaId?: string
  responsavelInternoId: string
  responsavelExternoId: string
}

export async function getProjetoById(id: string): Promise<Projeto | null> {
  const pool = getDbPool()

  const result = await pool.query<ProjetoRow>(
    `
      ${PROJECT_SELECT}
      WHERE p.id = $1
      LIMIT 1
    `,
    [id],
  )

  const row = result.rows[0]
  return row ? toProjeto(row) : null
}

export async function updateProjetoInformacoes(
  id: string,
  data: UpdateProjetoInformacoesData,
  options: { alteradoPorId: string; includeInfoFields: boolean },
): Promise<Projeto> {
  const pool = getDbPool()
  const current = await getProjetoById(id)

  if (!current) {
    throw new Error("Projeto não encontrado.")
  }

  const etapaId =
    options.includeInfoFields && data.etapaId
      ? data.etapaId
      : current.etapaId

  if (!etapaId) {
    throw new Error("Etapa do projeto inválida.")
  }

  const etapaChanged =
    options.includeInfoFields &&
    Boolean(data.etapaId) &&
    data.etapaId !== current.etapaId

  await pool.query(
    `
      UPDATE "SIGTRP_TB_PROJECTS"
      SET
        etapa_id = $2,
        responsavel_interno_id = $3,
        responsavel_externo_id = $4,
        atualizado_em = NOW()
      WHERE id = $1
    `,
    [
      id,
      etapaId,
      data.responsavelInternoId,
      data.responsavelExternoId,
    ],
  )

  if (etapaChanged) {
    await pool.query(
      `
        INSERT INTO "SIGTRP_TB_PROJECT_STAGE_HISTORY" (
          projeto_id,
          etapa_id,
          alterado_por_id
        )
        VALUES ($1, $2, $3)
      `,
      [id, etapaId, options.alteradoPorId],
    )
  }

  const updated = await getProjetoById(id)

  if (!updated) {
    throw new Error("Não foi possível atualizar o projeto.")
  }

  return updated
}

export async function deleteProjeto(id: string): Promise<void> {
  const pool = getDbPool()

  const result = await pool.query(
    `
      DELETE FROM "SIGTRP_TB_PROJECTS"
      WHERE id = $1
    `,
    [id],
  )

  if (result.rowCount === 0) {
    throw new Error("Projeto não encontrado.")
  }
}
