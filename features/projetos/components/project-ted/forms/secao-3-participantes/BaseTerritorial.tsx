"use client"

import { TedFormPlaceholder } from "@/features/projetos/components/project-ted/shared/ted-form-placeholder"

type Props = { projectId?: string }

export function BaseTerritorial({ projectId }: Props) {
  return (
    <TedFormPlaceholder
      title="13. Detalhamento da base territorial do projeto"
      projectId={projectId}
    />
  )
}
