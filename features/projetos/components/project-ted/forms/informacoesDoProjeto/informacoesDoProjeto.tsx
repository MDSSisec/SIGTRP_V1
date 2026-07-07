"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import StatusStepper from "@/components/StatusStepper/statusStepper"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import {
  PROJECT_TYPE_OPTIONS,
  STATUS_PROJETO_LIST,
  type ProjectTipo,
  type StatusProjeto,
} from "@/features/projetos/constants/ted/project"
import { useProjectData } from "@/features/projetos/contexts/project-data-context"
import { SESSOES_VISAO_GERAL_TITLE } from "@/features/projetos/constants/ted/visao-geral"
import {
  fetchResponsaveisExternos,
  fetchResponsaveisInternos,
  STATUS_PROJETO_STEPS,
  statusToStepIndex,
} from "@/features/projetos/services"
import type { ProjectModelData } from "@/features/projetos/types/ted"
import type { ResponsavelOption } from "@/features/projetos/types"
import { FormSectionCard, formLayoutStyles } from "@/features/projetos/components/project-ted/shared/form-section"
import { FORM_SELECT_CLASS } from "@/features/projetos/components/project-ted/shared/form-fields"
import { useAsyncData } from "@/hooks/use-async-data"
import type { ProjectFormSectionProps } from "../sections-map"

const classeInputBase = FORM_SELECT_CLASS

interface DadosInformacoesProjeto {
  tipoProjeto: ProjectTipo
  status: StatusProjeto
  responsavelInternoId: string
  responsavelExternoId: string
}

const STATUS_OPTIONS = STATUS_PROJETO_LIST.map((s) => ({ value: s, label: s }))
const TIPO_PROJETO_OPTIONS = PROJECT_TYPE_OPTIONS.filter((o) => o.value !== "")

const VAZIO: DadosInformacoesProjeto = {
  tipoProjeto: "TED",
  status: "TRP em Elaboração",
  responsavelInternoId: "",
  responsavelExternoId: "",
}

function getDadosIniciais(projectData: ProjectModelData | null): DadosInformacoesProjeto {
  if (!projectData) return VAZIO

  return {
    tipoProjeto: (projectData.tipo as ProjectTipo) ?? "TED",
    status: (projectData.status as StatusProjeto) ?? "TRP em Elaboração",
    responsavelInternoId: String(projectData.responsavelInternoId ?? ""),
    responsavelExternoId: String(projectData.responsavelExternoId ?? ""),
  }
}

export function InformacoesDoProjeto({ projectId, readOnlyView }: ProjectFormSectionProps) {
  const projectData = useProjectData()
  const [isEditing, setIsEditing] = useState(false)
  const [dados, setDados] = useState<DadosInformacoesProjeto>(() =>
    getDadosIniciais(projectData),
  )

  const { data: responsaveisInternos } = useAsyncData(fetchResponsaveisInternos, {
    initialData: [] as ResponsavelOption[],
    errorMessage: "Não foi possível carregar os responsáveis internos.",
  })

  const { data: responsaveisExternos } = useAsyncData(fetchResponsaveisExternos, {
    initialData: [] as ResponsavelOption[],
    errorMessage: "Não foi possível carregar os responsáveis externos.",
  })

  useEffect(() => {
    setDados(getDadosIniciais(projectData))
  }, [projectData])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setDados((prev) => ({ ...prev, [name]: value }))
  }

  const currentStep = useMemo(() => statusToStepIndex(dados.status), [dados.status])
  const [itensConcluidos] = useState<Set<string>>(new Set())

  const isLocked = readOnlyView || !isEditing

  return (
    <FormSectionCard>
      {projectId && (
        <StatusStepper
          steps={STATUS_PROJETO_STEPS}
          currentStep={currentStep}
          collapsible
          collapsibleLabel="Status do projeto"
        />
      )}

      <section className={formLayoutStyles.section}>
        <h2 className={formLayoutStyles.title}>Informações do Projeto</h2>
        <div className={formLayoutStyles.grid2}>
          <div className={formLayoutStyles.fieldGroup}>
            <Label htmlFor="tipoProjeto" className={formLayoutStyles.label}>
              Tipo do projeto
            </Label>
            <select
              id="tipoProjeto"
              name="tipoProjeto"
              value={dados.tipoProjeto}
              onChange={handleChange}
              className={classeInputBase}
              disabled={isLocked}
            >
              {TIPO_PROJETO_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className={formLayoutStyles.fieldGroup}>
            <Label htmlFor="status" className={formLayoutStyles.label}>
              Status
            </Label>
            <select
              id="status"
              name="status"
              value={dados.status}
              onChange={handleChange}
              className={classeInputBase}
              disabled={isLocked}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className={formLayoutStyles.section}>
        <h2 className={formLayoutStyles.title}>Responsáveis</h2>
        <div className={formLayoutStyles.grid2}>
          <div className={formLayoutStyles.fieldGroup}>
            <Label htmlFor="responsavelInternoId" className={formLayoutStyles.label}>
              Usuário interno
            </Label>
            <select
              id="responsavelInternoId"
              name="responsavelInternoId"
              value={dados.responsavelInternoId}
              onChange={handleChange}
              className={classeInputBase}
              disabled={isLocked}
            >
              <option value="">Selecione...</option>
              {responsaveisInternos.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>
          <div className={formLayoutStyles.fieldGroup}>
            <Label htmlFor="responsavelExternoId" className={formLayoutStyles.label}>
              Usuário externo
            </Label>
            <select
              id="responsavelExternoId"
              name="responsavelExternoId"
              value={dados.responsavelExternoId}
              onChange={handleChange}
              className={classeInputBase}
              disabled={isLocked}
            >
              <option value="">Selecione...</option>
              {responsaveisExternos.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className={formLayoutStyles.section}>
        <h2 className={formLayoutStyles.title}>Itens Preenchidos</h2>
        <div className={`${formLayoutStyles.innerCard} grid grid-cols-1 gap-4 md:grid-cols-2`}>
          {Object.entries(SESSOES_VISAO_GERAL_TITLE)
            .filter(([key]) => key !== "TITLE_SESSAO_OBSERVACOES")
            .map(([key, title]) => (
              <div key={key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={itensConcluidos.has(key)}
                  readOnly
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">{title}</span>
              </div>
            ))}
        </div>
      </section>

      {!readOnlyView && (
        <div className={formLayoutStyles.actions}>
          {!isEditing ? (
            <GenericButton variant="editar" onClick={() => setIsEditing(true)} />
          ) : (
            <>
              <GenericButton variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </GenericButton>
              <GenericButton variant="salvar" onClick={() => setIsEditing(false)} />
            </>
          )}
        </div>
      )}
    </FormSectionCard>
  )
}
