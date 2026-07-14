"use client"

import { useAsyncData } from "@/hooks/use-async-data"

import { fetchSessionUser } from "@/features/login/services"
import type { PublicUser } from "@/features/login/types"

import { PROJETOS_TEXT } from "../constants/projetos.text"
import {
  canCreateProjeto,
  canDeleteProjeto,
} from "../domain/projeto.permissions"

/**
 * Carrega o usuário autenticado e calcula as permissões
 * relacionadas aos projetos.
 */
export function useProjetoPermissions() {
  const { data: sessionUser } = useAsyncData(fetchSessionUser, {
    initialData: null satisfies PublicUser | null,
    errorMessage: PROJETOS_TEXT.errors.loadUser,
  })

  /**
   * Indica se o usuário pode criar projetos.
   */
  const canCreate =
    sessionUser !== null && canCreateProjeto(sessionUser)

  /**
   * Indica se o usuário pode excluir projetos.
   */
  const canDelete =
    sessionUser !== null && canDeleteProjeto(sessionUser)

  return {
    sessionUser,
    canCreate,
    canDelete,
  }
}