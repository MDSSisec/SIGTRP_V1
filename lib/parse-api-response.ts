export async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => null)) as T | {
    error?: string
    message?: string
  } | null

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && "error" in data && data.error) ||
      (data && typeof data === "object" && "message" in data && data.message) ||
      "Erro na requisição"

    throw new Error(String(message))
  }

  return data as T
}
