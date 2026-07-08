"use client"

import * as React from "react"

import type { ProjectModelData } from "../types/ted"

type ProjectDataContextValue = {
  projectData: ProjectModelData | null
  updateProjectData: (patch: Partial<ProjectModelData>) => void
}

const ProjectDataContext = React.createContext<ProjectDataContextValue>({
  projectData: null,
  updateProjectData: () => {},
})

type ProjectDataProviderProps = {
  projectId: string
  projectData: ProjectModelData | null
  children: React.ReactNode
}

export function ProjectDataProvider({
  projectData: initialProjectData,
  children,
}: ProjectDataProviderProps) {
  const [projectData, setProjectData] = React.useState(initialProjectData)

  React.useEffect(() => {
    setProjectData(initialProjectData)
  }, [initialProjectData])

  const updateProjectData = React.useCallback((patch: Partial<ProjectModelData>) => {
    setProjectData((current) => (current ? { ...current, ...patch } : current))
  }, [])

  const value = React.useMemo(
    () => ({ projectData, updateProjectData }),
    [projectData, updateProjectData],
  )

  return (
    <ProjectDataContext.Provider value={value}>
      {children}
    </ProjectDataContext.Provider>
  )
}

export function useProjectData() {
  return React.useContext(ProjectDataContext).projectData
}

export function useUpdateProjectData() {
  return React.useContext(ProjectDataContext).updateProjectData
}
