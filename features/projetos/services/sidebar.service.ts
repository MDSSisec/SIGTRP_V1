import { DEFAULT_FORM_SECTION } from "@/features/projetos/components/project-ted/forms"
import { TED_SIDEBAR_MENU_GROUPS } from "@/features/projetos/constants/ted/sidebar-menu"
import {
  buildProjectTedNavItems,
  getProjetoTedSectionUrl,
  parseProjetoTedPath,
} from "@/components/blocks/sidebar/build-ted-sidebar-nav"

export { TED_SIDEBAR_MENU_GROUPS }
export {
  buildProjectTedNavItems,
  getProjetoTedSectionUrl,
  parseProjetoTedPath,
}

export function getSidebarConfig(pathname: string | null, activeSecao?: string) {
  const path = pathname ?? ""
  const tedContext = parseProjetoTedPath(path)

  if (tedContext) {
    return {
      mode: "ted-project" as const,
      projectId: tedContext.projectId,
      navMain: buildProjectTedNavItems(
        tedContext.projectId,
        activeSecao ?? DEFAULT_FORM_SECTION,
      ),
    }
  }

  return {
    mode: "default" as const,
    navMain: null,
  }
}
