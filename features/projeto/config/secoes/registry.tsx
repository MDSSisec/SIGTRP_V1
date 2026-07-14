"use client"

import type { ComponentType } from "react"

import {
  PROJECT_FORM_SECTIONS,
  type ProjectFormSectionProps,
} from "@/features/projeto/forms"
import { SecaoPlaceholder } from "../../components/secaoPlaceholder/secao-placeholder"
import type { SecaoConfig } from "../../config/modelos"

/**
 * Resolve o componente da seção.
 * Prefere forms em `features/projeto/forms`; seções ainda não migradas
 * usam o legado ou o placeholder.
 */
export function resolveSecaoComponent(
  secao: SecaoConfig,
  options?: { modeloLabel?: string },
): ComponentType<ProjectFormSectionProps> {
  const Existing = PROJECT_FORM_SECTIONS[secao.id]

  if (Existing) {
    return Existing
  }

  function PlaceholderSecao({ projectId }: ProjectFormSectionProps) {
    return (
      <SecaoPlaceholder
        title={secao.title}
        projectId={projectId}
        modeloLabel={options?.modeloLabel}
      />
    )
  }

  PlaceholderSecao.displayName = `PlaceholderSecao(${secao.id})`

  return PlaceholderSecao
}
