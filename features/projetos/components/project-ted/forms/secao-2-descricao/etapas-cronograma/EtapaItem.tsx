"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { FORM_INPUT_CLASS, FORM_TEXTAREA_CLASS } from "@/features/projetos/components/project-ted/shared/form-fields"
import { Etapa } from "./types"

interface Props {
  numeroMeta: number
  numeroEtapa: number
  etapa: Etapa
  onChange: (etapa: Etapa) => void
  onDelete: () => void
}

const EtapaItem: React.FC<Props> = ({
  numeroMeta,
  numeroEtapa,
  etapa,
  onChange,
  onDelete,
}) => {
  const handleChange = (field: keyof Etapa, value: string | number) => {
    onChange({
      ...etapa,
      [field]: field === "valor" ? Number(value) : value,
    })
  }

  return (
    <div className="w-full min-w-0 space-y-4 rounded-lg border border-border bg-[#f5f5f5] p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex justify-between items-center gap-2 w-full min-w-0">
        <h4 className="font-medium text-foreground min-w-0 truncate">
          Etapa {numeroMeta}.{numeroEtapa}
        </h4>

        <GenericButton variant="destructive" size="sm" onClick={onDelete} className="shrink-0">
          Excluir
        </GenericButton>
      </div>

      <div className="space-y-2">
        <Label className="font-medium text-foreground">Descrição</Label>
        <textarea
          value={etapa.descricao}
          onChange={(e) => handleChange("descricao", e.target.value)}
          placeholder="Descrição da etapa"
          rows={3}
          className={FORM_TEXTAREA_CLASS}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="font-medium text-foreground">Valor (R$)</Label>
          <Input
            type="number"
            value={etapa.valor || ""}
            onChange={(e) =>
              handleChange("valor", e.target.value === "" ? 0 : e.target.value)
            }
            placeholder="0"
            className={FORM_INPUT_CLASS}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-foreground">Início (mês/ano)</Label>
          <Input
            type="month"
            value={etapa.inicio}
            onChange={(e) => handleChange("inicio", e.target.value)}
            className={FORM_INPUT_CLASS}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-medium text-foreground">
            Término (mês/ano)
          </Label>
          <Input
            type="month"
            value={etapa.termino}
            onChange={(e) => handleChange("termino", e.target.value)}
            className={FORM_INPUT_CLASS}
          />
        </div>
      </div>
    </div>
  )
}

export default EtapaItem
