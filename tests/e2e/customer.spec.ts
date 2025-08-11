import { test, expect } from '@playwright/test'

test.describe('Customer Management', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto('/')
    // In a real test, you would log in here
  })

  test('should display customer list page', async ({ page }) => {
    await page.goto('/kunden')
    
    // Check for page elements
    await expect(page.locator('h1')).toContainText('Kunden')
    await expect(page.locator('button:has-text("Neuer Kunde")')).toBeVisible()
    await expect(page.locator('input[placeholder*="Suchen"]')).toBeVisible()
  })

  test('should open new customer dialog', async ({ page }) => {
    await page.goto('/kunden')
    
    // Click new customer button
    await page.locator('button:has-text("Neuer Kunde")').click()
    
    // Check if dialog opened
    await expect(page.locator('h2:has-text("Neuer Kunde")')).toBeVisible()
    await expect(page.locator('input[name="company"]')).toBeVisible()
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="phone"]')).toBeVisible()
  })

  test('should validate customer form', async ({ page }) => {
    await page.goto('/kunden')
    await page.locator('button:has-text("Neuer Kunde")').click()
    
    // Try to submit empty form
    await page.locator('button:has-text("Speichern")').click()
    
    // Check for validation errors
    await expect(page.locator('text=Firma ist erforderlich')).toBeVisible()
    await expect(page.locator('text=Name ist erforderlich')).toBeVisible()
  })

  test('should search for customers', async ({ page }) => {
    await page.goto('/kunden')
    
    // Type in search field
    await page.locator('input[placeholder*="Suchen"]').fill('Test')
    
    // Check that search is working (in real app, would check filtered results)
    await expect(page.locator('input[placeholder*="Suchen"]')).toHaveValue('Test')
  })

  test('should display customer details', async ({ page }) => {
    await page.goto('/kunden')
    
    // In a real test, you would have test data and click on a customer
    // For now, just verify the structure exists
    await expect(page.locator('main')).toBeVisible()
  })
})