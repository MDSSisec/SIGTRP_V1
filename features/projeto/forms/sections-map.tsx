"use client"

import type { ComponentType } from "react"

// Identificação
import IdentificacaoProjeto from "./01-identificacao/identificacaoDoProjeto/identidicacao-do-projeto"
import IdentificacaoProponente from "./01-identificacao/identificacaoDoProponente/identificacao-do-proponente"
import IdentificacaoRepresentanteLegal from "./01-identificacao/identificacaoDoRepresentanteLegal/identificacao-do-representante-legal"
import IdentificacaoResponsavelTecnico from "./01-identificacao/identificacaoDoResponsavelTecnico/identificacao-do-responsavel-tecnico"

// Descrição
import { FormularioGestao } from "./02-descricao/descricaoDaGestaoDoProjeto"
import { FormularioJustificativa } from "./02-descricao/descricaoDaJustificativaEMotivacao"
import { FormularioEtapasCronograma } from "./02-descricao/descricaoDasEtapasECronogramas"
import { FormularioMetas } from "./02-descricao/descricaoDasMetas"
import { FormularioMetodologia } from "./02-descricao/descricaoDaMetodologia"
import { FormularioObjetivos } from "./02-descricao/descricaoDosObjetivos"
import { FormularioResultados } from "./02-descricao/descricaoDosResultados"

// Participantes
import { FormularioHistoricoSituacao } from "./03-participantes/historicoESituacao"
import { FormularioDetalhamentoDaBase } from "./03-participantes/detalhamentoDaBase"

// Dados Gerais
import { DadosGeraisDoProjeto } from "./dados-gerais-do-projeto/dados-gerais"
import { DetalhamentoCursos } from "./dados-gerais-do-projeto/detalhamento-dos-cursos"
import type { ProjectFormSectionProps } from "./types"
import { InformacoesDoProjeto } from "./visao-geral/informacoes-do-projeto"
import { FormularioPublicoBeneficiarioDoProjeto } from "./03-participantes/publicoBeneficiarioDoProjeto"
import { FormularioPovosOuComunidadesTradicionais } from "./03-participantes/povosOuComunidadesTradicionais"
import { FormularioPerfilSocioOcupacional } from "./03-participantes/perfilSocioOcupacional"
import { FormularioPublicoBeneficiarioEServicos } from "./03-participantes/publicoBeneficiarioEServicos"

export type { ProjectFormSectionProps }

/**
 * Seções com componente em `features/projeto/forms`.
 * (Visão geral fica só em `index.tsx` para evitar ciclo com `getFormSection`.)
 */
export const SECTIONS_WITHOUT_VISAO_GERAL: Record<
  string,
  ComponentType<ProjectFormSectionProps>
> = {
  "informacoes-projeto": InformacoesDoProjeto,
  "dados-gerais-projeto": DadosGeraisDoProjeto,
  "detalhamento-cursos": DetalhamentoCursos,
  "identificacao-projeto": IdentificacaoProjeto,
  "identificacao-proponente": IdentificacaoProponente,
  "identificacao-representante-legal": IdentificacaoRepresentanteLegal,
  "identificacao-responsavel-tecnico": IdentificacaoResponsavelTecnico, justificativa: FormularioJustificativa, objetivos: FormularioObjetivos, metas: FormularioMetas,
  "etapas-cronograma": FormularioEtapasCronograma, metodologia: FormularioMetodologia,
  "resultados-esperados": FormularioResultados,
  "gestao-projeto": FormularioGestao,
  "historico-situacao-territorio": FormularioHistoricoSituacao,
  "base-territorial": FormularioDetalhamentoDaBase,
  "publico-beneficiario-do-projeto": FormularioPublicoBeneficiarioDoProjeto,
  "publico-beneficiario": FormularioPublicoBeneficiarioDoProjeto,
  "povos-comunidades-tradicionais": FormularioPovosOuComunidadesTradicionais,
  "perfil-socio-ocupacional": FormularioPerfilSocioOcupacional,
  "publico-beneficiario-e-servicos": FormularioPublicoBeneficiarioEServicos,
}
export function getFormSection(
  slug: string,
): ComponentType<ProjectFormSectionProps> | undefined {
  return SECTIONS_WITHOUT_VISAO_GERAL[slug]
}
