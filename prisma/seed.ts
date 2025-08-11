import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth-utils'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hashPassword('Admin123!')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@handwerker.de' },
    update: {},
    create: {
      email: 'admin@handwerker.de',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create manager user
  const managerPassword = await hashPassword('Manager123!')
  const manager = await prisma.user.upsert({
    where: { email: 'manager@handwerker.de' },
    update: {},
    create: {
      email: 'manager@handwerker.de',
      name: 'Manager User',
      password: managerPassword,
      role: 'MANAGER',
    },
  })

  // Create employee user
  const employeePassword = await hashPassword('Employee123!')
  const employee = await prisma.user.upsert({
    where: { email: 'mitarbeiter@handwerker.de' },
    update: {},
    create: {
      email: 'mitarbeiter@handwerker.de',
      name: 'Mitarbeiter User',
      password: employeePassword,
      role: 'MITARBEITER',
    },
  })

  // Create sample customers
  const customer1 = await prisma.customer.create({
    data: {
      company: 'Mustermann GmbH',
      name: 'Max Mustermann',
      email: 'info@mustermann.de',
      phone: '+49 123 456789',
      address: 'Musterstraße 1, 12345 Musterstadt',
      taxId: 'DE123456789',
      notes: 'Stammkunde seit 2020',
    },
  })

  const customer2 = await prisma.customer.create({
    data: {
      company: 'Beispiel AG',
      name: 'Erika Beispiel',
      email: 'kontakt@beispiel.de',
      phone: '+49 987 654321',
      address: 'Beispielweg 42, 54321 Beispielstadt',
      taxId: 'DE987654321',
    },
  })

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Badezimmer Renovierung',
      description: 'Komplette Badsanierung inkl. neuer Fliesen und Sanitäranlagen',
      customerId: customer1.id,
      status: 'IN_PROGRESS',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-02-28'),
      budget: 15000,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      name: 'Dachsanierung',
      description: 'Erneuerung der Dachziegel und Dämmung',
      customerId: customer2.id,
      status: 'PLANNING',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-04-15'),
      budget: 25000,
    },
  })

  // Create sample materials
  await prisma.material.createMany({
    data: [
      {
        name: 'Zement 25kg',
        description: 'Portland-Zement CEM I 42,5 R',
        category: 'Baumaterial',
        unit: 'Sack',
        stock: 50,
        price: 8.50,
      },
      {
        name: 'Fliesen 60x60cm',
        description: 'Feinsteinzeug grau matt',
        category: 'Fliesen',
        unit: 'm²',
        stock: 120,
        price: 35.00,
      },
      {
        name: 'Arbeitshandschuhe',
        description: 'Schutzhandschuhe Größe L',
        category: 'Arbeitschutz',
        unit: 'Paar',
        stock: 20,
        price: 4.50,
      },
    ],
  })

  console.log('Database seeded successfully!')
  console.log('Created users:')
  console.log('- Admin: admin@handwerker.de / Admin123!')
  console.log('- Manager: manager@handwerker.de / Manager123!')
  console.log('- Employee: mitarbeiter@handwerker.de / Employee123!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })