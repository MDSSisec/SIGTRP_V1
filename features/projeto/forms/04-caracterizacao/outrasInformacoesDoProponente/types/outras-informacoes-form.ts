import type { ProjectModelData } from "@/features/projeto/types"

export type DadosOutrasInformacoes = {
  texto: string
}

export const VAZIO_OUTRAS_INFORMACOES: DadosOutrasInformacoes = {
  texto: "",
}

type CaracterizacaoProponente = {
  outras_informacoes?: string
}

export function toOutrasInformacoesForm(
  projectData: ProjectModelData | null | undefined,
): DadosOutrasInformacoes {
  const raw = projectData?.caracterizacao_proponente as
    | CaracterizacaoProponente
    | undefined

  if (!raw || typeof raw.outras_informacoes !== "string") {
    return { ...VAZIO_OUTRAS_INFORMACOES }
  }

  return {
    texto: raw.outras_informacoes,
  }
}

export function toOutrasInformacoesPatch(
  dados: DadosOutrasInformacoes,
): NonNullable<ProjectModelData["caracterizacao_proponente"]> {
  return {
    outras_informacoes: dados.texto,
  }
}
