import type { ProjectSession04Characterization } from "@/features/projeto/types/project-session-04-characterization"

export type DadosOutrasInformacoes = {
  texto: string
}

export const VAZIO_OUTRAS_INFORMACOES: DadosOutrasInformacoes = {
  texto: "",
}

export function toOutrasInformacoesForm(
  caracterizacao: ProjectSession04Characterization | null,
): DadosOutrasInformacoes {
  if (!caracterizacao?.outrasInformacoesTexto) {
    return { ...VAZIO_OUTRAS_INFORMACOES }
  }

  return {
    texto: caracterizacao.outrasInformacoesTexto,
  }
}

export function toOutrasInformacoesInput(dados: DadosOutrasInformacoes) {
  return {
    outrasInformacoesTexto: dados.texto,
  }
}
