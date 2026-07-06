import type { AdminEntityItem } from "../types/admin-entity"

export const MOCK_STATUS: AdminEntityItem[] = [
  {
    id: "1",
    nome: "Aprovado",
    descricao: "Projeto aprovado para execução",
    status: "Ativo",
  },
  {
    id: "2",
    nome: "Em análise",
    descricao: "Aguardando revisão",
    status: "Ativo",
  },
  {
    id: "3",
    nome: "Arquivado",
    descricao: "Status descontinuado",
    status: "Inativo",
  },
]
