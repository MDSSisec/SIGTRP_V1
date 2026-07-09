import {
  CircleCheckIcon,
  ClockIcon,
  LayoutGridIcon,
  SearchIcon,
} from "lucide-react"

import { Total } from "@/components/ui/total"

const totals = [
  {
    label: "Total de projetos",
    value: 115,
    icon: <LayoutGridIcon />,
    description: "Quantidade total de projetos cadastrados no sistema.",
  },
  {
    label: "Aprovados",
    value: 68,
    icon: <CircleCheckIcon />,
    description: "Projetos com status aprovado.",
  },
  {
    label: "Em Análise",
    value: 29,
    icon: <SearchIcon />,
    description: "Projetos em processo de análise.",
  },
  {
    label: "Pendências",
    value: 18,
    icon: <ClockIcon />,
    description: "Projetos com pendências a resolver.",
  },
  {
    label: "Concluídos",
    value: 47,
    icon: <CircleCheckIcon />,
    description: "Projetos finalizados com sucesso.",
  },
] as const

export function DashboardTotals() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {totals.map((item) => (
        <Total
          key={item.label}
          label={item.label}
          value={item.value}
          icon={item.icon}
          description={item.description}
        />
      ))}
    </div>
  )
}
