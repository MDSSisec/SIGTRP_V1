import { NextResponse, type NextRequest } from "next/server"

import { getSessionUser } from "@/features/login/server/session"
import { canEditProjetoInformacoes } from "../domain/projeto.permissions"
import {
  createProjetoForUser,
  deleteProjetoForUser,
  listEtapasForUser,
  listProjetosForUser,
  listResponsaveisExternosForUser,
  listResponsaveisInternosForUser,
  toHttpErrorResponse,
  updateProjetoInformacoesForUser,
} from "./projeto.service"
import {
  getTedIdentificacaoByProjetoId,
  upsertTedIdentificacaoProjeto,
  upsertTedIdentificacaoProponente,
  upsertTedIdentificacaoRepresentante,
  upsertTedIdentificacaoResponsavelTecnico,
} from "./ted-identificacao.repository"
import {
  isTedSecaoBloqueada,
  listTedSecaoReviewsByProjetoId,
  upsertTedSecaoReview,
} from "./ted-secao-review.repository"
import {
  listTedCampoReviewsByProjetoId,
  syncTedCampoReviews,
} from "./ted-campo-review.repository"
import { IDENTIFICACAO_BLOCO_TO_SECAO_SLUG } from "../constants/secao-review"
import type { TedSecaoRevisaoStatus } from "../types/ted-secao-review"

export async function handleProjetosRequest(
  request: NextRequest,
  path: string[],
) {
  const sessionUser = await getSessionUser()

  if (!sessionUser) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  const [resource, ...rest] = path

  if (resource === "responsaveis" && rest[0] === "internos" && request.method === "GET") {
    try {
      const responsaveis = await listResponsaveisInternosForUser()
      return NextResponse.json({ responsaveis })
    } catch (error) {
      const mapped = toHttpErrorResponse(error)
      return NextResponse.json(mapped.body, { status: mapped.status })
    }
  }

  if (resource === "responsaveis" && rest[0] === "externos" && request.method === "GET") {
    try {
      const responsaveis = await listResponsaveisExternosForUser()
      return NextResponse.json({ responsaveis })
    } catch (error) {
      const mapped = toHttpErrorResponse(error)
      return NextResponse.json(mapped.body, { status: mapped.status })
    }
  }

  if (resource === "etapas" && rest.length === 0 && request.method === "GET") {
    try {
      const etapas = await listEtapasForUser()
      return NextResponse.json({ etapas })
    } catch (error) {
      const mapped = toHttpErrorResponse(error)
      return NextResponse.json(mapped.body, { status: mapped.status })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "identificacao" &&
    rest.length === 2 &&
    request.method === "GET"
  ) {
    try {
      const projetoId = resource.trim()

      if (!projetoId) {
        return NextResponse.json(
          { error: "ID do projeto inválido." },
          { status: 400 },
        )
      }

      const identificacao = await getTedIdentificacaoByProjetoId(projetoId)
      return NextResponse.json({ identificacao })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar a identificação do projeto."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "secoes-review" &&
    rest.length === 2 &&
    request.method === "GET"
  ) {
    try {
      const projetoId = resource.trim()

      if (!projetoId) {
        return NextResponse.json(
          { error: "ID do projeto inválido." },
          { status: 400 },
        )
      }

      const reviews = await listTedSecaoReviewsByProjetoId(projetoId)
      const campos = await listTedCampoReviewsByProjetoId(projetoId)
      return NextResponse.json({ reviews, campos })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as revisões das seções."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "secoes-review" &&
    rest.length === 2 &&
    request.method === "PATCH"
  ) {
    try {
      if (!canEditProjetoInformacoes(sessionUser)) {
        return NextResponse.json(
          {
            error:
              "Apenas administradores ou gestores internos do MDS podem bloquear ou marcar atenção nas seções.",
          },
          { status: 403 },
        )
      }

      const projetoId = resource.trim()

      if (!projetoId) {
        return NextResponse.json(
          { error: "ID do projeto inválido." },
          { status: 400 },
        )
      }

      const body = (await request.json()) as {
        secaoSlug?: string
        bloqueada?: boolean
        statusRevisao?: TedSecaoRevisaoStatus
        comentario?: string | null
      }

      const secaoSlug = body.secaoSlug?.trim() ?? ""

      if (!secaoSlug) {
        return NextResponse.json(
          { error: "Informe a seção (secaoSlug)." },
          { status: 400 },
        )
      }

      // Se marcar atenção via seção, desbloqueia automaticamente
      const bloqueada =
        body.statusRevisao === "precisaAtencao"
          ? false
          : Boolean(body.bloqueada)

      const review = await upsertTedSecaoReview(
        projetoId,
        {
          secaoSlug,
          bloqueada,
          statusRevisao: body.statusRevisao ?? "ok",
          comentario: body.comentario,
        },
        sessionUser.id,
      )

      return NextResponse.json({ review })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a revisão da seção."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "campos-review" &&
    rest.length === 2 &&
    request.method === "PATCH"
  ) {
    try {
      if (!canEditProjetoInformacoes(sessionUser)) {
        return NextResponse.json(
          {
            error:
              "Apenas administradores ou gestores internos do MDS podem marcar campos.",
          },
          { status: 403 },
        )
      }

      const projetoId = resource.trim()

      if (!projetoId) {
        return NextResponse.json(
          { error: "ID do projeto inválido." },
          { status: 400 },
        )
      }

      const body = (await request.json()) as {
        secaoSlug?: string
        campoKeys?: string[]
        comentario?: string | null
      }

      const secaoSlug = body.secaoSlug?.trim() ?? ""
      const campoKeys = Array.isArray(body.campoKeys) ? body.campoKeys : []

      if (!secaoSlug) {
        return NextResponse.json(
          { error: "Informe a seção (secaoSlug)." },
          { status: 400 },
        )
      }

      if (campoKeys.length > 0 && !body.comentario?.trim()) {
        return NextResponse.json(
          {
            error:
              "Informe um comentário ao marcar campos como precisa de atenção.",
          },
          { status: 400 },
        )
      }

      const campos = await syncTedCampoReviews(
        projetoId,
        secaoSlug,
        campoKeys,
        sessionUser.id,
        body.comentario,
      )
      const reviews = await listTedSecaoReviewsByProjetoId(projetoId)

      return NextResponse.json({ campos, reviews })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar as marcações dos campos."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "identificacao" &&
    rest.length === 3 &&
    request.method === "PATCH"
  ) {
    try {
      const projetoId = resource.trim()

      if (!projetoId) {
        return NextResponse.json(
          { error: "ID do projeto inválido." },
          { status: 400 },
        )
      }

      const bloco = rest[2]
      const secaoSlug = IDENTIFICACAO_BLOCO_TO_SECAO_SLUG[bloco]

      if (!secaoSlug) {
        return NextResponse.json(
          { error: "Bloco de identificação inválido." },
          { status: 404 },
        )
      }

      const canManageReview = canEditProjetoInformacoes(sessionUser)
      const bloqueada = await isTedSecaoBloqueada(projetoId, secaoSlug)

      if (bloqueada && !canManageReview) {
        return NextResponse.json(
          {
            error:
              "Esta seção foi bloqueada pelo gestor interno do MDS e não pode ser alterada.",
          },
          { status: 403 },
        )
      }

      const body = await request.json()

      let identificacao

      switch (bloco) {
        case "projeto":
          identificacao = await upsertTedIdentificacaoProjeto(projetoId, body)
          break
        case "proponente":
          identificacao = await upsertTedIdentificacaoProponente(projetoId, body)
          break
        case "representante":
          identificacao = await upsertTedIdentificacaoRepresentante(projetoId, body)
          break
        case "responsavel-tecnico":
          identificacao = await upsertTedIdentificacaoResponsavelTecnico(
            projetoId,
            body,
          )
          break
        default:
          return NextResponse.json(
            { error: "Bloco de identificação inválido." },
            { status: 404 },
          )
      }

      return NextResponse.json({ identificacao })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a identificação do projeto."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (rest.length === 0 && request.method === "GET") {
    try {
      const projetos = await listProjetosForUser(sessionUser)
      return NextResponse.json({ projetos })
    } catch (error) {
      const mapped = toHttpErrorResponse(error)
      return NextResponse.json(mapped.body, { status: mapped.status })
    }
  }

  if (rest.length === 0 && request.method === "POST") {
    try {
      const body = await request.json()
      const projeto = await createProjetoForUser(sessionUser, body)
      return NextResponse.json({ projeto }, { status: 201 })
    } catch (error) {
      const mapped = toHttpErrorResponse(error)
      return NextResponse.json(mapped.body, { status: mapped.status })
    }
  }

  if (resource && rest.length === 0 && request.method === "PATCH") {
    try {
      const body = await request.json()
      const projeto = await updateProjetoInformacoesForUser(
        sessionUser,
        resource,
        body,
      )
      return NextResponse.json({ projeto })
    } catch (error) {
      const mapped = toHttpErrorResponse(error)
      return NextResponse.json(mapped.body, { status: mapped.status })
    }
  }

  if (resource && rest.length === 0 && request.method === "DELETE") {
    try {
      await deleteProjetoForUser(sessionUser, resource)
      return NextResponse.json({ success: true })
    } catch (error) {
      const mapped = toHttpErrorResponse(error)
      return NextResponse.json(mapped.body, { status: mapped.status })
    }
  }

  return NextResponse.json({ error: "Rota não encontrada" }, { status: 404 })
}
