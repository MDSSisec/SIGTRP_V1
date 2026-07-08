import { parseApiResponse } from "@/lib/parse-api-response"
import type { TedCampoReview } from "../types/ted-campo-review"
import type {
  TedSecaoReview,
  TedSecaoReviewInput,
} from "../types/ted-secao-review"

type TedSecaoReviewsResponse = {
  reviews: TedSecaoReview[]
  campos: TedCampoReview[]
}

type TedSecaoReviewResponse = {
  review: TedSecaoReview
}

type TedCamposReviewResponse = {
  campos: TedCampoReview[]
  reviews: TedSecaoReview[]
}

export async function fetchTedSecaoReviews(projetoId: string) {
  const response = await fetch(`/api/projetos/${projetoId}/ted/secoes-review`)
  return parseApiResponse<TedSecaoReviewsResponse>(response)
}

export async function saveTedSecaoReview(
  projetoId: string,
  data: TedSecaoReviewInput,
) {
  const response = await fetch(`/api/projetos/${projetoId}/ted/secoes-review`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await parseApiResponse<TedSecaoReviewResponse>(response)
  return result.review
}

export async function syncTedCampoReviews(
  projetoId: string,
  data: {
    secaoSlug: string
    campoKeys: string[]
    comentario?: string | null
  },
) {
  const response = await fetch(`/api/projetos/${projetoId}/ted/campos-review`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return parseApiResponse<TedCamposReviewResponse>(response)
}
