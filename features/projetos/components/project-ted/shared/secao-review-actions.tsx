"use client"

import { useState, type ReactNode } from "react"
import { AlertTriangle, Lock, LockOpen } from "lucide-react"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { useTedReview } from "@/features/projetos/contexts/ted-review-context"
import { TED_IDENTIFICACAO_SECAO_SLUGS } from "@/features/projetos/types/ted-secao-review"
import { cn } from "@/lib/utils"

const SECOES_COM_REVIEW = new Set<string>(TED_IDENTIFICACAO_SECAO_SLUGS)

/** Botões de review no header, ao lado de "Voltar". */
export function SecaoReviewHeaderActions() {
  const review = useTedReview()
  const [comentario, setComentario] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)

  if (!review?.canManage) return null
  if (!review.secaoSlug || !SECOES_COM_REVIEW.has(review.secaoSlug)) return null

  const bloqueada = Boolean(review.review?.bloqueada)
  const precisaAtencao = review.review?.statusRevisao === "precisa_atencao"

  return (
    <div className="flex flex-wrap items-center gap-2">
      {review.error ? (
        <p className="text-xs text-destructive">{review.error}</p>
      ) : null}

      {bloqueada ? (
        <GenericButton
          variant="outline"
          size="sm"
          icon={LockOpen}
          disabled={review.isSaving}
          onClick={() => void review.desbloquearSecao()}
        >
          Desbloquear
        </GenericButton>
      ) : (
        <GenericButton
          variant="outline"
          size="sm"
          icon={Lock}
          disabled={review.isSaving || review.isMarkingAtencao}
          onClick={() => void review.bloquearSecao()}
        >
          Bloquear
        </GenericButton>
      )}

      {precisaAtencao && !review.isMarkingAtencao ? (
        <GenericButton
          variant="outline"
          size="sm"
          disabled={review.isSaving}
          onClick={() => void review.limparAtencao()}
        >
          Limpar atenção
        </GenericButton>
      ) : null}

      {!review.isMarkingAtencao ? (
        <GenericButton
          variant="outline"
          size="sm"
          icon={AlertTriangle}
          disabled={review.isSaving}
          onClick={() => {
            review.setIsMarkingAtencao(true)
            setComentario(review.review?.comentario ?? "")
            setShowConfirm(false)
          }}
        >
          Marcar atenção
        </GenericButton>
      ) : (
        <>
          <GenericButton
            variant="outline"
            size="sm"
            disabled={review.isSaving}
            onClick={() => {
              review.setIsMarkingAtencao(false)
              setShowConfirm(false)
            }}
          >
            Cancelar marcação
          </GenericButton>
          <GenericButton
            variant="salvar"
            size="sm"
            disabled={review.isSaving || review.selectedCampoKeys.size === 0}
            onClick={() => setShowConfirm(true)}
          >
            Confirmar ({review.selectedCampoKeys.size})
          </GenericButton>
        </>
      )}

      {showConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-background p-4 shadow-lg">
            <h3 className="mb-2 text-sm font-semibold">Campos que precisam de atenção</h3>
            <p className="mb-2 text-xs text-muted-foreground">
              {review.selectedCampoKeys.size} campo(s) selecionado(s). Descreva o que
              deve ser corrigido:
            </p>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={4}
              className="mb-3 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              placeholder="Ex.: CNPJ inválido, endereço incompleto..."
            />
            <div className="flex justify-end gap-2">
              <GenericButton
                variant="outline"
                size="sm"
                disabled={review.isSaving}
                onClick={() => setShowConfirm(false)}
              >
                Voltar
              </GenericButton>
              <GenericButton
                variant="salvar"
                size="sm"
                disabled={review.isSaving || !comentario.trim()}
                onClick={() => {
                  void review
                    .confirmarAtencao(comentario.trim())
                    .then(() => setShowConfirm(false))
                    .catch(() => undefined)
                }}
              >
                {review.isSaving ? "Salvando..." : "Salvar atenção"}
              </GenericButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function SecaoReviewBanner() {
  const review = useTedReview()
  if (!review) return null

  if (review.isMarkingAtencao) {
    return (
      <div className="mb-4 flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-900 dark:text-amber-100">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <p>
          <span className="font-medium">Modo marcar atenção:</span> marque o checkbox ao
          lado do nome de cada campo que precisa de correção (a borda fica vermelha).
          Depois confirme no topo.
        </p>
      </div>
    )
  }

  if (!review.review) return null

  if (review.review.statusRevisao === "precisa_atencao") {
    return (
      <div className="mb-4 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <div>
          <p className="font-medium">Esta seção precisa de atenção</p>
          {review.review.comentario ? (
            <p className="mt-0.5 text-destructive/90">{review.review.comentario}</p>
          ) : null}
        </div>
      </div>
    )
  }

  if (review.review.bloqueada) {
    return (
      <div className="mb-4 flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-800 dark:text-amber-200">
        <Lock className="mt-0.5 size-4 shrink-0" />
        <p className="font-medium">
          Seção bloqueada pelo gestor interno do MDS. Não pode ser alterada.
        </p>
      </div>
    )
  }

  return null
}

/** Classe extra para inputs marcados com atenção. */
export const CAMPO_ATENCAO_CLASS =
  "!border-destructive !ring-2 !ring-destructive/30 bg-destructive/5"

/** Label com checkbox ao lado no modo "Marcar atenção". */
export function CampoReviewLabel({
  htmlFor,
  campoKey,
  className,
  children,
}: {
  htmlFor?: string
  /** Se omitido, não exibe checkbox (campo só leitura, ex.: nome do projeto). */
  campoKey?: string
  className?: string
  children: ReactNode
}) {
  const review = useTedReview()
  const showCheckbox =
    Boolean(campoKey) &&
    Boolean(review?.canManage) &&
    Boolean(review?.isMarkingAtencao)

  const checked = campoKey ? Boolean(review?.isCampoAtencao(campoKey)) : false

  return (
    <div className="mb-1.5 flex items-center gap-2">
      {showCheckbox && campoKey ? (
        <input
          type="checkbox"
          checked={checked}
          onChange={() => review?.toggleCampoSelection(campoKey)}
          aria-label={`Marcar atenção: ${typeof children === "string" ? children : campoKey}`}
          className="size-4 shrink-0 cursor-pointer accent-destructive"
        />
      ) : null}
      <Label htmlFor={htmlFor} className={cn(className, "mb-0")}>
        {children}
      </Label>
    </div>
  )
}

export function useCampoAtencaoClass(campoKey: string) {
  const review = useTedReview()
  if (!review) return ""

  const marcado = review.isCampoAtencao(campoKey)
  if (!marcado) return ""

  return CAMPO_ATENCAO_CLASS
}
