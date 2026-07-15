"use client"

import { FileDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { COMUNS_TITLES } from "@/features/projeto/constants/communs"
import {
  DESCRICAO_VISAO_GERAL,
  TITULO_VISAO_GERAL,
} from "@/features/projeto/constants/visao-geral"

import styles from "../visao-geral-do-trp.module.css"

type VisaoGeralHeaderProps = {
  isExporting: boolean
  canExport: boolean
  onExportPdf: () => void
}

export function VisaoGeralHeader({
  isExporting,
  canExport,
  onExportPdf,
}: VisaoGeralHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <h2 className={styles.title}>{TITULO_VISAO_GERAL}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onExportPdf}
          disabled={!canExport}
        >
          <FileDown className="size-4" />
          {isExporting ? "Exportando..." : COMUNS_TITLES.TITLE_EXPORTAR_PDF}
        </Button>
      </div>
      <p className={styles.description}>{DESCRICAO_VISAO_GERAL}</p>
    </div>
  )
}
