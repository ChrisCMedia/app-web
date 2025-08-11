import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Handwerker Business Management",
    template: "%s | Handwerker BMS"
  },
  description: "Complete business management system for craftsman and construction companies",
  keywords: ["handwerker", "craftsman", "business management", "construction", "project management"],
  authors: [{ name: "Handwerker BMS Team" }],
  creator: "Handwerker BMS",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://your-domain.com",
    title: "Handwerker Business Management System",
    description: "Complete business management system for craftsman and construction companies",
    siteName: "Handwerker BMS"
  },
  twitter: {
    card: "summary_large_image",
    title: "Handwerker Business Management System",
    description: "Complete business management system for craftsman and construction companies"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}