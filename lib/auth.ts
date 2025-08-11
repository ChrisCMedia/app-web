import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/(auth)/login",
    signUp: "/(auth)/register"
  },
  secret: process.env.NEXTAUTH_SECRET
}

// Helper functions for authorization
export function hasRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole)
}

export function canAccessResource(userRole: string, resource: string): boolean {
  const permissions = {
    ADMIN: ["*"],
    MANAGER: [
      "customers", "projects", "quotes", "invoices", "appointments",
      "materials", "employees", "reports", "settings"
    ],
    MITARBEITER: [
      "customers", "projects", "time-entries", "appointments", "materials"
    ]
  }

  const userPermissions = permissions[userRole as keyof typeof permissions] || []
  return userPermissions.includes("*") || userPermissions.includes(resource)
}

export function getRoleLevel(role: string): number {
  const levels = {
    ADMIN: 3,
    MANAGER: 2,
    MITARBEITER: 1
  }
  return levels[role as keyof typeof levels] || 0
}