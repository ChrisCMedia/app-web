import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Users
} from "lucide-react"

export const metadata: Metadata = {
  title: "Kunden",
  description: "Kundenverwaltung und Kontakte"
}

// Mock data - in real app this would come from database
const customers = [
  {
    id: "1",
    name: "Max Mustermann",
    company: "Mustermann GmbH",
    email: "max@mustermann.de",
    phone: "+49 123 456789",
    address: "Musterstraße 123, 12345 Musterstadt",
    activeProjects: 2,
    totalValue: "€15.450",
    lastContact: "2024-01-08",
    status: "active"
  },
  {
    id: "2",
    name: "Anna Schmidt",
    company: null,
    email: "anna.schmidt@email.de",
    phone: "+49 987 654321",
    address: "Beispielweg 45, 54321 Beispielstadt",
    activeProjects: 1,
    totalValue: "€8.200",
    lastContact: "2024-01-05",
    status: "active"
  },
  {
    id: "3",
    name: "Peter Wagner",
    company: "Wagner Bau AG",
    email: "p.wagner@wagner-bau.de",
    phone: "+49 555 123456",
    address: "Industriestraße 78, 98765 Industriestadt",
    activeProjects: 0,
    totalValue: "€32.100",
    lastContact: "2023-12-15",
    status: "inactive"
  }
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kunden</h1>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Kunden und Kontakte zentral an einem Ort.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neuer Kunde
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamte Kunden</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">
              +12 neue diesen Monat
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive Kunden</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              60% der Gesamtkunden
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Neukunden</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Letzten 30 Tage
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtumsatz</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€284.5K</div>
            <p className="text-xs text-muted-foreground">
              Dieses Jahr
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Kunden durchsuchen</CardTitle>
          <CardDescription>
            Finden Sie schnell den gewünschten Kunden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nach Name, Firma oder E-Mail suchen..."
                  className="pl-8"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Kundenliste</CardTitle>
          <CardDescription>
            Übersicht aller Kunden mit wichtigen Informationen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kunde</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Projekte</TableHead>
                <TableHead>Umsatz</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      {customer.company && (
                        <div className="text-sm text-muted-foreground">
                          {customer.company}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      <span className="max-w-[200px] truncate">
                        {customer.address}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{customer.activeProjects}</div>
                      <div className="text-xs text-muted-foreground">
                        aktiv
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{customer.totalValue}</div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={customer.status === "active" ? "default" : "secondary"}
                    >
                      {customer.status === "active" ? "Aktiv" : "Inaktiv"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Letzte Aktivitäten</CardTitle>
          <CardDescription>
            Aktuelle Änderungen und Interaktionen mit Kunden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="font-medium">Neuer Kunde hinzugefügt</p>
                <p className="text-sm text-muted-foreground">
                  Maria Müller wurde als neuer Kunde registriert
                </p>
              </div>
              <div className="text-sm text-muted-foreground">vor 2 Stunden</div>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="font-medium">Kundendaten aktualisiert</p>
                <p className="text-sm text-muted-foreground">
                  Kontaktdaten für Max Mustermann wurden geändert
                </p>
              </div>
              <div className="text-sm text-muted-foreground">vor 1 Tag</div>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="h-2 w-2 bg-orange-500 rounded-full" />
              <div className="flex-1">
                <p className="font-medium">Projekt abgeschlossen</p>
                <p className="text-sm text-muted-foreground">
                  Badezimmer-Renovierung für Anna Schmidt wurde beendet
                </p>
              </div>
              <div className="text-sm text-muted-foreground">vor 3 Tagen</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}