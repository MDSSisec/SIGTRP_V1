"use client"

import type { ReactNode } from "react"

import { FormSectionCard, formLayoutStyles } from "@/features/projetos/components/project-ted/shared/form-section"

type TedFormPlaceholderProps = {
  title: string
  description?: string
  projectId?: string
  children?: ReactNode
}

export function TedFormPlaceholder({
  title,
  description,
  projectId,
  children,
}: TedFormPlaceholderProps) {
  return (
    <FormSectionCard>
      <h2 className={formLayoutStyles.title}>{title}</h2>
      {description ? <p className={formLayoutStyles.subtitle}>{description}</p> : null}
      {children ?? (
        <p className={formLayoutStyles.subtitle}>
          Conteúdo a ser implementado.{projectId ? ` Projeto #${projectId}` : ""}
        </p>
      )}
    </FormSectionCard>
  )
}
