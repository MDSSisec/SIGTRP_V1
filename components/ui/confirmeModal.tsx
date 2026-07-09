"use client"

import { TriangleAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

type ConfirmeModalVariant = "default" | "destructive"

type ConfirmeModalProps = {
  open: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: ConfirmeModalVariant
  isLoading?: boolean
  onConfirm: () => void | Promise<void>
  onCancel: () => void
}

export function ConfirmeModal({
  open,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "destructive",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmeModalProps) {
  if (!open) return null

  const isDestructive = variant === "destructive"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={onCancel}
    >
      <div
        aria-modal="true"
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-lg"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div
          className={`mx-auto flex size-12 items-center justify-center rounded-full ${
            isDestructive
              ? "bg-destructive/10 text-destructive"
              : "bg-primary/10 text-primary"
          }`}
        >
          <TriangleAlertIcon className="size-7" />
        </div>

        <div className="mt-4 space-y-2">
          <h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse justify-center gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={isDestructive ? "destructive" : "default"}
            onClick={() => void onConfirm()}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner />
                Aguarde...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
