export type AdminEntityStatus = "Ativo" | "Inativo"

export type AdminEntityItem = {
  id: string
  nome: string
  descricao: string
  status: AdminEntityStatus
}

export type AdminEntityFilter = "todos" | "ativos" | "inativos"
