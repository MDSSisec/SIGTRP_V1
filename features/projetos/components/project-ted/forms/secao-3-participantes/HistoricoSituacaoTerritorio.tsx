"use client"

import { TedFormPlaceholder } from "@/features/projetos/components/project-ted/shared/ted-form-placeholder"

type Props = { projectId?: string }

export function HistoricoSituacaoTerritorio({ projectId }: Props) {
  return (
    <TedFormPlaceholder
      title="12. Histórico e situação socioeconômica do território e da população a ser beneficiada"
      projectId={projectId}
    />
  )
}
