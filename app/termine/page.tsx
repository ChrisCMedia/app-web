import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CalendarDays, Clock, Plus, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Termine",
  description: "Terminplanung und Kalender"
}

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Termine</h1>
          <p className="text-muted-foreground">
            Planen und verwalten Sie alle Termine und Appointments.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neuer Termin
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Heute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">5 Termine</p>
            <p className="text-sm text-muted-foreground">
              Nächster Termin um 09:00 Uhr
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Diese Woche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">23 Termine</p>
            <p className="text-sm text-muted-foreground">
              15 Kundentermine, 8 interne Besprechungen
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Überfällig
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-2">2 Termine</p>
            <p className="text-sm text-muted-foreground text-red-600">
              Erfordern Aufmerksamkeit
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kalenderansicht</CardTitle>
          <CardDescription>
            Hier würde der Kalender angezeigt werden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-muted-foreground">Kalender-Komponente wird hier integriert</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}