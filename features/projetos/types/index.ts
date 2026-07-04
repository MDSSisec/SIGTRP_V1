export type ProjetoStatus =
  | "Aprovado"
  | "Em análise"
  | "Pendente"
  | "Concluído"

export type Projeto = {
  id: string
  nome: string
  responsavel: string
  status: ProjetoStatus
  tipo: string
}
