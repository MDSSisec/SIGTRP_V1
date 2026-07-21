"use client"

import { AlertTriangle, Lock } from "lucide-react"
import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { TITLE_KEY_TO_SECAO_SLUG } from "@/features/projeto/constants/secao-review"
import type { SecaoReview } from "@/features/projeto/types/secao-review"
import { cn } from "@/lib/utils"

import { ITENS_TRP_POR_COLUNA } from "../constants/form"

type ItemPreenchido = [string, string]

type InformacoesProjetoItensProps = {
  itensDadosGerais: ItemPreenchido[]
  itensDadosTrp: ItemPreenchido[]
  itensConcluidos: Set<string>
  getReview: (slug: string) => SecaoReview | null | undefined
  secaoTemAtencao: (slug: string) => boolean
}

function ItemLinha({
  itemKey,
  title,
  itensConcluidos,
  getReview,
  secaoTemAtencao,
}: {
  itemKey: string
  title: string
  itensConcluidos: Set<string>
  getReview: (slug: string) => SecaoReview | null | undefined
  secaoTemAtencao: (slug: string) => boolean
}) {
  const preenchido = itensConcluidos.has(itemKey)
  const slug = TITLE_KEY_TO_SECAO_SLUG[itemKey]
  const review = slug ? getReview(slug) : null
  const precisaAtencao = slug ? secaoTemAtencao(slug) : false
  const bloqueada = Boolean(review?.bloqueada)

  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={preenchido}
        readOnly
        className="mt-0.5 size-4 shrink-0 rounded-sm border border-input accent-[var(--primary)]"
      />
      <span
        className={cn(
          "flex min-w-0 flex-1 items-start gap-1.5 text-sm",
          precisaAtencao
            ? "font-medium text-destructive"
            : "text-muted-foreground",
        )}
        title={
          precisaAtencao
            ? (review?.comentario ?? "Precisa de atenÃ§Ã£o")
            : bloqueada
              ? "SeÃ§Ã£o bloqueada"
              : undefined
        }
      >
        <span className="min-w-0">{title}</span>
        {precisaAtencao ? (
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
        ) : null}
        {bloqueada ? (
          <Lock className="mt-0.5 size-3.5 shrink-0 text-amber-600" />
        ) : null}
      </span>
    </div>
  )
}

function ListaItens({
  itens,
  itensConcluidos,
  getReview,
  secaoTemAtencao,
  duasColunas = false,
}: {
  itens: ItemPreenchido[]
  itensConcluidos: Set<string>
  getReview: (slug: string) => SecaoReview | null | undefined
  secaoTemAtencao: (slug: string) => boolean
  duasColunas?: boolean
}) {
  if (itens.length === 0) return null

  const colunas = duasColunas
    ? [itens.slice(0, ITENS_TRP_POR_COLUNA), itens.slice(ITENS_TRP_POR_COLUNA)]
    : [itens]

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6",
        duasColunas && "sm:grid-cols-2",
      )}
    >
      {colunas.map((coluna, colunaIndex) => (
        <div key={colunaIndex} className="flex min-w-0 flex-col gap-4">
          {coluna.map(([key, title]) => (
            <ItemLinha
              key={key}
              itemKey={key}
              title={title}
              itensConcluidos={itensConcluidos}
              getReview={getReview}
              secaoTemAtencao={secaoTemAtencao}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function InformacoesProjetoItens({
  itensDadosGerais,
  itensDadosTrp,
  itensConcluidos,
  getReview,
  secaoTemAtencao,
}: InformacoesProjetoItensProps) {
  return (
    <section className={formLayoutStyles.section}>
      <h2 className={formLayoutStyles.title}>Itens Preenchidos</h2>
      <div className={formLayoutStyles.innerCard}>
        <div className="flex flex-col gap-6">
          <div className="flex min-w-0 flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              Dados Gerais:
            </h3>
            <ListaItens
              itens={itensDadosGerais}
              itensConcluidos={itensConcluidos}
              getReview={getReview}
              secaoTemAtencao={secaoTemAtencao}
            />
          </div>

          <div className="border-t border-border" />

          <div className="flex min-w-0 flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              Dados TRP:
            </h3>
            <ListaItens
              itens={itensDadosTrp}
              itensConcluidos={itensConcluidos}
              getReview={getReview}
              secaoTemAtencao={secaoTemAtencao}
              duasColunas
            />
          </div>
        </div>
      </div>
    </section>
  )
}
