<script setup lang="ts">
defineProps<{ value: string }>()
</script>

<template>
  <div class="w-full rounded-lg border bg-card p-4 text-right text-3xl font-semibold tabular-nums">
    {{ value }}
  </div>
</template>
