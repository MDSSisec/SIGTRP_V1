import { parseApiResponse } from "@/lib/parse-api-response"
import type { CampoReview } from "@/features/projeto/types/campo-review"
import type {
  SecaoReview,
  SecaoReviewInput,
} from "@/features/projeto/types/secao-review"

type SecaoReviewsResponse = {
  reviews: SecaoReview[]
  campos: CampoReview[]
}

type SecaoReviewResponse = {
  review: SecaoReview
}

type CamposReviewResponse = {
  campos: CampoReview[]
  reviews: SecaoReview[]
}

export async function fetchSecaoReviews(projetoId: string) {
  const response = await fetch(`/api/projetos/${projetoId}/ted/secoes-review`)
  return parseApiResponse<SecaoReviewsResponse>(response)
}

export async function saveSecaoReview(
  projetoId: string,
  data: SecaoReviewInput,
) {
  const response = await fetch(`/api/projetos/${projetoId}/ted/secoes-review`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await parseApiResponse<SecaoReviewResponse>(response)
  return result.review
}

export async function syncCampoReviews(
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

  return parseApiResponse<CamposReviewResponse>(response)
}
