/**
 * Remove todos os caracteres que não sejam dígitos.
 */
function onlyNumbers(value: string | number): string {
  return String(value).replace(/\D/g, "")
}

/**
 * Formata um CPF.
 *
 * Exemplo:
 * 12345678901 → 123.456.789-01
 */
export function formatCpf(value: string | number): string {
  return onlyNumbers(value)
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
    .slice(0, 14)
}

/** Mantém apenas dígitos na matrícula funcional (sempre 7 números). */
export function sanitizeMatriculaFuncional(value: string | number): string {
  return onlyNumbers(value).slice(0, 7)
}

/**
 * Formata um telefone brasileiro.
 *
 * Exemplo:
 * 61999998888 → (61) 99999-8888
 */
export function formatTelefone(value: string | number): string {
  return onlyNumbers(value)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15)
}

/**
 * Rótulos utilizados nas mensagens de validação
 * dos campos textuais.
 */
const TEXT_FIELD_LABELS: Record<string, string> = {
  nome: "Nome",
  profissao: "Profissão",
  cargo: "Cargo",
  estadoCivil: "Estado Civil",
}

/**
 * Valida campos que não devem aceitar números.
 *
 * Caso o campo seja monitorado e contenha dígitos,
 * exibe uma mensagem ao usuário e retorna `false`.
 *
 * @param name Nome do campo.
 * @param value Valor informado.
 * @returns `true` quando o valor é válido.
 */
export function validateTextWithoutDigits(
  name: string,
  value: string,
): boolean {
  const label = TEXT_FIELD_LABELS[name]

  if (!label) return true
  if (!/\d/.test(value)) return true

  alert(`O campo ${label} não aceita números.`)
  return false
}