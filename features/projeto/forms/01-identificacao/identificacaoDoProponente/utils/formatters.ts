/**
 * Remove todos os caracteres que não sejam dígitos.
 */
function onlyNumbers(value: string | number): string {
  return String(value).replace(/\D/g, "")
}

/**
 * Formata um CNPJ.
 *
 * Exemplo:
 * 12345678000195 → 12.345.678/0001-95
 */
export function formatCNPJ(value: string | number): string {
  return onlyNumbers(value)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18)
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
 * Formata um CEP.
 *
 * Exemplo:
 * 70680900 → 70680-900
 */
export function formatCEP(value: string | number): string {
  return onlyNumbers(value)
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9)
}