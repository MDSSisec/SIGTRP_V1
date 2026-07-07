"use client"

import type { ComponentType } from "react"
import Metas from "./secao-2-descricao/Metas/Metas"
import { Observacoes } from "./observacoes/Observacoes"
import Objetivos from "./secao-2-descricao/Objetivos/Objetivos"
import { ValorTotal } from "./secao-5-planilhas/ValorTotal"
import { Metodologia } from "./secao-2-descricao/Metodologia/Metodologia"
import GestaoProjeto from "./secao-2-descricao/GestaoProjeto/GestaoProjeto"
import Justificativa from "./secao-2-descricao/Justificativa/Justificativa"
import { EtapasCronograma } from "./secao-2-descricao/etapas-cronograma"
import { BaseTerritorial } from "./secao-3-participantes/BaseTerritorial"
import { ResultadosEsperados } from "./secao-2-descricao/Resultados/ResultadosEsperados"
import { ServicosAcessados } from "./secao-3-participantes/ServicosAcessados"
import IdentificacaoProjeto from "./secao-1-identificacao/identificacaoDoProjeto/IdentificacaoProjeto"
import { CronogramaDesembolso } from "./secao-5-planilhas/CronogramaDesembolso"
import { ResumoPlanoAplicacao } from "./secao-5-planilhas/ResumoPlanoAplicacao"
import { DetalhamentoOrcamento } from "./secao-5-planilhas/DetalhamentoOrcamento"
import { PublicoBeneficiario } from "./secao-3-participantes/PublicoBeneficiario"
import { IndicadoresEficiencia } from "./secao-6-monitoramento/IndicadoresEficiencia"
import IdentificacaoProponente from "./secao-1-identificacao/identificacaoProponente/IdentificacaoProponente"
import { PerfilSocioOcupacional } from "./secao-3-participantes/PerfilSocioOcupacional"
import { ProcedimentosMonitoramento } from "./secao-6-monitoramento/ProcedimentosMonitoramento"
import { HistoricoSituacaoTerritorio } from "./secao-3-participantes/HistoricoSituacaoTerritorio"
import { OutrasInformacoesProponente } from "./secao-4-caracterizacao/OutrasInformacoesProponente"
import { PovosComunidadesTradicionais } from "./secao-3-participantes/PovosComunidadesTradicionais"
import IdentificacaoRepresentanteLegal from "./secao-1-identificacao/identificacaoRepresentanteLegal/IdentificacaoRepresentanteLegal"
import IdentificacaoResponsavelTecnico from "./secao-1-identificacao/IdentificacaoResponsavelTecnico/IdentificacaoResponsavelTecnico"
import { InformacoesDoProjeto } from "./informacoesDoProjeto/informacoesDoProjeto"
import { AndamentoDoProjeto } from "./andamentoDoProjeto/andamentoDoProjeto"

export type ProjectFormSectionProps = { projectId?: string; readOnlyView?: boolean }

const SECTIONS_WITHOUT_VISAO_GERAL: Record<string, ComponentType<ProjectFormSectionProps>> = {
  "informacoes-projeto": InformacoesDoProjeto,
  "identificacao-projeto": IdentificacaoProjeto,
  metas: Metas,
  objetivos: Objetivos,
  metodologia: Metodologia,
  "valor-total": ValorTotal,
  justificativa: Justificativa,
  "etapas-cronograma": EtapasCronograma,
  "gestao-projeto": GestaoProjeto,
  "base-territorial": BaseTerritorial,
  "servicos-acessados": ServicosAcessados,
  "resultados-esperados": ResultadosEsperados,
  "publico-beneficiario": PublicoBeneficiario,
  "cronograma-desembolso": CronogramaDesembolso,
  "resumo-plano-aplicacao": ResumoPlanoAplicacao,
  "detalhamento-orcamento": DetalhamentoOrcamento,
  "indicadores-eficiencia": IndicadoresEficiencia,
  "perfil-socio-ocupacional": PerfilSocioOcupacional,
  "identificacao-proponente": IdentificacaoProponente,
  "procedimentos-monitoramento": ProcedimentosMonitoramento,
  "historico-situacao-territorio": HistoricoSituacaoTerritorio,
  "outras-informacoes-proponente": OutrasInformacoesProponente,
  "povos-comunidades-tradicionais": PovosComunidadesTradicionais,
  "identificacao-representante-legal": IdentificacaoRepresentanteLegal,
  "identificacao-responsavel-tecnico": IdentificacaoResponsavelTecnico,
  observacoes: Observacoes,
  "andamento-projeto": AndamentoDoProjeto,
}

export function getFormSection(slug: string): ComponentType<ProjectFormSectionProps> | undefined {
  return SECTIONS_WITHOUT_VISAO_GERAL[slug]
}

export { SECTIONS_WITHOUT_VISAO_GERAL }
