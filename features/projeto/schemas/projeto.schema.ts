import { z } from "zod"

import { PROJETO_TIPOS } from "@/features/projeto/constants/projeto-tipos"

export const createProjetoSchema = z.object({
  tipoProjeto: z.enum([
    PROJETO_TIPOS.TED,
    PROJETO_TIPOS.EMENDA,
    PROJETO_TIPOS.CONVENIO,
  ]),
  nome: z.string().trim().min(1, "Informe o nome do projeto.").max(255),
  responsavelInternoId: z.uuid("Responsável interno inválido."),
  responsavelExternoId: z.uuid("Responsável externo inválido."),
})

export type CreateProjetoInput = z.infer<typeof createProjetoSchema>

export const projetoIdSchema = z.uuid("ID do projeto inválido.")

export const updateProjetoInformacoesSchema = z.object({
  etapaId: z.uuid("Status do projeto inválido.").optional(),
  responsavelInternoId: z.uuid("Responsável interno inválido."),
  responsavelExternoId: z.uuid("Responsável externo inválido."),
})

export type UpdateProjetoInformacoesInput = z.infer<
  typeof updateProjetoInformacoesSchema
>
