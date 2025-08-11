import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const customerSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  company: z.string().optional(),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().optional(),
  address: z.string().optional()
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
    const search = searchParams.get("search") || ""

    const where = search ? {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } }
      ]
    } : undefined

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          projects: {
            select: {
              id: true,
              status: true
            }
          },
          _count: {
            select: {
              projects: true,
              quotes: true,
              invoices: true
            }
          }
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.customer.count({ where })
    ])

    return NextResponse.json({
      customers,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit
      }
    })
  } catch (error) {
    console.error("Get customers error:", error)
    return NextResponse.json(
      { error: "Fehler beim Abrufen der Kunden" },
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
    const data = customerSchema.parse(body)

    // Check if customer with email already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { email: data.email }
    })

    if (existingCustomer) {
      return NextResponse.json(
        { error: "Kunde mit dieser E-Mail existiert bereits" },
        { status: 400 }
      )
    }

    const customer = await prisma.customer.create({
      data,
      include: {
        _count: {
          select: {
            projects: true,
            quotes: true,
            invoices: true
          }
        }
      }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "CUSTOMER_CREATED",
        entity: "Customer",
        entityId: customer.id,
        changes: data
      }
    })

    return NextResponse.json(customer, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validierungsfehler", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Create customer error:", error)
    return NextResponse.json(
      { error: "Fehler beim Erstellen des Kunden" },
      { status: 500 }
    )
  }
}