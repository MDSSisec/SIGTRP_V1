import type { CatalogoItemEtapa } from "./catalogo-despesas-etapa-11"

/**
 * Catálogo do evento final (categoria `event` da prova de conceito).
 * Itens de celebração, certificação e encerramento.
 */
export const CATALOGO_DESPESAS_EVENTO_FINAL: CatalogoItemEtapa[] = [
  {
    id: "organizacao_de_evento_de_certificacao",
    label: "Organização de evento de certificação",
    codigo: "33.90.39",
    codigos: ["33.90.39"],
    unidades: ["unidade", "evento"],
    tipo: "Finalistica",
  },
  {
    id: "servicos_de_cerimonial_e_recepcao",
    label: "Serviços de cerimonial e recepção",
    codigo: "33.90.39",
    codigos: ["33.90.39"],
    unidades: ["unidade", "hora"],
    tipo: "Finalistica",
  },
  {
    id: "locacao_de_espaco_para_evento",
    label: "Locação de espaço para evento",
    codigo: "33.90.39",
    codigos: ["33.90.39"],
    unidades: ["unidade", "diária"],
    tipo: "Finalistica",
  },
  {
    id: "material_grafico_e_certificados",
    label: "Material gráfico e certificados",
    codigo: "33.90.30",
    codigos: ["33.90.30"],
    unidades: ["unidade", "pacote"],
    tipo: "Finalistica",
  },
  {
    id: "servicos_de_sonorizacao_e_iluminacao",
    label: "Serviços de sonorização e iluminação",
    codigo: "33.90.39",
    codigos: ["33.90.39"],
    unidades: ["unidade", "diária"],
    tipo: "Finalistica",
  },
  {
    id: "servicos_de_alimentacao_do_evento",
    label: "Serviços de alimentação do evento",
    codigo: "33.90.39",
    codigos: ["33.90.39"],
    unidades: ["unidade", "pessoa"],
    tipo: "Finalistica",
  },
  {
    id: "despesas_com_deslocamento_do_evento",
    label: "Despesas com deslocamento do evento",
    codigo: "33.90.33",
    codigos: ["33.90.33"],
    unidades: ["unidade", "passagem"],
    tipo: "Finalistica",
  },
  {
    id: "servicos_de_avaliacao_e_sistematizacao",
    label: "Serviços de avaliação e sistematização",
    codigo: "33.90.35",
    codigos: ["33.90.35"],
    unidades: ["unidade", "mês"],
    tipo: "Finalistica",
  },
].sort((a, b) => a.label.localeCompare(b.label, "pt-BR"))

export function findItemEventoFinal(
  itemId: string,
): CatalogoItemEtapa | undefined {
  return CATALOGO_DESPESAS_EVENTO_FINAL.find((item) => item.id === itemId)
}
