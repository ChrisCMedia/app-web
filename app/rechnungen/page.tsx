import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Euro, Clock, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Rechnungen", 
  description: "Rechnungsverwaltung und Zahlungsübersicht"
}

const invoices = [
  {
    id: "RE-2024-001",
    customer: "Max Mustermann", 
    description: "Badezimmer-Renovierung",
    total: "€12.500",
    status: "PAID",
    dueDate: "2024-01-30",
    paidAt: "2024-01-25"
  },
  {
    id: "RE-2024-002",
    customer: "Anna Schmidt",
    description: "Küchenbau",
    total: "€18.200", 
    status: "SENT",
    dueDate: "2024-02-15",
    paidAt: null
  },
  {
    id: "RE-2024-003", 
    customer: "Peter Wagner",
    description: "Dachsanierung Teil 1",
    total: "€10.000",
    status: "OVERDUE",
    dueDate: "2024-01-05",
    paidAt: null
  }
]

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rechnungen</h1>
          <p className="text-muted-foreground">
            Verwalten Sie Rechnungen und überwachen Sie Zahlungseingänge.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neue Rechnung
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offene Rechnungen</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              €45.200 ausstehend
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Überfällig</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">
              €15.800 überfällig
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bezahlt (Monat)</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€28.450</div>
            <p className="text-xs text-muted-foreground">
              +12% zum Vormonat
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ø Zahlungsdauer</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Tage im Durchschnitt
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rechnungsliste</CardTitle>
          <CardDescription>
            Übersicht aller Rechnungen und deren Zahlungsstatus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rechnungs-Nr.</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead>Betrag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fällig am</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell className="font-medium">{invoice.total}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        invoice.status === "PAID" ? "default" : 
                        invoice.status === "OVERDUE" ? "destructive" : 
                        "secondary"
                      }
                    >
                      {invoice.status === "PAID" ? "Bezahlt" : 
                       invoice.status === "OVERDUE" ? "Überfällig" : 
                       "Offen"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={invoice.status === "OVERDUE" ? "text-red-600" : ""}>
                      {new Date(invoice.dueDate).toLocaleDateString("de-DE")}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}