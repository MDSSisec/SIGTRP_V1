"use client"

import { useMemo, useState } from "react"
import { EyeIcon, PencilIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/blocks/sidebar/page-header-action"
import { Input } from "@/components/ui/input"
import { MenuBar } from "@/components/ui/menuBar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MOCK_STATUS } from "../../constants/mock-admin-entities"
import type { AdminEntityFilter } from "../../types/admin-entity"
import { buildMenuItems, filterItems } from "../../utils/admin-entity-filter"

export function AdminStatusScreen() {
  const [filter, setFilter] = useState<AdminEntityFilter>("todos")
  const [search, setSearch] = useState("")

  const menuItems = useMemo(() => buildMenuItems(MOCK_STATUS), [])
  const items = useMemo(
    () => filterItems(MOCK_STATUS, filter, search),
    [filter, search],
  )

  const pageHeader = (
    <PageHeader
      title="Status"
      subtitle="Gerencie os status dos projetos."
      action={
        <Button type="button">
          <PlusIcon />
          Criar Status
        </Button>
      }
    />
  )

  return (
    <>
      {pageHeader}
      <div className="space-y-4">
      <MenuBar items={menuItems} value={filter} onValueChange={setFilter}>
        <div className="relative w-full">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar status..."
            className="bg-background pl-8"
            aria-label="Buscar status"
          />
        </div>
      </MenuBar>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.nome}</TableCell>
              <TableCell className="max-w-xs truncate">{item.descricao}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="bg-background"
                    aria-label={`Ver ${item.nome}`}
                  >
                    <EyeIcon />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="bg-background"
                    aria-label={`Editar ${item.nome}`}
                  >
                    <PencilIcon />
                  </Button>
                  <Button
                    size="icon-sm"
                    className="border-0 bg-destructive/10 text-destructive hover:bg-destructive/20"
                    aria-label={`Excluir ${item.nome}`}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </>
  )
}
