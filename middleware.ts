import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

// Define protected routes and their required roles
const protectedRoutes = {
  "/dashboard": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/kunden": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/projekte": ["ADMIN", "MANAGER", "MITARBEITER"], 
  "/termine": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/auftraege": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/angebote": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/rechnungen": ["ADMIN", "MANAGER"],
  "/zeiterfassung": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/aufmass": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/arbeitsberichte": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/bautagebuch": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/abnahmeprotokoll": ["ADMIN", "MANAGER"],
  "/kalkulation": ["ADMIN", "MANAGER"],
  "/efb-preisblaetter": ["ADMIN", "MANAGER"],
  "/leistungen-material": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/lagerverwaltung": ["ADMIN", "MANAGER"],
  "/ressourcenplanung": ["ADMIN", "MANAGER"],
  "/personalverwaltung": ["ADMIN", "MANAGER"],
  "/baudokumentation": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/unternehmenssteuerung": ["ADMIN", "MANAGER"],
  "/handwerker-ki": ["ADMIN", "MANAGER", "MITARBEITER"],
  "/formular-editor": ["ADMIN", "MANAGER"],
  "/datensicherheit": ["ADMIN"],
  "/einstellungen": ["ADMIN", "MANAGER"],
  "/api": ["ADMIN", "MANAGER", "MITARBEITER"]
}

// Admin-only routes
const adminOnlyRoutes = [
  "/datensicherheit",
  "/api/users",
  "/api/system"
]

// Manager and Admin routes
const managerRoutes = [
  "/rechnungen",
  "/kalkulation", 
  "/personalverwaltung",
  "/unternehmenssteuerung",
  "/api/reports",
  "/api/settings"
]

export default withAuth(
  function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Allow access to auth pages
    if (pathname.startsWith("/(auth)")) {
      return NextResponse.next()
    }

    // Check if route requires authentication
    const requiresAuth = Object.keys(protectedRoutes).some(route => 
      pathname.startsWith(route)
    )

    if (!requiresAuth) {
      return NextResponse.next()
    }

    // Check user role permissions
    const userRole = token?.role as string
    
    // Admin has access to everything
    if (userRole === "ADMIN") {
      return NextResponse.next()
    }

    // Check admin-only routes
    if (adminOnlyRoutes.some(route => pathname.startsWith(route))) {
      if (userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
      }
    }

    // Check manager routes
    if (managerRoutes.some(route => pathname.startsWith(route))) {
      if (!["ADMIN", "MANAGER"].includes(userRole)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
      }
    }

    // Check specific route permissions
    for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
      if (pathname.startsWith(route)) {
        if (!allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL("/unauthorized", req.url))
        }
        break
      }
    }

    // Add security headers
    const response = NextResponse.next()
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

    return response
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to public routes
        if (pathname === "/" || pathname.startsWith("/(auth)")) {
          return true
        }

        // Require token for protected routes
        return !!token
      }
    }
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public/).*)"
  ]
}