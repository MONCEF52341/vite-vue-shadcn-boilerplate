<script setup lang="ts">
import CalculatorDisplay from '@/components/calculator/CalculatorDisplay.vue'
import CalculatorKeypad from '@/components/calculator/CalculatorKeypad.vue'
import { useCalculatorStore } from '@/stores/calculator'

const calc = useCalculatorStore()
</script>

<template>
  <div class="mx-auto max-w-sm space-y-4">
    <CalculatorDisplay :value="calc.displayValue" />
    <CalculatorKeypad
      @digit="calc.inputDigit"
      @dot="calc.inputDot"
      @op="calc.setOperator"
      @eq="calc.evaluate"
      @clear="calc.clear"
      @sign="calc.toggleSign"
      @percent="calc.percent"
    />
  </div>
</template>
