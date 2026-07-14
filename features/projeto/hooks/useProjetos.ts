"use client"

import { useMemo, useState } from "react"

import { useAsyncData } from "@/hooks/use-async-data"
import { PROJETOS_TEXT } from "../constants/projetos.text"
import { fetchProjetos, fetchProjectStages } from "../services"
import type { Projeto, ProjetoEtapa } from "../types"
import {
  buildProjetoMenuItems,
  filterProjetos,
  type ProjetoFilter,
} from "../utils/projeto-filter"

/**
 * Hook responsável por gerenciar a listagem de projetos.
 *
 * Centraliza:
 * - carregamento da lista;
 * - etapas do banco (status);
 * - filtros;
 * - pesquisa;
 * - geração do menu;
 * - mensagens da tabela.
 */
export function useProjetos() {
  const [filter, setFilter] = useState<ProjetoFilter>("todos")
  const [search, setSearch] = useState("")

  const {
    data: items,
    isLoading,
    error,
    reload,
  } = useAsyncData(fetchProjetos, {
    initialData: [] satisfies Projeto[],
    errorMessage: PROJETOS_TEXT.errors.loadProjetos,
  })

  const { data: etapas } = useAsyncData(fetchProjectStages, {
    initialData: [] satisfies ProjetoEtapa[],
    errorMessage: "Não foi possível carregar as etapas do projeto.",
  })

  const menuItems = useMemo(
    () => buildProjetoMenuItems(items, etapas),
    [items, etapas],
  )

  const filtered = useMemo(
    () => filterProjetos(items, filter, search),
    [items, filter, search],
  )

  const emptyMessage =
    items.length === 0
      ? PROJETOS_TEXT.table.empty
      : PROJETOS_TEXT.table.emptyFiltered

  return {
    items,
    filtered,
    menuItems,
    etapas,
    filter,
    setFilter,
    search,
    setSearch,
    emptyMessage,
    isLoading,
    error,
    reload,
  }
}
