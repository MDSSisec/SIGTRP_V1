"use client"

import type { ResponsavelOption } from "../../types"
import styles from "./popUpNewProject.module.css"

type SelectResponsavelProps = {
  id: string
  label: string
  placeholder: string
  emptyMessage: string
  options: ResponsavelOption[]
  value: string
  disabled?: boolean
  onChange: (value: string) => void
}

export function SelectResponsavel({
  id,
  label,
  placeholder,
  emptyMessage,
  options,
  value,
  disabled = false,
  onChange,
}: SelectResponsavelProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {options.length === 0 ? (
        <p className={styles.emptyMessage}>{emptyMessage}</p>
      ) : (
        <select
          id={id}
          className={styles.select}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options.map((responsavel) => (
            <option key={responsavel.id} value={responsavel.id}>
              {responsavel.nome}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
