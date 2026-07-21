import {
  formatProjetoTipoLabel,
  normalizeProjetoTipo,
  PROJETO_TIPOS,
} from "@/features/projeto/constants/projeto-tipos"
import type { ProjectModelData } from "@/features/projeto/types/project-model"
import type { Projeto } from "@/features/projeto/types"

/** Estado do formulário de Informações do Projeto. */
export type DadosInformacoesProjeto = {
  etapaId: string
  responsavelInternoId: string
  responsavelExternoId: string
}

export const VAZIO_INFORMACOES_PROJETO: DadosInformacoesProjeto = {
  etapaId: "",
  responsavelInternoId: "",
  responsavelExternoId: "",
}

/** Converte os dados do contexto para o estado do formulário. */
export function mapProjectDataToInformacoesForm(
  projectData: ProjectModelData | null,
): DadosInformacoesProjeto {
  if (!projectData) return VAZIO_INFORMACOES_PROJETO

  return {
    etapaId: String(projectData.etapaId ?? ""),
    responsavelInternoId: String(projectData.responsavelInternoId ?? ""),
    responsavelExternoId: String(projectData.responsavelExternoId ?? ""),
  }
}

export function getTipoProjetoLabel(
  projectData: ProjectModelData | null,
): string {
  const tipo =
    normalizeProjetoTipo(String(projectData?.tipo ?? "")) ?? PROJETO_TIPOS.TED
  return formatProjetoTipoLabel(tipo)
}

/** Atualiza o ProjectDataContext após salvar. */
export function mapProjetoToContextPatch(
  projeto: Projeto,
): Partial<ProjectModelData> {
  return {
    tipo: projeto.tipoProjeto,
    status: projeto.etapaNome,
    etapaId: projeto.etapaId,
    etapaOrdem: projeto.etapaOrdem,
    responsavel: projeto.responsavelInternoNome,
    responsavelInternoId: projeto.responsavelInternoId,
    responsavelExternoId: projeto.responsavelExternoId,
  }
}
