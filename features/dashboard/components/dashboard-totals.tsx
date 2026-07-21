"use client"

import {
  FilePenLineIcon,
  FileSignatureIcon,
  HandshakeIcon,
  LayoutGridIcon,
  LandmarkIcon,
  ScrollTextIcon,
} from "lucide-react"

import { Total } from "@/components/ui/total"

type DashboardTotalsProps = {
  totalProjetos: number
  preenchimentoTrp: number
  instrumentosCelebrados: number
  totalTed: number
  totalEmenda: number
  totalConvenio: number
  isLoading?: boolean
}

export function DashboardTotals({
  totalProjetos,
  preenchimentoTrp,
  instrumentosCelebrados,
  totalTed,
  totalEmenda,
  totalConvenio,
  isLoading = false,
}: DashboardTotalsProps) {
  const totals = [
    {
      label: "Total de projetos",
      value: totalProjetos,
      icon: <LayoutGridIcon />,
      description: "Quantidade total de projetos cadastrados.",
    },
    {
      label: "Preenchimento do TRP",
      value: preenchimentoTrp,
      icon: <FilePenLineIcon />,
      description: 'Projetos na etapa "TRP em Elaboração".',
    },
    {
      label: "Instrumentos Celebrados",
      value: instrumentosCelebrados,
      icon: <FileSignatureIcon />,
      description: 'Projetos na etapa "Instrumento Celebrado".',
    },
    {
      label: "Total TED",
      value: totalTed,
      icon: <ScrollTextIcon />,
      description: 'Projetos com tipo "TED".',
    },
    {
      label: "Total Emenda",
      value: totalEmenda,
      icon: <LandmarkIcon />,
      description: 'Projetos com tipo "EMENDA".',
    },
    {
      label: "Total Convenio",
      value: totalConvenio,
      icon: <HandshakeIcon />,
      description: 'Projetos com tipo "CONVENIO".',
    },
  ] as const

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {totals.map((item) => (
        <Total
          key={item.label}
          label={item.label}
          value={isLoading ? "…" : item.value}
          icon={item.icon}
          description={item.description}
        />
      ))}
    </div>
  )
}
