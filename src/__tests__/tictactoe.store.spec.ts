import { useTicTacToeStore } from '@/stores/tictactoe'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('TicTacToe Store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('X wins with top row', () => {
    const t = useTicTacToeStore()
    t.makeMove(0) // X
    t.makeMove(3) // O
    t.makeMove(1) // X
    t.makeMove(4) // O
    t.makeMove(2) // X wins
    expect(t.winner).toBe('X')
    expect(t.isFinished).toBe(true)
  })

  it('detects draw', () => {
    const t = useTicTacToeStore()
    // X O X
    // X X O
    // O X O
    t.makeMove(0) // X
    t.makeMove(1) // O
    t.makeMove(2) // X
    t.makeMove(5) // O
    t.makeMove(3) // X
    t.makeMove(6) // O
    t.makeMove(4) // X
    t.makeMove(8) // O
    t.makeMove(7) // X
    expect(t.winner).toBe('Draw')
    expect(t.isFinished).toBe(true)
  })
})
