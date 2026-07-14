/**
 * Compatibilidade durante a migração — use `@/features/projeto/services`.
 */
export {
  buildProjetoEditNavItems,
  getModeloNavLabel,
  getProjetoEditSectionUrl,
  getProjetoTedSectionUrl,
  getSidebarConfig,
  parseProjetoTedPath,
  type SidebarConfig,
} from "@/features/projeto/services/sidebar.service"

/** @deprecated Prefer buildProjetoEditNavItems + tipo do projeto */
export { buildProjectTedNavItems } from "@/components/blocks/sidebar/build-ted-sidebar-nav"
