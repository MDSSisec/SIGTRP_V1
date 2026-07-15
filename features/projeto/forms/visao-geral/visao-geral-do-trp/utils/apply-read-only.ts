/** Marca inputs/seletores como somente leitura e esconde botões. */
export function applyReadOnly(el: HTMLElement) {
  el.querySelectorAll("input, textarea, select").forEach((node) => {
    const n = node as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    n.setAttribute("readonly", "")
    n.setAttribute("disabled", "")
    n.setAttribute("tabIndex", "-1")
  })
  el.querySelectorAll("button").forEach((node) => {
    const btn = node as HTMLButtonElement
    btn.style.display = "none"
  })
  el.querySelectorAll("[contenteditable]").forEach((node) => {
    ;(node as HTMLElement).setAttribute("contenteditable", "false")
  })
}
