"use client"

import { AlertTriangle, Lock } from "lucide-react"
import { formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { TITLE_KEY_TO_SECAO_SLUG } from "@/features/projeto/constants/secao-review"
import type { TedSecaoReview } from "@/features/projeto/types/ted-secao-review"
import { cn } from "@/lib/utils"

type ItemPreenchido = [string, string]

type InformacoesProjetoItensProps = {
  itensColunaEsquerda: ItemPreenchido[]
  itensColunaDireita: ItemPreenchido[]
  itensConcluidos: Set<string>
  getReview: (slug: string) => TedSecaoReview | null | undefined
  secaoTemAtencao: (slug: string) => boolean
}

export function InformacoesProjetoItens({
  itensColunaEsquerda,
  itensColunaDireita,
  itensConcluidos,
  getReview,
  secaoTemAtencao,
}: InformacoesProjetoItensProps) {
  return (
    <section className={formLayoutStyles.section}>
      <h2 className={formLayoutStyles.title}>Itens Preenchidos</h2>
      <div className={formLayoutStyles.innerCard}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[itensColunaEsquerda, itensColunaDireita].map(
            (coluna, colunaIndex) => (
              <div key={colunaIndex} className="flex min-w-0 flex-col gap-4">
                {coluna.map(([key, title]) => {
                  const preenchido = itensConcluidos.has(key)
                  const slug = TITLE_KEY_TO_SECAO_SLUG[key]
                  const review = slug ? getReview(slug) : null
                  const precisaAtencao = slug ? secaoTemAtencao(slug) : false
                  const bloqueada = Boolean(review?.bloqueada)

                  return (
                    <div key={key} className="flex items-start gap-3">
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
                            ? (review?.comentario ?? "Precisa de atenção")
                            : bloqueada
                              ? "Seção bloqueada"
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
                })}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
