"use client"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SecaoReviewBanner } from "@/features/projeto/components/formShared/secao-review-actions"
import {
  isIdExclusivo,
  PERFIL_SOCIO_OCUPACIONAL_OPCOES,
  PERFIL_SOCIO_OCUPACIONAL_TITLE,
  temEspecificar,
} from "@/features/projeto/constants/perfil-socio-ocupacional"

import type { ProjectFormSectionProps } from "../../types"
import styles from "./perfils-socio-ocupacional.module.css"

/**
 * Seção "Perfil sócio-ocupacional".
 */
export function FormularioPerfilSocioOcupacional(
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
        <h2 className={styles.title}>{PERFIL_SOCIO_OCUPACIONAL_TITLE.TITLE}</h2>

        <div className={styles.checkboxList}>
          {PERFIL_SOCIO_OCUPACIONAL_OPCOES.map((opcao) => {
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
                    placeholder="Especificar"
                    className={styles.especificarInput}
                    aria-label="Especificar outros perfis sócio-ocupacionais"
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

export default FormularioPerfilSocioOcupacional
