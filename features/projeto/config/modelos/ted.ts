import type { ModeloProjetoConfig } from "./types"
import { buildTedMenuGroups } from "@/features/projeto/constants/secoes-projeto"

/**
 * TED — formulário TRP completo (grupos atuais do sidebar).
 * Menu derivado de `PROJETO_SECOES` em `constants/secoes-projeto.ts`.
 */
export const TED_MODELO_CONFIG: ModeloProjetoConfig = {
  tipo: "TED",
  label: "TED",
  defaultSecao: "informacoes-projeto",
  groups: buildTedMenuGroups(),
}
