import { PROJETOS_ROUTE } from "../constants"
import { PROJETO_TIPOS, type ProjetoTipo } from "../constants/project-types"

export const PROJETO_EDIT_DEFAULT_SECAO = "informacoes-projeto"

export function getProjetoEditPath(
  id: string,
  tipoProjeto: ProjetoTipo,
): string | null {
  if (tipoProjeto === PROJETO_TIPOS.TED) {
    return `${PROJETOS_ROUTE}/${id}/ted?secao=${PROJETO_EDIT_DEFAULT_SECAO}`
  }

  if (tipoProjeto === PROJETO_TIPOS.EMENDA) {
    return `${PROJETOS_ROUTE}/${id}/emenda`
  }

  return null
}
