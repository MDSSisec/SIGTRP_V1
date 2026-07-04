"use client"

import { useMemo, useState } from "react"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { MenuBar, type MenuBarItem } from "@/components/ui/menuBar"
import { ProjetosTable } from "../components/projetos-table"
import { MOCK_PROJETOS } from "../constants/mock-projetos"
import type { Projeto, ProjetoStatus } from "../types"

type ProjetoFilter = "todos" | ProjetoStatus

function buildMenuItems(projetos: Projeto[]): MenuBarItem<ProjetoFilter>[] {
  const counts = projetos.reduce(
    (acc, projeto) => {
      acc[projeto.status] += 1
      return acc
    },
    {
      Aprovado: 0,
      "Em análise": 0,
      Pendente: 0,
      Concluído: 0,
    } satisfies Record<ProjetoStatus, number>,
  )

  return [
    { value: "todos", label: "Todos", count: projetos.length },
    { value: "Aprovado", label: "Aprovados", count: counts.Aprovado },
    { value: "Em análise", label: "Em análise", count: counts["Em análise"] },
    { value: "Pendente", label: "Pendentes", count: counts.Pendente },
    { value: "Concluído", label: "Concluídos", count: counts.Concluído },
  ]
}

function filterProjetos(projetos: Projeto[], filter: ProjetoFilter, search: string) {
  const byStatus =
    filter === "todos"
      ? projetos
      : projetos.filter((projeto) => projeto.status === filter)

  const query = search.trim().toLowerCase()

  if (!query) {
    return byStatus
  }

  return byStatus.filter(
    (projeto) =>
      projeto.nome.toLowerCase().includes(query) ||
      projeto.responsavel.toLowerCase().includes(query) ||
      projeto.tipo.toLowerCase().includes(query),
  )
}

export function ProjetosScreen() {
  const [filter, setFilter] = useState<ProjetoFilter>("todos")
  const [search, setSearch] = useState("")

  const menuItems = useMemo(() => buildMenuItems(MOCK_PROJETOS), [])

  const projetosFiltrados = useMemo(
    () => filterProjetos(MOCK_PROJETOS, filter, search),
    [filter, search],
  )

  return (
    <div className="space-y-4">
      <MenuBar items={menuItems} value={filter} onValueChange={setFilter}>
        <div className="relative w-full">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar projeto..."
            className="bg-background pl-8"
            aria-label="Buscar projeto"
          />
        </div>
      </MenuBar>
      <ProjetosTable projetos={projetosFiltrados} />
    </div>
  )
}
