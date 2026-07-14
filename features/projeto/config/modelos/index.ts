import { PROJETO_TIPOS, type ProjetoTipo } from "../../constants/projeto-tipos"
import { CONVENIO_MODELO_CONFIG } from "./convenio"
import { EMENDA_MODELO_CONFIG } from "./emenda"
import { TED_MODELO_CONFIG } from "./ted"
import type { ModeloProjetoConfig, SecaoConfig } from "./types"

export type { ModeloProjetoConfig, GrupoSecaoConfig, SecaoConfig, SecaoId } from "./types"

export const MODELOS_PROJETO: Record<ProjetoTipo, ModeloProjetoConfig> = {
  [PROJETO_TIPOS.TED]: TED_MODELO_CONFIG,
  [PROJETO_TIPOS.EMENDA]: EMENDA_MODELO_CONFIG,
  [PROJETO_TIPOS.CONVENIO]: CONVENIO_MODELO_CONFIG,
}

export function getModeloConfig(tipo: ProjetoTipo): ModeloProjetoConfig {
  return MODELOS_PROJETO[tipo]
}

/** Lista plana de seções do modelo, na ordem do menu. */
export function getModeloSecoes(tipo: ProjetoTipo): SecaoConfig[] {
  return getModeloConfig(tipo).groups.flatMap((group) => group.sections)
}

export function getSecaoFromModelo(
  tipo: ProjetoTipo,
  secaoId: string,
): SecaoConfig | undefined {
  return getModeloSecoes(tipo).find((secao) => secao.id === secaoId)
}

/** Resolve a seção ativa; cai no default se o slug não pertencer ao modelo. */
export function resolveModeloSecao(
  tipo: ProjetoTipo,
  secaoId: string | null | undefined,
): SecaoConfig {
  const config = getModeloConfig(tipo)
  const secoes = getModeloSecoes(tipo)
  const found = secaoId
    ? secoes.find((secao) => secao.id === secaoId)
    : undefined

  return found ?? secoes[0] ?? { id: config.defaultSecao, title: "Seção" }
}

export function hasSecaoNoModelo(tipo: ProjetoTipo, secaoId: string): boolean {
  return getModeloSecoes(tipo).some((secao) => secao.id === secaoId)
}
