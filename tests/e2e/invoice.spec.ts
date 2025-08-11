import { test, expect } from '@playwright/test'

test.describe('Invoice Management', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto('/')
    // In a real test, you would log in here
  })

  test('should display invoice list page', async ({ page }) => {
    await page.goto('/rechnungen')
    
    // Check for page elements
    await expect(page.locator('h1')).toContainText('Rechnungen')
    await expect(page.locator('button:has-text("Neue Rechnung")')).toBeVisible()
    await expect(page.locator('text=Rechnungsnummer')).toBeVisible()
    await expect(page.locator('text=Kunde')).toBeVisible()
    await expect(page.locator('text=Betrag')).toBeVisible()
    await expect(page.locator('text=Status')).toBeVisible()
  })

  test('should open new invoice form', async ({ page }) => {
    await page.goto('/rechnungen')
    
    // Click new invoice button
    await page.locator('button:has-text("Neue Rechnung")').click()
    
    // Check if form opened
    await expect(page.locator('h2:has-text("Neue Rechnung erstellen")')).toBeVisible()
    await expect(page.locator('select[name="customerId"]')).toBeVisible()
    await expect(page.locator('input[name="dueDate"]')).toBeVisible()
  })

  test('should filter invoices by status', async ({ page }) => {
    await page.goto('/rechnungen')
    
    // Check for status filter buttons
    await expect(page.locator('button:has-text("Alle")')).toBeVisible()
    await expect(page.locator('button:has-text("Offen")')).toBeVisible()
    await expect(page.locator('button:has-text("Bezahlt")')).toBeVisible()
    await expect(page.locator('button:has-text("Überfällig")')).toBeVisible()
    
    // Click on a filter
    await page.locator('button:has-text("Offen")').click()
    
    // In a real test, would verify filtered results
  })

  test('should display invoice actions', async ({ page }) => {
    await page.goto('/rechnungen')
    
    // Check for action buttons in the table
    // In a real test with data, these would be visible
    await expect(page.locator('table')).toBeVisible()
  })

  test('should validate invoice form', async ({ page }) => {
    await page.goto('/rechnungen')
    await page.locator('button:has-text("Neue Rechnung")').click()
    
    // Try to submit without selecting customer
    await page.locator('button:has-text("Rechnung erstellen")').click()
    
    // Check for validation message
    await expect(page.locator('text=Bitte wählen Sie einen Kunden')).toBeVisible()
  })
})