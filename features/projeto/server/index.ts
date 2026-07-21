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
  getProjectSession01IdentificacaoByProjetoId,
  upsertProjectSession01IdentificacaoProjeto,
  upsertProjectSession01IdentificacaoProponente,
  upsertProjectSession01IdentificacaoRepresentante,
  upsertProjectSession01IdentificacaoResponsavelTecnico,
} from "./project-session-01-identificacao.repository"
import {
  getProjectSession02DescriptionByProjetoId,
  upsertProjectSession02DescriptionJustificativa,
  upsertProjectSession02DescriptionMetodologia,
} from "./project-session-02-description.repository"
import {
  getProjectSession03ParticipantsByProjetoId,
  upsertProjectSession03Historico,
  upsertProjectSession03BaseTerritorial,
  upsertProjectSession03PublicoBeneficiario,
  upsertProjectSession03Povos,
  upsertProjectSession03Perfil,
  upsertProjectSession03Servicos,
} from "./project-session-03-participants.repository"
import {
  getProjectSession04CharacterizationByProjetoId,
  upsertProjectSession04OutrasInformacoes,
} from "./project-session-04-characterization.repository"
import {
  getProjectSession05FinancialByProjetoId,
  upsertProjectSession05ValorTotal,
  upsertProjectSession05CronogramaDesembolso,
  upsertProjectSession05ResumoPlanoAplicacao,
} from "./project-session-05-financial.repository"
import {
  isSecaoBloqueada,
  listSecaoReviewsByProjetoId,
  upsertSecaoReview,
} from "./secao-review.repository"
import {
  listCampoReviewsByProjetoId,
  syncCampoReviews,
} from "./campo-review.repository"
import {
  DESCRICAO_BLOCO_TO_SECAO_SLUG,
  IDENTIFICACAO_BLOCO_TO_SECAO_SLUG,
  PARTICIPANTES_BLOCO_TO_SECAO_SLUG,
  CARACTERIZACAO_BLOCO_TO_SECAO_SLUG,
  DADOS_FINANCEIROS_BLOCO_TO_SECAO_SLUG,
} from "../constants/secao-review"
import type { SecaoRevisaoStatus } from "../types/secao-review"

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

      const identificacao = await getProjectSession01IdentificacaoByProjetoId(projetoId)
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
    rest[1] === "descricao" &&
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

      const descricao = await getProjectSession02DescriptionByProjetoId(projetoId)
      return NextResponse.json({ descricao })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar a descrição do projeto."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "participantes" &&
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

      const participantes =
        await getProjectSession03ParticipantsByProjetoId(projetoId)
      return NextResponse.json({ participantes })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os participantes do projeto."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "caracterizacao" &&
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

      const caracterizacao =
        await getProjectSession04CharacterizationByProjetoId(projetoId)
      return NextResponse.json({ caracterizacao })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar a caracterização do projeto."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "dados-financeiros" &&
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

      const financeiro =
        await getProjectSession05FinancialByProjetoId(projetoId)
      return NextResponse.json({ financeiro })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os dados financeiros do projeto."

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

      const reviews = await listSecaoReviewsByProjetoId(projetoId)
      const campos = await listCampoReviewsByProjetoId(projetoId)
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
        statusRevisao?: SecaoRevisaoStatus
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

      const review = await upsertSecaoReview(
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

      const campos = await syncCampoReviews(
        projetoId,
        secaoSlug,
        campoKeys,
        sessionUser.id,
        body.comentario,
      )
      const reviews = await listSecaoReviewsByProjetoId(projetoId)

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
      const bloqueada = await isSecaoBloqueada(projetoId, secaoSlug)

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
          identificacao = await upsertProjectSession01IdentificacaoProjeto(projetoId, body)
          break
        case "proponente":
          identificacao = await upsertProjectSession01IdentificacaoProponente(projetoId, body)
          break
        case "representante":
          identificacao = await upsertProjectSession01IdentificacaoRepresentante(projetoId, body)
          break
        case "responsavel-tecnico":
          identificacao = await upsertProjectSession01IdentificacaoResponsavelTecnico(
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

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "descricao" &&
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
      const secaoSlug = DESCRICAO_BLOCO_TO_SECAO_SLUG[bloco]

      if (!secaoSlug) {
        return NextResponse.json(
          { error: "Bloco de descrição inválido." },
          { status: 404 },
        )
      }

      const canManageReview = canEditProjetoInformacoes(sessionUser)
      const bloqueada = await isSecaoBloqueada(projetoId, secaoSlug)

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

      let descricao

      switch (bloco) {
        case "justificativa":
          descricao = await upsertProjectSession02DescriptionJustificativa(
            projetoId,
            body,
          )
          break
        case "metodologia":
          descricao = await upsertProjectSession02DescriptionMetodologia(
            projetoId,
            body,
          )
          break
        default:
          return NextResponse.json(
            { error: "Bloco de descrição inválido." },
            { status: 404 },
          )
      }

      return NextResponse.json({ descricao })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a descrição do projeto."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "participantes" &&
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
      const secaoSlug = PARTICIPANTES_BLOCO_TO_SECAO_SLUG[bloco]

      if (!secaoSlug) {
        return NextResponse.json(
          { error: "Bloco de participantes inválido." },
          { status: 404 },
        )
      }

      const canManageReview = canEditProjetoInformacoes(sessionUser)
      const bloqueada = await isSecaoBloqueada(projetoId, secaoSlug)

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

      let participantes

      switch (bloco) {
        case "historico":
          participantes = await upsertProjectSession03Historico(projetoId, body)
          break
        case "base-territorial":
          participantes = await upsertProjectSession03BaseTerritorial(
            projetoId,
            body,
          )
          break
        case "publico-beneficiario":
          participantes = await upsertProjectSession03PublicoBeneficiario(
            projetoId,
            body,
          )
          break
        case "povos":
          participantes = await upsertProjectSession03Povos(projetoId, body)
          break
        case "perfil":
          participantes = await upsertProjectSession03Perfil(projetoId, body)
          break
        case "servicos":
          participantes = await upsertProjectSession03Servicos(projetoId, body)
          break
        default:
          return NextResponse.json(
            { error: "Bloco de participantes inválido." },
            { status: 404 },
          )
      }

      return NextResponse.json({ participantes })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar os participantes do projeto."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "caracterizacao" &&
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
      const secaoSlug = CARACTERIZACAO_BLOCO_TO_SECAO_SLUG[bloco]

      if (!secaoSlug) {
        return NextResponse.json(
          { error: "Bloco de caracterização inválido." },
          { status: 404 },
        )
      }

      const canManageReview = canEditProjetoInformacoes(sessionUser)
      const bloqueada = await isSecaoBloqueada(projetoId, secaoSlug)

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

      let caracterizacao

      switch (bloco) {
        case "outras-informacoes":
          caracterizacao = await upsertProjectSession04OutrasInformacoes(
            projetoId,
            body,
          )
          break
        default:
          return NextResponse.json(
            { error: "Bloco de caracterização inválido." },
            { status: 404 },
          )
      }

      return NextResponse.json({ caracterizacao })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a caracterização do projeto."

      return NextResponse.json({ error: message }, { status: 500 })
    }
  }

  if (
    resource &&
    rest[0] === "ted" &&
    rest[1] === "dados-financeiros" &&
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
      const secaoSlug = DADOS_FINANCEIROS_BLOCO_TO_SECAO_SLUG[bloco]

      if (!secaoSlug) {
        return NextResponse.json(
          { error: "Bloco de dados financeiros inválido." },
          { status: 404 },
        )
      }

      const canManageReview = canEditProjetoInformacoes(sessionUser)
      const bloqueada = await isSecaoBloqueada(projetoId, secaoSlug)

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

      let financeiro

      switch (bloco) {
        case "valor-total":
          financeiro = await upsertProjectSession05ValorTotal(projetoId, body)
          break
        case "cronograma-desembolso":
          financeiro = await upsertProjectSession05CronogramaDesembolso(
            projetoId,
            body,
          )
          break
        case "resumo-plano-aplicacao":
          financeiro = await upsertProjectSession05ResumoPlanoAplicacao(
            projetoId,
            body,
          )
          break
        default:
          return NextResponse.json(
            { error: "Bloco de dados financeiros inválido." },
            { status: 404 },
          )
      }

      return NextResponse.json({ financeiro })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar os dados financeiros do projeto."

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
