"use client"

import { useState } from "react"
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ConfirmeModal } from "@/components/ui/confirmeModal"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PROJETO_TIPOS } from "../constants/project-types"
import type { Projeto } from "../types"
import { getProjetoEditPath } from "../utils/projeto-routes"
import { ProjetoEtapaBadge } from "@/features/projeto/components/etapaBadge"

type ProjetosTableProps = {
  projetos: Projeto[]
  emptyMessage?: string
  canDelete?: boolean
  onDelete?: (id: string) => Promise<void>
}

export function ProjetosTable({
  projetos,
  emptyMessage = "Nenhum projeto encontrado.",
  canDelete = false,
  onDelete,
}: ProjetosTableProps) {
  const [projetoToDelete, setProjetoToDelete] = useState<Projeto | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  async function handleConfirmDelete() {
    if (!projetoToDelete || !onDelete) return

    setIsDeleting(true)
    setDeleteError(null)

    try {
      await onDelete(projetoToDelete.id)
      setProjetoToDelete(null)
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir o projeto.",
      )
    } finally {
      setIsDeleting(false)
    }
  }

  function handleCloseConfirm() {
    if (isDeleting) return
    setProjetoToDelete(null)
    setDeleteError(null)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Projeto</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Etapa do Projeto</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projetos.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            projetos.map((projeto) => {
            const editPath = getProjetoEditPath(projeto.id, projeto.tipoProjeto)
            const canEditTed =
              projeto.tipoProjeto === PROJETO_TIPOS.TED && editPath

            return (
              <TableRow key={projeto.id}>
                <TableCell className="font-medium">{projeto.nome}</TableCell>
                <TableCell>{projeto.responsavel}</TableCell>
                <TableCell>
                  <ProjetoEtapaBadge
                    etapa={projeto.etapaNome}
                    ordem={projeto.etapaOrdem}
                  />
                </TableCell>
                <TableCell>{projeto.tipo}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    {/* {canEditTed ? (
                      <Button
                        nativeButton={false}
                        variant="outline"
                        size="icon-sm"
                        className="bg-background"
                        aria-label={`Ver projeto ${projeto.nome}`}
                        render={
                          <Link
                            href={editPath}
                            aria-label={`Ver projeto ${projeto.nome}`}
                          />
                        }
                      >
                        <EyeIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="bg-background"
                        aria-label={`Ver projeto ${projeto.nome}`}
                        disabled
                      >
                        <EyeIcon />
                      </Button>
                    )} */}
                    {canEditTed ? (
                      <Button
                        nativeButton={false}
                        variant="outline"
                        size="icon-sm"
                        className="bg-background"
                        aria-label={`Editar projeto ${projeto.nome}`}
                        render={
                          <Link
                            href={editPath}
                            aria-label={`Editar projeto ${projeto.nome}`}
                          />
                        }
                      >
                        <PencilIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="bg-background"
                        aria-label={`Editar projeto ${projeto.nome}`}
                        disabled
                        title="Edição disponível apenas para projetos TED"
                      >
                        <PencilIcon />
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="icon-sm"
                      className="border-0 bg-destructive/10 text-destructive hover:bg-destructive/20"
                      aria-label={`Excluir projeto ${projeto.nome}`}
                      disabled={!canDelete || !onDelete}
                      title={
                        canDelete
                          ? `Excluir projeto ${projeto.nome}`
                          : "Sem permissão para excluir projetos"
                      }
                      onClick={() => setProjetoToDelete(projeto)}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })
          )}
        </TableBody>
      </Table>

      <ConfirmeModal
        open={Boolean(projetoToDelete)}
        title="Excluir projeto?"
        description={
          deleteError
            ? deleteError
            : `Tem certeza que deseja excluir o projeto "${projetoToDelete?.nome}"? Esta ação não pode ser desfeita e removerá todas as informações vinculadas a ele.`
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseConfirm}
      />

    </>
  )
}
