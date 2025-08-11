import { describe, it, expect } from 'vitest'
import { 
  formatCurrency, 
  formatDate, 
  calculateTax, 
  calculateTotal,
  generateInvoiceNumber,
  generateQuoteNumber,
  cn
} from '@/lib/utils'

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('1.234,56 €')
      expect(formatCurrency(1000)).toBe('1.000,00 €')
      expect(formatCurrency(0)).toBe('0,00 €')
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15T10:30:00')
      expect(formatDate(date)).toBe('15.01.2024')
    })
  })

  describe('calculateTax', () => {
    it('should calculate tax correctly', () => {
      expect(calculateTax(100, 19)).toBe(19)
      expect(calculateTax(100, 7)).toBe(7)
      expect(calculateTax(0, 19)).toBe(0)
    })
  })

  describe('calculateTotal', () => {
    it('should calculate total with tax correctly', () => {
      expect(calculateTotal(100, 19)).toBe(119)
      expect(calculateTotal(100, 7)).toBe(107)
      expect(calculateTotal(0, 19)).toBe(0)
    })
  })

  describe('generateInvoiceNumber', () => {
    it('should generate invoice number with correct format', () => {
      const invoiceNumber = generateInvoiceNumber()
      expect(invoiceNumber).toMatch(/^RE-\d{4}-\d{4}$/)
    })
  })

  describe('generateQuoteNumber', () => {
    it('should generate quote number with correct format', () => {
      const quoteNumber = generateQuoteNumber()
      expect(quoteNumber).toMatch(/^AN-\d{4}-\d{4}$/)
    })
  })

  describe('cn', () => {
    it('should combine class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
      expect(cn('foo', undefined, 'bar')).toBe('foo bar')
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
    })
  })
})