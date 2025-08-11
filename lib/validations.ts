import { z } from "zod"

// User validations
export const userCreateSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen haben"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z.string().min(8, "Passwort muss mindestens 8 Zeichen haben"),
  role: z.enum(["ADMIN", "MANAGER", "MITARBEITER"]).default("MITARBEITER")
})

export const userUpdateSchema = userCreateSchema.partial().omit({ password: true })

export const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, "Aktuelles Passwort ist erforderlich"),
  newPassword: z.string().min(8, "Neues Passwort muss mindestens 8 Zeichen haben"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"]
})

// Customer validations
export const customerCreateSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  company: z.string().optional(),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().optional(),
  address: z.string().optional()
})

export const customerUpdateSchema = customerCreateSchema.partial()

// Project validations
export const projectCreateSchema = z.object({
  name: z.string().min(1, "Projektname ist erforderlich"),
  description: z.string().optional(),
  customerId: z.string().min(1, "Kunde ist erforderlich"),
  status: z.enum(["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED", "CANCELLED"]).default("PLANNING"),
  startDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
  endDate: z.string().optional().transform(val => val ? new Date(val) : undefined)
})

export const projectUpdateSchema = projectCreateSchema.partial()

// Task validations
export const taskCreateSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich"),
  description: z.string().optional(),
  projectId: z.string().min(1, "Projekt ist erforderlich"),
  assigneeId: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]).default("TODO"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  dueDate: z.string().optional().transform(val => val ? new Date(val) : undefined)
})

export const taskUpdateSchema = taskCreateSchema.partial()

// Quote validations
export const quoteItemSchema = z.object({
  description: z.string().min(1, "Beschreibung ist erforderlich"),
  quantity: z.number().positive("Menge muss positiv sein"),
  unit: z.string().min(1, "Einheit ist erforderlich"),
  unitPrice: z.number().positive("Einzelpreis muss positiv sein"),
  total: z.number().positive("Gesamtpreis muss positiv sein")
})

export const quoteCreateSchema = z.object({
  customerId: z.string().min(1, "Kunde ist erforderlich"),
  items: z.array(quoteItemSchema).min(1, "Mindestens eine Position ist erforderlich"),
  validUntil: z.string().transform(val => new Date(val)),
  notes: z.string().optional()
})

export const quoteUpdateSchema = quoteCreateSchema.partial()

// Invoice validations
export const invoiceCreateSchema = z.object({
  customerId: z.string().min(1, "Kunde ist erforderlich"),
  items: z.array(quoteItemSchema).min(1, "Mindestens eine Position ist erforderlich"),
  dueDate: z.string().transform(val => new Date(val)),
  notes: z.string().optional()
})

export const invoiceUpdateSchema = invoiceCreateSchema.partial()

// Time entry validations
export const timeEntryCreateSchema = z.object({
  projectId: z.string().optional(),
  taskId: z.string().optional(),
  start: z.string().transform(val => new Date(val)),
  end: z.string().optional().transform(val => val ? new Date(val) : undefined),
  description: z.string().optional()
})

export const timeEntryUpdateSchema = timeEntryCreateSchema.partial()

// Material validations
export const materialCreateSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  description: z.string().optional(),
  unit: z.string().min(1, "Einheit ist erforderlich"),
  stock: z.number().int().min(0, "Bestand kann nicht negativ sein"),
  price: z.number().positive("Preis muss positiv sein"),
  category: z.enum(["WOOD", "METAL", "CONCRETE", "TOOLS", "HARDWARE", "ELECTRICAL", "PLUMBING", "OTHER"]).default("OTHER")
})

export const materialUpdateSchema = materialCreateSchema.partial()

// Appointment validations
export const appointmentCreateSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich"),
  description: z.string().optional(),
  start: z.string().transform(val => new Date(val)),
  end: z.string().transform(val => new Date(val)),
  projectId: z.string().optional(),
  assigneeIds: z.array(z.string()).optional()
})

export const appointmentUpdateSchema = appointmentCreateSchema.partial()

// Work report validations
export const workReportCreateSchema = z.object({
  projectId: z.string().min(1, "Projekt ist erforderlich"),
  date: z.string().transform(val => new Date(val)),
  hours: z.number().positive("Stunden müssen positiv sein"),
  description: z.string().min(1, "Beschreibung ist erforderlich")
})

export const workReportUpdateSchema = workReportCreateSchema.partial()

// Construction diary validations
export const constructionDiaryCreateSchema = z.object({
  projectId: z.string().min(1, "Projekt ist erforderlich"),
  date: z.string().transform(val => new Date(val)),
  weather: z.string().optional(),
  workers: z.number().int().min(0, "Arbeiteranzahl kann nicht negativ sein"),
  equipment: z.string().optional(),
  notes: z.string().min(1, "Notizen sind erforderlich"),
  photos: z.array(z.string()).optional()
})

export const constructionDiaryUpdateSchema = constructionDiaryCreateSchema.partial()

// Acceptance protocol validations
export const acceptanceItemSchema = z.object({
  description: z.string().min(1, "Beschreibung ist erforderlich"),
  completed: z.boolean(),
  notes: z.string().optional()
})

export const acceptanceProtocolCreateSchema = z.object({
  projectId: z.string().min(1, "Projekt ist erforderlich"),
  customerId: z.string().min(1, "Kunde ist erforderlich"),
  date: z.string().transform(val => new Date(val)),
  items: z.array(acceptanceItemSchema).min(1, "Mindestens eine Position ist erforderlich"),
  signature: z.string().optional()
})

export const acceptanceProtocolUpdateSchema = acceptanceProtocolCreateSchema.partial()

// Employee validations
export const employeeCreateSchema = z.object({
  userId: z.string().min(1, "Benutzer ist erforderlich"),
  position: z.string().min(1, "Position ist erforderlich"),
  department: z.string().optional(),
  hourlyRate: z.number().positive("Stundenlohn muss positiv sein").optional(),
  skills: z.array(z.string()).optional()
})

export const employeeUpdateSchema = employeeCreateSchema.partial()

// Generic pagination schema
export const paginationSchema = z.object({
  page: z.string().transform(val => parseInt(val) || 1),
  limit: z.string().transform(val => Math.min(parseInt(val) || 10, 100)),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
})