"use client"

import { useCallback, useEffect, useState } from "react"

import {
  fetchResponsaveisExternos,
  fetchResponsaveisInternos,
} from "../services"
import type { ResponsavelOption } from "../types"

/**
 * Carrega as listas de responsáveis internos e externos utilizadas
 * no formulário de projetos.
 *
 * O carregamento ocorre apenas quando `enabled` for `true`.
 */
export function useResponsaveis(enabled: boolean) {
  const [internos, setInternos] = useState<ResponsavelOption[]>([])
  const [externos, setExternos] = useState<ResponsavelOption[]>([])
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Limpa as listas de responsáveis.
   */
  const clearResponsaveis = useCallback(() => {
    setInternos([])
    setExternos([])
  }, [])

  /**
   * Carrega os responsáveis internos e externos.
   */
  const loadResponsaveis = useCallback(async () => {
    setIsLoading(true)

    try {
      const [nextInternos, nextExternos] = await Promise.all([
        fetchResponsaveisInternos(),
        fetchResponsaveisExternos(),
      ])

      setInternos(nextInternos)
      setExternos(nextExternos)
    } catch {
      clearResponsaveis()
    } finally {
      setIsLoading(false)
    }
  }, [clearResponsaveis])

  useEffect(() => {
    if (!enabled) {
      clearResponsaveis()
      return
    }

    let cancelled = false

    async function load() {
      setIsLoading(true)

      try {
        const [nextInternos, nextExternos] = await Promise.all([
          fetchResponsaveisInternos(),
          fetchResponsaveisExternos(),
        ])

        if (cancelled) return

        setInternos(nextInternos)
        setExternos(nextExternos)
      } catch {
        if (cancelled) return

        clearResponsaveis()
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [enabled, clearResponsaveis])

  return {
    internos,
    externos,
    isLoading,
    reload: loadResponsaveis,
  }
}