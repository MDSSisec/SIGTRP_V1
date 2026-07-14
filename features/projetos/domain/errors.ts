export class AppError extends Error {
  readonly status: number
  readonly code?: string

  constructor(message: string, status = 400, code?: string) {
    super(message)
    this.name = "AppError"
    this.status = status
    this.code = code
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Não autenticado.") {
    super(message, 401, "UNAUTHORIZED")
    this.name = "UnauthorizedError"
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Sem permissão para esta ação.") {
    super(message, 403, "FORBIDDEN")
    this.name = "ForbiddenError"
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso não encontrado.") {
    super(message, 404, "NOT_FOUND")
    this.name = "NotFoundError"
  }
}

export class ValidationError extends AppError {
  constructor(message = "Dados inválidos.") {
    super(message, 400, "VALIDATION_ERROR")
    this.name = "ValidationError"
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}
