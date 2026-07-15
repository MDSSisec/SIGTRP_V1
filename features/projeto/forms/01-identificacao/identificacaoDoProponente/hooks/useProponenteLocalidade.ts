"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"

import {
  fetchEstados,
  fetchMunicipiosByUf,
  type IbgeEstado,
  type IbgeMunicipio,
} from "@/features/projeto/services"

import type { CepStatus } from "../constants/form"
import type { DadosIdentificacaoProponente } from "../types/proponente-form"

type UseProponenteLocalidadeOptions = {
  isEditing: boolean
  dados: DadosIdentificacaoProponente
  setDados: Dispatch<SetStateAction<DadosIdentificacaoProponente>>
}

/**
 * Gerencia toda a lógica de localização do formulário do Proponente.
 *
 * Responsabilidades:
 * - carregar UFs (IBGE);
 * - carregar municípios conforme a UF;
 * - preencher endereço automaticamente via ViaCEP;
 * - controlar feedback de busca do CEP.
 */
export function useProponenteLocalidade({
  isEditing,
  dados,
  setDados,
}: UseProponenteLocalidadeOptions) {
  const [cepStatus, setCepStatus] = useState<CepStatus>("idle")
  const [estados, setEstados] = useState<IbgeEstado[]>([])
  const [municipios, setMunicipios] = useState<IbgeMunicipio[]>([])
  const [carregandoMunicipios, setCarregandoMunicipios] = useState(false)

  /** Cancela buscas de CEP anteriores. */
  const abortControllerRef = useRef<AbortController | null>(null)

  /** Debounce da consulta ao ViaCEP. */
  const cepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /**
   * Carrega todas as UFs disponíveis.
   */
  useEffect(() => {
    const controller = new AbortController()

    fetchEstados(controller.signal)
      .then(setEstados)
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return
        setEstados([])
      })

    return () => controller.abort()
  }, [])

  /**
   * Sincroniza a sigla da UF quando apenas o código IBGE estiver salvo.
   */
  useEffect(() => {
    if (!estados.length) return

    setDados((prev) => {
      if (prev.ufIbge == null || prev.uf) return prev

      const estado = estados.find((item) => item.id === prev.ufIbge)

      return estado
        ? {
            ...prev,
            uf: estado.sigla,
          }
        : prev
    })
  }, [estados, setDados])

  /**
   * Sincroniza o nome do município quando apenas o código IBGE existir.
   */
  useEffect(() => {
    if (!municipios.length) return

    setDados((prev) => {
      if (prev.municipioIbge == null || prev.municipio) return prev

      const municipio = municipios.find(
        (item) => item.id === prev.municipioIbge,
      )

      return municipio
        ? {
            ...prev,
            municipio: municipio.nome,
          }
        : prev
    })
  }, [municipios, setDados])

  /**
   * Carrega os municípios da UF selecionada.
   */
  useEffect(() => {
    const uf = dados.uf.trim().toUpperCase()

    if (!uf) {
      setMunicipios([])
      return
    }

    const controller = new AbortController()

    setCarregandoMunicipios(true)

    fetchMunicipiosByUf(uf, controller.signal)
      .then(setMunicipios)
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return
        setMunicipios([])
      })
      .finally(() => {
        setCarregandoMunicipios(false)
      })

    return () => controller.abort()
  }, [dados.uf])

  /**
   * Consulta o ViaCEP e atualiza automaticamente
   * os dados de endereço do formulário.
   */
  const buscarCep = useCallback(
    async (cep: string) => {
      const digits = cep.replace(/\D/g, "")

      if (digits.length < 8) return

      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()

      setCepStatus("loading")

      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${digits}/json/`, { signal: abortControllerRef.current.signal,},
        )
        if (!response.ok) { setCepStatus("error"); return }

        const data = await response.json()
        if (data.erro) { setCepStatus("error"); return }

        setDados((prev) => {
          const estado = estados.find(
            (item) => item.sigla === (data.uf || prev.uf),
          )

          const municipioIbge = data.ibge
            ? Number(data.ibge)
            : prev.municipioIbge

          return {
            ...prev,
            enderecoCompleto:
              prev.enderecoCompleto || data.logradouro || "",
            bairro: data.bairro || prev.bairro,
            municipio: data.localidade || prev.municipio,
            municipioIbge: Number.isFinite(municipioIbge)
              ? municipioIbge
              : prev.municipioIbge,
            uf: data.uf || prev.uf,
            ufIbge: estado?.id ?? prev.ufIbge,
          }
        })

        setCepStatus("success")
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") return
        setCepStatus("error")
      }
    },
    [estados, setDados],
  )

  /**
   * Executa a consulta do CEP com debounce,
   * evitando múltiplas chamadas enquanto o usuário digita.
   */
  useEffect(() => {
    if (!isEditing) return

    const digits = dados.cep.replace(/\D/g, "")

    if (digits.length < 8) {
      setCepStatus("idle")
      return
    }

    if (cepTimerRef.current) {
      clearTimeout(cepTimerRef.current)
    }

    cepTimerRef.current = setTimeout(() => {
      void buscarCep(dados.cep)
    }, 600)

    return () => {
      if (cepTimerRef.current) {
        clearTimeout(cepTimerRef.current)
      }
    }
  }, [dados.cep, buscarCep, isEditing])

  /**
   * Limpa o estado visual do feedback do CEP.
   */
  const resetCepStatus = useCallback(() => {
    setCepStatus("idle")
  }, [])

  return {
    cepStatus,
    resetCepStatus,
    estados,
    municipios,
    carregandoMunicipios,
    /** Libera UF/bairro/município somente com CEP completo (8 dígitos). */
    isCepCompleto: dados.cep.replace(/\D/g, "").length >= 8,
  }
}