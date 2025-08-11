import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Zeiterfassung",
  description: "Erfassen Sie Arbeitszeiten und verfolgen Sie Projektzeiten"
}

export default function TimeTrackingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Zeiterfassung</h1>
        <p className="text-muted-foreground">
          Erfassen Sie Arbeitszeiten und verfolgen Sie Projektzeiten
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Zeiterfassung Übersicht</CardTitle>
          <CardDescription>
            Diese Seite wird in der finalen Version implementiert.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-muted-foreground">Zeiterfassung Funktionen werden hier implementiert</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
