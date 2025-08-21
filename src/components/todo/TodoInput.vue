<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ref } from 'vue';

const emit = defineEmits<{ (e: 'submit', title: string): void }>()
const title = ref('')

function handleSubmit() {
  const value = title.value.trim()
  if (!value) return
  emit('submit', value)
  title.value = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    handleSubmit()
  }
}
</script>

<template>
  <div class="flex gap-2" data-test="todo-input">
    <input
      v-model="title"
      @keydown="onKeydown"
      class="flex-1 rounded-md border bg-background px-3 py-2 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]"
      type="text"
      placeholder="Ajouter une tâche..."
    />
    <Button @click="handleSubmit">Ajouter</Button>
  </div>
  
</template>


