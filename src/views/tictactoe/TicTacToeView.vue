<script setup lang="ts">
import TicTacToeBoard from '@/components/tictactoe/TicTacToeBoard.vue'
import { Button } from '@/components/ui/button'
import { useTicTacToeStore } from '@/stores/tictactoe'

const ttt = useTicTacToeStore()
</script>

<template>
  <div class="mx-auto max-w-sm space-y-4">
    <div class="text-center text-lg font-medium">{{ ttt.statusMessage }}</div>
    <TicTacToeBoard :cells="ttt.board" @move="ttt.makeMove" />
    <div class="text-center">
      <Button variant="secondary" @click="ttt.reset">Rejouer</Button>
    </div>
  </div>
</template>
