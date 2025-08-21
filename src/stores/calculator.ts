import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type Operator = '+' | '-' | '×' | '÷' | null

export const useCalculatorStore = defineStore('calculator', () => {
  const currentValue = ref<string>('0')
  const previousValue = ref<string | null>(null)
  const operator = ref<Operator>(null)
  const isFresh = ref<boolean>(true)

  const displayValue = computed(() => currentValue.value)

  function clear() {
    currentValue.value = '0'
    previousValue.value = null
    operator.value = null
    isFresh.value = true
  }

  function inputDigit(d: string) {
    if (!/^[0-9]$/.test(d)) return
    if (isFresh.value || currentValue.value === '0') {
      currentValue.value = d
      isFresh.value = false
    } else {
      currentValue.value += d
    }
  }

  function inputDot() {
    if (isFresh.value) {
      currentValue.value = '0.'
      isFresh.value = false
      return
    }
    if (!currentValue.value.includes('.')) {
      currentValue.value += '.'
    }
  }

  function toggleSign() {
    if (currentValue.value.startsWith('-')) currentValue.value = currentValue.value.slice(1)
    else if (currentValue.value !== '0') currentValue.value = '-' + currentValue.value
  }

  function percent() {
    const num = parseFloat(currentValue.value)
    currentValue.value = String(num / 100)
  }

  function setOperator(next: Exclude<Operator, null>) {
    if (operator.value && !isFresh.value && previousValue.value !== null) {
      // chain operations
      evaluate()
    }
    previousValue.value = currentValue.value
    operator.value = next
    isFresh.value = true
  }

  function evaluate() {
    if (operator.value === null || previousValue.value === null) return
    const a = parseFloat(previousValue.value)
    const b = parseFloat(currentValue.value)
    let result = 0
    switch (operator.value) {
      case '+':
        result = a + b
        break
      case '-':
        result = a - b
        break
      case '×':
        result = a * b
        break
      case '÷':
        result = b === 0 ? NaN : a / b
        break
    }
    currentValue.value = isNaN(result) || !isFinite(result) ? 'Error' : String(result)
    operator.value = null
    previousValue.value = null
    isFresh.value = true
  }

  return {
    displayValue,
    clear,
    inputDigit,
    inputDot,
    toggleSign,
    percent,
    setOperator,
    evaluate,
  }
})
