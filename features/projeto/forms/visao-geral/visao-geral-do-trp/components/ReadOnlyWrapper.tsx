"use client"

import { useLayoutEffect, useRef, type ReactNode } from "react"

import { applyReadOnly } from "../utils/apply-read-only"
import styles from "../visao-geral-do-trp.module.css"

type ReadOnlyWrapperProps = {
  children: ReactNode
}

/**
 * Força campos internos a somente leitura (MutationObserver para conteúdo dinâmico).
 */
export function ReadOnlyWrapper({ children }: ReadOnlyWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    applyReadOnly(el)
    const observer = new MutationObserver(() => applyReadOnly(el))
    observer.observe(el, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={styles.readOnlyWrapper}>
      {children}
    </div>
  )
}
