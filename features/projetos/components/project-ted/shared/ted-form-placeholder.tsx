"use client"

import type { ReactNode } from "react"

import { SecaoPlaceholder } from "@/features/projeto/components/secaoPlaceholder/secao-placeholder"

type TedFormPlaceholderProps = {
  title: string
  description?: string
  projectId?: string
  children?: ReactNode
}

export function TedFormPlaceholder({
  title,
  projectId,
}: TedFormPlaceholderProps) {
  return <SecaoPlaceholder title={title} projectId={projectId} />
}
