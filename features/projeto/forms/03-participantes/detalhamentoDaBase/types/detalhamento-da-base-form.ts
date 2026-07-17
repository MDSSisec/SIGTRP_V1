/** Linha da tabela Território | Município. */
export type LinhaBaseTerritorial = {
  id: string
  territorio: string
  municipio: string
}

/** Estado editável do detalhamento da base territorial. */
export type DadosDetalhamentoDaBase = {
  linhas: LinhaBaseTerritorial[]
}

export function criarLinhaVazia(): LinhaBaseTerritorial {
  return {
    id: crypto.randomUUID(),
    territorio: "",
    municipio: "",
  }
}

export const VAZIO_DETALHAMENTO_DA_BASE: DadosDetalhamentoDaBase = {
  linhas: [criarLinhaVazia()],
}
