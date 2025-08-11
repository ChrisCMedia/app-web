import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data - in real app this would come from props or API
const recentProjects = [
  {
    id: "1",
    name: "Badezimmer-Renovierung Müller",
    customer: "Max Mustermann",
    progress: 75,
    status: "ACTIVE",
    dueDate: "2024-02-28"
  },
  {
    id: "2", 
    name: "Küchenbau Schmidt",
    customer: "Anna Schmidt",
    progress: 25,
    status: "PLANNING",
    dueDate: "2024-03-15"
  },
  {
    id: "3",
    name: "Dachsanierung Wagner", 
    customer: "Peter Wagner",
    progress: 40,
    status: "ON_HOLD",
    dueDate: "2024-01-30"
  }
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "ACTIVE": return "default"
    case "PLANNING": return "secondary"
    case "ON_HOLD": return "destructive"
    default: return "outline"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "ACTIVE": return "Aktiv"
    case "PLANNING": return "Planung"
    case "ON_HOLD": return "Pausiert"
    default: return status
  }
}

export function RecentProjects() {
  return (
    <div className="space-y-4">
      {recentProjects.map((project) => (
        <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{project.name}</h4>
              <Badge variant={getStatusVariant(project.status)}>
                {getStatusLabel(project.status)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{project.customer}</p>
            <div className="flex items-center gap-2">
              <Progress value={project.progress} className="flex-1 h-2" />
              <span className="text-sm font-medium">{project.progress}%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Fällig: {new Date(project.dueDate).toLocaleDateString("de-DE")}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}