import type { ProjectModelData } from "@/features/projeto/types/ted"

import type { Projeto } from "../../types"

/**
 * Converte o modelo de domínio `Projeto` para o modelo utilizado pelos
 * formulários de edição (`ProjectModelData`).
 *
 * O mapeamento inicializa apenas os campos disponíveis na listagem de
 * projetos. As demais informações são carregadas posteriormente pelos
 * formulários específicos de cada seção.
 */
export function mapProjetoToProjectModel(
  projeto: Projeto,
): ProjectModelData {
  const {
    id,
    nome,
    tipoProjeto,
    etapaNome,
    etapaId,
    etapaOrdem,
    responsavelInternoNome,
    responsavelInternoId,
    responsavelExternoId,
  } = projeto

  return {
    id,
    nome,
    tipo: tipoProjeto,
    status: etapaNome || "Sem etapa",
    etapaId,
    etapaOrdem,
    responsavel: responsavelInternoNome,
    responsavelInternoId,
    responsavelExternoId,
    identificacao: {
      projeto: {
        nome,
      },
    },
  }
}