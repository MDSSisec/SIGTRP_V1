"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { FORM_INPUT_CLASS } from "@/features/projetos/components/project-ted/shared/form-fields"
import EtapaItem from "./EtapaItem"
import { MetaCronograma, Etapa } from "./types"

interface Props {
  numeroMeta: number
  meta: MetaCronograma
  onChange: (meta: MetaCronograma) => void
  onDelete: () => void
}

const MetaCronogramaCard: React.FC<Props> = ({
  numeroMeta,
  meta,
  onChange,
  onDelete,
}) => {
  const addEtapa = () => {
    const novaEtapa: Etapa = {
      descricao: "",
      valor: 0,
      inicio: "",
      termino: "",
    }

    onChange({
      ...meta,
      etapas: [...meta.etapas, novaEtapa],
    })
  }

  const updateEtapa = (index: number, updatedEtapa: Etapa) => {
    const novasEtapas = [...meta.etapas]
    novasEtapas[index] = updatedEtapa
    onChange({ ...meta, etapas: novasEtapas })
  }

  const removeEtapa = (index: number) => {
    const novasEtapas = meta.etapas.filter((_, i) => i !== index)
    onChange({ ...meta, etapas: novasEtapas })
  }

  const totalMeta = meta.etapas.reduce(
    (acc, etapa) => acc + (etapa.valor || 0),
    0
  )

  return (
    <div className="w-full min-w-0 space-y-6 rounded-lg border border-border bg-[#f5f5f5] p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex justify-between items-center gap-2 w-full min-w-0">
        <h3 className="font-semibold text-lg text-foreground min-w-0 truncate">
          Meta {numeroMeta}
        </h3>

        <GenericButton variant="destructive" size="sm" onClick={onDelete} className="shrink-0">
          Excluir
        </GenericButton>
      </div>

      <div className="space-y-2">
        <Label className="font-medium text-foreground">Título da Meta</Label>
        <Input
          value={meta.titulo}
          onChange={(e) => onChange({ ...meta, titulo: e.target.value })}
          placeholder="Ex: Capacitação da equipe"
          className={FORM_INPUT_CLASS}
        />
      </div>

      {meta.etapas.map((etapa, index) => (
        <EtapaItem
          key={index}
          numeroMeta={numeroMeta}
          numeroEtapa={index + 1}
          etapa={etapa}
          onChange={(updatedEtapa) => updateEtapa(index, updatedEtapa)}
          onDelete={() => removeEtapa(index)}
        />
      ))}

      <GenericButton variant="outline" size="sm" onClick={addEtapa}>
        Adicionar etapa
      </GenericButton>

      <div className="text-right font-semibold border-t pt-3 text-foreground">
        Total da Meta {numeroMeta}: R$ {totalMeta.toLocaleString("pt-BR")}
      </div>
    </div>
  )
}

export default MetaCronogramaCard
