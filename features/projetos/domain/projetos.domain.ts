import type { ProjetoTipo } from "../constants/project-types"
import { ValidationError } from "./errors"
import type {
  CreateProjetoInput,
  UpdateProjetoInformacoesInput,
} from "../schemas/projeto.schema"

export type CreateProjetoCommand = {
  tipoProjeto: ProjetoTipo
  nome: string
  responsavelInternoId: string
  responsavelExternoId: string
  criadoPorId: string
}

export type UpdateProjetoInformacoesCommand = {
  etapaId: string
  responsavelInternoId: string
  responsavelExternoId: string
  includeInfoFields: boolean
  previousEtapaId: string | null
}

/** Normaliza e aplica regras de negócio antes da persistência. */
export function buildCreateProjetoCommand(
  input: CreateProjetoInput,
  criadoPorId: string,
): CreateProjetoCommand {
  return {
    tipoProjeto: input.tipoProjeto,
    nome: input.nome.trim(),
    responsavelInternoId: input.responsavelInternoId,
    responsavelExternoId: input.responsavelExternoId,
    criadoPorId,
  }
}

/**
 * Monta o comando de atualização de Informações do Projeto.
 * Quem não pode editar status mantém a etapa atual.
 */
export function buildUpdateProjetoInformacoesCommand(
  input: UpdateProjetoInformacoesInput,
  options: {
    canEditInfo: boolean
    currentEtapaId: string | null
  },
): UpdateProjetoInformacoesCommand {
  if (options.canEditInfo) {
    if (!input.etapaId) {
      throw new ValidationError("Status do projeto é obrigatório.")
    }

    return {
      etapaId: input.etapaId,
      responsavelInternoId: input.responsavelInternoId,
      responsavelExternoId: input.responsavelExternoId,
      includeInfoFields: true,
      previousEtapaId: options.currentEtapaId,
    }
  }

  if (!options.currentEtapaId) {
    throw new ValidationError("Etapa do projeto inválida.")
  }

  return {
    etapaId: options.currentEtapaId,
    responsavelInternoId: input.responsavelInternoId,
    responsavelExternoId: input.responsavelExternoId,
    includeInfoFields: false,
    previousEtapaId: options.currentEtapaId,
  }
}
