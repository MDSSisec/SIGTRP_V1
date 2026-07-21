import { getDbPool } from "@/lib/db"
import {
  toSecaoReview,
  toSecaoRevisaoStatusDb,
  type SecaoReviewRow,
} from "../mappers/secao-review.mapper"
import type {
  SecaoReview,
  SecaoReviewInput,
  SecaoRevisaoStatus,
} from "../types/secao-review"

function emptyToNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? ""
  return trimmed ? trimmed : null
}

export async function listSecaoReviewsByProjetoId(
  projetoId: string,
): Promise<SecaoReview[]> {
  const pool = getDbPool()

  const result = await pool.query<SecaoReviewRow>(
    `
      SELECT *
      FROM "SIGTRP_TB_TED_SECAO_REVIEW"
      WHERE projeto_id = $1
      ORDER BY secao_slug
    `,
    [projetoId],
  )

  return result.rows.map(toSecaoReview)
}

export async function getSecaoReview(
  projetoId: string,
  secaoSlug: string,
): Promise<SecaoReview | null> {
  const pool = getDbPool()

  const result = await pool.query<SecaoReviewRow>(
    `
      SELECT *
      FROM "SIGTRP_TB_TED_SECAO_REVIEW"
      WHERE projeto_id = $1 AND secao_slug = $2
      LIMIT 1
    `,
    [projetoId, secaoSlug],
  )

  const row = result.rows[0]
  return row ? toSecaoReview(row) : null
}

export async function upsertSecaoReview(
  projetoId: string,
  data: SecaoReviewInput,
  atualizadoPorId: string,
): Promise<SecaoReview> {
  const pool = getDbPool()
  const secaoSlug = data.secaoSlug.trim()

  if (!secaoSlug) {
    throw new Error("Seção inválida.")
  }

  const current = await getSecaoReview(projetoId, secaoSlug)

  const statusRevisao: SecaoRevisaoStatus =
    data.statusRevisao === "precisaAtencao"
      ? "precisaAtencao"
      : data.statusRevisao === "ok"
        ? "ok"
        : (current?.statusRevisao ?? "ok")

  const bloqueada =
    typeof data.bloqueada === "boolean"
      ? data.bloqueada
      : Boolean(current?.bloqueada)

  const comentario =
    data.comentario !== undefined
      ? emptyToNull(data.comentario)
      : (current?.comentario ?? null)

  await pool.query(
    `
      INSERT INTO "SIGTRP_TB_TED_SECAO_REVIEW" (
        projeto_id,
        secao_slug,
        bloqueada,
        status_revisao,
        comentario,
        atualizado_por,
        atualizado_em
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      ON CONFLICT (projeto_id, secao_slug) DO UPDATE SET
        bloqueada = EXCLUDED.bloqueada,
        status_revisao = EXCLUDED.status_revisao,
        comentario = EXCLUDED.comentario,
        atualizado_por = EXCLUDED.atualizado_por,
        atualizado_em = NOW()
    `,
    [
      projetoId,
      secaoSlug,
      bloqueada,
      toSecaoRevisaoStatusDb(statusRevisao),
      comentario,
      atualizadoPorId,
    ],
  )

  const review = await getSecaoReview(projetoId, secaoSlug)

  if (!review) {
    throw new Error("Não foi possível salvar a revisão da seção.")
  }

  return review
}

export async function isSecaoBloqueada(
  projetoId: string,
  secaoSlug: string,
): Promise<boolean> {
  const review = await getSecaoReview(projetoId, secaoSlug)
  if (!review?.bloqueada) return false

  // Com "precisa atenção", o proponente ainda pode corrigir os campos marcados.
  if (review.statusRevisao === "precisaAtencao") return false

  return true
}
