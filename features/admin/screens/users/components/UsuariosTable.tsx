"use client"

import { PencilIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Usuario } from "../types"
import styles from "./UsuariosTable.module.css"

type UsuariosTableProps = {
  items: Usuario[]
  perfilNomeById: Map<number, string>
  canViewSenha?: boolean
  onEdit: (usuario: Usuario) => void
  onDelete: (usuario: Usuario) => void
}

export function UsuariosTable({
  items,
  perfilNomeById,
  canViewSenha = false,
  onEdit,
  onDelete,
}: UsuariosTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Perfil</TableHead>
          {canViewSenha ? <TableHead>Senha</TableHead> : null}
          <TableHead>Status</TableHead>
          <TableHead className={styles.actionsHead}>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((usuario) => (
          <TableRow key={usuario.id}>
            <TableCell className={styles.nameCell}>{usuario.nome}</TableCell>
            <TableCell>{usuario.email}</TableCell>
            <TableCell className={styles.tipoCell}>{usuario.tipo}</TableCell>
            <TableCell>
              {perfilNomeById.get(usuario.perfilId) ?? "—"}
            </TableCell>
            {canViewSenha ? (
              <TableCell className={styles.senhaCell}>{usuario.senha}</TableCell>
            ) : null}
            <TableCell>{usuario.ativo ? "Ativo" : "Inativo"}</TableCell>
            <TableCell>
              <div className={styles.actions}>
                <Button
                  variant="outline"
                  size="icon-sm"
                  className={styles.editButton}
                  aria-label={`Editar ${usuario.nome}`}
                  onClick={() => onEdit(usuario)}
                >
                  <PencilIcon />
                </Button>
                <Button
                  size="icon-sm"
                  className={styles.deleteButton}
                  aria-label={`Excluir ${usuario.nome}`}
                  onClick={() => onDelete(usuario)}
                >
                  <Trash2Icon />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
