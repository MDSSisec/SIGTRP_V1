"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  POVOS_OU_COMUNIDADE_TRADICIONAIS_TITLE,
  POVOS_OU_COMUNIDADES_TRADICIONAIS_OPCOES,
  temEspecificar,
} from "@/features/projeto/constants/povos-ou-comunidades-tradicionais"

import type { DadosPovosOuComunidadesTradicionais } from "../types/povos-ou-comunidades-tradicionais-form"
import styles from "../povos-ou-comunidades-tradicionais.module.css"

type PovosOuComunidadesTradicionaisFieldsProps = {
  dados: DadosPovosOuComunidadesTradicionais
  isLocked: boolean
  exclusivoMarcado?: string
  onToggle: (id: string, checked: boolean) => void
  onOutrosChange: (value: string) => void
}

/**
 * Lista de checkboxes de povos ou comunidades tradicionais.
 */
export function PovosOuComunidadesTradicionaisFields({
  dados,
  isLocked,
  exclusivoMarcado,
  onToggle,
  onOutrosChange,
}: PovosOuComunidadesTradicionaisFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        {POVOS_OU_COMUNIDADE_TRADICIONAIS_TITLE.TITLE}
      </h2>

      <div className={styles.checkboxList}>
        {POVOS_OU_COMUNIDADES_TRADICIONAIS_OPCOES.map((opcao) => {
          const marcado = dados.selecoes.includes(opcao.id)
          const desabilitadoPorExclusivo =
            exclusivoMarcado != null && opcao.id !== exclusivoMarcado
          const desabilitado = isLocked || desabilitadoPorExclusivo
          const mostrarEspecificar = temEspecificar(opcao) && marcado

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
                  placeholder="Quais"
                  className={styles.especificarInput}
                  aria-label="Especificar outros povos e comunidades tradicionais"
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
