import * as React from "react"

import styles from "./data-table.module.css"

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

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "Nenhum registro encontrado.",
  getRowKey,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className={styles[`align-${column.align ?? "left"}`]}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={
                getRowKey?.(row) ??
                String(row.id ?? row.rowKey ?? rowIndex)
              }
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className={styles[`align-${column.align ?? "left"}`]}
                >
                  {column.render
                    ? column.render(row)
                    : String(row[column.id] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
