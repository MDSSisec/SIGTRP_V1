"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type UseAsyncDataOptions<T> = {
  initialData: T
  errorMessage?: string
  loadOnMount?: boolean
}

type UseAsyncDataResult<T> = {
  data: T
  isLoading: boolean
  error: string | null
  reload: () => Promise<void>
  setData: React.Dispatch<React.SetStateAction<T>>
}

export function useAsyncData<T>(
  loader: () => Promise<T>,
  options: UseAsyncDataOptions<T>,
): UseAsyncDataResult<T> {
  const {
    initialData,
    errorMessage = "Não foi possível carregar os dados.",
    loadOnMount = true,
  } = options

  const [data, setData] = useState<T>(initialData)
  const [isLoading, setIsLoading] = useState(loadOnMount)
  const [error, setError] = useState<string | null>(null)
  const isMountedRef = useRef(true)
  const loaderRef = useRef(loader)
  const errorMessageRef = useRef(errorMessage)

  loaderRef.current = loader
  errorMessageRef.current = errorMessage

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const reload = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await loaderRef.current()

      if (!isMountedRef.current) return

      setData(result)
    } catch (loadError) {
      if (!isMountedRef.current) return

      setError(
        loadError instanceof Error
          ? loadError.message
          : errorMessageRef.current,
      )
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    if (!loadOnMount) return

    void reload()
  }, [loadOnMount, reload])

  return {
    data,
    isLoading,
    error,
    reload,
    setData,
  }
}
