<script setup lang="ts">
import { Button } from '@/components/ui/button';

const emit = defineEmits<{
  (e: 'digit', value: string): void
  (e: 'dot'): void
  (e: 'op', value: '+' | '-' | '×' | '÷'): void
  (e: 'eq'): void
  (e: 'clear'): void
  (e: 'sign'): void
  (e: 'percent'): void
}>()

function onDigit(d: string) { emit('digit', d) }
function onOp(op: '+' | '-' | '×' | '÷') { emit('op', op) }
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <Button variant="secondary" @click="emit('clear')">AC</Button>
    <Button variant="secondary" @click="emit('sign')">±</Button>
    <Button variant="secondary" @click="emit('percent')">%</Button>
    <Button variant="destructive" @click="onOp('÷')">÷</Button>

    <Button @click="onDigit('7')">7</Button>
    <Button @click="onDigit('8')">8</Button>
    <Button @click="onDigit('9')">9</Button>
    <Button variant="destructive" @click="onOp('×')">×</Button>

    <Button @click="onDigit('4')">4</Button>
    <Button @click="onDigit('5')">5</Button>
    <Button @click="onDigit('6')">6</Button>
    <Button variant="destructive" @click="onOp('-')">-</Button>

    <Button @click="onDigit('1')">1</Button>
    <Button @click="onDigit('2')">2</Button>
    <Button @click="onDigit('3')">3</Button>
    <Button variant="destructive" @click="onOp('+')">+</Button>

    <Button class="col-span-2" @click="onDigit('0')">0</Button>
    <Button @click="emit('dot')">.</Button>
    <Button variant="secondary" @click="emit('eq')">=</Button>
  </div>
  
</template>


