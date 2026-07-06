"use client"

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react"

type PageHeaderState = {
  title: string
  subtitle?: string
  action: ReactNode | null
}

type PageHeaderContextValue = {
  header: PageHeaderState | null
  setHeader: (header: PageHeaderState | null) => void
}

const PageHeaderContext = createContext<PageHeaderContextValue | null>(null)

export function PageHeaderActionProvider({
  children,
}: {
  children: ReactNode
}) {
  const [header, setHeader] = useState<PageHeaderState | null>(null)

  return (
    <PageHeaderContext.Provider value={{ header, setHeader }}>
      {children}
    </PageHeaderContext.Provider>
  )
}

function usePageHeader() {
  const context = useContext(PageHeaderContext)

  if (!context) {
    throw new Error(
      "PageHeader deve ser usado dentro de PageHeaderActionProvider",
    )
  }

  return context
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  const { setHeader } = usePageHeader()

  useLayoutEffect(() => {
    setHeader({ title, subtitle, action: action ?? null })

    return () => {
      setHeader(null)
    }
  }, [title, subtitle, action, setHeader])

  return null
}

export function usePageHeaderSlot() {
  const context = useContext(PageHeaderContext)

  return context?.header ?? null
}
