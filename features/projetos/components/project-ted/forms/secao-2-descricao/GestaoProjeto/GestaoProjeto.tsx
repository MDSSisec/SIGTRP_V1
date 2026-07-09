"use client"

import React, { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { notifyFormSaveSuccess } from "@/features/projetos/components/project-ted/shared/form-save-toast"
import { FormSectionCard, formLayoutStyles } from "@/features/projetos/components/project-ted/shared/form-section"
import { FORM_INPUT_CLASS, FORM_TEXTAREA_CLASS } from "@/features/projetos/components/project-ted/shared/form-fields"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"

interface DadosGestaoProjeto {
  dimensionamentoEquipe: string
  necessidade: string
  servicosOuBens: string
  formaSelecao: string
}

interface PropsFormularioGestaoProjeto {
  onChange?: (dados: DadosGestaoProjeto) => void
  projectId?: string
}

const VAZIO: DadosGestaoProjeto = {
  dimensionamentoEquipe: "",
  necessidade: "",
  servicosOuBens: "",
  formaSelecao: "",
}

function getInicialGestaoProjeto(projectData: ReturnType<typeof useProjectData>): DadosGestaoProjeto {
  const g = projectData?.gestao_projeto
  if (!g) return VAZIO
  return {
    dimensionamentoEquipe: g.dimensionamento_equipe ?? "",
    necessidade: g.dimensionamento_contratacoes?.necessidade ?? "",
    servicosOuBens: g.dimensionamento_contratacoes?.servicos_ou_bens ?? "",
    formaSelecao: g.dimensionamento_contratacoes?.forma_selecao ?? "",
  }
}

function FormularioGestaoProjeto({ onChange, projectId: _projectId }: PropsFormularioGestaoProjeto) {
  const projectData = useProjectData()
  const [dadosFormulario, setDadosFormulario] = useState<DadosGestaoProjeto>(VAZIO)

  useEffect(() => {
    if (projectData) {
      setDadosFormulario(getInicialGestaoProjeto(projectData))
    }
  }, [projectData])

  const aoAlterar =
    (campo: keyof DadosGestaoProjeto) =>
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const dadosAtualizados = { ...dadosFormulario, [campo]: e.target.value }
      setDadosFormulario(dadosAtualizados)
      onChange?.(dadosAtualizados)
    }

  return (
    <FormSectionCard>
      <section className={formLayoutStyles.section}>
        <h2 className="m-0 text-base font-semibold text-foreground">
          11. Gestão do Projeto
        </h2>

        <div className={formLayoutStyles.innerCard}>
          <h3 className="m-0 text-sm font-semibold text-foreground">
            11.1. Dimensionamento da equipe
          </h3>
          <textarea
            id="dimensionamentoEquipe"
            value={dadosFormulario.dimensionamentoEquipe}
            onChange={aoAlterar("dimensionamentoEquipe")}
            rows={4}
            placeholder="Descreva o dimensionamento da equipe..."
            className={FORM_TEXTAREA_CLASS}
          />
        </div>

        <div className={formLayoutStyles.innerCard}>
          <h3 className="m-0 text-sm font-semibold text-foreground">
            11.2. Dimensionamento das contratações
          </h3>

          <div className={formLayoutStyles.fieldGroup}>
            <Label htmlFor="necessidade" className={formLayoutStyles.label}>
              Necessidade
            </Label>
            <Input
              id="necessidade"
              value={dadosFormulario.necessidade}
              onChange={aoAlterar("necessidade")}
              placeholder="Ex.: Realização dos Cursos"
              className={FORM_INPUT_CLASS}
            />
          </div>

          <div className={formLayoutStyles.fieldGroup}>
            <Label htmlFor="servicosOuBens" className={formLayoutStyles.label}>
              Serviços ou bens
            </Label>
            <textarea
              id="servicosOuBens"
              value={dadosFormulario.servicosOuBens}
              onChange={aoAlterar("servicosOuBens")}
              rows={3}
              placeholder="Descreva os serviços ou bens a serem contratados..."
              className={FORM_TEXTAREA_CLASS}
            />
          </div>

          <div className={formLayoutStyles.fieldGroup}>
            <Label htmlFor="formaSelecao" className={formLayoutStyles.label}>
              Forma de seleção
            </Label>
            <Input
              id="formaSelecao"
              value={dadosFormulario.formaSelecao}
              onChange={aoAlterar("formaSelecao")}
              placeholder="Ex.: Processo Licitatório"
              className={FORM_INPUT_CLASS}
            />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton
          variant="salvar"
          onClick={() => notifyFormSaveSuccess("Gestão do projeto salva com sucesso!")}
        />
      </div>
    </FormSectionCard>
  )
}

export default FormularioGestaoProjeto
