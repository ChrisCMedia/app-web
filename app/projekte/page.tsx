import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  Euro,
  Clock,
  FolderOpen
} from "lucide-react"

export const metadata: Metadata = {
  title: "Projekte",
  description: "Projektverwaltung und Übersicht"
}

// Mock data - in real app this would come from database
const projects = [
  {
    id: "1",
    name: "Badezimmer-Renovierung Müller",
    customer: "Max Mustermann",
    status: "ACTIVE",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    budget: "€12.500",
    spent: "€9.375",
    team: ["John Doe", "Jane Smith"],
    priority: "high"
  },
  {
    id: "2",
    name: "Küchenbau Schmidt",
    customer: "Anna Schmidt",
    status: "PLANNING",
    progress: 25,
    startDate: "2024-02-01",
    endDate: "2024-03-15",
    budget: "€18.200",
    spent: "€4.550",
    team: ["Mike Johnson"],
    priority: "medium"
  },
  {
    id: "3",
    name: "Dachsanierung Wagner",
    customer: "Peter Wagner",
    status: "ON_HOLD",
    progress: 40,
    startDate: "2023-12-01",
    endDate: "2024-01-30",
    budget: "€25.000",
    spent: "€10.000",
    team: ["John Doe", "Mike Johnson", "Sarah Wilson"],
    priority: "low"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE": return "default"
    case "PLANNING": return "secondary"
    case "ON_HOLD": return "destructive"
    case "COMPLETED": return "outline"
    default: return "secondary"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "ACTIVE": return "Aktiv"
    case "PLANNING": return "Planung"
    case "ON_HOLD": return "Pausiert"
    case "COMPLETED": return "Abgeschlossen"
    default: return status
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "text-red-600"
    case "medium": return "text-yellow-600"
    case "low": return "text-green-600"
    default: return "text-gray-600"
  }
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projekte</h1>
          <p className="text-muted-foreground">
            Verwalten Sie alle Ihre Bauprojekte und deren Fortschritt.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neues Projekt
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive Projekte</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 seit letztem Monat
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Planung</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Starten in den nächsten 30 Tagen
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamtwert</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€425K</div>
            <p className="text-xs text-muted-foreground">
              Aktive Projekte
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ø Projektdauer</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.2</div>
            <p className="text-xs text-muted-foreground">
              Wochen pro Projekt
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Projekte durchsuchen</CardTitle>
          <CardDescription>
            Finden Sie schnell das gewünschte Projekt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nach Projektname, Kunde oder Status suchen..."
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

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Projektliste</CardTitle>
          <CardDescription>
            Übersicht aller Projekte mit Status und Fortschritt
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projekt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fortschritt</TableHead>
                <TableHead>Zeitraum</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {project.customer}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(project.status)}>
                      {getStatusLabel(project.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(project.startDate).toLocaleDateString("de-DE")}</div>
                      <div className="text-muted-foreground">
                        bis {new Date(project.endDate).toLocaleDateString("de-DE")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{project.budget}</div>
                      <div className="text-muted-foreground">
                        {project.spent} ausgegeben
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, index) => (
                        <div
                          key={index}
                          className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs border-2 border-background"
                          title={member}
                        >
                          {member.split(" ").map(n => n[0]).join("")}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs border-2 border-background">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
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

      {/* Project Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Projekt-Timeline</CardTitle>
          <CardDescription>
            Übersicht der kommenden Projekt-Meilensteine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="h-3 w-3 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="font-medium">Projektstart: Küchenbau Schmidt</p>
                <p className="text-sm text-muted-foreground">
                  Morgen, 11. Januar 2024
                </p>
              </div>
              <Badge variant="outline">Geplant</Badge>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="h-3 w-3 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="font-medium">Zwischenabnahme: Badezimmer Müller</p>
                <p className="text-sm text-muted-foreground">
                  15. Januar 2024
                </p>
              </div>
              <Badge variant="outline">Anstehend</Badge>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="h-3 w-3 bg-orange-500 rounded-full" />
              <div className="flex-1">
                <p className="font-medium">Materiallieferung: Dachsanierung</p>
                <p className="text-sm text-muted-foreground">
                  20. Januar 2024
                </p>
              </div>
              <Badge variant="outline">Ausstehend</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}