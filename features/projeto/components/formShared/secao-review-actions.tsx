"use client"

import { useState, type ReactNode } from "react"
import { AlertTriangle, CircleHelp, Lock, LockOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTedReview } from "@/features/projeto/contexts/ted-review-context"
import { SECOES_COM_REVIEW } from "@/features/projeto/constants/secao-review"
import { cn } from "@/lib/utils"

const SECOES_COM_REVIEW_SET = new Set<string>(SECOES_COM_REVIEW)

const HELP_BLOQUEAR =
  "Fecha a seção inteira e limpa marcações de atenção. Use quando estiver tudo certo."

const HELP_DESBLOQUEAR =
  "Reabre a seção para edição completa pelo proponente."

const HELP_MARCAR_ATENCAO =
  "Selecione os campos e confirme: a seção fecha, mas só os itens marcados ficam editáveis para o proponente."

function ButtonHelpHint({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            aria-label="Ajuda"
            className="pointer-events-auto inline-flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
            onPointerDown={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
          />
        }
      >
        <CircleHelp className="size-3.5" />
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs text-wrap">
        {text}
      </TooltipContent>
    </Tooltip>
  )
}

/** Botões de review no header, ao lado de "Voltar". */
export function SecaoReviewHeaderActions() {
  const review = useTedReview()
  const [comentario, setComentario] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)

  if (!review?.canManage) return null
  if (!review.secaoSlug || !SECOES_COM_REVIEW_SET.has(review.secaoSlug)) return null

  const bloqueada = Boolean(review.review?.bloqueada)
  const precisaAtencao = review.review?.statusRevisao === "precisaAtencao"

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-2">
        {review.error ? (
          <p className="text-xs text-destructive">{review.error}</p>
        ) : null}

        {bloqueada ? (
          <Button
            variant="outline"
            size="sm"
            disabled={review.isSaving}
            onClick={() => void review.desbloquearSecao()}
          >
            <LockOpen className="size-4" />
            Desbloquear
            <ButtonHelpHint text={HELP_DESBLOQUEAR} />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled={review.isSaving || review.isMarkingAtencao}
            onClick={() => void review.bloquearSecao()}
          >
            <Lock className="size-4" />
            Bloquear
            <ButtonHelpHint text={HELP_BLOQUEAR} />
          </Button>
        )}

        {precisaAtencao && !review.isMarkingAtencao ? (
          <Button
            variant="outline"
            size="sm"
            disabled={review.isSaving}
            onClick={() => void review.limparAtencao()}
          >
            Limpar atenção
          </Button>
        ) : null}

        {!review.isMarkingAtencao ? (
          <Button
            variant="outline"
            size="sm"
            disabled={review.isSaving}
            onClick={() => {
              review.setIsMarkingAtencao(true)
              setComentario(review.review?.comentario ?? "")
              setShowConfirm(false)
            }}
          >
            <AlertTriangle className="size-4" />
            Marcar atenção
            <ButtonHelpHint text={HELP_MARCAR_ATENCAO} />
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              disabled={review.isSaving}
              onClick={() => {
                review.setIsMarkingAtencao(false)
                setShowConfirm(false)
              }}
            >
              Cancelar marcação
            </Button>
            <Button
              size="sm"
              disabled={review.isSaving || review.selectedCampoKeys.size === 0}
              onClick={() => setShowConfirm(true)}
            >
              Confirmar ({review.selectedCampoKeys.size})
            </Button>
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
                className="mb-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                placeholder="Ex.: CNPJ inválido, endereço incompleto..."
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={review.isSaving}
                  onClick={() => setShowConfirm(false)}
                >
                  Voltar
                </Button>
                <Button
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
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </TooltipProvider>
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

  if (review.review.statusRevisao === "precisaAtencao") {
    return (
      <div className="mb-4 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <div>
          <p className="font-medium">Esta seção precisa de atenção</p>
          <p className="mt-0.5 text-destructive/90">
            Os demais campos foram fechados. Edite apenas os itens destacados.
          </p>
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

/** Campos OK (sem atenção) — cinza claro só no modo edição / marcação. */
export const CAMPO_OK_MUTED_CLASS =
  "!bg-muted/55 !text-muted-foreground !border-muted-foreground/25 " +
  "disabled:!bg-muted/55 disabled:!opacity-100 disabled:!text-muted-foreground " +
  "placeholder:!text-muted-foreground/60"

/**
 * Classes de revisão por campo: atenção (vermelho) ou OK muteado (cinza).
 * Em visualização, campos OK ficam sem mute.
 */
export function campoReviewVisualClasses(
  options: {
    isCampoOkMuted: (campoKey: string) => boolean
    isCampoViewMode: (campoKey: string) => boolean
    isCampoAtencao?: (campoKey: string) => boolean
    viewModeClass?: string
    attentionClass?: string
    okMutedClass?: string
  },
  campoKey: string,
): string {
  const muted = options.isCampoOkMuted(campoKey)
  const atencao = Boolean(options.isCampoAtencao?.(campoKey))

  return cn(
    muted
      ? (options.okMutedClass ?? CAMPO_OK_MUTED_CLASS)
      : !atencao &&
          options.isCampoViewMode(campoKey) &&
          options.viewModeClass,
    atencao && (options.attentionClass ?? CAMPO_ATENCAO_CLASS),
  )
}

/** Label com checkbox ao lado no modo "Marcar atenção". */
export function CampoReviewLabel({
  htmlFor,
  campoKey,
  className,
  muted,
  children,
}: {
  htmlFor?: string
  /** Se omitido, não exibe checkbox (campo só leitura, ex.: nome do projeto). */
  campoKey?: string
  className?: string
  /** Reduz o foco do label (campo OK na edição com atenção). */
  muted?: boolean
  children: ReactNode
}) {
  const review = useTedReview()
  const showCheckbox =
    Boolean(campoKey) &&
    Boolean(review?.canManage) &&
    Boolean(review?.isMarkingAtencao)

  const checked = campoKey ? Boolean(review?.isCampoAtencao(campoKey)) : false
  const labelMuted =
    muted ||
    (Boolean(campoKey) &&
      Boolean(review?.isMarkingAtencao) &&
      !review?.isCampoAtencao(campoKey!))

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
      <Label
        htmlFor={htmlFor}
        className={cn(className, "mb-0", labelMuted && "text-muted-foreground")}
      >
        {children}
      </Label>
    </div>
  )
}

export function useCampoAtencaoClass(campoKey: string) {
  const review = useTedReview()
  if (!review) return ""

  if (review.isMarkingAtencao && !review.isCampoAtencao(campoKey)) {
    return CAMPO_OK_MUTED_CLASS
  }

  const marcado = review.isCampoAtencao(campoKey)
  if (!marcado) return ""

  return CAMPO_ATENCAO_CLASS
}
