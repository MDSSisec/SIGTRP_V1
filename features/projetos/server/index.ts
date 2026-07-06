import { NextResponse, type NextRequest } from "next/server"

import { getSessionUser } from "@/features/login/server/session"
import { canCreateProjeto } from "../utils/projetos-permissions"
import { createProjeto, listProjetos } from "./projects.repository"
import { listResponsaveisByTipo } from "./responsaveis.repository"

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

  if (rest.length === 0 && request.method === "GET") {
    try {
      const projetos = await listProjetos()
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
        nome?: string
        valorTotal?: number
        responsavelInternoId?: string
        responsavelExternoId?: string
      }

      const nome = body.nome?.trim() ?? ""
      const valorTotal = body.valorTotal
      const responsavelInternoId = body.responsavelInternoId?.trim() ?? ""
      const responsavelExternoId = body.responsavelExternoId?.trim() ?? ""

      if (
        !nome ||
        typeof valorTotal !== "number" ||
        !Number.isFinite(valorTotal) ||
        valorTotal < 0 ||
        !responsavelInternoId ||
        !responsavelExternoId
      ) {
        return NextResponse.json(
          { error: "Dados do projeto inválidos." },
          { status: 400 },
        )
      }

      const projeto = await createProjeto({
        nome,
        valorTotal,
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

  return NextResponse.json({ error: "Rota não encontrada" }, { status: 404 })
}
