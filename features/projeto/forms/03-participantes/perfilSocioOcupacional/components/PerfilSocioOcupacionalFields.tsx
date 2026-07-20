"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  PERFIL_SOCIO_OCUPACIONAL_OPCOES,
  PERFIL_SOCIO_OCUPACIONAL_TITLE,
  temEspecificar,
} from "@/features/projeto/constants/perfil-socio-ocupacional"

import type { DadosPerfilSocioOcupacional } from "../types/perfil-socio-ocupacional-form"
import styles from "../perfils-socio-ocupacional.module.css"

type PerfilSocioOcupacionalFieldsProps = {
  dados: DadosPerfilSocioOcupacional
  isLocked: boolean
  exclusivoMarcado?: string
  onToggle: (id: string, checked: boolean) => void
  onOutrosChange: (value: string) => void
}

/**
 * Lista de checkboxes do perfil sócio-ocupacional.
 */
export function PerfilSocioOcupacionalFields({
  dados,
  isLocked,
  exclusivoMarcado,
  onToggle,
  onOutrosChange,
}: PerfilSocioOcupacionalFieldsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{PERFIL_SOCIO_OCUPACIONAL_TITLE.TITLE}</h2>

      <div className={styles.checkboxList}>
        {PERFIL_SOCIO_OCUPACIONAL_OPCOES.map((opcao) => {
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
                  placeholder="Especificar"
                  className={styles.especificarInput}
                  aria-label="Especificar outros perfis sócio-ocupacionais"
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
