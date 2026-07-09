"use client"

import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { notifyFormSaveSuccess } from "@/features/projetos/components/project-ted/shared/form-save-toast"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"
import { cn } from "@/lib/utils"

interface DadosOutrasInformacoesProponente {
  texto: string
}

const TITULO_PADRAO = "18. Outras informações julgadas apropriadas sobre a entidade proponente"

// ✅ Centralização das classes para manter o padrão visual e suporte ao Dark Mode
const classeInputBase = 
  "border-input placeholder:text-muted-foreground w-full min-w-0 rounded-md border !bg-[#ffffff] px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm text-gray-900 " +
  "dark:bg-neutral-950 dark:text-white dark:border-neutral-800 " +
  "disabled:!bg-[#ffffff] disabled:opacity-75 dark:disabled:bg-neutral-900 dark:disabled:text-neutral-500"

const classeTextarea = cn(classeInputBase, "min-h-[8rem] resize-y")

function getInicialFromModel(projectData: ReturnType<typeof useProjectData>): string {
  const data = (projectData as any)?.caracterizacao_proponente
  if (!data || typeof data !== "object") return ""
  return typeof data.outras_informacoes === "string" ? data.outras_informacoes : ""
}

function getPerguntaFromModel(projectData: ReturnType<typeof useProjectData>): string {
  const data = (projectData as any)?.caracterizacao_proponente
  if (!data?.pergunta) return TITULO_PADRAO
  return data.pergunta
}

interface PropsFormularioOutrasInformacoesProponente {
  onChange?: (dados: DadosOutrasInformacoesProponente) => void
  projectId?: string
  readOnlyView?: boolean
}

function FormularioOutrasInformacoesProponente({
  onChange,
  projectId,
  readOnlyView,
}: PropsFormularioOutrasInformacoesProponente) {
  const projectData = useProjectData()
  const [isEditing, setIsEditing] = useState(false)

  const [texto, setTexto] = useState<string>(() =>
    projectId === "2" && projectData ? getInicialFromModel(projectData) : ""
  )
  const pergunta = projectId === "2" && projectData ? getPerguntaFromModel(projectData) : TITULO_PADRAO

  useEffect(() => {
    if (projectId === "2" && projectData) {
      setTexto(getInicialFromModel(projectData))
    }
  }, [projectId, projectData])

  const aoAlterar = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setTexto(value)
    onChange?.({ texto: value })
  }

  const estaDesabilitado = readOnlyView || !isEditing

  return (
    <div className="space-y-8 rounded-xl bg-[#f5f5f5] dark:bg-black p-6 border border-gray-100 dark:border-neutral-800">
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-foreground border-b pb-2 dark:text-white dark:border-neutral-800">
          {pergunta}
        </h2>

        <div className="space-y-2">
          <Label
            htmlFor="outras-informacoes-proponente"
            className="font-medium text-foreground dark:text-neutral-200"
          >
            Informações adicionais
          </Label>
          <textarea
            id="outras-informacoes-proponente"
            name="texto"
            value={texto}
            onChange={aoAlterar}
            placeholder="Descreva outras informações relevantes sobre a entidade proponente..."
            rows={8}
            disabled={estaDesabilitado}
            className={cn(
              classeTextarea,
              estaDesabilitado && "cursor-default resize-none"
            )}
          />
        </div>
      </section>

      {/* Botões de ação com alternância e suporte a Dark Mode no rodapé */}
      {!readOnlyView && (
        <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6 dark:border-neutral-800">
          {!isEditing ? (
            <GenericButton variant="editar" onClick={() => setIsEditing(true)} />
          ) : (
            <>
              <GenericButton variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </GenericButton>
              <GenericButton
                variant="salvar"
                onClick={() => {
                  setIsEditing(false)
                  notifyFormSaveSuccess("Outras informações salvas com sucesso!")
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export function OutrasInformacoesProponente(
  props: PropsFormularioOutrasInformacoesProponente
) {
  return <FormularioOutrasInformacoesProponente {...props} />
}