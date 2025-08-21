import { useCalculatorStore } from '@/stores/calculator'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Calculator Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds numbers and evaluates', () => {
    const calc = useCalculatorStore()
    calc.inputDigit('1')
    calc.inputDigit('2')
    calc.setOperator('+')
    calc.inputDigit('3')
    calc.evaluate()
    expect(calc.displayValue).toBe('15')
  })

  it('chains operations left-to-right', () => {
    const calc = useCalculatorStore()
    calc.inputDigit('1')
    calc.inputDigit('2')
    calc.setOperator('+')
    calc.inputDigit('3')
    calc.setOperator('×') // 12 + 3 => 15, then set ×
    calc.inputDigit('4')
    calc.evaluate()
    expect(calc.displayValue).toBe('60')
  })

  it('handles dot, sign, percent, and clear', () => {
    const calc = useCalculatorStore()
    calc.inputDot()
    calc.inputDigit('3')
    expect(calc.displayValue).toBe('0.3')
    calc.toggleSign()
    expect(calc.displayValue).toBe('-0.3')
    calc.percent()
    expect(calc.displayValue).toBe('-0.003')
    calc.clear()
    expect(calc.displayValue).toBe('0')
  })

  it('handles divide by zero as Error', () => {
    const calc = useCalculatorStore()
    calc.inputDigit('8')
    calc.setOperator('÷')
    calc.inputDigit('0')
    calc.evaluate()
    expect(calc.displayValue).toBe('Error')
  })
})


