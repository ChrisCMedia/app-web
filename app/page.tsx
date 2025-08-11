import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  FolderOpen, 
  Calendar, 
  FileText, 
  Calculator, 
  Clock,
  Building2,
  Hammer,
  Settings,
  BarChart3
} from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Handwerker Business Management System Dashboard"
}

const features = [
  {
    title: "Kundenverwaltung",
    description: "Verwalten Sie alle Kundenbeziehungen zentral",
    icon: Users,
    href: "/kunden",
    color: "text-blue-600"
  },
  {
    title: "Projektverwaltung",
    description: "Organisieren und überwachen Sie alle Projekte",
    icon: FolderOpen,
    href: "/projekte",
    color: "text-green-600"
  },
  {
    title: "Terminplanung",
    description: "Planen Sie Termine und Ressourcen effizient",
    icon: Calendar,
    href: "/termine",
    color: "text-purple-600"
  },
  {
    title: "Angebote & Rechnungen",
    description: "Erstellen Sie professionelle Dokumente",
    icon: FileText,
    href: "/angebote",
    color: "text-orange-600"
  },
  {
    title: "Kalkulation",
    description: "Präzise Kostenberechnung für Projekte",
    icon: Calculator,
    href: "/kalkulation",
    color: "text-red-600"
  },
  {
    title: "Zeiterfassung",
    description: "Erfassen Sie Arbeitszeiten digital",
    icon: Clock,
    href: "/zeiterfassung",
    color: "text-indigo-600"
  },
  {
    title: "Lagerverwaltung",
    description: "Verwalten Sie Material und Bestände",
    icon: Building2,
    href: "/lagerverwaltung",
    color: "text-teal-600"
  },
  {
    title: "Handwerker-KI",
    description: "KI-gestützte Assistenz für Ihr Business",
    icon: Hammer,
    href: "/handwerker-ki",
    color: "text-cyan-600"
  }
]

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Handwerker Business Management System
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Die komplette Lösung für Handwerksbetriebe - von der Kundenakquise bis zur Rechnungsstellung.
          Verwalten Sie Projekte, Termine, Personal und Finanzen in einer integrierten Plattform.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Dashboard öffnen
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/(auth)/login">
              Anmelden
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {feature.description}
                </CardDescription>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={feature.href}>
                    Öffnen
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
            <CardTitle className="text-sm font-medium">Offene Angebote</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Gesamtwert: €45.200
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monatsumsatz</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€28.450</div>
            <p className="text-xs text-muted-foreground">
              +12% zum Vormonat
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Warum Handwerker BMS?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="font-semibold mb-2">Alles in einer Lösung</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Von der Kundenakquise bis zur Rechnungsstellung - alle Geschäftsprozesse 
              in einem integrierten System.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Speziell für Handwerker</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Entwickelt mit und für Handwerksbetriebe. Berücksichtigt branchenspezifische 
              Anforderungen und Workflows.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Modern & Sicher</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Moderne Technologie mit höchsten Sicherheitsstandards. 
              DSGVO-konform und cloud-ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}