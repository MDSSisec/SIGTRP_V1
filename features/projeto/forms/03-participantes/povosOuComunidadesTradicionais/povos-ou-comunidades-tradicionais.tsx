"use client"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  isIdExclusivo,
  POVOS_OU_COMUNIDADE_TRADICIONAIS_TITLE,
  POVOS_OU_COMUNIDADES_TRADICIONAIS_OPCOES,
  temEspecificar,
} from "@/features/projeto/constants/povos-ou-comunidades-tradicionais"

import type { ProjectFormSectionProps } from "../../types"
import styles from "./povos-ou-comunidades-tradicionais.module.css"

/**
 * Seção "Povos ou Comunidades Tradicionais".
 */
export function FormularioPovosOuComunidadesTradicionais(
  _props: ProjectFormSectionProps,
) {
  const [selecoes, setSelecoes] = useState<string[]>([])
  const [outrosEspecificar, setOutrosEspecificar] = useState("")

  const exclusivoMarcado = selecoes.find(isIdExclusivo)

  function toggle(id: string, checked: boolean) {
    if (isIdExclusivo(id)) {
      setSelecoes(checked ? [id] : [])
      return
    }

    if (exclusivoMarcado) return

    setSelecoes((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    )
  }

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <section className={styles.section}>
        <h2 className={styles.title}>
          {POVOS_OU_COMUNIDADE_TRADICIONAIS_TITLE.TITLE}
        </h2>

        <div className={styles.checkboxList}>
          {POVOS_OU_COMUNIDADES_TRADICIONAIS_OPCOES.map((opcao) => {
            const marcado = selecoes.includes(opcao.id)
            const desabilitado =
              exclusivoMarcado != null && opcao.id !== exclusivoMarcado
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
                      toggle(opcao.id, checked === true)
                    }
                  />
                  <Label htmlFor={opcao.id} className={styles.checkboxLabel}>
                    {opcao.label}
                  </Label>
                </label>

                {mostrarEspecificar ? (
                  <Input
                    id={`${opcao.id}-especificar`}
                    value={outrosEspecificar}
                    onChange={(e) => setOutrosEspecificar(e.target.value)}
                    placeholder="Quais"
                    className={styles.especificarInput}
                    aria-label="Especificar outros povos e comunidades tradicionais"
                  />
                ) : null}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default FormularioPovosOuComunidadesTradicionais
