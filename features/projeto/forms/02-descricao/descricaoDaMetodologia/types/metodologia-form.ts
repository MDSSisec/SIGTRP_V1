import { METODOLOGIA_ETAPAS_VISUAIS } from "@/features/projeto/constants/metodologia"
import type {
  ProjectSession02Description,
  ProjectSession02DescriptionMetodologiaInput,
} from "@/features/projeto/types/project-session-02-description"

/** IDs estáveis dos textareas das etapas (UI ↔ formulário). */
export const METODOLOGIA_ETAPA_FIELD_IDS = METODOLOGIA_ETAPAS_VISUAIS.map(
  (etapa) => `metodologia-${etapa.item.replaceAll(".", "-")}`,
) as [string, string, string, string]

export type DadosMetodologia = {
  metaTexto: string
  etapasTexto: Record<string, string>
}

export const VAZIO_METODOLOGIA: DadosMetodologia = {
  metaTexto: "",
  etapasTexto: Object.fromEntries(
    METODOLOGIA_ETAPA_FIELD_IDS.map((id) => [id, ""]),
  ),
}

export function toMetodologiaForm(
  descricao: ProjectSession02Description | null,
): DadosMetodologia {
  if (!descricao) return VAZIO_METODOLOGIA

  const [id11, id12, id13, id14] = METODOLOGIA_ETAPA_FIELD_IDS

  return {
    metaTexto: descricao.metodologiaMeta ?? "",
    etapasTexto: {
      [id11]: descricao.metodologiaEtapa11 ?? "",
      [id12]: descricao.metodologiaEtapa12 ?? "",
      [id13]: descricao.metodologiaEtapa13 ?? "",
      [id14]: descricao.metodologiaEtapa14 ?? "",
    },
  }
}

export function toMetodologiaInput(
  dados: DadosMetodologia,
): ProjectSession02DescriptionMetodologiaInput {
  const [id11, id12, id13, id14] = METODOLOGIA_ETAPA_FIELD_IDS

  return {
    metodologiaMeta: dados.metaTexto,
    metodologiaEtapa11: dados.etapasTexto[id11] ?? "",
    metodologiaEtapa12: dados.etapasTexto[id12] ?? "",
    metodologiaEtapa13: dados.etapasTexto[id13] ?? "",
    metodologiaEtapa14: dados.etapasTexto[id14] ?? "",
  }
}
