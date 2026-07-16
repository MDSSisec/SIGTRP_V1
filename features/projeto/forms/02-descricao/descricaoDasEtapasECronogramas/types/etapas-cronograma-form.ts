import type {
  CronogramaData,
  Etapa,
  MetaCronograma,
} from "@/features/projeto/contexts/cronograma/types"

export type {
  CronogramaData,
  Etapa,
  MetaCronograma,
}

/**
 * Estado utilizado pelo formulário de Etapas do Cronograma.
 */
export type DadosEtapasCronograma = CronogramaData

/**
 * Estado inicial do formulário.
 */
export const VAZIO_ETAPAS_CRONOGRAMA: DadosEtapasCronograma = {
  metas: [],
}

/**
 * Cria uma etapa vazia.
 *
 * Utilizada ao adicionar uma nova etapa
 * durante a edição do cronograma.
 */
export function createEmptyEtapa(): Etapa {
  return {
    descricao: "",
    valor: 0,
    inicio: "",
    termino: "",
  }
}

/**
 * Cria uma meta vazia.
 *
 * Utilizada ao adicionar uma nova meta
 * ao cronograma do projeto.
 */
export function createEmptyMeta(): MetaCronograma {
  return {
    titulo: "",
    etapas: [],
  }
}

/**
 * Converte os dados carregados da API para o estado
 * utilizado pelo formulário.
 *
 * Também normaliza valores nulos para evitar
 * verificações adicionais durante a renderização.
 */
export function toEtapasCronogramaForm(
  data: CronogramaData,
): DadosEtapasCronograma {
  return {
    metas: data.metas.map((meta) => ({
      ...meta,
      titulo: meta.titulo ?? "",
      inicio: meta.inicio ?? "",
      termino: meta.termino ?? "",
      etapas: (meta.etapas ?? []).map((etapa) => ({
        ...etapa,
        descricao: etapa.descricao ?? "",
        valor: etapa.valor ?? 0,
        inicio: etapa.inicio ?? "",
        termino: etapa.termino ?? "",
      })),
    })),
  }
}

/**
 * Calcula o valor total de uma meta.
 *
 * @param meta Meta do cronograma.
 * @returns Soma dos valores de todas as etapas.
 */
export function totalMeta(
  meta: MetaCronograma,
): number {
  return meta.etapas.reduce(
    (total, etapa) => total + (etapa.valor || 0),
    0,
  )
}

/**
 * Calcula o valor total do cronograma.
 *
 * @param data Dados do cronograma.
 * @returns Soma dos valores de todas as metas.
 */
export function totalGeral(
  data: DadosEtapasCronograma,
): number {
  return data.metas.reduce(
    (total, meta) => total + totalMeta(meta),
    0,
  )
}