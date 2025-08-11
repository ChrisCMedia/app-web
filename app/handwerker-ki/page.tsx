import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Handwerker-KI",
  description: "DESCRIPTION_PLACEHOLDER"
}

export default function COMPONENT_PLACEHOLDER() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Handwerker-KI</h1>
        <p className="text-muted-foreground">
          DESCRIPTION_PLACEHOLDER
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Handwerker-KI Übersicht</CardTitle>
          <CardDescription>
            Diese Seite wird in der finalen Version implementiert.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-muted-foreground">Handwerker-KI Funktionen werden hier implementiert</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
