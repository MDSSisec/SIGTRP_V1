import type { MenuBarItem } from "@/components/ui/menuBar"

import type { Projeto, ProjetoEtapa } from "../types"

/**
 * Filtro disponível na listagem de projetos.
 */
export type ProjetoFilter = "todos" | string

/**
 * Cria os itens do MenuBar a partir das etapas do banco
 * (SIGTRP_TB_PROJECT_STAGES) e das contagens da listagem.
 */
export function buildProjetoMenuItems(
  projetos: Projeto[],
  etapas: ProjetoEtapa[],
): MenuBarItem<ProjetoFilter>[] {
  const counts = new Map<string, number>()

  for (const etapa of etapas) {
    counts.set(etapa.nome, 0)
  }

  for (const projeto of projetos) {
    const nome = projeto.etapaNome
    counts.set(nome, (counts.get(nome) ?? 0) + 1)
  }

  const ordemPorNome = new Map(etapas.map((etapa) => [etapa.nome, etapa.ordem]))

  const etapasNoMenu = [...counts.keys()].sort((a, b) => {
    const ordemA = ordemPorNome.get(a) ?? Number.MAX_SAFE_INTEGER
    const ordemB = ordemPorNome.get(b) ?? Number.MAX_SAFE_INTEGER
    if (ordemA !== ordemB) return ordemA - ordemB
    return a.localeCompare(b, "pt-BR")
  })

  return [
    {
      value: "todos",
      label: "Todos",
      count: projetos.length,
    },
    ...etapasNoMenu.map((nome) => ({
      value: nome,
      label: nome,
      count: counts.get(nome) ?? 0,
    })),
  ]
}

/**
 * Filtra os projetos por etapa (status) e texto pesquisado.
 */
export function filterProjetos(
  projetos: Projeto[],
  filter: ProjetoFilter,
  search: string,
): Projeto[] {
  const projetosFiltrados =
    filter === "todos"
      ? projetos
      : projetos.filter(
          (projeto) =>
            projeto.etapaNome === filter || projeto.status === filter,
        )

  const query = search.trim().toLowerCase()

  if (!query) {
    return projetosFiltrados
  }

  return projetosFiltrados.filter(({ nome, responsavel, tipo, etapaNome }) =>
    nome.toLowerCase().includes(query) ||
    responsavel.toLowerCase().includes(query) ||
    tipo.toLowerCase().includes(query) ||
    etapaNome.toLowerCase().includes(query),
  )
}
