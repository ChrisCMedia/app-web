import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const projectSchema = z.object({
  name: z.string().min(1, "Projektname ist erforderlich"),
  description: z.string().optional(),
  customerId: z.string().min(1, "Kunde ist erforderlich"),
  status: z.enum(["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED", "CANCELLED"]).default("PLANNING"),
  startDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
  endDate: z.string().optional().transform(val => val ? new Date(val) : undefined)
})

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const customerId = searchParams.get("customerId")

    const where: any = {}
    if (status) where.status = status
    if (customerId) where.customerId = customerId

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              company: true
            }
          },
          tasks: {
            select: {
              id: true,
              status: true
            }
          },
          _count: {
            select: {
              tasks: true,
              timeEntries: true,
              documents: true
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.project.count({ where })
    ])

    return NextResponse.json({
      projects,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit
      }
    })
  } catch (error) {
    console.error("Get projects error:", error)
    return NextResponse.json(
      { error: "Fehler beim Abrufen der Projekte" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    const body = await req.json()
    const data = projectSchema.parse(body)

    // Verify customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: data.customerId }
    })

    if (!customer) {
      return NextResponse.json(
        { error: "Kunde nicht gefunden" },
        { status: 404 }
      )
    }

    const project = await prisma.project.create({
      data,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            company: true
          }
        },
        _count: {
          select: {
            tasks: true,
            timeEntries: true,
            documents: true
          }
        }
      }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "PROJECT_CREATED",
        entity: "Project",
        entityId: project.id,
        changes: data
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validierungsfehler", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Create project error:", error)
    return NextResponse.json(
      { error: "Fehler beim Erstellen des Projekts" },
      { status: 500 }
    )
  }
}