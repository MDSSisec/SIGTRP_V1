import {
  buildProjetoEditNavItems,
  getModeloNavLabel,
  parseProjetoTedPath,
} from "@/components/blocks/sidebar/build-ted-sidebar-nav"
import type { NavMainItem } from "@/components/blocks/sidebar/nav-main"
import { getModeloConfig } from "../config/modelos"
import type { ProjetoTipo } from "../constants/projeto-tipos"
import { getProjetoEditSectionPath } from "../utils/projeto-routes"

export {
  buildProjetoEditNavItems,
  getModeloNavLabel,
  parseProjetoTedPath,
} from "@/components/blocks/sidebar/build-ted-sidebar-nav"

/** URL de uma seção na rota unificada `/projetos/[id]/editar`. */
export function getProjetoEditSectionUrl(projectId: string, slug: string) {
  return getProjetoEditSectionPath(projectId, slug)
}

/** @deprecated Use getProjetoEditSectionUrl */
export const getProjetoTedSectionUrl = getProjetoEditSectionUrl

type SidebarConfigDefault = {
  mode: "default"
  navMain: null
}

type SidebarConfigProjetoEdit = {
  mode: "projeto-edit"
  projectId: string
  navMain: NavMainItem[] | null
  label: string
}

export type SidebarConfig = SidebarConfigDefault | SidebarConfigProjetoEdit

type GetSidebarConfigOptions = {
  activeSecao?: string | null
  /** Obrigatório para montar o menu; sem ele o modo edit fica sem items. */
  tipoProjeto?: ProjetoTipo | null
}

/**
 * Resolve o menu lateral conforme a rota.
 * Em `/projetos/[id]/editar` (ou `/ted` legado) usa o config do modelo.
 */
export function getSidebarConfig(
  pathname: string | null,
  options: GetSidebarConfigOptions = {},
): SidebarConfig {
  const path = pathname ?? ""
  const editContext = parseProjetoTedPath(path)

  if (!editContext) {
    return {
      mode: "default",
      navMain: null,
    }
  }

  const tipoProjeto = options.tipoProjeto

  if (!tipoProjeto) {
    return {
      mode: "projeto-edit",
      projectId: editContext.projectId,
      navMain: null,
      label: "Formulário",
    }
  }

  const modelo = getModeloConfig(tipoProjeto)
  const secao = options.activeSecao ?? modelo.defaultSecao

  return {
    mode: "projeto-edit",
    projectId: editContext.projectId,
    navMain: buildProjetoEditNavItems(
      editContext.projectId,
      tipoProjeto,
      secao,
    ),
    label: getModeloNavLabel(modelo),
  }
}
