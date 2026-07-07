"use client"

import { TedFormPlaceholder } from "@/features/projetos/components/project-ted/shared/ted-form-placeholder"

type Props = { projectId?: string }

export function ResumoPlanoAplicacao({ projectId }: Props) {
  return (
    <TedFormPlaceholder
      title="22. Resumo do plano de aplicação por elemento de despesa"
      projectId={projectId}
    />
  )
}
