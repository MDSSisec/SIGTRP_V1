"use client"

import { CheckCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type SuccessModalProps = {
  open: boolean
  title: string
  description: string
  confirmText?: string
  isLoading?: boolean
  onConfirm: () => void
}

export function SuccessModal({
  open,
  title,
  description,
  confirmText = "OK",
  isLoading = false,
  onConfirm,
}: SuccessModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={onConfirm}
    >
      <div
        aria-modal="true"
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-lg"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircleIcon className="size-7" />
        </div>

        <div className="mt-4 space-y-2">
          <h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Button type="button" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Aguarde..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
