import { PROJETOS_FORM } from "../../constants/project"
import type { ProjetoTipo } from "../../constants/projeto-tipos"
import type { CreateProjetoInput } from "../../types"

export type ProjetoFormState = {
  tipoProjeto: ProjetoTipo | ""
  nome: string
  responsavelInternoId: string
  responsavelExternoId: string
}

export function createInitialForm(): ProjetoFormState {
  return {
    tipoProjeto: "",
    nome: "",
    responsavelInternoId: "",
    responsavelExternoId: "",
  }
}

/** Retorna a mensagem de erro ou `null` se válido. */
export function validateProjetoForm(values: ProjetoFormState): string | null {
  if (!values.tipoProjeto) {
    return PROJETOS_FORM.validation.tipoProjeto
  }

  if (!values.nome.trim()) {
    return PROJETOS_FORM.validation.nome
  }

  if (!values.responsavelInternoId) {
    return PROJETOS_FORM.validation.responsavelInterno
  }

  if (!values.responsavelExternoId) {
    return PROJETOS_FORM.validation.responsavelExterno
  }

  return null
}

export function toCreateProjetoInput(
  values: ProjetoFormState,
): CreateProjetoInput | null {
  if (validateProjetoForm(values) || !values.tipoProjeto) {
    return null
  }

  return {
    tipoProjeto: values.tipoProjeto,
    nome: values.nome.trim(),
    responsavelInternoId: values.responsavelInternoId,
    responsavelExternoId: values.responsavelExternoId,
  }
}
