import type { Projeto } from "../types"

export const MOCK_PROJETOS: Projeto[] = [
  {
    id: "1",
    nome: "Modernização da infraestrutura de TI",
    responsavel: "Ana Souza",
    status: "Aprovado",
    tipo: "Tecnologia",
  },
  {
    id: "2",
    nome: "Capacitação de servidores",
    responsavel: "Carlos Lima",
    status: "Em análise",
    tipo: "Capacitação",
  },
  {
    id: "3",
    nome: "Reforma do auditório principal",
    responsavel: "Mariana Costa",
    status: "Pendente",
    tipo: "Infraestrutura",
  },
  {
    id: "4",
    nome: "Programa de gestão documental",
    responsavel: "João Pereira",
    status: "Concluído",
    tipo: "Administrativo",
  },
]
