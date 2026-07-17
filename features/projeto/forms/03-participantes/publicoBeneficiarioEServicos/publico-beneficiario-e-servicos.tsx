"use client"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  PUBLICO_BENEFICIARIO_ESERVICOS_OPCOES,
  PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID,
  PUBLICO_BENEFICIARIO_ESERVICOS_TITLE,
  temEspecificar,
} from "@/features/projeto/constants/publico-beneficiario-e-servico"

import type { ProjectFormSectionProps } from "../../types"
import styles from "./publico-beneficiario-e-servicos.module.css"

/**
 * Seção "Público beneficiário e serviços".
 */
export function FormularioPublicoBeneficiarioEServicos(
  _props: ProjectFormSectionProps,
) {
  const [selecoes, setSelecoes] = useState<string[]>([])
  const [outrosEspecificar, setOutrosEspecificar] = useState("")

  const outrosMarcado = selecoes.includes(PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID)

  function toggle(id: string, checked: boolean) {
    if (id === PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID) {
      setSelecoes(checked ? [PUBLICO_BENEFICIARIO_ESERVICOS_OUTROS_ID] : [])
      return
    }

    if (outrosMarcado) return

    setSelecoes((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id),
    )
  }

  return (
    <div className={styles.container}>
      <SecaoReviewBanner />

      <section className={styles.section}>
        <h2 className={styles.title}>
          {PUBLICO_BENEFICIARIO_ESERVICOS_TITLE.TITLE}
        </h2>

        <div className={styles.checkboxList}>
          {PUBLICO_BENEFICIARIO_ESERVICOS_OPCOES.map((opcao) => {
            const marcado = selecoes.includes(opcao.id)
            const isOutros = temEspecificar(opcao)
            const desabilitado = outrosMarcado && !isOutros
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
                    placeholder="Especificar"
                    className={styles.especificarInput}
                    aria-label="Especificar outros serviços"
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

export default FormularioPublicoBeneficiarioEServicos
