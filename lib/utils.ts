import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency
  }).format(amount)
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit", 
    year: "numeric"
  }

  return new Intl.DateTimeFormat("de-DE", { ...defaultOptions, ...options }).format(
    typeof date === "string" ? new Date(date) : date
  )
}

export function formatDateTime(date: Date | string) {
  return formatDate(date, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

export function generateInvoiceNumber(lastNumber?: string): string {
  const year = new Date().getFullYear()
  const prefix = `RE-${year}-`
  
  if (!lastNumber) {
    return `${prefix}001`
  }

  const match = lastNumber.match(/-(\d+)$/)
  const nextNumber = match ? parseInt(match[1]) + 1 : 1
  
  return `${prefix}${nextNumber.toString().padStart(3, "0")}`
}

export function generateQuoteNumber(lastNumber?: string): string {
  const year = new Date().getFullYear()
  const prefix = `ANB-${year}-`
  
  if (!lastNumber) {
    return `${prefix}001`
  }

  const match = lastNumber.match(/-(\d+)$/)
  const nextNumber = match ? parseInt(match[1]) + 1 : 1
  
  return `${prefix}${nextNumber.toString().padStart(3, "0")}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe") 
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function calculateProjectProgress(tasks: { status: string }[]): number {
  if (!tasks.length) return 0
  
  const completedTasks = tasks.filter(task => task.status === "DONE").length
  return Math.round((completedTasks / tasks.length) * 100)
}

export function getStatusColor(status: string, type: "project" | "task" | "invoice" | "quote" = "project") {
  const colors = {
    project: {
      PLANNING: "bg-yellow-100 text-yellow-800",
      ACTIVE: "bg-green-100 text-green-800", 
      ON_HOLD: "bg-red-100 text-red-800",
      COMPLETED: "bg-blue-100 text-blue-800",
      CANCELLED: "bg-gray-100 text-gray-800"
    },
    task: {
      TODO: "bg-gray-100 text-gray-800",
      IN_PROGRESS: "bg-blue-100 text-blue-800",
      REVIEW: "bg-yellow-100 text-yellow-800",
      DONE: "bg-green-100 text-green-800"
    },
    invoice: {
      DRAFT: "bg-gray-100 text-gray-800",
      SENT: "bg-blue-100 text-blue-800",
      PAID: "bg-green-100 text-green-800",
      OVERDUE: "bg-red-100 text-red-800",
      CANCELLED: "bg-gray-100 text-gray-800"
    },
    quote: {
      DRAFT: "bg-gray-100 text-gray-800",
      SENT: "bg-blue-100 text-blue-800", 
      ACCEPTED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      EXPIRED: "bg-orange-100 text-orange-800"
    }
  }

  return colors[type][status as keyof typeof colors[typeof type]] || "bg-gray-100 text-gray-800"
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10
}