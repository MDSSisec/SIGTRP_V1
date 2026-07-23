"use client"

import { useCallback, useEffect, useState } from "react"

import type { EtapaDespesasFormValue } from "@/features/projeto/components/cursoDetalhamentoForm"
import {
  useProjectData,
  useUpdateProjectData,
} from "@/features/projeto/contexts/project-data-context"
import type { CursoDespesaRow } from "@/features/projeto/types/general-project-data"

function readForm(
  projectData: Record<string, unknown> | null,
): EtapaDespesasFormValue {
  const raw = projectData?.despesasEtapa12
  if (!raw || typeof raw !== "object") {
    return { inicioEtapa: "", fimEtapa: "", despesas: [] }
  }

  const data = raw as {
    inicioEtapa?: unknown
    fimEtapa?: unknown
    despesas?: unknown
  }

  const despesas = Array.isArray(data.despesas)
    ? data.despesas
        .filter(
          (row): row is Record<string, unknown> =>
            Boolean(row) && typeof row === "object",
        )
        .map((row, index) => ({
          id: String(row.id ?? `etapa12-${index}`),
          tipoItemDespesa: String(row.tipoItemDespesa ?? ""),
          itemDespesa: String(row.itemDespesa ?? ""),
          codigoElementoDespesa: String(row.codigoElementoDespesa ?? ""),
          unidade: String(row.unidade ?? ""),
          quantidadeItens: String(row.quantidadeItens ?? ""),
          valorUnitario: String(row.valorUnitario ?? ""),
          fonteRecurso: String(row.fonteRecurso ?? ""),
          inicioEtapa: String(row.inicioEtapa ?? data.inicioEtapa ?? ""),
          fimEtapa: String(row.fimEtapa ?? data.fimEtapa ?? ""),
          tipoDespesa: String(row.tipoDespesa ?? ""),
        } satisfies CursoDespesaRow))
    : []

  return {
    inicioEtapa: String(data.inicioEtapa ?? ""),
    fimEtapa: String(data.fimEtapa ?? ""),
    despesas,
  }
}

type Options = {
  readOnlyView?: boolean
}

export function useDespesasEtapa12(_options: Options = {}) {
  const projectData = useProjectData()
  const updateProjectData = useUpdateProjectData()
  const [form, setForm] = useState<EtapaDespesasFormValue>({
    inicioEtapa: "",
    fimEtapa: "",
    despesas: [],
  })

  useEffect(() => {
    setForm(readForm(projectData as Record<string, unknown> | null))
  }, [projectData])

  const save = useCallback(
    async (next: EtapaDespesasFormValue) => {
      updateProjectData({
        despesasEtapa12: next,
      })
      setForm(next)
    },
    [updateProjectData],
  )

  return {
    form,
    actions: { save },
  }
}
