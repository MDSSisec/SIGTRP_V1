"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { notifyFormSaveSuccess } from "@/features/projetos/components/project-ted/shared/form-save-toast"
import { FormSectionCard, formLayoutStyles } from "@/features/projetos/components/project-ted/shared/form-section"
import { FORM_CHECKBOX_CLASS, FORM_INPUT_CLASS } from "@/features/projetos/components/project-ted/shared/form-fields"

const OPCOES = [
  { id: "centros_pop", label: "Centros de Referência Especializado para População em Situação de Rua (Centros POP)" },
  { id: "caps", label: "Centros de Atenção Psicossocial (CAPS)" },
  { id: "bolsa_familia", label: "Bolsa Família" },
  { id: "previdencia_bpc", label: "Previdência Social ou Benefício de Prestação Continuada" },
  { id: "outros", label: "Outros (Especificar):", comEspecificar: true as const },
]

function temEspecificar(op: (typeof OPCOES)[number]): op is (typeof OPCOES)[number] & { comEspecificar: true } {
  return "comEspecificar" in op && op.comEspecificar === true
}

type Props = { projectId?: string; onChange?: (dados: { selecoes: string[]; outrosEspecificar?: string }) => void }

export function ServicosAcessados({ projectId: _projectId, onChange }: Props) {
  const [selecoes, setSelecoes] = useState<string[]>([])
  const [outrosEspecificar, setOutrosEspecificar] = useState("")

  const toggle = (id: string) => {
    const next = selecoes.includes(id)
      ? selecoes.filter((s) => s !== id)
      : [...selecoes, id]
    setSelecoes(next)
    onChange?.({ selecoes: next, outrosEspecificar })
  }

  const handleOutrosChange = (value: string) => {
    setOutrosEspecificar(value)
    onChange?.({ selecoes, outrosEspecificar: value })
  }

  return (
    <FormSectionCard>
      <section className={formLayoutStyles.section}>
        <h2 className="m-0 text-base font-semibold text-foreground">
          17. Informe se o público beneficiário está acessando alguns dos seguintes serviços
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
                  value={outrosEspecificar}
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
          onClick={() => notifyFormSaveSuccess("Serviços acessados salvos com sucesso!")}
        />
      </div>
    </FormSectionCard>
  )
}
