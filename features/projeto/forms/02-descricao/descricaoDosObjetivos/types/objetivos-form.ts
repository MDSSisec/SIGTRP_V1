import type { ProjectModelData } from "@/features/projeto/types"

/** Estado do formulário de Objetivos. */
export type DadosObjetivos = {
  objetivoGeral: string
  objetivosEspecificos: string[]
}

/** Estado inicial vazio. */
export const VAZIO_OBJETIVOS: DadosObjetivos = {
  objetivoGeral: "",
  objetivosEspecificos: [""],
}

type ObjetivosModel = {
  objetivo_geral?: string
  objetivos_especificos?: string[]
}

/**
 * Converte `objetivos` do contexto para o formato do formulário.
 */
export function toObjetivosForm(
  projectData: ProjectModelData | null | undefined,
): DadosObjetivos {
  const o = projectData?.objetivos as ObjetivosModel | undefined
  if (!o) return { ...VAZIO_OBJETIVOS }

  const especificos =
    o.objetivos_especificos?.length ? o.objetivos_especificos : [""]

  return {
    objetivoGeral: o.objetivo_geral ?? "",
    objetivosEspecificos: especificos,
  }
}

/**
 * Monta o patch de `objetivos` a partir do formulário.
 */
export function toObjetivosPatch(dados: DadosObjetivos): ObjetivosModel {
  const especificos = dados.objetivosEspecificos
    .map((item) => item.trim())
    .filter(Boolean)

  return {
    objetivo_geral: dados.objetivoGeral,
    objetivos_especificos: especificos.length ? especificos : [""],
  }
}
