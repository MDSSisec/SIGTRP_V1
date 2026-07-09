"use client";

import type { ReactNode } from "react";
import { LoaderCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type LoadingProps = {
  label?: string
  className?: string
  icon?: ReactNode
}

export function Loading({
  label = "Carregando...",
  className,
  icon,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border bg-card p-6 text-center",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {icon ?? <LoaderCircleIcon className="size-8 animate-spin text-primary" />}
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  )
}
