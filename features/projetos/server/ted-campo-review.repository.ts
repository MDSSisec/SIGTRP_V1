import { getDbPool } from "@/lib/db"
import {
  toTedCampoReview,
  type TedCampoReviewRow,
} from "../mappers/ted-campo-review.mapper"
import type { TedCampoReview } from "../types/ted-campo-review"
import {
  getTedSecaoReview,
  upsertTedSecaoReview,
} from "./ted-secao-review.repository"

function emptyToNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? ""
  return trimmed ? trimmed : null
}

export async function listTedCampoReviewsByProjetoId(
  projetoId: string,
): Promise<TedCampoReview[]> {
  const pool = getDbPool()

  const result = await pool.query<TedCampoReviewRow>(
    `
      SELECT *
      FROM "SIGTRP_TB_TED_CAMPO_REVIEW"
      WHERE projeto_id = $1
        AND precisa_atencao = true
      ORDER BY secao_slug, campo_key
    `,
    [projetoId],
  )

  return result.rows.map(toTedCampoReview)
}

export async function listTedCampoReviewsBySecao(
  projetoId: string,
  secaoSlug: string,
): Promise<TedCampoReview[]> {
  const pool = getDbPool()

  const result = await pool.query<TedCampoReviewRow>(
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

  return result.rows.map(toTedCampoReview)
}

/**
 * Substitui as marcações da seção pelos campoKeys informados.
 * Atualiza também o status da seção (precisaAtencao / ok).
 */
export async function syncTedCampoReviews(
  projetoId: string,
  secaoSlug: string,
  campoKeys: string[],
  atualizadoPorId: string,
  comentario?: string | null,
): Promise<TedCampoReview[]> {
  const pool = getDbPool()
  const uniqueKeys = [
    ...new Set(campoKeys.map((k) => k.trim()).filter(Boolean)),
  ]
  const comentarioValue = emptyToNull(comentario)
  const currentSecao = await getTedSecaoReview(projetoId, secaoSlug)

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

  await upsertTedSecaoReview(
    projetoId,
    {
      secaoSlug,
      bloqueada: temAtencao ? false : Boolean(currentSecao?.bloqueada),
      statusRevisao: temAtencao ? "precisaAtencao" : "ok",
      comentario: temAtencao ? comentarioValue : null,
    },
    atualizadoPorId,
  )

  return listTedCampoReviewsBySecao(projetoId, secaoSlug)
}
