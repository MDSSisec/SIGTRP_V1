import { getDbPool } from "@/lib/db"
import {
  toCampoReview,
  type CampoReviewRow,
} from "../mappers/campo-review.mapper"
import type { CampoReview } from "../types/campo-review"
import { getSecaoReview, upsertSecaoReview } from "./secao-review.repository"

function emptyToNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? ""
  return trimmed ? trimmed : null
}

export async function listCampoReviewsByProjetoId(
  projetoId: string,
): Promise<CampoReview[]> {
  const pool = getDbPool()

  const result = await pool.query<CampoReviewRow>(
    `
      SELECT *
      FROM "SIGTRP_TB_TED_CAMPO_REVIEW"
      WHERE projeto_id = $1
        AND precisa_atencao = true
      ORDER BY secao_slug, campo_key
    `,
    [projetoId],
  )

  return result.rows.map(toCampoReview)
}

export async function listCampoReviewsBySecao(
  projetoId: string,
  secaoSlug: string,
): Promise<CampoReview[]> {
  const pool = getDbPool()

  const result = await pool.query<CampoReviewRow>(
    `
      SELECT *
      FROM "SIGTRP_TB_TED_CAMPO_REVIEW"
      WHERE projeto_id = $1
        AND secao_slug = $2
        AND precisa_atencao = true
      ORDER BY campo_key
    `,
    [projetoId, secaoSlug],
  )

  return result.rows.map(toCampoReview)
}

/**
 * Substitui as marcações da seção pelos campoKeys informados.
 * Atualiza também o status da seção (precisaAtencao / ok).
 */
export async function syncCampoReviews(
  projetoId: string,
  secaoSlug: string,
  campoKeys: string[],
  atualizadoPorId: string,
  comentario?: string | null,
): Promise<CampoReview[]> {
  const pool = getDbPool()
  const uniqueKeys = [
    ...new Set(campoKeys.map((k) => k.trim()).filter(Boolean)),
  ]
  const comentarioValue = emptyToNull(comentario)
  const currentSecao = await getSecaoReview(projetoId, secaoSlug)

  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    await client.query(
      `
        DELETE FROM "SIGTRP_TB_TED_CAMPO_REVIEW"
        WHERE projeto_id = $1 AND secao_slug = $2
      `,
      [projetoId, secaoSlug],
    )

    for (const campoKey of uniqueKeys) {
      await client.query(
        `
          INSERT INTO "SIGTRP_TB_TED_CAMPO_REVIEW" (
            projeto_id,
            secao_slug,
            campo_key,
            precisa_atencao,
            comentario,
            atualizado_por,
            atualizado_em
          )
          VALUES ($1, $2, $3, true, $4, $5, NOW())
        `,
        [projetoId, secaoSlug, campoKey, comentarioValue, atualizadoPorId],
      )
    }

    await client.query("COMMIT")
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }

  const temAtencao = uniqueKeys.length > 0

  await upsertSecaoReview(
    projetoId,
    {
      secaoSlug,
      bloqueada: temAtencao ? false : Boolean(currentSecao?.bloqueada),
      statusRevisao: temAtencao ? "precisaAtencao" : "ok",
      comentario: temAtencao ? comentarioValue : null,
    },
    atualizadoPorId,
  )

  return listCampoReviewsBySecao(projetoId, secaoSlug)
}
