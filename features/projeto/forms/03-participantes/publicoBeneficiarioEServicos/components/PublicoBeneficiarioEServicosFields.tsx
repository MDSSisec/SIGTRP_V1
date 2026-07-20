"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  PUBLICO_BENEFICIARIO_ESERVICOS_OPCOES,
  PUBLICO_BENEFICIARIO_ESERVICOS_TITLE,
  temEspecificar,
} from "@/features/projeto/constants/publico-beneficiario-e-servico"

import type { DadosPublicoBeneficiarioEServicos } from "../types/publico-beneficiario-e-servicos-form"
import styles from "../publico-beneficiario-e-servicos.module.css"

type PublicoBeneficiarioEServicosFieldsProps = {
  dados: DadosPublicoBeneficiarioEServicos
  isLocked: boolean
  outrosMarcado: boolean
  onToggle: (id: string, checked: boolean) => void
  onOutrosChange: (value: string) => void
}

/**
 * Lista de checkboxes de serviços acessados.
 */
export function PublicoBeneficiarioEServicosFields({
  dados,
  isLocked,
  outrosMarcado,
  onToggle,
  onOutrosChange,
}: PublicoBeneficiarioEServicosFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {PUBLICO_BENEFICIARIO_ESERVICOS_TITLE.TITLE}
      </h2>

      <div className={styles.checkboxList}>
        {PUBLICO_BENEFICIARIO_ESERVICOS_OPCOES.map((opcao) => {
          const marcado = dados.selecoes.includes(opcao.id)
          const isOutros = temEspecificar(opcao)
          const desabilitadoPorExclusivo = outrosMarcado && !isOutros
          const desabilitado = isLocked || desabilitadoPorExclusivo
          const mostrarEspecificar = isOutros && marcado

          return (
            <div
              key={opcao.id}
              className={styles.checkboxRow}
              data-checked={marcado ? "" : undefined}
              data-disabled={desabilitado ? "" : undefined}
            >
              <label
                className={styles.checkboxMain}
                htmlFor={opcao.id}
                data-disabled={desabilitado ? "" : undefined}
              >
                <Checkbox
                  id={opcao.id}
                  checked={marcado}
                  disabled={desabilitado}
                  onCheckedChange={(checked) =>
                    onToggle(opcao.id, checked === true)
                  }
                />
                <Label htmlFor={opcao.id} className={styles.checkboxLabel}>
                  {opcao.label}
                </Label>
              </label>

              {mostrarEspecificar ? (
                <Input
                  id={`${opcao.id}-especificar`}
                  value={dados.outrosEspecificar}
                  onChange={(e) => onOutrosChange(e.target.value)}
                  placeholder="Especificar"
                  className={styles.especificarInput}
                  aria-label="Especificar outros serviços"
                  disabled={isLocked}
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
