"use client"

import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GenericButton } from "@/features/projetos/components/project-ted/shared/generic-button"
import { fetchSessionUser } from "@/features/login/services"
import type { PublicUser } from "@/features/login/types"
import { useAsyncData } from "@/hooks/use-async-data"
import { cn } from "@/lib/utils"

export type StatusObservacao = "aberto" | "concluido"

export interface ItemObservacao {
  usuario: string
  observacao: string
  status: StatusObservacao
  resolucao: string
}

interface DadosObservacoes {
  itens: ItemObservacao[]
}

interface PropsFormularioObservacoes {
  onChange?: (dados: DadosObservacoes) => void
  projectId?: string
}

// ✅ Constantes atualizadas com suporte a Dark Mode
// Adicionamos dark:bg-neutral-950 (fundo escuro) e dark:text-white (texto branco)
const classeInput =
  "border-input placeholder:text-muted-foreground w-full min-w-0 rounded-md border !bg-[#ffffff] px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm text-gray-900 " +
  "dark:bg-neutral-950 dark:text-white dark:border-neutral-800 " +
  "disabled:!bg-[#ffffff] disabled:text-gray-500 disabled:cursor-not-allowed dark:disabled:bg-neutral-900 dark:disabled:text-neutral-500"

const classeTextarea = cn(classeInput, "min-h-[6rem] resize-y")

const classeSelect = cn(
  "border-input w-full min-w-0 rounded-md border !bg-[#ffffff] px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm cursor-pointer text-gray-900 " +
  "dark:bg-neutral-950 dark:text-white dark:border-neutral-800 " +
  "disabled:!bg-[#ffffff] disabled:cursor-not-allowed dark:disabled:bg-neutral-900"
)

function FormularioObservacoes({ onChange }: PropsFormularioObservacoes) {
  const { data: sessionUser } = useAsyncData(fetchSessionUser, {
    initialData: null as PublicUser | null,
    errorMessage: "Não foi possível carregar o usuário.",
  })
  const usuarioAtual = sessionUser?.name ?? ""

  const [isEditing, setIsEditing] = useState(false)
  
  const [dadosFormulario, setDadosFormulario] = useState<DadosObservacoes>({
    itens: [],
  })

  const aoAlterarItem = (
    indice: number,
    campo: keyof ItemObservacao,
    valor: string | StatusObservacao
  ) => {
    const atualizados = [...dadosFormulario.itens]
    atualizados[indice] = { ...atualizados[indice], [campo]: valor }
    const novos = { itens: atualizados }
    setDadosFormulario(novos)
    onChange?.(novos)
  }

  const adicionarObservacao = () => {
    const novoItem: ItemObservacao = {
      usuario: usuarioAtual,
      observacao: "",
      status: "aberto",
      resolucao: "",
    }
    const novos = { itens: [...dadosFormulario.itens, novoItem] }
    setDadosFormulario(novos)
    onChange?.(novos)
  }

  const itens = dadosFormulario.itens

  return (
    <div className="space-y-8 rounded-xl bg-[#f5f5f5] dark:bg-neutral-950 p-6 border border-gray-100 dark:border-neutral-800">
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-2 dark:border-neutral-800">
          <h2 className="text-base font-semibold text-foreground dark:text-white">
            Observações
          </h2>
          <GenericButton
            variant="outline"
            size="sm"
            onClick={adicionarObservacao}
            disabled={!isEditing}
          >
            Adicionar observação
          </GenericButton>
        </div>

        <p className="text-muted-foreground dark:text-neutral-400 text-sm">
          Itens registrados pelos funcionários do MDS ao longo do projeto.
        </p>

        <div className="space-y-4">
          {itens.length === 0 ? (
            <p className="rounded-lg border border-dashed border-input bg-white/50 dark:bg-neutral-900/50 py-8 text-center text-sm text-muted-foreground">
              Nenhuma observação cadastrada. Clique em &quot;Adicionar observação&quot; para incluir.
            </p>
          ) : (
            itens.map((item, indice) => (
              <div
                key={indice}
                className="space-y-4 rounded-lg border border-input bg-white dark:bg-neutral-900 p-4 dark:border-neutral-800"
              >
                <span className="text-sm font-medium text-muted-foreground dark:text-neutral-400">
                  Observação {indice + 1}
                </span>

                <div className="grid gap-4 sm:grid-cols-1">
                  <div className="space-y-2">
                    <Label htmlFor={`observacao-usuario-${indice}`} className="font-medium text-foreground dark:text-neutral-200">
                      Usuário
                    </Label>
                    <Input
                      id={`observacao-usuario-${indice}`}
                      value={item.usuario}
                      readOnly
                      className="!bg-[#ffffff] dark:bg-neutral-800 dark:text-neutral-300 cursor-default border-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`observacao-texto-${indice}`} className="font-medium text-foreground dark:text-neutral-200">
                      Observação
                    </Label>
                    <textarea
                      id={`observacao-texto-${indice}`}
                      value={item.observacao}
                      disabled={!isEditing}
                      onChange={(e) => aoAlterarItem(indice, "observacao", e.target.value)}
                      placeholder="Descreva a observação..."
                      className={classeTextarea}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`observacao-status-${indice}`} className="font-medium text-foreground dark:text-neutral-200">
                      Status
                    </Label>
                    <select
                      id={`observacao-status-${indice}`}
                      value={item.status}
                      disabled={!isEditing}
                      onChange={(e) =>
                        aoAlterarItem(indice, "status", e.target.value as StatusObservacao)
                      }
                      className={classeSelect}
                    >
                      <option value="aberto">Aberto</option>
                      <option value="concluido">Concluído</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`observacao-resolucao-${indice}`} className="font-medium text-foreground dark:text-neutral-200">
                      Resolução
                    </Label>
                    <textarea
                      id={`observacao-resolucao-${indice}`}
                      value={item.resolucao}
                      disabled={!isEditing}
                      onChange={(e) => aoAlterarItem(indice, "resolucao", e.target.value)}
                      placeholder={
                        item.status === "concluido"
                          ? "Descreva como foi resolvido..."
                          : "Preencha ao concluir a observação."
                      }
                      className={classeTextarea}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t pt-6 dark:border-neutral-800">
        {isEditing ? (
          <>
            <GenericButton 
              variant="outline" 
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </GenericButton>
            <GenericButton 
              variant="salvar" 
              onClick={() => setIsEditing(false)} 
            />
          </>
        ) : (
          <GenericButton 
            variant="editar" 
            onClick={() => setIsEditing(true)} 
          />
        )}
      </div>
    </div>
  )
}

type Props = { projectId?: string; onChange?: (dados: DadosObservacoes) => void }

export function Observacoes({ projectId, onChange }: Props) {
  return <FormularioObservacoes projectId={projectId} onChange={onChange} />
}