import { ZodError } from "zod"

import type { PublicUser } from "@/features/login/types"
import {
  buildCreateProjetoCommand,
  buildUpdateProjetoInformacoesCommand,
} from "../domain/projetos.domain"
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
  isAppError,
} from "../domain/errors"
import {
  canCreateProjeto,
  canDeleteProjeto,
  canEditProjetoInformacoes,
  isUsuarioExterno,
} from "../domain/projetos.permissions"
import {
  deleteProjetoById,
  findProjetoById,
  insertProjeto,
  listProjetos,
  updateProjetoInformacoes as updateProjetoInformacoesRepository,
} from "../repositories/projects.repository"
import { listProjectStages } from "../repositories/project-stages.repository"
import { listResponsaveisByTipo } from "../repositories/responsaveis.repository"
import {
  createProjetoSchema,
  projetoIdSchema,
  updateProjetoInformacoesSchema,
} from "../schemas/projeto.schema"
import type { Projeto, ResponsavelOption } from "../types/projeto"
import type { ProjectStageRow } from "../repositories/project-stages.repository"

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

  const command = buildCreateProjetoCommand(parsed.data, user.id)
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
