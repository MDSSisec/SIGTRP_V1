"use client"

import * as React from "react"

import type { ProjectModelData } from "../types/ted"

type ProjectDataContextValue = ProjectModelData | null

const ProjectDataContext = React.createContext<ProjectDataContextValue>(null)

type ProjectDataProviderProps = {
  projectId: string
  projectData: ProjectModelData | null
  children: React.ReactNode
}

export function ProjectDataProvider({
  projectData,
  children,
}: ProjectDataProviderProps) {
  return (
    <ProjectDataContext.Provider value={projectData}>
      {children}
    </ProjectDataContext.Provider>
  )
}

export function useProjectData() {
  return React.useContext(ProjectDataContext)
}
