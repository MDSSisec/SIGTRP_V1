import * as React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type TableColumn<T extends Record<string, unknown>> = {
  id: keyof T & string
  label: string
  align?: "left" | "center" | "right"
  render?: (row: T) => React.ReactNode
}

type DataTableProps<T extends Record<string, unknown>> = {
  columns: TableColumn<T>[]
  data: T[]
  emptyMessage?: string
  getRowKey?: (row: T) => string
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "Nenhum registro encontrado.",
  getRowKey,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">{emptyMessage}</p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(({ id, label, align = "left" }) => (
            <TableHead key={id} className={cn(alignClass[align])}>
              {label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => {
          const rowKey =
            getRowKey?.(row) ??
            String(row.id ?? row.rowKey ?? index)

          return (
            <TableRow key={rowKey}>
              {columns.map(({ id, align = "left", render }) => (
                <TableCell
                  key={id}
                  className={cn(alignClass[align], "whitespace-normal")}
                >
                  {render ? render(row) : String(row[id] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
