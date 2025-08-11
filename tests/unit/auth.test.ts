import { describe, it, expect, vi, beforeEach } from 'vitest'
import { hashPassword, verifyPassword } from '@/lib/auth-utils'
import { loginSchema, registerSchema } from '@/lib/validations'

describe('Authentication', () => {
  describe('Password Hashing', () => {
    it('should hash password correctly', async () => {
      const password = 'Test123!'
      const hashedPassword = await hashPassword(password)
      
      expect(hashedPassword).toBeDefined()
      expect(hashedPassword).not.toBe(password)
      expect(hashedPassword.length).toBeGreaterThan(0)
    })

    it('should verify password correctly', async () => {
      const password = 'Test123!'
      const hashedPassword = await hashPassword(password)
      
      const isValid = await verifyPassword(password, hashedPassword)
      expect(isValid).toBe(true)
      
      const isInvalid = await verifyPassword('WrongPassword', hashedPassword)
      expect(isInvalid).toBe(false)
    })
  })

  describe('Validation Schemas', () => {
    describe('Login Schema', () => {
      it('should validate correct login data', () => {
        const validData = {
          email: 'test@example.com',
          password: 'Password123!'
        }
        
        const result = loginSchema.safeParse(validData)
        expect(result.success).toBe(true)
      })

      it('should reject invalid email', () => {
        const invalidData = {
          email: 'invalid-email',
          password: 'Password123!'
        }
        
        const result = loginSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
      })

      it('should reject short password', () => {
        const invalidData = {
          email: 'test@example.com',
          password: '123'
        }
        
        const result = loginSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
      })
    })

    describe('Register Schema', () => {
      it('should validate correct registration data', () => {
        const validData = {
          email: 'test@example.com',
          password: 'Password123!',
          name: 'Test User',
          company: 'Test Company',
          role: 'MITARBEITER'
        }
        
        const result = registerSchema.safeParse(validData)
        expect(result.success).toBe(true)
      })

      it('should reject invalid role', () => {
        const invalidData = {
          email: 'test@example.com',
          password: 'Password123!',
          name: 'Test User',
          company: 'Test Company',
          role: 'INVALID_ROLE'
        }
        
        const result = registerSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
      })
    })
  })
})