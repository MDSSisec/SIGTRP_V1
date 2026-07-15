"use client"

import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { notifyFormSaveSuccess } from "@/features/projetos/components/project-ted/shared/form-save-toast"
import { FormSectionCard, formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { FORM_INPUT_CLASS } from "@/features/projetos/components/project-ted/shared/form-fields"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"

interface DadosResultadosEsperados {
  resultados: string[]
}

interface PropsFormularioResultadosEsperados {
  onChange?: (dados: DadosResultadosEsperados) => void
  projectId?: string
}

const VAZIO: DadosResultadosEsperados = { resultados: [""] }

function getIniciais(projectData: ReturnType<typeof useProjectData>): DadosResultadosEsperados {
  const itens = projectData?.resultados_esperados?.itens
  if (itens?.length) {
    return { resultados: [...itens] }
  }
  return VAZIO
}

function FormularioResultadosEsperados({
  onChange,
  projectId: _projectId,
}: PropsFormularioResultadosEsperados) {
  const projectData = useProjectData()
  const [dadosFormulario, setDadosFormulario] = useState<DadosResultadosEsperados>(VAZIO)

  useEffect(() => {
    setDadosFormulario(getIniciais(projectData))
  }, [projectData])

  const aoAlterarResultado = (indice: number, valor: string) => {
    const atualizados = [...dadosFormulario.resultados]
    atualizados[indice] = valor
    const novos = { resultados: atualizados }
    setDadosFormulario(novos)
    onChange?.(novos)
  }

  const adicionarResultado = () => {
    setDadosFormulario({
      resultados: [...dadosFormulario.resultados, ""],
    })
  }

  const removerResultado = (indice: number) => {
    const atualizados = dadosFormulario.resultados.filter((_, i) => i !== indice)
    const novos = { resultados: atualizados.length ? atualizados : [""] }
    setDadosFormulario(novos)
    onChange?.(novos)
  }

  return (
    <FormSectionCard>
      <section className={formLayoutStyles.section}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-2">
          <h2 className="m-0 text-base font-semibold text-foreground">
            10. Resultados esperados
          </h2>
          <GenericButton variant="outline" size="sm" onClick={adicionarResultado}>
            Adicionar resultado
          </GenericButton>
        </div>

        <div className="flex flex-col gap-4">
          {dadosFormulario.resultados.map((texto, indice) => (
            <div key={indice} className={formLayoutStyles.fieldGroup}>
              <Label htmlFor={`resultado-${indice}`} className={formLayoutStyles.label}>
                Resultado {indice + 1}.
              </Label>
              <Input
                id={`resultado-${indice}`}
                value={texto}
                onChange={(e) => aoAlterarResultado(indice, e.target.value)}
                placeholder="Descreva o resultado esperado..."
                className={FORM_INPUT_CLASS}
              />
              {dadosFormulario.resultados.length > 1 && (
                <div className="flex justify-end">
                  <GenericButton
                    variant="destructive"
                    size="sm"
                    onClick={() => removerResultado(indice)}
                  >
                    Excluir
                  </GenericButton>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton
          variant="salvar"
          onClick={() => notifyFormSaveSuccess("Resultados esperados salvos com sucesso!")}
        />
      </div>
    </FormSectionCard>
  )
}

export function ResultadosEsperados(props: PropsFormularioResultadosEsperados) {
  return <FormularioResultadosEsperados {...props} />
}
