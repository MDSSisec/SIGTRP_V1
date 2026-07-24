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
  onEdit: (usuario: Usuario) => void
  onDelete: (usuario: Usuario) => void
}

export function UsuariosTable({
  items,
  perfilNomeById,
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
          <TableHead>Senha</TableHead>
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
            <TableCell className={styles.senhaCell}>{usuario.senha}</TableCell>
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
