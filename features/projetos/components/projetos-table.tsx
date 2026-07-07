import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
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
import { ProjetoStatusBadge } from "./statusBadge/status-badge"

type ProjetosTableProps = {
  projetos: Projeto[]
}

export function ProjetosTable({ projetos }: ProjetosTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Projeto</TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projetos.map((projeto) => {
          const editPath = getProjetoEditPath(projeto.id, projeto.tipoProjeto)
          const canEditTed = projeto.tipoProjeto === PROJETO_TIPOS.TED && editPath

          return (
          <TableRow key={projeto.id}>
            <TableCell className="font-medium">{projeto.nome}</TableCell>
            <TableCell>{projeto.responsavel}</TableCell>
            <TableCell>
              <ProjetoStatusBadge status={projeto.status} />
            </TableCell>
            <TableCell>{projeto.tipo}</TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-1">
                {canEditTed ? (
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
                )}
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
                  size="icon-sm"
                  className="border-0 bg-destructive/10 text-destructive hover:bg-destructive/20"
                  aria-label={`Excluir projeto ${projeto.nome}`}
                >
                  <Trash2Icon />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
