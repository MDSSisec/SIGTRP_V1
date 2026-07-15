import { ZodError } from "zod"

import type { PublicUser } from "@/features/login/types"
import {
  buildCreateProjetoCommand,
  buildUpdateProjetoInformacoesCommand,
} from "@/features/projeto/domain/projeto.domain"
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
  isAppError,
} from "@/features/projeto/domain/errors"
import {
  canCreateProjeto,
  canDeleteProjeto,
  canEditProjetoInformacoes,
  isUsuarioExterno,
} from "@/features/projeto/domain/projeto.permissions"
import {
  deleteProjetoById,
  findProjetoById,
  insertProjeto,
  listProjetos,
  updateProjetoInformacoes as updateProjetoInformacoesRepository,
} from "@/features/projeto/repositories/projects.repository"
import {
  findProjectStageByOrdem,
  listProjectStages,
  type ProjectStageRow,
} from "@/features/projeto/repositories/project-stages.repository"
import { listResponsaveisByTipo } from "@/features/projeto/repositories/responsaveis.repository"
import {
  createProjetoSchema,
  projetoIdSchema,
  updateProjetoInformacoesSchema,
} from "@/features/projeto/schemas/projeto.schema"
import type { Projeto, ResponsavelOption } from "@/features/projeto/types/projeto"

function zodToValidationError(error: ZodError): ValidationError {
  const firstIssue = error.issues[0]
  return new ValidationError(firstIssue?.message ?? "Dados do projeto inválidos.")
}

export async function listProjetosForUser(user: PublicUser): Promise<Projeto[]> {
  if (isUsuarioExterno(user)) {
    return listProjetos({ responsavelExternoId: user.id })
  }

  return listProjetos()
}

export async function createProjetoForUser(
  user: PublicUser,
  rawBody: unknown,
): Promise<Projeto> {
  if (!canCreateProjeto(user)) {
    throw new ForbiddenError("Sem permissão para criar projetos.")
  }

  const parsed = createProjetoSchema.safeParse(rawBody)
  if (!parsed.success) {
    throw zodToValidationError(parsed.error)
  }

  /** Sempre inicia na etapa ordem 1 — "Projeto Criado". */
  const etapaInicial = await findProjectStageByOrdem(1)
  if (!etapaInicial) {
    throw new ValidationError(
      'Etapa inicial "Projeto Criado" (ordem 1) não encontrada no catálogo.',
    )
  }

  const command = buildCreateProjetoCommand(
    parsed.data,
    user.id,
    etapaInicial.id,
  )
  return insertProjeto(command)
}

export async function deleteProjetoForUser(
  user: PublicUser,
  projetoIdRaw: string,
): Promise<void> {
  if (!canDeleteProjeto(user)) {
    throw new ForbiddenError("Sem permissão para excluir projetos.")
  }

  const parsedId = projetoIdSchema.safeParse(projetoIdRaw.trim())
  if (!parsedId.success) {
    throw zodToValidationError(parsedId.error)
  }

  const deleted = await deleteProjetoById(parsedId.data)
  if (!deleted) {
    throw new NotFoundError("Projeto não encontrado.")
  }
}

export async function listEtapasForUser(): Promise<ProjectStageRow[]> {
  return listProjectStages()
}

export async function listResponsaveisInternosForUser(): Promise<
  ResponsavelOption[]
> {
  return listResponsaveisByTipo("interno")
}

export async function listResponsaveisExternosForUser(): Promise<
  ResponsavelOption[]
> {
  return listResponsaveisByTipo("externo")
}

export async function updateProjetoInformacoesForUser(
  user: PublicUser,
  projetoIdRaw: string,
  rawBody: unknown,
): Promise<Projeto> {
  const parsedId = projetoIdSchema.safeParse(projetoIdRaw.trim())
  if (!parsedId.success) {
    throw zodToValidationError(parsedId.error)
  }

  const parsedBody = updateProjetoInformacoesSchema.safeParse(rawBody)
  if (!parsedBody.success) {
    throw zodToValidationError(parsedBody.error)
  }

  const current = await findProjetoById(parsedId.data)
  if (!current) {
    throw new NotFoundError("Projeto não encontrado.")
  }

  const canEditInfo = canEditProjetoInformacoes(user)
  const command = buildUpdateProjetoInformacoesCommand(parsedBody.data, {
    canEditInfo,
    currentEtapaId: current.etapaId,
  })

  const updated = await updateProjetoInformacoesRepository(
    parsedId.data,
    {
      etapaId: command.etapaId,
      responsavelInternoId: command.responsavelInternoId,
      responsavelExternoId: command.responsavelExternoId,
    },
    {
      alteradoPorId: user.id,
      previousEtapaId: command.previousEtapaId,
      trackEtapaHistory: command.includeInfoFields,
    },
  )

  if (!updated) {
    throw new NotFoundError("Projeto não encontrado.")
  }

  return updated
}

export function toHttpErrorResponse(error: unknown): {
  status: number
  body: { error: string }
} {
  if (isAppError(error)) {
    return {
      status: error.status,
      body: { error: error.message },
    }
  }

  if (error instanceof ZodError) {
    return {
      status: 400,
      body: { error: error.issues[0]?.message ?? "Dados inválidos." },
    }
  }

  const message =
    error instanceof Error ? error.message : "Erro interno no servidor."

  return {
    status: 500,
    body: { error: message },
  }
}
