"use client"

import { TedFormPlaceholder } from "@/features/projetos/components/project-ted/shared/ted-form-placeholder"

type Props = { projectId?: string }

export function IndicadoresEficiencia({ projectId }: Props) {
  return (
    <TedFormPlaceholder
      title="24. Indicadores de eficiência e eficácia"
      projectId={projectId}
    />
  )
}
