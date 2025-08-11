import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login')
    
    // Check for login form elements
    await expect(page.locator('h1')).toContainText('Anmelden')
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/login')
    
    // Submit empty form
    await page.locator('button[type="submit"]').click()
    
    // Check for validation messages
    await expect(page.locator('text=Bitte geben Sie eine gültige E-Mail-Adresse ein')).toBeVisible()
    await expect(page.locator('text=Das Passwort muss mindestens 6 Zeichen lang sein')).toBeVisible()
  })

  test('should navigate to registration page', async ({ page }) => {
    await page.goto('/login')
    
    // Click on registration link
    await page.locator('text=Noch kein Konto? Registrieren').click()
    
    // Check if navigated to registration page
    await expect(page).toHaveURL('/register')
    await expect(page.locator('h1')).toContainText('Registrieren')
  })

  test('should display registration form with all fields', async ({ page }) => {
    await page.goto('/register')
    
    // Check for all registration form fields
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('input[name="company"]')).toBeVisible()
    await expect(page.locator('select[name="role"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should validate registration form', async ({ page }) => {
    await page.goto('/register')
    
    // Fill in invalid data
    await page.locator('input[name="email"]').fill('invalid-email')
    await page.locator('input[name="password"]').fill('123')
    
    // Submit form
    await page.locator('button[type="submit"]').click()
    
    // Check for validation errors
    await expect(page.locator('text=Bitte geben Sie eine gültige E-Mail-Adresse ein')).toBeVisible()
    await expect(page.locator('text=Das Passwort muss mindestens 6 Zeichen lang sein')).toBeVisible()
  })
})