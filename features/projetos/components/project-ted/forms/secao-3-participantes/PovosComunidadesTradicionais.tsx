"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { notifyFormSaveSuccess } from "@/features/projetos/components/project-ted/shared/form-save-toast"
import { FormSectionCard, formLayoutStyles } from "@/features/projeto/components/formShared/form-section"
import { FORM_CHECKBOX_CLASS, FORM_INPUT_CLASS } from "@/features/projetos/components/project-ted/shared/form-fields"

const OPCOES = [
  { id: "indigenas", label: "Indígenas" },
  { id: "quilombolas", label: "Comunidades quilombolas" },
  { id: "terreiro", label: "Comunidades de terreiro" },
  { id: "caboclas", label: "Comunidades caboclas" },
  { id: "extrativistas", label: "Extrativistas" },
  { id: "ribeirinhos", label: "Ribeirinhos (as)" },
  { id: "pescadores", label: "Pescadores (as) artesanais" },
  { id: "outros", label: "Outros povos e comunidades tradicionais; Quais:", comEspecificar: true as const },
  { id: "nao_se_aplica", label: "Não se aplica" },
]

function temEspecificar(op: (typeof OPCOES)[number]): op is (typeof OPCOES)[number] & { comEspecificar: true } {
  return "comEspecificar" in op && op.comEspecificar === true
}

type Props = { projectId?: string; onChange?: (dados: { selecoes: string[]; outrosQuais?: string }) => void }

export function PovosComunidadesTradicionais({ projectId: _projectId, onChange }: Props) {
  const [selecoes, setSelecoes] = useState<string[]>([])
  const [outrosQuais, setOutrosQuais] = useState("")

  const toggle = (id: string) => {
    const next = selecoes.includes(id)
      ? selecoes.filter((s) => s !== id)
      : [...selecoes, id]
    setSelecoes(next)
    onChange?.({ selecoes: next, outrosQuais })
  }

  const handleOutrosChange = (value: string) => {
    setOutrosQuais(value)
    onChange?.({ selecoes, outrosQuais: value })
  }

  return (
    <FormSectionCard>
      <section className={formLayoutStyles.section}>
        <h2 className="m-0 text-base font-semibold text-foreground">
          15. Informe se o público beneficiário faz parte de algum destes povos ou comunidades tradicionais
        </h2>

        <div className="space-y-3">
          {OPCOES.map((op) => (
            <div key={op.id} className="flex flex-wrap items-center gap-3">
              <input
                type="checkbox"
                id={op.id}
                checked={selecoes.includes(op.id)}
                onChange={() => toggle(op.id)}
                className={FORM_CHECKBOX_CLASS}
              />
              <Label htmlFor={op.id} className={`${formLayoutStyles.label} cursor-pointer`}>
                {op.label}
              </Label>
              {temEspecificar(op) && selecoes.includes(op.id) && (
                <Input
                  value={outrosQuais}
                  onChange={(e) => handleOutrosChange(e.target.value)}
                  placeholder="Especificar"
                  className={`max-w-xs ${FORM_INPUT_CLASS}`}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <GenericButton variant="editar" onClick={() => {}} />
        <GenericButton
          variant="salvar"
          onClick={() =>
            notifyFormSaveSuccess("Povos e comunidades tradicionais salvos com sucesso!")
          }
        />
      </div>
    </FormSectionCard>
  )
}
