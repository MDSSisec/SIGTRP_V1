import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import formLayout from "./form-layout.module.css"

type FormSectionCardProps = {
  children: ReactNode
  className?: string
}

export function FormSectionCard({ children, className }: FormSectionCardProps) {
  return <div className={cn(formLayout.card, className)}>{children}</div>
}

export { formLayout as formLayoutStyles }
