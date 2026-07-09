import type { UfSource } from "@/components/map"

function createUfEntries(uf: string, total: number): UfSource[] {
  return Array.from({ length: total }, () => ({ uf }))
}

/** Mock: 115 projetos distribuídos em várias UFs, com maior concentração no PI. */
export const DASHBOARD_PROJECTS_BY_UF: UfSource[] = [
  ...createUfEntries("PI", 28),
  ...createUfEntries("BA", 14),
  ...createUfEntries("PE", 11),
  ...createUfEntries("CE", 9),
  ...createUfEntries("MA", 8),
  ...createUfEntries("PB", 6),
  ...createUfEntries("RN", 5),
  ...createUfEntries("AL", 4),
  ...createUfEntries("SE", 3),
  ...createUfEntries("SP", 7),
  ...createUfEntries("RJ", 4),
  ...createUfEntries("MG", 5),
  ...createUfEntries("PR", 3),
  ...createUfEntries("RS", 2),
  ...createUfEntries("SC", 1),
  ...createUfEntries("AM", 2),
  ...createUfEntries("PA", 1),
  ...createUfEntries("GO", 1),
  ...createUfEntries("DF", 1),
]
