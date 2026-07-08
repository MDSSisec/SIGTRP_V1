"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { PlusIcon, SearchIcon } from "lucide-react"

import { PageHeader } from "@/components/blocks/sidebar/page-header-action"
import { AsyncLoadState } from "@/components/ui/async-load-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MenuBar, type MenuBarItem } from "@/components/ui/menuBar"
import { useAsyncData } from "@/hooks/use-async-data"
import { fetchSessionUser } from "@/features/login/services"
import type { PublicUser } from "@/features/login/types"
import { PopUpNewProject } from "../components/popUpNewProject"
import { ProjetosTable } from "../components/projetos-table"
import {
  createProjeto,
  deleteProjeto,
  fetchProjetos,
  fetchResponsaveisExternos,
  fetchResponsaveisInternos,
} from "../services"
import type { Projeto, ProjetoStatus, ResponsavelOption } from "../types"
import { canCreateProjeto } from "../utils/projetos-permissions"

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
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responsaveisInternos, setResponsaveisInternos] = useState<
    ResponsavelOption[]
  >([])
  const [responsaveisExternos, setResponsaveisExternos] = useState<
    ResponsavelOption[]
  >([])

  const { data: sessionUser } = useAsyncData(fetchSessionUser, {
    initialData: null as PublicUser | null,
    errorMessage: "Não foi possível carregar o usuário.",
  })

  const canCreate = useMemo(
    () => Boolean(sessionUser && canCreateProjeto(sessionUser)),
    [sessionUser],
  )

  const {
    data: projetos,
    isLoading,
    error,
    reload: loadProjetos,
  } = useAsyncData(fetchProjetos, {
    initialData: [] as Projeto[],
    errorMessage: "Não foi possível carregar os projetos.",
  })

  const loadResponsaveis = useCallback(async () => {
    const [internos, externos] = await Promise.all([
      fetchResponsaveisInternos(),
      fetchResponsaveisExternos(),
    ])

    setResponsaveisInternos(internos)
    setResponsaveisExternos(externos)
  }, [])

  useEffect(() => {
    if (!canCreate) return

    void loadResponsaveis().catch(() => {
      setResponsaveisInternos([])
      setResponsaveisExternos([])
    })
  }, [canCreate, loadResponsaveis])

  const menuItems = useMemo(() => buildMenuItems(projetos), [projetos])

  const projetosFiltrados = useMemo(
    () => filterProjetos(projetos, filter, search),
    [projetos, filter, search],
  )

  async function handleCreateProjeto(
    data: Parameters<typeof createProjeto>[0],
  ) {
    setIsSubmitting(true)

    try {
      await createProjeto(data)
      await loadProjetos()
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDeleteProjeto(id: string) {
    await deleteProjeto(id)
    await loadProjetos()
  }

  const pageHeader = (
    <PageHeader
      title="Projetos"
      subtitle="Gerencie os projetos do sistema."
      action={
        canCreate ? (
          <Button type="button" onClick={() => setIsPopupOpen(true)}>
            <PlusIcon />
            Criar Projeto
          </Button>
        ) : undefined
      }
    />
  )

  return (
    <>
      {pageHeader}
      <AsyncLoadState
        isLoading={isLoading}
        error={error}
        loadingLabel="Carregando projetos..."
      >
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
          <ProjetosTable
            projetos={projetosFiltrados}
            canDelete={canCreate}
            onDelete={handleDeleteProjeto}
          />
        </div>
      </AsyncLoadState>

      {canCreate && (
        <PopUpNewProject
          open={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleCreateProjeto}
          isSubmitting={isSubmitting}
          responsaveisInternos={responsaveisInternos}
          responsaveisExternos={responsaveisExternos}
        />
      )}
    </>
  )
}
