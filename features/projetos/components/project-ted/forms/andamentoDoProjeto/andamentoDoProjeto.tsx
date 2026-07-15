"use client"

import React, { useMemo } from "react"
import { DataTable, type TableColumn } from "@/features/projetos/components/project-ted/shared/data-table"
import { FormSectionCard, formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { SECAO_SLUG_TO_TITLE } from "@/features/projetos/constants/ted/visao-geral"

type ProjectFormSectionProps = { projectId?: string; readOnlyView?: boolean }

export interface RegistroAndamento extends Record<string, unknown> {
  id: string
  dataHora: string
  usuario: string
  secao: string
  descricao: string
}

function getLogAndamento(_projectId?: string): RegistroAndamento[] {
  return []
}

const columns: TableColumn<RegistroAndamento>[] = [
  { id: "dataHora", label: "Data e hora", align: "left" },
  { id: "usuario", label: "Usuário", align: "left" },
  {
    id: "secao",
    label: "Seção / Área",
    align: "left",
    render: (row) => SECAO_SLUG_TO_TITLE[row.secao] ?? row.secao,
  },
  { id: "descricao", label: "Descrição da alteração", align: "left" },
]

export function AndamentoDoProjeto({ projectId }: ProjectFormSectionProps) {
  const data = useMemo(() => getLogAndamento(projectId), [projectId])

  return (
    <FormSectionCard>
      <h2 className={formLayoutStyles.title}>Andamento do Projeto</h2>
      <p className={formLayoutStyles.subtitle}>
        Registro das modificações (edições) realizadas no projeto, por data e usuário.
      </p>
      <DataTable<RegistroAndamento>
        columns={columns}
        data={data}
        emptyMessage="Nenhuma alteração registrada para este projeto."
        getRowKey={(row) => row.id}
      />
    </FormSectionCard>
  )
}
