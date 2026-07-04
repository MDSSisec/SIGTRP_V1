"use client";

import { Button } from "@/components/ui/button";

type ConfirmeModalVariant = "default" | "destructive";

type ConfirmeModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmeModalVariant;
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export function ConfirmeModal({
  open,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmeModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={onCancel}
    >
      <div
        aria-modal="true"
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-card-foreground">
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-2">
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
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={() => void onConfirm()}
            disabled={isLoading}
          >
            {isLoading ? "Processando..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
