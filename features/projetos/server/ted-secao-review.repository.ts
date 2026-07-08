import { getDbPool } from "@/lib/db"
import {
  toTedSecaoReview,
  type TedSecaoReview,
  type TedSecaoReviewInput,
  type TedSecaoReviewRow,
  type TedSecaoRevisaoStatus,
} from "../types/ted-secao-review"

function emptyToNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? ""
  return trimmed ? trimmed : null
}

export async function listTedSecaoReviewsByProjetoId(
  projetoId: string,
): Promise<TedSecaoReview[]> {
  const pool = getDbPool()

  const result = await pool.query<TedSecaoReviewRow>(
    `
      SELECT *
      FROM "SIGTRP_TB_TED_SECAO_REVIEW"
      WHERE projeto_id = $1
      ORDER BY secao_slug
    `,
    [projetoId],
  )

  return result.rows.map(toTedSecaoReview)
}

export async function getTedSecaoReview(
  projetoId: string,
  secaoSlug: string,
): Promise<TedSecaoReview | null> {
  const pool = getDbPool()

  const result = await pool.query<TedSecaoReviewRow>(
    `
      SELECT *
      FROM "SIGTRP_TB_TED_SECAO_REVIEW"
      WHERE projeto_id = $1 AND secao_slug = $2
      LIMIT 1
    `,
    [projetoId, secaoSlug],
  )

  const row = result.rows[0]
  return row ? toTedSecaoReview(row) : null
}

export async function upsertTedSecaoReview(
  projetoId: string,
  data: TedSecaoReviewInput,
  atualizadoPorId: string,
): Promise<TedSecaoReview> {
  const pool = getDbPool()
  const secaoSlug = data.secaoSlug.trim()

  if (!secaoSlug) {
    throw new Error("Seção inválida.")
  }

  const current = await getTedSecaoReview(projetoId, secaoSlug)

  const statusRevisao: TedSecaoRevisaoStatus =
    data.statusRevisao === "precisa_atencao"
      ? "precisa_atencao"
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
      statusRevisao,
      comentario,
      atualizadoPorId,
    ],
  )

  const review = await getTedSecaoReview(projetoId, secaoSlug)

  if (!review) {
    throw new Error("Não foi possível salvar a revisão da seção.")
  }

  return review
}

export async function isTedSecaoBloqueada(
  projetoId: string,
  secaoSlug: string,
): Promise<boolean> {
  const review = await getTedSecaoReview(projetoId, secaoSlug)
  return Boolean(review?.bloqueada)
}
