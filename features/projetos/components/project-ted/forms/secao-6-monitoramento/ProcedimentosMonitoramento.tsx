"use client"

import { TedFormPlaceholder } from "@/features/projetos/components/project-ted/shared/ted-form-placeholder"

type Props = { projectId?: string }

export function ProcedimentosMonitoramento({ projectId }: Props) {
  return (
    <TedFormPlaceholder
      title="23. Procedimentos de monitoramento e avaliação da execução e resultados"
      projectId={projectId}
    />
  )
}
