import type { ModeloProjetoConfig } from "./types"
import {
  buildProjetoMenuGroups,
  TED_MENU_GRUPOS,
} from "@/features/projeto/constants/secoes-projeto"

/**
 * TED — formulário TRP completo.
 * Menu em `TED_MENU_GRUPOS` (`constants/secoes-projeto.ts`).
 */
export const TED_MODELO_CONFIG: ModeloProjetoConfig = {
  tipo: "TED",
  label: "TED",
  defaultSecao: "informacoes-projeto",
  groups: buildProjetoMenuGroups(TED_MENU_GRUPOS),
}
