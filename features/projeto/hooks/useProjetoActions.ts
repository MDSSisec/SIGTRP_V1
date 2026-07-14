"use client"

import { notifyError, notifySuccess } from "../utils/notify"
import { PROJETOS_TEXT } from "../constants/projetos.text"
import { useCallback, useState } from "react"
import {
    createProjeto as createProjetoRequest,
    deleteProjeto as deleteProjetoRequest,
} from "../services"

import type { CreateProjetoInput } from "../types"

/**
 * Função responsável por recarregar a listagem de projetos.
 */
type ReloadProjetos = () => Promise<unknown>

/**
 * Hook responsável pelas ações da tela de projetos.
 *
 * Centraliza as operações de criação e exclusão, além de atualizar
 * a listagem e exibir as notificações ao usuário.
 */
export function useProjetoActions(reloadProjetos: ReloadProjetos) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Cria um novo projeto e atualiza a listagem.
   */
  const createProjeto = useCallback(
    async (data: CreateProjetoInput) => {
      setIsSubmitting(true)

      try {
        await createProjetoRequest(data)
        await reloadProjetos()

        notifySuccess(PROJETOS_TEXT.success.createProjeto)
      } catch (error) {
        notifyError(error, PROJETOS_TEXT.errors.createProjeto)
        throw error
      } finally {
        setIsSubmitting(false)
      }
    },
    [reloadProjetos],
  )

  /**
   * Exclui um projeto e atualiza a listagem.
   */
  const deleteProjeto = useCallback(
    async (id: string) => {
      try {
        await deleteProjetoRequest(id)
        await reloadProjetos()

        notifySuccess(PROJETOS_TEXT.success.deleteProjeto)
      } catch (error) {
        notifyError(error, PROJETOS_TEXT.errors.deleteProjeto)
        throw error
      }
    },
    [reloadProjetos],
  )

  return {
    createProjeto,
    deleteProjeto,
    isSubmitting,
  }
}