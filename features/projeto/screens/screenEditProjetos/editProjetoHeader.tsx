"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SecaoReviewHeaderActions } from "@/features/projeto/components/formShared/secao-review-actions"

import { PROJETOS_ROUTE } from "../../constants"
import { PROJETOS_TEXT } from "../../constants/projetos.text"

/**
 * Cabeçalho da tela de edição de projetos.
 *
 * Exibe a ação de retorno para a listagem e as ações de revisão
 * da seção (bloquear / marcar atenção), disponíveis para todos os tipos.
 */
export function EditProjetoHeader() {
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

      <SecaoReviewHeaderActions />
    </header>
  )
}
