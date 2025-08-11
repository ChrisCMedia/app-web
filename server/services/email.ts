import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType: string
  }>
}

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments
      }

      await this.transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.error("Email sending failed:", error)
      return false
    }
  }

  async sendQuoteEmail(customerEmail: string, quotePdf: Buffer, quoteNumber: string): Promise<boolean> {
    const subject = `Angebot ${quoteNumber} - ${process.env.COMPANY_NAME}`
    const html = `
      <h2>Ihr Angebot ${quoteNumber}</h2>
      <p>Sehr geehrte Damen und Herren,</p>
      <p>anbei erhalten Sie unser Angebot ${quoteNumber} als PDF-Datei.</p>
      <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
      <p>Mit freundlichen Grüßen<br>
      Ihr Team von ${process.env.COMPANY_NAME}</p>
      
      <hr>
      <p><small>
        ${process.env.COMPANY_NAME}<br>
        ${process.env.COMPANY_ADDRESS}<br>
        Tel: ${process.env.COMPANY_PHONE}<br>
        E-Mail: ${process.env.COMPANY_EMAIL}
      </small></p>
    `

    return this.sendEmail({
      to: customerEmail,
      subject,
      html,
      attachments: [{
        filename: `Angebot_${quoteNumber}.pdf`,
        content: quotePdf,
        contentType: "application/pdf"
      }]
    })
  }

  async sendInvoiceEmail(customerEmail: string, invoicePdf: Buffer, invoiceNumber: string): Promise<boolean> {
    const subject = `Rechnung ${invoiceNumber} - ${process.env.COMPANY_NAME}`
    const html = `
      <h2>Ihre Rechnung ${invoiceNumber}</h2>
      <p>Sehr geehrte Damen und Herren,</p>
      <p>anbei erhalten Sie unsere Rechnung ${invoiceNumber} als PDF-Datei.</p>
      <p>Bitte überweisen Sie den Rechnungsbetrag bis zum angegebenen Fälligkeitsdatum.</p>
      <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
      <p>Mit freundlichen Grüßen<br>
      Ihr Team von ${process.env.COMPANY_NAME}</p>
      
      <hr>
      <p><small>
        ${process.env.COMPANY_NAME}<br>
        ${process.env.COMPANY_ADDRESS}<br>
        Tel: ${process.env.COMPANY_PHONE}<br>
        E-Mail: ${process.env.COMPANY_EMAIL}
      </small></p>
    `

    return this.sendEmail({
      to: customerEmail,
      subject,
      html,
      attachments: [{
        filename: `Rechnung_${invoiceNumber}.pdf`,
        content: invoicePdf,
        contentType: "application/pdf"
      }]
    })
  }

  async sendProjectUpdateEmail(customerEmail: string, projectName: string, status: string, message?: string): Promise<boolean> {
    const subject = `Projekt-Update: ${projectName}`
    const html = `
      <h2>Projekt-Update</h2>
      <p>Sehr geehrte Damen und Herren,</p>
      <p>hiermit informieren wir Sie über den aktuellen Status Ihres Projekts:</p>
      <ul>
        <li><strong>Projekt:</strong> ${projectName}</li>
        <li><strong>Status:</strong> ${this.getStatusLabel(status)}</li>
      </ul>
      ${message ? `<p><strong>Nachricht:</strong><br>${message}</p>` : ""}
      <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
      <p>Mit freundlichen Grüßen<br>
      Ihr Team von ${process.env.COMPANY_NAME}</p>
    `

    return this.sendEmail({
      to: customerEmail,
      subject,
      html
    })
  }

  async sendAppointmentReminderEmail(customerEmail: string, appointmentTitle: string, appointmentDate: Date): Promise<boolean> {
    const subject = `Terminerinnerung: ${appointmentTitle}`
    const html = `
      <h2>Terminerinnerung</h2>
      <p>Sehr geehrte Damen und Herren,</p>
      <p>wir möchten Sie an Ihren bevorstehenden Termin erinnern:</p>
      <ul>
        <li><strong>Termin:</strong> ${appointmentTitle}</li>
        <li><strong>Datum:</strong> ${appointmentDate.toLocaleDateString("de-DE")}</li>
        <li><strong>Zeit:</strong> ${appointmentDate.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</li>
      </ul>
      <p>Falls Sie den Termin nicht wahrnehmen können, bitten wir Sie um rechtzeitige Absage.</p>
      <p>Mit freundlichen Grüßen<br>
      Ihr Team von ${process.env.COMPANY_NAME}</p>
    `

    return this.sendEmail({
      to: customerEmail,
      subject,
      html
    })
  }

  async sendWelcomeEmail(userEmail: string, userName: string, tempPassword?: string): Promise<boolean> {
    const subject = `Willkommen bei ${process.env.COMPANY_NAME} BMS`
    const html = `
      <h2>Willkommen im Handwerker BMS!</h2>
      <p>Hallo ${userName},</p>
      <p>Ihr Konto wurde erfolgreich erstellt. Sie können sich nun mit folgenden Daten anmelden:</p>
      <ul>
        <li><strong>E-Mail:</strong> ${userEmail}</li>
        ${tempPassword ? `<li><strong>Temporäres Passwort:</strong> ${tempPassword}</li>` : ""}
      </ul>
      ${tempPassword ? "<p><strong>Wichtig:</strong> Bitte ändern Sie Ihr Passwort nach der ersten Anmeldung.</p>" : ""}
      <p>Sie können sich unter folgender Adresse anmelden:<br>
      <a href="${process.env.NEXTAUTH_URL}/(auth)/login">Zur Anmeldung</a></p>
      <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
      <p>Mit freundlichen Grüßen<br>
      Ihr BMS-Team</p>
    `

    return this.sendEmail({
      to: userEmail,
      subject,
      html
    })
  }

  private getStatusLabel(status: string): string {
    const statusMap = {
      PLANNING: "In Planung",
      ACTIVE: "In Bearbeitung",
      ON_HOLD: "Pausiert",
      COMPLETED: "Abgeschlossen",
      CANCELLED: "Abgebrochen"
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      return true
    } catch (error) {
      console.error("SMTP connection test failed:", error)
      return false
    }
  }
}