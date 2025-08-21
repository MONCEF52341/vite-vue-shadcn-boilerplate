<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-bold">Counter</h1>
    <p>
      Valeur: <strong data-test="count">{{ counter.count }}</strong>
    </p>
    <p>
      Double: <strong data-test="double">{{ counter.doubleCount }}</strong>
    </p>
    <div class="flex gap-2">
      <Button @click="counter.increment">Increment</Button>
    </div>
  </section>
</template>
