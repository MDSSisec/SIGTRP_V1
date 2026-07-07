"use client"

import * as React from "react"

type BreadcrumbContextValue = {
  setProjectName: (name: string | null) => void
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  setProjectName: () => undefined,
})

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const value = React.useMemo(
    () => ({
      setProjectName: () => undefined,
    }),
    [],
  )

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumb() {
  return React.useContext(BreadcrumbContext)
}
