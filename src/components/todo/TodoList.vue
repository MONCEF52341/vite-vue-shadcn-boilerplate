<script setup lang="ts">
import TodoItem from './TodoItem.vue';

defineProps<{
  items: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}>();
defineEmits<{
  (e: 'toggle', id: string): void;
  (e: 'remove', id: string): void;
}>();
</script>

<template>
  <div class="space-y-2">
    <TodoItem
      v-for="t in items"
      :key="t.id"
      :id="t.id"
      :title="t.title"
      :completed="t.completed"
      @toggle="$emit('toggle', t.id)"
      @remove="$emit('remove', t.id)"
    />
  </div>
</template>
