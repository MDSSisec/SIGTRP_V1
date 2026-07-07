"use client"

import { TedFormPlaceholder } from "@/features/projetos/components/project-ted/shared/ted-form-placeholder"

type Props = { projectId?: string }

export function PublicoBeneficiario({ projectId }: Props) {
  return (
    <TedFormPlaceholder
      title="14. Público beneficiário do projeto"
      projectId={projectId}
    />
  )
}
