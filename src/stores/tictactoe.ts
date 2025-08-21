import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type Player = 'X' | 'O'
type Cell = Player | null

const WIN_PATTERNS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const useTicTacToeStore = defineStore('tictactoe', () => {
  const board = ref<Cell[]>(Array.from({ length: 9 }, () => null))
  const currentPlayer = ref<Player>('X')
  const winner = ref<Player | 'Draw' | null>(null)
  const movesCount = ref<number>(0)

  const isFinished = computed(() => winner.value !== null)
  const statusMessage = computed(() => {
    if (winner.value === 'Draw') return 'Match nul.'
    if (winner.value) return `Victoire de ${winner.value} !`
    return `Au tour de ${currentPlayer.value}`
  })

  function reset() {
    board.value = Array.from({ length: 9 }, () => null)
    currentPlayer.value = 'X'
    winner.value = null
    movesCount.value = 0
  }

  function makeMove(index: number) {
    if (winner.value !== null) return
    if (index < 0 || index > 8) return
    if (board.value[index] !== null) return
    board.value[index] = currentPlayer.value
    movesCount.value += 1
    if (checkWinner(currentPlayer.value)) {
      winner.value = currentPlayer.value
      return
    }
    if (movesCount.value === 9) {
      winner.value = 'Draw'
      return
    }
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }

  function checkWinner(player: Player): boolean {
    return WIN_PATTERNS.some((pattern) => pattern.every((idx) => board.value[idx] === player))
  }

  return {
    board,
    currentPlayer,
    winner,
    isFinished,
    statusMessage,
    reset,
    makeMove,
  }
})
