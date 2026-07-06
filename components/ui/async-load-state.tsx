"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Loading } from "@/components/ui/loading"

type AsyncLoadStateProps = {
  isLoading: boolean
  error: string | null
  loadingLabel?: string
  errorClassName?: string
  children: ReactNode
}

export function AsyncLoadState({
  isLoading,
  error,
  loadingLabel = "Carregando...",
  errorClassName,
  children,
}: AsyncLoadStateProps) {
  if (isLoading) {
    return <Loading label={loadingLabel} />
  }

  if (error) {
    return (
      <div
        className={cn(
          "rounded-lg border bg-card p-6 text-sm text-destructive",
          errorClassName,
        )}
        role="alert"
      >
        {error}
      </div>
    )
  }

  return children
}
