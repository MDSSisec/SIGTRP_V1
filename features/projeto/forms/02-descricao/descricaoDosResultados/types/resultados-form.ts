import type { ProjectModelData } from "@/features/projeto/types"

/** Estado do formulário de Resultados Esperados. */
export type DadosResultados = {
  resultados: string[]
}

/** Estado inicial vazio. */
export const VAZIO_RESULTADOS: DadosResultados = {
  resultados: [""],
}

type ResultadosModel = {
  itens?: string[]
}

/**
 * Converte `resultados_esperados` do contexto para o formato do formulário.
 */
export function toResultadosForm(
  projectData: ProjectModelData | null | undefined,
): DadosResultados {
  const bloco = projectData?.resultados_esperados as
    | ResultadosModel
    | undefined

  if (bloco?.itens?.length) {
    return { resultados: [...bloco.itens] }
  }

  return { ...VAZIO_RESULTADOS, resultados: [""] }
}

/**
 * Monta o patch de `resultados_esperados` a partir do formulário.
 */
export function toResultadosPatch(dados: DadosResultados): ResultadosModel {
  const itens = dados.resultados.map((item) => item.trim()).filter(Boolean)

  return {
    itens: itens.length ? itens : [""],
  }
}
