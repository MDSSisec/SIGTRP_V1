/**
 * Tipos da configuração dirigida por modelo de projeto.
 */

export type SecaoId = string

export type SecaoConfig = {
  id: SecaoId
  title: string
  /** Seção obrigatória para conclusão do formulário. */
  required?: boolean
  /** Permite revisão de campos nesta seção. */
  review?: boolean
  /** Item aparece desabilitado no menu. */
  disabled?: boolean
}

export type GrupoSecaoConfig = {
  id: string
  title: string
  disabled?: boolean
  sections: SecaoConfig[]
}

export type ModeloProjetoConfig = {
  tipo: string
  label: string
  /** Slug inicial ao abrir a edição. */
  defaultSecao: SecaoId
  groups: GrupoSecaoConfig[]
}
