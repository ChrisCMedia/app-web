import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3,
  Calendar,
  Clock,
  Euro,
  FileText,
  FolderOpen,
  TrendingUp,
  Users,
  Wrench,
  AlertTriangle
} from "lucide-react"
import { RecentProjects } from "@/components/dashboard/recent-projects"
import { StatsCard } from "@/components/dashboard/stats-card"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Überblick über Ihr Handwerker Business"
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Willkommen zurück! Hier ist eine Übersicht Ihrer aktuellen Geschäftstätigkeiten.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Termine
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Neues Angebot
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Aktive Projekte"
          value="12"
          description="+2 seit letztem Monat"
          icon={FolderOpen}
          trend="up"
        />
        <StatsCard
          title="Offene Angebote"
          value="8"
          description="€45.200 Gesamtwert"
          icon={FileText}
          trend="stable"
        />
        <StatsCard
          title="Monatsumsatz"
          value="€28.450"
          description="+12% zum Vormonat"
          icon={Euro}
          trend="up"
        />
        <StatsCard
          title="Mitarbeiter"
          value="15"
          description="3 im Außendienst"
          icon={Users}
          trend="stable"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderOpen className="mr-2 h-5 w-5" />
                Aktuelle Projekte
              </CardTitle>
              <CardDescription>
                Übersicht Ihrer laufenden Projekte und deren Status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentProjects />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Schnellaktionen</CardTitle>
            <CardDescription>
              Häufig verwendete Funktionen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Neues Angebot erstellen
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Kunde hinzufügen
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Arbeitszeit erfassen
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Termin planen
            </Button>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Heutige Termine
            </CardTitle>
            <CardDescription>
              Ihre Termine für heute
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Baustelle Müller</p>
                  <p className="text-sm text-muted-foreground">09:00 - 12:00</p>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Kundentermin Schmidt</p>
                  <p className="text-sm text-muted-foreground">14:00 - 15:00</p>
                </div>
                <div className="h-2 w-2 bg-yellow-500 rounded-full" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Materialbestellung</p>
                  <p className="text-sm text-muted-foreground">16:00</p>
                </div>
                <div className="h-2 w-2 bg-blue-500 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Benachrichtigungen
            </CardTitle>
            <CardDescription>
              Wichtige Hinweise und Erinnerungen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 border border-orange-200 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Material nachbestellen</p>
                  <p className="text-xs text-muted-foreground">
                    Zement-Bestand ist niedrig
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Rechnung überfällig</p>
                  <p className="text-xs text-muted-foreground">
                    Kunde Wagner - €2.450
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-green-200 bg-green-50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Projekt abgeschlossen</p>
                  <p className="text-xs text-muted-foreground">
                    Badezimmer-Renovierung Meyer
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Umsatzentwicklung
            </CardTitle>
            <CardDescription>
              Monatlicher Umsatz der letzten 6 Monate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2">
              {[
                { month: "Jul", value: 85 },
                { month: "Aug", value: 72 },
                { month: "Sep", value: 98 },
                { month: "Okt", value: 67 },
                { month: "Nov", value: 89 },
                { month: "Dez", value: 100 }
              ].map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-8 bg-primary rounded-t"
                    style={{ height: `${data.value}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}