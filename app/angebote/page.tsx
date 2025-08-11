import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Euro, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Angebote",
  description: "Angebotsverwaltung und Kostenvoranschläge"
}

const quotes = [
  {
    id: "ANB-2024-001",
    customer: "Max Mustermann",
    title: "Badezimmer-Renovierung",
    total: "€12.500",
    status: "SENT",
    validUntil: "2024-02-15",
    createdAt: "2024-01-10"
  },
  {
    id: "ANB-2024-002", 
    customer: "Anna Schmidt",
    title: "Küchenbau komplett",
    total: "€18.200",
    status: "ACCEPTED",
    validUntil: "2024-02-28",
    createdAt: "2024-01-08"
  },
  {
    id: "ANB-2024-003",
    customer: "Peter Wagner", 
    title: "Dachsanierung",
    total: "€25.000",
    status: "DRAFT",
    validUntil: "2024-03-15",
    createdAt: "2024-01-12"
  }
]

export default function QuotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Angebote</h1>
          <p className="text-muted-foreground">
            Erstellen und verwalten Sie professionelle Angebote für Ihre Kunden.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neues Angebot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offene Angebote</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Warten auf Rückmeldung
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Angenommen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Diesen Monat
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtwert</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€95.2K</div>
            <p className="text-xs text-muted-foreground">
              Offene Angebote
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Erfolgsquote</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">
              Letzten 6 Monate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Angebotsliste</CardTitle>
          <CardDescription>
            Übersicht aller erstellten Angebote
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Angebots-Nr.</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead>Betrag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Gültig bis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>{quote.customer}</TableCell>
                  <TableCell>{quote.title}</TableCell>
                  <TableCell className="font-medium">{quote.total}</TableCell>
                  <TableCell>
                    <Badge variant={quote.status === "ACCEPTED" ? "default" : quote.status === "SENT" ? "secondary" : "outline"}>
                      {quote.status === "ACCEPTED" ? "Angenommen" : quote.status === "SENT" ? "Gesendet" : "Entwurf"}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(quote.validUntil).toLocaleDateString("de-DE")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}