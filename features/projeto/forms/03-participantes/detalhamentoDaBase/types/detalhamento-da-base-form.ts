import type { ProjectSession03Participants } from "@/features/projeto/types/project-session-03-participants"

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

export function toDetalhamentoDaBaseForm(
  participantes: ProjectSession03Participants | null,
): DadosDetalhamentoDaBase {
  const linhasPersistidas = participantes?.baseTerritorialLinhas

  if (!linhasPersistidas?.length) {
    return VAZIO_DETALHAMENTO_DA_BASE
  }

  return {
    linhas: linhasPersistidas.map((linha) => ({
      id: crypto.randomUUID(),
      territorio: linha.territorio ?? "",
      municipio: linha.municipio ?? "",
    })),
  }
}

export function toDetalhamentoDaBaseInput(dados: DadosDetalhamentoDaBase) {
  return {
    baseTerritorialLinhas: dados.linhas.map(({ territorio, municipio }) => ({
      territorio,
      municipio,
    })),
  }
}
