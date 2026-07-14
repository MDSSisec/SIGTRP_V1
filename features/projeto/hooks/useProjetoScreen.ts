"use client"

import { useState } from "react"

import { useProjetoActions } from "./useProjetoActions"
import { useProjetoPermissions } from "./useProjetoPermissions"
import { useProjetos } from "./useProjetos"
import { useResponsaveis } from "./useResponsaveis"

/**
 * Hook responsável por orquestrar a tela de projetos.
 *
 * Centraliza o estado e os hooks utilizados pela tela,
 * mantendo o componente React focado apenas na renderização.
 */
export function useProjetoScreen() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const projetos = useProjetos()
  const permissions = useProjetoPermissions()
  const responsaveis = useResponsaveis(permissions.canCreate)
  const actions = useProjetoActions(projetos.reload)

  return {
    projetos,
    permissions,
    responsaveis,
    actions,

    popup: {
      isOpen: isPopupOpen,
      open: () => setIsPopupOpen(true),
      close: () => setIsPopupOpen(false),
    },
  }
}