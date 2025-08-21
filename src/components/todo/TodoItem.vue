<script setup lang="ts">
import { Button } from '@/components/ui/button'

const props = defineProps<{ id: string; title: string; completed: boolean }>()
const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'remove', id: string): void
}>()
</script>

<template>
  <div class="flex items-center gap-3 rounded-md border bg-card p-3">
    <input
      :checked="props.completed"
      type="checkbox"
      class="size-5 accent-primary"
      @change="emit('toggle', props.id)"
    />
    <span class="flex-1" :class="{ 'line-through text-muted-foreground': props.completed }">{{
      props.title
    }}</span>
    <Button variant="destructive" size="sm" @click="emit('remove', props.id)">Supprimer</Button>
  </div>
</template>
