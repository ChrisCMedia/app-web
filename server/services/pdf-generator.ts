import jsPDF from "jspdf"
import "jspdf-autotable"

interface QuoteItem {
  description: string
  quantity: number
  unit: string
  unitPrice: number
  total: number
}

interface Quote {
  id: string
  number: string
  customer: {
    name: string
    company?: string
    address?: string
  }
  items: QuoteItem[]
  total: number
  validUntil: Date
  createdAt: Date
  notes?: string
}

interface Invoice extends Omit<Quote, 'validUntil'> {
  dueDate: Date
  status: string
}

export class PDFGenerator {
  private doc: jsPDF

  constructor() {
    this.doc = new jsPDF()
  }

  private addCompanyHeader() {
    // Company logo and info
    this.doc.setFontSize(20)
    this.doc.text(process.env.COMPANY_NAME || "Handwerker BMS", 20, 30)
    
    this.doc.setFontSize(10)
    this.doc.text([
      process.env.COMPANY_ADDRESS || "Musterstraße 123",
      "12345 Musterstadt",
      `Tel: ${process.env.COMPANY_PHONE || "+49 123 456789"}`,
      `E-Mail: ${process.env.COMPANY_EMAIL || "info@example.com"}`
    ], 20, 40)

    // Line separator
    this.doc.line(20, 70, 190, 70)
  }

  private addCustomerInfo(customer: Quote['customer'], yPosition: number) {
    this.doc.setFontSize(12)
    this.doc.text("Kunde:", 120, yPosition)
    
    this.doc.setFontSize(10)
    const customerLines = [
      customer.name,
      ...(customer.company ? [customer.company] : []),
      ...(customer.address ? customer.address.split(", ") : [])
    ]
    
    this.doc.text(customerLines, 120, yPosition + 10)
    
    return yPosition + (customerLines.length * 5) + 15
  }

  generateQuote(quote: Quote): Buffer {
    this.doc = new jsPDF()
    
    // Header
    this.addCompanyHeader()
    
    // Title
    this.doc.setFontSize(16)
    this.doc.text(`Angebot ${quote.number}`, 20, 90)
    
    // Customer info
    const nextY = this.addCustomerInfo(quote.customer, 90)
    
    // Quote details
    this.doc.setFontSize(10)
    this.doc.text([
      `Angebotsdatum: ${quote.createdAt.toLocaleDateString("de-DE")}`,
      `Gültig bis: ${quote.validUntil.toLocaleDateString("de-DE")}`
    ], 20, nextY)

    // Items table
    const tableData = quote.items.map(item => [
      item.description,
      item.quantity.toString(),
      item.unit,
      `€${item.unitPrice.toFixed(2)}`,
      `€${item.total.toFixed(2)}`
    ])

    // @ts-ignore - jsPDF autoTable plugin
    this.doc.autoTable({
      startY: nextY + 20,
      head: [["Beschreibung", "Menge", "Einheit", "Einzelpreis", "Gesamtpreis"]],
      body: tableData,
      foot: [["", "", "", "Gesamtsumme:", `€${quote.total.toFixed(2)}`]],
      theme: "grid",
      styles: { fontSize: 9 },
      headStyles: { fillColor: [70, 130, 180] },
      footStyles: { fillColor: [240, 240, 240], fontStyle: "bold" }
    })

    // Notes
    if (quote.notes) {
      // @ts-ignore
      const finalY = this.doc.lastAutoTable.finalY + 20
      this.doc.text("Anmerkungen:", 20, finalY)
      this.doc.text(quote.notes, 20, finalY + 10)
    }

    // Footer
    const pageHeight = this.doc.internal.pageSize.height
    this.doc.text([
      "Vielen Dank für Ihr Vertrauen!",
      "Bei Fragen stehen wir Ihnen gerne zur Verfügung."
    ], 20, pageHeight - 30)

    return Buffer.from(this.doc.output("arraybuffer"))
  }

  generateInvoice(invoice: Invoice): Buffer {
    this.doc = new jsPDF()
    
    // Header
    this.addCompanyHeader()
    
    // Title
    this.doc.setFontSize(16)
    this.doc.text(`Rechnung ${invoice.number}`, 20, 90)
    
    // Customer info
    const nextY = this.addCustomerInfo(invoice.customer, 90)
    
    // Invoice details
    this.doc.setFontSize(10)
    this.doc.text([
      `Rechnungsdatum: ${invoice.createdAt.toLocaleDateString("de-DE")}`,
      `Fälligkeitsdatum: ${invoice.dueDate.toLocaleDateString("de-DE")}`,
      `Status: ${this.getInvoiceStatusLabel(invoice.status)}`
    ], 20, nextY)

    // Items table
    const tableData = invoice.items.map(item => [
      item.description,
      item.quantity.toString(),
      item.unit,
      `€${item.unitPrice.toFixed(2)}`,
      `€${item.total.toFixed(2)}`
    ])

    // Calculate tax (19% VAT)
    const netTotal = invoice.total / 1.19
    const taxAmount = invoice.total - netTotal

    // @ts-ignore
    this.doc.autoTable({
      startY: nextY + 25,
      head: [["Beschreibung", "Menge", "Einheit", "Einzelpreis", "Gesamtpreis"]],
      body: tableData,
      foot: [
        ["", "", "", "Nettobetrag:", `€${netTotal.toFixed(2)}`],
        ["", "", "", "MwSt. (19%):", `€${taxAmount.toFixed(2)}`],
        ["", "", "", "Gesamtbetrag:", `€${invoice.total.toFixed(2)}`]
      ],
      theme: "grid",
      styles: { fontSize: 9 },
      headStyles: { fillColor: [70, 130, 180] },
      footStyles: { fillColor: [240, 240, 240], fontStyle: "bold" }
    })

    // Payment info
    // @ts-ignore
    const finalY = this.doc.lastAutoTable.finalY + 20
    this.doc.text([
      "Zahlungshinweise:",
      "Bitte überweisen Sie den Betrag bis zum Fälligkeitsdatum auf unser Konto.",
      "Bei Fragen zur Rechnung kontaktieren Sie uns bitte."
    ], 20, finalY)

    // Notes
    if (invoice.notes) {
      this.doc.text("Anmerkungen:", 20, finalY + 25)
      this.doc.text(invoice.notes, 20, finalY + 35)
    }

    return Buffer.from(this.doc.output("arraybuffer"))
  }

  private getInvoiceStatusLabel(status: string): string {
    const statusMap = {
      DRAFT: "Entwurf",
      SENT: "Versendet", 
      PAID: "Bezahlt",
      OVERDUE: "Überfällig",
      CANCELLED: "Storniert"
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  generateWorkReport(report: any): Buffer {
    this.doc = new jsPDF()
    
    // Header
    this.addCompanyHeader()
    
    // Title
    this.doc.setFontSize(16)
    this.doc.text("Arbeitsbericht", 20, 90)
    
    // Report details
    this.doc.setFontSize(10)
    this.doc.text([
      `Projekt: ${report.project.name}`,
      `Mitarbeiter: ${report.user.name}`,
      `Datum: ${report.date.toLocaleDateString("de-DE")}`,
      `Arbeitsstunden: ${report.hours}`
    ], 20, 110)

    // Description
    this.doc.text("Tätigkeitsbeschreibung:", 20, 140)
    this.doc.text(report.description, 20, 150, { maxWidth: 170 })

    return Buffer.from(this.doc.output("arraybuffer"))
  }

  generateConstructionDiary(diary: any): Buffer {
    this.doc = new jsPDF()
    
    // Header
    this.addCompanyHeader()
    
    // Title
    this.doc.setFontSize(16)
    this.doc.text("Bautagebuch", 20, 90)
    
    // Diary details
    this.doc.setFontSize(10)
    this.doc.text([
      `Projekt: ${diary.project.name}`,
      `Datum: ${diary.date.toLocaleDateString("de-DE")}`,
      `Wetter: ${diary.weather || "Nicht angegeben"}`,
      `Arbeiter vor Ort: ${diary.workers}`,
      `Geräte/Maschinen: ${diary.equipment || "Keine besonderen"}`
    ], 20, 110)

    // Notes
    this.doc.text("Tagesnotizen:", 20, 150)
    this.doc.text(diary.notes, 20, 160, { maxWidth: 170 })

    return Buffer.from(this.doc.output("arraybuffer"))
  }
}