"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SecaoReviewHeaderActions } from "@/features/projetos/components/project-ted/shared/secao-review-actions"

import { PROJETOS_ROUTE } from "../../constants"
import { PROJETOS_TEXT } from "../../constants/projetos.text"
import {
  PROJETO_TIPOS,
  type ProjetoTipo,
} from "../../constants/projeto-tipos"

type EditProjetoHeaderProps = {
  /** Tipo do projeto em edição. */
  tipoProjeto: ProjetoTipo
}

/**
 * Cabeçalho da tela de edição de projetos.
 *
 * Exibe a ação de retorno para a listagem e, quando o projeto é do tipo TED,
 * apresenta as ações relacionadas ao fluxo de revisão da seção.
 */
export function EditProjetoHeader({
  tipoProjeto,
}: EditProjetoHeaderProps) {
  const isTed = tipoProjeto === PROJETO_TIPOS.TED

  return (
    <header className="mb-4 flex flex-wrap items-center gap-2">
      <Button
        nativeButton={false}
        variant="outline"
        size="sm"
        className="bg-background"
        render={<Link href={PROJETOS_ROUTE} />}
      >
        <ArrowLeftIcon />
        {PROJETOS_TEXT.edit.backToList}
      </Button>

      {isTed && <SecaoReviewHeaderActions />}
    </header>
  )
}