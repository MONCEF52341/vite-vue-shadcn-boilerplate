<script setup lang="ts">
import { Button } from '@/components/ui/button'

defineProps<{ value: 'X' | 'O' | null }>()
defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <Button variant="outline" class="h-16 w-16 text-2xl font-bold" @click="$emit('click')">
    {{ value ?? '' }}
  </Button>
</template>
