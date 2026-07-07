import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GenericButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "link"
  | "editar"
  | "salvar"

type GenericButtonProps = Omit<React.ComponentProps<typeof Button>, "variant"> & {
  variant?: GenericButtonVariant
  icon?: LucideIcon
}

function mapVariant(variant: GenericButtonVariant | undefined) {
  if (variant === "editar") return "outline"
  if (variant === "salvar") return "default"
  return variant ?? "default"
}

export function GenericButton({
  className,
  variant,
  icon: Icon,
  children,
  ...props
}: GenericButtonProps) {
  return (
    <Button className={cn(className)} variant={mapVariant(variant)} {...props}>
      {Icon ? <Icon className="size-4" /> : null}
      {children}
    </Button>
  )
}

export default GenericButton
