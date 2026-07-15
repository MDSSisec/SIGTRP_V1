import { domToCanvas } from "modern-screenshot"
import { jsPDF } from "jspdf"

const PDF_MARGIN_MM = 10

type RestorableDisplay = {
  el: HTMLElement
  display: string
}

type RestorableTextarea = {
  el: HTMLTextAreaElement
  maxHeight: string
  height: string
  overflow: string
}

function prepareElementForCapture(element: HTMLElement) {
  const hidden: RestorableDisplay[] = []
  const textareas: RestorableTextarea[] = []
  const previousBackground = element.style.background
  const previousWidth = element.style.width

  element.querySelectorAll("[data-pdf-hide]").forEach((node) => {
    if (node instanceof HTMLElement) {
      hidden.push({ el: node, display: node.style.display })
      node.style.display = "none"
    }
  })

  element.style.background = "#ffffff"
  element.style.width = `${element.scrollWidth}px`

  element.querySelectorAll("textarea").forEach((node) => {
    if (node instanceof HTMLTextAreaElement) {
      textareas.push({
        el: node,
        maxHeight: node.style.maxHeight,
        height: node.style.height,
        overflow: node.style.overflow,
      })
      node.style.maxHeight = "none"
      node.style.height = `${node.scrollHeight}px`
      node.style.overflow = "visible"
    }
  })

  return () => {
    element.style.background = previousBackground
    element.style.width = previousWidth

    hidden.forEach(({ el, display }) => {
      el.style.display = display
    })

    textareas.forEach(({ el, maxHeight, height, overflow }) => {
      el.style.maxHeight = maxHeight
      el.style.height = height
      el.style.overflow = overflow
    })
  }
}

export async function exportVisaoGeralToPdf(
  element: HTMLElement,
  filename: string,
) {
  const restore = prepareElementForCapture(element)

  try {
    const canvas = await domToCanvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const contentWidth = pageWidth - PDF_MARGIN_MM * 2
    const contentHeight = pageHeight - PDF_MARGIN_MM * 2
    const imgHeight = (canvas.height * contentWidth) / canvas.width
    const imgData = canvas.toDataURL("image/png")

    let heightLeft = imgHeight
    let position = PDF_MARGIN_MM

    pdf.addImage(imgData, "PNG", PDF_MARGIN_MM, position, contentWidth, imgHeight)
    heightLeft -= contentHeight

    while (heightLeft > 0) {
      position = PDF_MARGIN_MM - (imgHeight - heightLeft)
      pdf.addPage()
      pdf.addImage(imgData, "PNG", PDF_MARGIN_MM, position, contentWidth, imgHeight)
      heightLeft -= contentHeight
    }

    pdf.save(filename)
  } finally {
    restore()
  }
}
