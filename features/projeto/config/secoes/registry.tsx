"use client"

import type { ComponentType } from "react"

import {
  BlankSecao,
  PROJECT_FORM_SECTIONS,
  type ProjectFormSectionProps,
} from "@/features/projeto/forms"
import type { SecaoConfig } from "../../config/modelos"

/**
 * Resolve o componente da seção a partir de `features/projeto/forms`.
 * Sem formulário (ou arquivo vazio) → página em branco.
 */
export function resolveSecaoComponent(
  secao: SecaoConfig,
  _options?: { modeloLabel?: string },
): ComponentType<ProjectFormSectionProps> {
  return PROJECT_FORM_SECTIONS[secao.id] ?? BlankSecao
}
