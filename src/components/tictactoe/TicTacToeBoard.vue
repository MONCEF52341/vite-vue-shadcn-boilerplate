<script setup lang="ts">
import TicTacToeCell from './TicTacToeCell.vue';

defineProps<{ cells: ("X" | "O" | null)[] }>()
defineEmits<{ (e: 'move', index: number): void }>()
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <TicTacToeCell v-for="(cell, idx) in cells" :key="idx" :value="cell" @click="$emit('move', idx)" />
  </div>
</template>


