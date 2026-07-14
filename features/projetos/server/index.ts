import { NextResponse, type NextRequest } from "next/server"

import { getSessionUser } from "@/features/login/server/session"
import { normalizeProjetoTipo } from "../constants/project-types"
import { canCreateProjeto, canEditProjetoInformacoes } from "../utils/projetos-permissions"
import {
  createProjeto,
  deleteProjeto,
  listProjetos,
  updateProjetoInformacoes,
} from "./projects.repository"
import { listProjectStages } from "./project-stages.repository"
import { listResponsaveisByTipo } from "./responsaveis.repository"
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
import {
  IDENTIFICACAO_BLOCO_TO_SECAO_SLUG,
  type TedSecaoRevisaoStatus,
} from "../types/ted-secao-review"

function forbiddenCreateProjetoResponse() {
  return NextResponse.json(
    { error: "Sem permissão para criar projetos." },
    { status: 403 },
  )
}

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
    if (!canCreateProjeto(sessionUser)) {
      return forbiddenCreateProjetoResponse()
    }

    try {
      const responsaveis = await listResponsaveisByTipo("interno")
      return NextResponse.json({ responsaveis })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os responsáveis internos."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (resource === "responsaveis" && rest[0] === "externos" && request.method === "GET") {
    if (!canCreateProjeto(sessionUser)) {
      return forbiddenCreateProjetoResponse()
    }

    try {
      const responsaveis = await listResponsaveisByTipo("externo")
      return NextResponse.json({ responsaveis })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os responsáveis externos."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (resource === "etapas" && rest.length === 0 && request.method === "GET") {
    try {
      const etapas = await listProjectStages()
      return NextResponse.json({ etapas })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as etapas do projeto."

      return NextResponse.json({ error: message }, { status: 500 })
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
        body.statusRevisao === "precisa_atencao"
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
      const isExterno = sessionUser.tipo.trim().toLowerCase() === "externo"
      const projetos = await listProjetos(
        isExterno ? { responsavelExternoId: sessionUser.id } : undefined,
      )
      return NextResponse.json({ projetos })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os projetos."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (rest.length === 0 && request.method === "POST") {
    if (!canCreateProjeto(sessionUser)) {
      return forbiddenCreateProjetoResponse()
    }

    try {
      const body = (await request.json()) as {
        tipoProjeto?: string
        nome?: string
        responsavelInternoId?: string
        responsavelExternoId?: string
      }

      const tipoProjeto = normalizeProjetoTipo(body.tipoProjeto ?? "")
      const nome = body.nome?.trim() ?? ""
      const responsavelInternoId = body.responsavelInternoId?.trim() ?? ""
      const responsavelExternoId = body.responsavelExternoId?.trim() ?? ""

      if (
        !tipoProjeto ||
        !nome ||
        !responsavelInternoId ||
        !responsavelExternoId
      ) {
        return NextResponse.json(
          { error: "Dados do projeto inválidos." },
          { status: 400 },
        )
      }

      const projeto = await createProjeto({
        tipoProjeto,
        nome,
        responsavelInternoId,
        responsavelExternoId,
        criadoPorId: sessionUser.id,
      })

      return NextResponse.json({ projeto }, { status: 201 })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível criar o projeto."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (resource && rest.length === 0 && request.method === "PATCH") {
    try {
      const projetoId = resource.trim()

      if (!projetoId) {
        return NextResponse.json(
          { error: "ID do projeto inválido." },
          { status: 400 },
        )
      }

      const body = (await request.json()) as {
        etapaId?: string
        responsavelInternoId?: string
        responsavelExternoId?: string
      }

      const responsavelInternoId = body.responsavelInternoId?.trim() ?? ""
      const responsavelExternoId = body.responsavelExternoId?.trim() ?? ""
      const canEditInfo = canEditProjetoInformacoes(sessionUser)

      const etapaId = canEditInfo ? body.etapaId?.trim() ?? "" : undefined

      if (!responsavelInternoId || !responsavelExternoId) {
        return NextResponse.json(
          { error: "Responsáveis interno e externo são obrigatórios." },
          { status: 400 },
        )
      }

      if (canEditInfo && !etapaId) {
        return NextResponse.json(
          { error: "Status do projeto é obrigatório." },
          { status: 400 },
        )
      }

      const projeto = await updateProjetoInformacoes(
        projetoId,
        {
          etapaId: etapaId || undefined,
          responsavelInternoId,
          responsavelExternoId,
        },
        {
          alteradoPorId: sessionUser.id,
          includeInfoFields: canEditInfo,
        },
      )

      return NextResponse.json({ projeto })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o projeto."

      const status = message === "Projeto não encontrado." ? 404 : 500

      return NextResponse.json({ error: message }, { status })
    }
  }

  if (resource && rest.length === 0 && request.method === "DELETE") {
    if (!canCreateProjeto(sessionUser)) {
      return NextResponse.json(
        { error: "Sem permissão para excluir projetos." },
        { status: 403 },
      )
    }

    try {
      const projetoId = resource.trim()

      if (!projetoId) {
        return NextResponse.json(
          { error: "ID do projeto inválido." },
          { status: 400 },
        )
      }

      await deleteProjeto(projetoId)
      return NextResponse.json({ success: true })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o projeto."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  return NextResponse.json({ error: "Rota não encontrada" }, { status: 404 })
}
