import type { CatalogoItemEtapa } from "./catalogo-despesas-etapa-11"

/**
 * Catálogo da Etapa 1.2 (categoria `stage12` da prova de conceito).
 * Itens de estruturação e equipamento dos espaços de capacitação.
 */
export const CATALOGO_DESPESAS_ETAPA_12: CatalogoItemEtapa[] = [
  {
    id: "adequacao_e_reforma_de_espacos",
    label: "Adequação e reforma de espaços",
    codigo: "33.90.39",
    codigos: ["33.90.39", "44.90.51"],
    unidades: ["unidade", "m²"],
    tipo: "Estruturacao",
  },
  {
    id: "aquisicao_de_mobiliario",
    label: "Aquisição de mobiliário",
    codigo: "44.90.52",
    codigos: ["44.90.52"],
    unidades: ["unidade", "conjunto"],
    tipo: "Estruturacao",
  },
  {
    id: "equipamentos_de_informatica",
    label: "Equipamentos de informática",
    codigo: "44.90.52",
    codigos: ["44.90.52"],
    unidades: ["unidade", "kit"],
    tipo: "Estruturacao",
  },
  {
    id: "equipamentos_audiovisuais",
    label: "Equipamentos audiovisuais",
    codigo: "44.90.52",
    codigos: ["44.90.52"],
    unidades: ["unidade", "kit"],
    tipo: "Estruturacao",
  },
  {
    id: "equipamentos_de_capacitacao",
    label: "Equipamentos de capacitação",
    codigo: "44.90.52",
    codigos: ["44.90.52"],
    unidades: ["unidade", "kit", "lote"],
    tipo: "Estruturacao",
  },
  {
    id: "materiais_permanentes",
    label: "Materiais permanentes",
    codigo: "44.90.52",
    codigos: ["44.90.52"],
    unidades: ["unidade", "kit", "lote"],
    tipo: "Estruturacao",
  },
  {
    id: "servicos_de_instalacao_e_montagem",
    label: "Serviços de instalação e montagem",
    codigo: "33.90.39",
    codigos: ["33.90.39"],
    unidades: ["unidade", "mês"],
    tipo: "Estruturacao",
  },
  {
    id: "servicos_de_manutencao_predial",
    label: "Serviços de manutenção predial",
    codigo: "33.90.39",
    codigos: ["33.90.39"],
    unidades: ["unidade", "mês"],
    tipo: "Estruturacao",
  },
].sort((a, b) => a.label.localeCompare(b.label, "pt-BR"))

export function findItemEtapa12(itemId: string): CatalogoItemEtapa | undefined {
  return CATALOGO_DESPESAS_ETAPA_12.find((item) => item.id === itemId)
}
