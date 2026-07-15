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

type GenericButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant"
> & {
  variant?: GenericButtonVariant
  icon?: LucideIcon
}

function mapVariant(
  variant?: GenericButtonVariant,
): React.ComponentProps<typeof Button>["variant"] {
  switch (variant) {
    case "editar":
      return "outline"
    case "salvar":
      return "default"
    default:
      return variant ?? "default"
  }
}

export function GenericButton({
  className,
  variant,
  icon: Icon,
  children,
  ...props
}: GenericButtonProps) {
  return (
    <Button
      className={cn(className)}
      variant={mapVariant(variant)}
      {...props}
    >
      {Icon && <Icon className="size-4" />}
      {children}
    </Button>
  )
}

export default GenericButton
