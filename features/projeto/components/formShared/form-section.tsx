import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import formLayout from "./form-layout.module.css"

/**
 * Propriedades do componente `FormSectionCard`.
 */
type FormSectionCardProps = {
  /** Conteúdo renderizado dentro do card. */
  children: ReactNode

  /** Classes CSS adicionais aplicadas ao container. */
  className?: string
}

/**
 * Container visual utilizado para agrupar uma seção de formulário.
 *
 * Aplica o estilo padrão de card do projeto e permite
 * a composição de classes CSS adicionais.
 */
export function FormSectionCard({
  children,
  className,
}: FormSectionCardProps) {
  return (
    <div className={cn(formLayout.card, className)}>
      {children}
    </div>
  )
}

/**
 * Exporta as classes de layout compartilhadas entre
 * as seções dos formulários.
 */
export { formLayout as formLayoutStyles }