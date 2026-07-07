"use client"

import React, { createContext, useContext, useState, type ReactNode } from "react"
import type { CronogramaData, MetaCronograma } from "../etapas-cronograma/types"

const dadosIniciais: CronogramaData = { metas: [] }

const novaMeta = (): MetaCronograma => ({
  titulo: "",
  etapas: [],
})

type CronogramaContextType = {
  data: CronogramaData
  addMeta: () => void
  updateMeta: (index: number, meta: MetaCronograma) => void
  removeMeta: (index: number) => void
}

const CronogramaContext = createContext<CronogramaContextType | undefined>(undefined)

export function CronogramaProvider({
  children,
  initialData,
}: {
  children: ReactNode
  initialData?: CronogramaData
}) {
  const [data, setData] = useState<CronogramaData>(initialData ?? dadosIniciais)

  const addMeta = () => {
    setData((prev) => ({ metas: [...prev.metas, novaMeta()] }))
  }

  const updateMeta = (index: number, meta: MetaCronograma) => {
    setData((prev) => ({
      metas: prev.metas.map((m, i) => (i === index ? meta : m)),
    }))
  }

  const removeMeta = (index: number) => {
    setData((prev) => ({
      metas: prev.metas.filter((_, i) => i !== index),
    }))
  }

  return (
    <CronogramaContext.Provider value={{ data, addMeta, updateMeta, removeMeta }}>
      {children}
    </CronogramaContext.Provider>
  )
}

export function useCronograma() {
  const context = useContext(CronogramaContext)
  if (context === undefined) {
    throw new Error("useCronograma must be used within a CronogramaProvider")
  }
  return context
}
